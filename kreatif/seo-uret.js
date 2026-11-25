#!/usr/bin/env node
// SEO ve yapay zeka (LLM) tarayıcıları için statik içerik üretir. Ana sayfa araçları JS ile çizdiğinden
// JS çalıştırmayan tarayıcılar (GPTBot, ClaudeBot, PerplexityBot vb.) fiyatları göremez; bu script onları
// düz HTML olarak yazar.
//
//   node kreatif/seo-uret.js
//
// Üretilenler (hepsi docs/ altında, GitHub Pages'e gider):
//   fiyat/<slug>.html       her aktif araç için fiyat sayfası (Car + Offer + BreadcrumbList şeması)
//   fiyat-listesi.html      tüm aktif araçların tek tablo halinde listesi
//   index.html              <!-- SEO:... --> işaretleri arasındaki ön-çizim kartları ve ItemList şeması
//   sitemap.xml, llms.txt
// Fiyat güncellemesinden sonra (fiyat-guncelle.js'ten hemen sonra) çalıştırın.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KOK = path.join(__dirname, '..');
const DOCS = path.join(KOK, 'docs');
const KAYNAK = path.join(DOCS, 'app.js');
const SITE = 'https://aracfirsat.com';
const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

const TIPLER = {
  otomobil: { etiket: 'Otomobil', cogul: 'Sıfır Otomobiller', segmentler: { sedan: 'Sedan', suv: 'SUV', hatchback: 'Hatchback', crossover: 'Crossover' } },
  motosiklet: { etiket: 'Motosiklet', cogul: 'Sıfır Motosikletler', segmentler: { scooter: 'Scooter', naked: 'Naked', adventure: 'Adventure', sport: 'Sport', touring: 'Touring', cruiser: 'Cruiser' } }
};
const YAKITLAR = { benzin: 'Benzin', dizel: 'Dizel', hybrid: 'Hybrid', elektrik: 'Elektrik' };
const SCHEMA_YAKIT = { benzin: 'Gasoline', dizel: 'Diesel', hybrid: 'Hybrid', elektrik: 'Electricity' };

// ─── VERİ ────────────────────────────────────────────────
const kod = fs.readFileSync(KAYNAK, 'utf8');
const dizi = ad => {
  const m = kod.match(new RegExp(`const ${ad} = (\\[[\\s\\S]*?\\n\\]);`));
  if (!m) throw new Error(`${ad} dizisi ${KAYNAK} içinde bulunamadı`);
  return vm.runInNewContext(m[1]);
};
const tarihEslesme = kod.match(/const FIYAT_GUNCELLEME_TARIHI = '(\d{4}-\d{2}-\d{2})';/);
if (!tarihEslesme) throw new Error('FIYAT_GUNCELLEME_TARIHI bulunamadı');
const TARIH = tarihEslesme[1];

const araclar = [...dizi('ARAC_VERILERI'), ...dizi('MOTOSIKLET_VERILERI')]
  .filter(a => a.aktif)
  .map(a => ({ ...a, tip: a.tip || 'otomobil', slug: slugYap(`${a.marka} ${a.model}`) }));

const slugSayaci = {};
araclar.forEach(a => {
  if (slugSayaci[a.slug]) throw new Error(`Aynı slug iki araçta: ${a.slug}`);
  slugSayaci[a.slug] = true;
});

// ─── YARDIMCILAR ─────────────────────────────────────────
// app.js'teki aracSlug() ile aynı kurala uymalı, yoksa kartlardaki linkler kırılır
function slugYap(metin) {
  const harita = { ç: 'c', ğ: 'g', ı: 'i', i: 'i', ö: 'o', ş: 's', ü: 'u', é: 'e' };
  return metin.toLocaleLowerCase('tr')
    .replace(/[çğıiöşüé]/g, h => harita[h])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function fiyatFormat(f) {
  return new Intl.NumberFormat('tr-TR').format(f) + ' ₺';
}

function tarihYaz(iso) {
  const [y, a, g] = iso.split('-').map(Number);
  return `${g} ${AYLAR[a - 1]} ${y}`;
}

function kacis(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function jsonLd(nesne) {
  return `<script type="application/ld+json">\n${JSON.stringify(nesne, null, 2).replace(/</g, '\\u003c')}\n</script>`;
}

const tamAd = a => `${a.marka} ${a.model}`;

// Bing 70, Google ~60 karakterden uzun başlıkları keser/uyarır. Sırayla kısalan adaylardan sığan ilkini seçer;
// hiçbiri sığmazsa donanım adının sonundan kelime atar. H1 her zaman tam adı gösterir.
const BASLIK_SINIRI = 60;
function aracBasligi(a) {
  const fiyat = fiyatFormat(a.fiyat);
  const adaylar = [
    `${tamAd(a)} ${yil} Fiyatı: ${fiyat} | AraçFırsat`,
    `${tamAd(a)} ${yil} Fiyatı: ${fiyat}`,
    `${tamAd(a)} Fiyatı: ${fiyat}`
  ];
  const sigan = adaylar.find(b => b.length <= BASLIK_SINIRI);
  if (sigan) return sigan;
  const kelimeler = a.model.split(' ');
  while (kelimeler.length > 1) {
    kelimeler.pop();
    const b = `${a.marka} ${kelimeler.join(' ')} Fiyatı: ${fiyat}`;
    if (b.length <= BASLIK_SINIRI) return b;
  }
  return `${a.marka} ${kelimeler[0]} Fiyatı: ${fiyat}`;
}

// Bing 160 karakterden uzun meta açıklamaları uyarır; çağrı cümlesi sığmıyorsa kısaltılır ya da atılır
const ACIKLAMA_SINIRI = 160;
function aracAciklamasi(a) {
  const govde = `${tamAd(a)} sıfır fiyatı ${fiyatFormat(a.fiyat)} (${tarihYaz(TARIH)}). ${a.motor}, ${a.hp} ${gucBirimi(a)}, ${a.vites}.`;
  return [' Benzer modellerle karşılaştırın, test sürüşü talep edin.', ' Test sürüşü talep edin.', '']
    .map(son => govde + son)
    .find(d => d.length <= ACIKLAMA_SINIRI) || govde;
}
const sayfaYolu = a => `fiyat/${a.slug}.html`;
const gucBirimi = a => (a.tip === 'motosiklet' ? 'PS' : 'HP');
const yil = TARIH.slice(0, 4);

function aracSchema(a) {
  return {
    '@type': a.tip === 'motosiklet' ? 'Motorcycle' : 'Car',
    name: tamAd(a),
    url: `${SITE}/${sayfaYolu(a)}`,
    image: `${SITE}/${a.gorsel}`,
    brand: { '@type': 'Brand', name: a.marka },
    model: a.model,
    itemCondition: 'https://schema.org/NewCondition',
    fuelType: SCHEMA_YAKIT[a.yakit] || a.yakit,
    vehicleTransmission: a.vites,
    vehicleEngine: { '@type': 'EngineSpecification', name: a.motor, enginePower: { '@type': 'QuantitativeValue', value: a.hp, unitText: gucBirimi(a) } },
    offers: {
      '@type': 'Offer',
      price: String(a.fiyat),
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url: `${SITE}/${sayfaYolu(a)}`
    }
  };
}

// ─── ORTAK SAYFA İSKELETİ ────────────────────────────────
function sayfa({ baslik, aciklama, yol, ogGorsel, govde, sema }) {
  const url = `${SITE}/${yol}`;
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${kacis(baslik)}</title>
  <meta name="description" content="${kacis(aciklama)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#1a1a2e">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${kacis(baslik)}">
  <meta property="og:description" content="${kacis(aciklama)}">
  <meta property="og:image" content="${SITE}/${ogGorsel}">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:site_name" content="AraçFırsat">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="stylesheet" href="/style.css">
${sema.map(jsonLd).join('\n')}
</head>
<body class="statik-sayfa">
  <nav class="navbar">
    <div class="container nav-content">
      <a href="/" class="logo"><span class="logo-text">araç<span>fırsat</span></span></a>
      <ul class="nav-links">
        <li><a href="/fiyat-listesi.html">Fiyat Listesi</a></li>
        <li><a href="/#karsilastir">Karşılaştır</a></li>
        <li><a href="/#test-surusu">Test Sürüşü</a></li>
      </ul>
    </div>
  </nav>
  <main class="section">
    <div class="container">
${govde}
    </div>
  </main>
  <footer class="footer">
    <div class="container">
      <p>&copy; ${yil} AraçFırsat - Tüm hakları saklıdır.</p>
      <p style="font-size:0.85rem;margin-top:0.75rem;"><a href="/" style="color:#bbb;">Ana Sayfa</a> · <a href="/fiyat-listesi.html" style="color:#bbb;">Sıfır Araç Fiyat Listesi</a> · <a href="/gizlilik-politikasi.html" style="color:#bbb;">Gizlilik Politikası ve KVKK</a></p>
    </div>
  </footer>
</body>
</html>
`;
}

function breadcrumb(adimlar) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: adimlar.map(([ad, yol], i) => ({ '@type': 'ListItem', position: i + 1, name: ad, item: `${SITE}/${yol}` }))
  };
}

// ─── ARAÇ SAYFASI ────────────────────────────────────────
function benzerler(a) {
  return araclar
    .filter(b => b.id !== a.id && b.tip === a.tip && b.segment === a.segment)
    .sort((x, y) => Math.abs(x.fiyat - a.fiyat) - Math.abs(y.fiyat - a.fiyat))
    .slice(0, 4);
}

function aracSayfasi(a) {
  const tip = TIPLER[a.tip];
  const segment = tip.segmentler[a.segment] || a.segment;
  const yakit = YAKITLAR[a.yakit] || a.yakit;
  const ad = tamAd(a);
  const benzer = benzerler(a);
  const ucuzlar = araclar.filter(b => b.tip === a.tip && b.segment === a.segment).sort((x, y) => x.fiyat - y.fiyat);
  const sira = ucuzlar.findIndex(b => b.id === a.id) + 1;

  const ozet = `${ad} ${yil} sıfır ${tip.etiket.toLocaleLowerCase('tr')} fiyatı ${fiyatFormat(a.fiyat)}. ` +
    `${a.motor}, ${a.hp} ${gucBirimi(a)}, ${a.vites} şanzıman, ${yakit.toLocaleLowerCase('tr')} yakıtlı bir ${segment.toLocaleLowerCase('tr')}. ` +
    `Fiyat ${tarihYaz(TARIH)} tarihinde güncellendi.`;

  const govde = `      <nav class="kirinti" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> › <a href="/fiyat-listesi.html">Fiyat Listesi</a> › <span>${kacis(ad)}</span></nav>
      <article class="arac-detay">
        <img src="/${a.gorsel}" alt="${kacis(ad)} sıfır ${tip.etiket.toLocaleLowerCase('tr')}" width="720" height="480" fetchpriority="high">
        <div>
          <p class="car-brand">${kacis(a.marka)} · ${kacis(segment)}</p>
          <h1>${kacis(ad)} ${yil} Fiyatı</h1>
          <p class="car-price">${fiyatFormat(a.fiyat)}</p>
          <p class="detay-ozet">${kacis(ozet)}</p>
          <table class="detay-tablo">
            <tr><th>Marka</th><td>${kacis(a.marka)}</td></tr>
            <tr><th>Model / Donanım</th><td>${kacis(a.model)}</td></tr>
            <tr><th>Tip / Segment</th><td>${tip.etiket} / ${kacis(segment)}</td></tr>
            <tr><th>Motor</th><td>${kacis(a.motor)}</td></tr>
            <tr><th>Güç</th><td>${a.hp} ${gucBirimi(a)}</td></tr>
            <tr><th>Şanzıman</th><td>${kacis(a.vites)}</td></tr>
            <tr><th>Yakıt</th><td>${yakit}</td></tr>
            <tr><th>Liste fiyatı</th><td>${fiyatFormat(a.fiyat)}</td></tr>
            <tr><th>Fiyat güncelleme</th><td><time datetime="${TARIH}">${tarihYaz(TARIH)}</time></td></tr>
          </table>
          <p class="detay-not">${kacis(segment)} segmentindeki ${ucuzlar.length} ${tip.etiket.toLocaleLowerCase('tr')} arasında en uygun fiyatlı ${sira}. sırada. Fiyatlar liste fiyatıdır; bayi kampanyası, kredi ve takas koşullarına göre değişebilir.</p>
          <a class="btn-submit detay-cta" href="/?arac=${a.id}#test-surusu">Test Sürüşü Talep Et</a>
        </div>
      </article>
${benzer.length ? `      <section class="detay-benzer">
        <h2>Benzer fiyatlı ${kacis(segment.toLocaleLowerCase('tr'))} modelleri</h2>
        <ul>
${benzer.map(b => `          <li><a href="/${sayfaYolu(b)}">${kacis(tamAd(b))}</a> — ${fiyatFormat(b.fiyat)}</li>`).join('\n')}
        </ul>
        <p><a href="/#karsilastir">Bu modelleri yan yana karşılaştır →</a></p>
      </section>` : ''}`;

  return sayfa({
    baslik: aracBasligi(a),
    aciklama: aracAciklamasi(a),
    yol: sayfaYolu(a),
    ogGorsel: a.gorsel,
    govde,
    sema: [
      { '@context': 'https://schema.org', ...aracSchema(a) },
      breadcrumb([['Ana Sayfa', ''], ['Fiyat Listesi', 'fiyat-listesi.html'], [ad, sayfaYolu(a)]])
    ]
  });
}

// ─── FİYAT LİSTESİ SAYFASI ───────────────────────────────
function listeSayfasi() {
  const tablo = tip => {
    const liste = araclar.filter(a => a.tip === tip).sort((x, y) => x.marka.localeCompare(y.marka, 'tr') || x.fiyat - y.fiyat);
    return `      <h2>${TIPLER[tip].cogul} (${liste.length} model)</h2>
      <div class="liste-sarmal">
      <table class="detay-tablo fiyat-listesi">
        <thead><tr><th>Marka / Model</th><th>Segment</th><th>Yakıt</th><th>Güç</th><th>Fiyat</th></tr></thead>
        <tbody>
${liste.map(a => `          <tr><td><a href="/${sayfaYolu(a)}">${kacis(tamAd(a))}</a></td><td>${kacis(TIPLER[tip].segmentler[a.segment] || a.segment)}</td><td>${YAKITLAR[a.yakit] || a.yakit}</td><td>${a.hp} ${gucBirimi(a)}</td><td>${fiyatFormat(a.fiyat)}</td></tr>`).join('\n')}
        </tbody>
      </table>
      </div>`;
  };

  const govde = `      <nav class="kirinti" aria-label="Sayfa yolu"><a href="/">Ana Sayfa</a> › <span>Fiyat Listesi</span></nav>
      <h1>Sıfır Araç ve Motosiklet Fiyat Listesi ${yil}</h1>
      <p class="detay-ozet">Türkiye'de satıştaki ${araclar.filter(a => a.tip === 'otomobil').length} sıfır otomobil ve ${araclar.filter(a => a.tip === 'motosiklet').length} sıfır motosikletin güncel liste fiyatları. Son güncelleme: <time datetime="${TARIH}">${tarihYaz(TARIH)}</time>. Fiyatlar liste fiyatıdır; bayi kampanyalarına göre değişebilir.</p>
${tablo('otomobil')}
${tablo('motosiklet')}`;

  return sayfa({
    baslik: `Sıfır Araç Fiyat Listesi ${tarihYaz(TARIH).replace(/^\d+ /, '')} | AraçFırsat`,
    aciklama: `Türkiye'deki ${araclar.length} sıfır otomobil ve motosikletin ${tarihYaz(TARIH)} güncel fiyat listesi. Marka, segment, yakıt ve güce göre tek tabloda.`,
    yol: 'fiyat-listesi.html',
    ogGorsel: 'img/og-image.jpg',
    govde,
    sema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `Sıfır Araç Fiyat Listesi ${yil}`,
        numberOfItems: araclar.length,
        itemListElement: araclar.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE}/${sayfaYolu(a)}`, name: tamAd(a) }))
      },
      breadcrumb([['Ana Sayfa', ''], ['Fiyat Listesi', 'fiyat-listesi.html']])
    ]
  });
}

// ─── ANA SAYFA ENJEKSİYONU ───────────────────────────────
// app.js'teki aracKarti() ile aynı işaretleme; JS yüklenince bu kartların yerine aynısını çizer
function onCizimKarti(a) {
  return `    <div class="car-card" data-id="${a.id}">
      <div class="car-img"><img src="${a.gorsel}" alt="${kacis(tamAd(a))}" width="720" height="480" loading="lazy" decoding="async"></div>
      <div class="car-info">
        <div class="car-brand">${kacis(a.marka)}</div>
        <a class="car-name" href="${sayfaYolu(a)}">${kacis(a.model)}</a>
        <div class="car-specs"><span class="car-spec">${kacis(a.motor)}</span><span class="car-spec">${kacis(a.vites)}</span><span class="car-spec">${a.hp} HP</span><span class="car-spec">${a.yakit}</span></div>
        <div class="car-price">${fiyatFormat(a.fiyat)}</div>
      </div>
    </div>`;
}

function blokDegistir(html, ad, icerik) {
  const re = new RegExp(`(<!-- SEO:${ad}:BASLA -->)[\\s\\S]*?(<!-- SEO:${ad}:BITIS -->)`);
  if (!re.test(html)) throw new Error(`index.html içinde SEO:${ad} işaretleri yok`);
  return html.replace(re, `$1\n${icerik}\n$2`);
}

function anaSayfayiGuncelle() {
  const dosya = path.join(DOCS, 'index.html');
  let html = fs.readFileSync(dosya, 'utf8');
  const otomobiller = araclar.filter(a => a.tip === 'otomobil').sort((x, y) => x.fiyat - y.fiyat);

  html = blokDegistir(html, 'KARTLAR', otomobiller.map(onCizimKarti).join('\n'));
  html = blokDegistir(html, 'ITEMLIST', jsonLd({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Sıfır Araç Fiyat Listesi ${yil}`,
    description: 'Türkiye\'de satışta olan sıfır otomobil ve motosiklet modelleri ve güncel liste fiyatları',
    numberOfItems: araclar.length,
    itemListElement: araclar.map((a, i) => ({ '@type': 'ListItem', position: i + 1, item: aracSchema(a) }))
  }));
  fs.writeFileSync(dosya, html);

  // public/index.html yalnızca HTTPS yönlendirme satırlarıyla ayrışır; aynı blokları oraya da yaz
  const pDosya = path.join(KOK, 'public', 'index.html');
  let pHtml = fs.readFileSync(pDosya, 'utf8');
  for (const ad of ['KARTLAR', 'ITEMLIST']) {
    const m = html.match(new RegExp(`<!-- SEO:${ad}:BASLA -->\\n([\\s\\S]*?)\\n<!-- SEO:${ad}:BITIS -->`));
    pHtml = blokDegistir(pHtml, ad, m[1]);
  }
  fs.writeFileSync(pDosya, pHtml);
}

// ─── SITEMAP & LLMS.TXT ──────────────────────────────────
function sitemap() {
  const url = (yol, oncelik, siklik, tarih = TARIH) =>
    `  <url>\n    <loc>${SITE}/${yol}</loc>\n    <lastmod>${tarih}</lastmod>\n    <changefreq>${siklik}</changefreq>\n    <priority>${oncelik}</priority>\n  </url>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
    url('', '1.0', 'weekly'),
    url('fiyat-listesi.html', '0.9', 'monthly'),
    ...araclar.map(a => url(sayfaYolu(a), '0.8', 'monthly')),
    url('gizlilik-politikasi.html', '0.3', 'yearly', '2026-10-23')
    // fotograf-kaynaklari.html noindex olduğu için sitemap'e girmez
  ].join('\n')}
</urlset>
`;
}

function llmsTxt() {
  const satir = a => `- [${tamAd(a)}](${SITE}/${sayfaYolu(a)}): ${fiyatFormat(a.fiyat)} — ${TIPLER[a.tip].segmentler[a.segment] || a.segment}, ${a.motor}, ${a.hp} ${gucBirimi(a)}, ${a.vites}`;
  const bolum = tip => araclar.filter(a => a.tip === tip).sort((x, y) => x.marka.localeCompare(y.marka, 'tr') || x.fiyat - y.fiyat).map(satir).join('\n');
  return `# AraçFırsat

> Türkiye'deki sıfır otomobil ve motosiklet liste fiyatlarını karşılaştıran ve test sürüşü talebi alan site. Fiyatlar Türk lirası (TRY) cinsinden liste fiyatlarıdır, ayda bir güncellenir. Son güncelleme: ${TARIH}.

Fiyatlar marka liste fiyatlarıdır; bayi kampanyası, kredi ve takas koşullarına göre ödenecek tutar değişebilir. Site Smatch Bilişim Teknolojileri A.Ş.'ye aittir.

## Ana sayfalar

- [Ana sayfa](${SITE}/): araç listesi, filtreler, iki aracı yan yana karşılaştırma ve test sürüşü formu
- [Fiyat listesi](${SITE}/fiyat-listesi.html): tüm aktif modellerin tek tablo halinde fiyatları

## Sıfır otomobil fiyatları (${tarihYaz(TARIH)})

${bolum('otomobil')}

## Sıfır motosiklet fiyatları (${tarihYaz(TARIH)})

${bolum('motosiklet')}

## Optional

- [Gizlilik Politikası ve KVKK](${SITE}/gizlilik-politikasi.html)
- [Fotoğraf kaynakları](${SITE}/fotograf-kaynaklari.html)
`;
}

// ─── ÇALIŞTIR ────────────────────────────────────────────
const fiyatKlasoru = path.join(DOCS, 'fiyat');
fs.rmSync(fiyatKlasoru, { recursive: true, force: true }); // satıştan kalkan araçların sayfaları silinsin
fs.mkdirSync(fiyatKlasoru, { recursive: true });
araclar.forEach(a => fs.writeFileSync(path.join(DOCS, sayfaYolu(a)), aracSayfasi(a)));
fs.writeFileSync(path.join(DOCS, 'fiyat-listesi.html'), listeSayfasi());
anaSayfayiGuncelle();
fs.writeFileSync(path.join(DOCS, 'sitemap.xml'), sitemap());
fs.writeFileSync(path.join(DOCS, 'llms.txt'), llmsTxt());

console.log(`${araclar.length} araç sayfası, fiyat listesi, index.html blokları, sitemap.xml ve llms.txt üretildi (fiyat tarihi ${TARIH}).`);
