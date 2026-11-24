#!/usr/bin/env node
// Değişen sayfaları IndexNow ile Bing, Yandex vb. arama motorlarına bildirir; sitemap'in taranmasını beklemez.
//
//   node kreatif/indexnow.js [git-ref]   → <git-ref>..HEAD arasında docs/ altında değişen sayfaları gönderir (varsayılan HEAD~1)
//   node kreatif/indexnow.js --hepsi     → sitemap.xml'deki tüm adresleri gönderir (ilk kurulumda bir kez)
//   --kuru                               → hiçbir şey göndermeden listeyi yazdırır
//
// Değişiklik GitHub Pages'te YAYINLANDIKTAN sonra çalıştırın; yoksa arama motoru eski sayfayı tarar.
// Anahtar dosyası docs/<ANAHTAR>.txt olarak canlıda durmalı; script göndermeden önce bunu kontrol eder.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const KOK = path.join(__dirname, '..');
const DOCS = path.join(KOK, 'docs');
const HOST = 'aracfirsat.com';
const SITE = `https://${HOST}`;
const ANAHTAR = '69db4784ba09070e51ade1e87a2fb822';
const UC_NOKTA = 'https://api.indexnow.org/indexnow';

const argumanlar = process.argv.slice(2);
const KURU = argumanlar.includes('--kuru');
const HEPSI = argumanlar.includes('--hepsi');
const REF = argumanlar.find(a => !a.startsWith('--')) || 'HEAD~1';

// docs/ içindeki bir dosya yolunu canlı adrese çevirir; sayfa olmayanlar (js, css, görsel) için null
function adres(dosya) {
  const goreli = path.relative('docs', dosya).split(path.sep).join('/');
  if (goreli === 'index.html') return `${SITE}/`;
  if (goreli.endsWith('.html') || goreli === 'llms.txt') return `${SITE}/${goreli}`;
  return null;
}

function sitemapAdresleri() {
  const xml = fs.readFileSync(path.join(DOCS, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}

function degisenAdresler() {
  // Silinen sayfalar da gönderilir; arama motoru 404 görüp dizinden çıkarır
  const cikti = execFileSync('git', ['diff', '--name-only', `${REF}..HEAD`, '--', 'docs'], { cwd: KOK, encoding: 'utf8' });
  return [...new Set(cikti.split('\n').filter(Boolean).map(adres).filter(Boolean))];
}

async function main() {
  const liste = HEPSI ? sitemapAdresleri() : degisenAdresler();
  if (!liste.length) {
    console.log(`${REF}..HEAD arasında docs/ altında değişen sayfa yok; gönderilecek bir şey yok.`);
    return;
  }
  console.log(`${liste.length} adres:\n` + liste.map(u => '  ' + u).join('\n'));
  if (KURU) return console.log('--kuru: gönderilmedi.');

  const anahtarAdresi = `${SITE}/${ANAHTAR}.txt`;
  const kontrol = await fetch(anahtarAdresi, { cache: 'no-store' });
  if (!kontrol.ok || (await kontrol.text()).trim() !== ANAHTAR) {
    throw new Error(`${anahtarAdresi} canlıda yok ya da içeriği yanlış. Önce push edip GitHub Pages'in yayınlamasını bekleyin.`);
  }

  // IndexNow tek istekte en fazla 10.000 adres kabul eder
  for (let i = 0; i < liste.length; i += 10000) {
    const res = await fetch(UC_NOKTA, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: ANAHTAR, keyLocation: anahtarAdresi, urlList: liste.slice(i, i + 10000) })
    });
    // 200: alındı, 202: alındı ve anahtar doğrulaması sürüyor
    if (res.status !== 200 && res.status !== 202) {
      throw new Error(`IndexNow ${res.status} döndü: ${await res.text()}`);
    }
    console.log(`IndexNow ${res.status}: ${Math.min(liste.length - i, 10000)} adres gönderildi.`);
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });
