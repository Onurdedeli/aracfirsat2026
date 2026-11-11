// ─── FİYAT RADARI ────────────────────────────────────────
// Sitedeki fiyatların aylık kaydını tutar ve son iki kayıttan sosyal medya görseli üretir.
//
//   node kreatif/fiyat-radari.js kaydet [YYYY-MM-DD]   → docs/app.js'teki güncel fiyatları veri/fiyat-gecmisi.json'a ekler
//   node kreatif/fiyat-radari.js uret [--tip otomobil|motosiklet|hepsi] [--adet 5]
//                                                       → son iki kaydı karşılaştırır, kreatif/cikti/ altına PNG yazar
//   node kreatif/fiyat-radari.js uret --ornek           → tasarımı denemek için uydurma fiyatlarla, "ÖRNEK" damgalı görsel
//
// Fiyatları app.js'te güncelledikten SONRA "kaydet" çalıştırın. Model adı (versiyon) değişen araçlar
// karşılaştırmaya alınmaz; eski ve yeni fiyat aynı versiyona ait olmalı.

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const KOK = path.join(__dirname, '..');
const KAYNAK = path.join(KOK, 'docs', 'app.js'); // canlı sitenin (GitHub Pages) verisi
const GECMIS = path.join(KOK, 'veri', 'fiyat-gecmisi.json');
const SABLON = path.join(__dirname, 'fiyat-radari.html');
const CIKTI = path.join(__dirname, 'cikti');
const CHROME = process.env.CHROME_YOLU || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FORMATLAR = { gonderi: [1080, 1350], story: [1080, 1920] };
const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

function argDegeri(ad, varsayilan) {
  const i = process.argv.indexOf('--' + ad);
  return i > -1 ? process.argv[i + 1] : varsayilan;
}

function bugun() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' }); // YYYY-MM-DD
}

function tarihYaz(iso) {
  const [y, a, g] = iso.split('-').map(Number);
  return `${g} ${AYLAR[a - 1]} ${y}`;
}

// app.js'teki ARAC_VERILERI ve MOTOSIKLET_VERILERI dizilerini çalıştırmadan okur
function siteVerisiniOku() {
  const kod = fs.readFileSync(KAYNAK, 'utf8');
  const dizi = ad => {
    const m = kod.match(new RegExp(`const ${ad} = (\\[[\\s\\S]*?\\n\\]);`));
    if (!m) throw new Error(`${ad} dizisi ${KAYNAK} içinde bulunamadı`);
    return vm.runInNewContext(m[1]);
  };
  return [...dizi('ARAC_VERILERI'), ...dizi('MOTOSIKLET_VERILERI')].filter(a => a.aktif);
}

function gecmisiOku() {
  return fs.existsSync(GECMIS) ? JSON.parse(fs.readFileSync(GECMIS, 'utf8')) : [];
}

function kaydet() {
  const tarih = process.argv[3] || bugun();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) throw new Error('Tarih YYYY-MM-DD olmalı: ' + tarih);

  const araclar = {};
  for (const a of siteVerisiniOku()) {
    araclar[a.id] = { tip: a.tip || 'otomobil', marka: a.marka, model: a.model, fiyat: a.fiyat };
  }

  const gecmis = gecmisiOku().filter(k => k.tarih !== tarih);
  const onceki = gecmis.filter(k => k.tarih < tarih).at(-1);
  gecmis.push({ tarih, araclar });
  gecmis.sort((x, y) => x.tarih.localeCompare(y.tarih));
  fs.mkdirSync(path.dirname(GECMIS), { recursive: true });
  fs.writeFileSync(GECMIS, JSON.stringify(gecmis, null, 2) + '\n');

  const degisen = onceki ? karsilastir(onceki, { tarih, araclar }, 'hepsi').length : 0;
  console.log(`${tarih} kaydı yazıldı: ${Object.keys(araclar).length} araç.` +
    (onceki ? ` ${onceki.tarih} kaydına göre fiyatı değişen: ${degisen}.` : ' (ilk kayıt)'));
  if (onceki && degisen === 0) console.log('Uyarı: hiç fiyat değişmemiş. app.js güncellendi mi?');
}

// İki kayıt arasında fiyatı değişen araçları, değişim yüzdesine göre büyükten küçüğe döndürür
function karsilastir(eski, yeni, tip) {
  return Object.entries(yeni.araclar)
    .filter(([id, a]) => {
      const o = eski.araclar[id];
      return o && o.marka === a.marka && o.model === a.model && o.fiyat !== a.fiyat && (tip === 'hepsi' || a.tip === tip);
    })
    .map(([id, a]) => {
      const onceki = eski.araclar[id].fiyat;
      return { marka: a.marka, model: a.model, tip: a.tip, eski: onceki, yeni: a.fiyat, yuzde: Math.round((a.fiyat / onceki - 1) * 1000) / 10 };
    })
    .sort((x, y) => Math.abs(y.yuzde) - Math.abs(x.yuzde));
}

// Tasarımı denemek için: son kayıttaki fiyatları ±%2–9 oynatılmış bir "önceki" kayıt (sabit tohumlu)
function ornekOncekiKayit(son) {
  let tohum = 7;
  const rastgele = () => (tohum = (tohum * 16807) % 2147483647) / 2147483647;
  const araclar = {};
  for (const [id, a] of Object.entries(son.araclar)) {
    const oran = rastgele() < 0.5 ? 1 : 1 + (rastgele() < 0.7 ? -1 : 1) * (0.02 + rastgele() * 0.07);
    araclar[id] = { ...a, fiyat: Math.round(a.fiyat * oran / 100) * 100 };
  }
  return { tarih: 'örnek', araclar };
}

function uret() {
  const tip = argDegeri('tip', 'hepsi');
  const adet = parseInt(argDegeri('adet', '5'));
  const ornek = process.argv.includes('--ornek');
  if (!['otomobil', 'motosiklet', 'hepsi'].includes(tip)) throw new Error('--tip otomobil, motosiklet ya da hepsi olmalı');

  const gecmis = gecmisiOku();
  if (gecmis.length === 0) throw new Error('Kayıt yok. Önce: node kreatif/fiyat-radari.js kaydet');
  const son = gecmis.at(-1);
  const onceki = ornek ? ornekOncekiKayit(son) : gecmis.at(-2);
  if (!onceki) throw new Error(`Karşılaştırma için en az iki kayıt gerekir (şu an yalnızca ${son.tarih} var). Denemek için --ornek ekleyin.`);

  const degisenler = karsilastir(onceki, son, tip);
  if (degisenler.length === 0) {
    console.log(`${onceki.tarih} → ${son.tarih}: ${tip} için fiyatı değişen araç yok, görsel üretilmedi.`);
    return;
  }

  // Artış ve düşüş varsa ikisi de görünsün: en büyük düşüş ilk 5'te yoksa son sıraya alınır
  let secilen = degisenler.slice(0, adet);
  const enBuyukDusus = degisenler.find(d => d.yuzde < 0);
  if (enBuyukDusus && !secilen.includes(enBuyukDusus) && secilen.length === adet) secilen[adet - 1] = enBuyukDusus;

  const kapsam = { otomobil: 'otomobil', motosiklet: 'motosiklet', hepsi: 'model' }[tip];
  const baslik = degisenler.length > secilen.length
    ? `Bu ay fiyatı en çok değişen ${secilen.length}\u00a0${kapsam}`
    : `Bu ay fiyatı değişen ${secilen.length}\u00a0${kapsam}`;

  fs.mkdirSync(CIKTI, { recursive: true });
  const sablon = fs.readFileSync(SABLON, 'utf8');
  const ad = `fiyat-radari-${son.tarih}-${tip}${ornek ? '-ORNEK' : ''}`;

  for (const [format, [en, boy]] of Object.entries(FORMATLAR)) {
    const veri = { format, ornek, ustBaslik: 'FİYAT RADARI', baslik, tarih: tarihYaz(son.tarih), satirlar: secilen };
    const html = sablon.replace('__VERI__', JSON.stringify(veri).replace(/</g, '\\u003c'));
    // Şablon kreatif/ içinde değil, geçici dosya olarak aynı klasörde açılır (font CDN'den yüklenir)
    const gecici = path.join(CIKTI, `.${ad}-${format}.html`);
    fs.writeFileSync(gecici, html);
    const png = path.join(CIKTI, `${ad}-${format}.png`);
    try {
      execFileSync(CHROME, [
        '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
        `--window-size=${en},${boy}`, '--virtual-time-budget=8000', `--screenshot=${png}`, 'file://' + gecici
      ], { stdio: 'ignore' });
    } finally {
      fs.rmSync(gecici, { force: true });
    }
    console.log('Yazıldı:', path.relative(KOK, png));
  }

  console.log(`\n${onceki.tarih} → ${son.tarih} · ${tip} · ${degisenler.length} araçta fiyat değişti, görselde ${secilen.length} tanesi var:`);
  secilen.forEach(s => console.log(`  ${s.marka} ${s.model}: ${s.eski} → ${s.yeni} (${s.yuzde > 0 ? '+' : ''}${s.yuzde}%)`));
}

const komut = process.argv[2];
try {
  if (komut === 'kaydet') kaydet();
  else if (komut === 'uret') uret();
  else console.log('Kullanım: node kreatif/fiyat-radari.js kaydet [YYYY-MM-DD] | uret [--tip otomobil|motosiklet|hepsi] [--adet 5] [--ornek]');
} catch (e) {
  console.error('Hata:', e.message);
  process.exit(1);
}
