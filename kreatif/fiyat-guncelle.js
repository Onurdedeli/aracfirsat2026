// ─── TOPLU FİYAT GÜNCELLEME (statik site) ────────────────
// Araştırılan yeni fiyatları public/app.js'e yazar, docs/app.js'e kopyalar ve
// "Fiyatlar son güncelleme" tarihini ayarlar.
//
//   node kreatif/fiyat-guncelle.js guncellemeler.json [YYYY-MM-DD]
//
// guncellemeler.json: [{ "id": 1, "fiyat": 2600000, "yeni_model": "Corolla 1.5 Vision Plus" }, ...]
//   - fiyat null olanlar atlanır (doğrulanamayan fiyat yazılmaz)
//   - yeni_model verilirse model adı da değişir (versiyon değişimi; Fiyat Radarı bu aracı karşılaştırmaz)
//   - "aktif": 0 verilirse araç gizlenir (satıştan kalkan model)

const fs = require('fs');
const path = require('path');

const KOK = path.join(__dirname, '..');
const KAYNAK = path.join(KOK, 'public', 'app.js');
const KOPYA = path.join(KOK, 'docs', 'app.js');

const [dosya, tarih = new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Istanbul' })] = process.argv.slice(2);
if (!dosya) {
  console.log('Kullanım: node kreatif/fiyat-guncelle.js guncellemeler.json [YYYY-MM-DD]');
  process.exit(1);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(tarih)) throw new Error('Tarih YYYY-MM-DD olmalı: ' + tarih);

let kod = fs.readFileSync(KAYNAK, 'utf8');
const ozet = { fiyat: 0, model: 0, gizlenen: 0, atlanan: [] };

for (const g of JSON.parse(fs.readFileSync(dosya, 'utf8'))) {
  // Her araç tek satırda: { id:12, ... model:"...", ... fiyat:123, ... aktif:1 }
  const satirRe = new RegExp(`^(\\s*\\{ id:${g.id}, .*)$`, 'm');
  const m = kod.match(satirRe);
  if (!m) { ozet.atlanan.push(`${g.id} (app.js'te yok)`); continue; }
  let satir = m[1];

  if (g.fiyat == null) {
    ozet.atlanan.push(`${g.id} (fiyat doğrulanamadı)`);
  } else {
    if (!Number.isInteger(g.fiyat) || g.fiyat <= 0) throw new Error(`id ${g.id}: geçersiz fiyat ${g.fiyat}`);
    if (!satir.includes(`fiyat:${g.fiyat},`)) ozet.fiyat++;
    satir = satir.replace(/fiyat:\d+,/, `fiyat:${g.fiyat},`);
  }
  if (g.yeni_model) {
    const yeni = `model:${JSON.stringify(g.yeni_model)},`;
    if (!satir.includes(yeni)) ozet.model++;
    satir = satir.replace(/model:"(?:[^"\\]|\\.)*",/, yeni);
  }
  if (g.aktif === 0 && satir.includes('aktif:1')) {
    satir = satir.replace('aktif:1', 'aktif:0');
    ozet.gizlenen++;
  }
  kod = kod.replace(m[1], satir);
}

kod = kod.replace(/const FIYAT_GUNCELLEME_TARIHI = '\d{4}-\d{2}-\d{2}';/, `const FIYAT_GUNCELLEME_TARIHI = '${tarih}';`);
fs.writeFileSync(KAYNAK, kod);
fs.copyFileSync(KAYNAK, KOPYA);

console.log(`Fiyatı değişen: ${ozet.fiyat}, model adı değişen: ${ozet.model}, gizlenen: ${ozet.gizlenen}. Tarih: ${tarih}`);
if (ozet.atlanan.length) console.log('Atlanan:', ozet.atlanan.join(', '));
console.log('public/app.js güncellendi ve docs/app.js\'e kopyalandı.');
