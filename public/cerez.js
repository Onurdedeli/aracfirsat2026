// ─── ÇEREZ ONAYI ─────────────────────────────────────────
// Pazarlama ve analitik çerezleri (Meta Pixel, HubSpot izleme) yalnızca "Kabul Et" sonrası yüklenir.
// Meta Pixel yükleyicisi (metaPixelYukle) her sayfanın <head> bölümünde tanımlıdır.
(function () {
  const ANAHTAR = 'cerezOnayi';

  function tercihOku() {
    try { return localStorage.getItem(ANAHTAR); } catch { return null; }
  }

  function tercihYaz(deger) {
    try { localStorage.setItem(ANAHTAR, deger); } catch {}
  }

  function hubspotIzlemeYukle() {
    if (document.getElementById('hs-script-loader')) return;
    const s = document.createElement('script');
    s.id = 'hs-script-loader';
    s.async = true;
    s.defer = true;
    s.src = 'https://js.hs-scripts.com/148267519.js';
    document.body.appendChild(s);
  }

  function izlemeyiBaslat() {
    if (window.metaPixelYukle) window.metaPixelYukle();
    hubspotIzlemeYukle();
  }

  function bannerKapat() {
    const el = document.getElementById('cerezBanner');
    if (el) el.remove();
  }

  function bannerGoster() {
    if (document.getElementById('cerezBanner')) return;
    const el = document.createElement('div');
    el.id = 'cerezBanner';
    el.className = 'cerez-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Çerez tercihleri');
    el.innerHTML = `
      <p>Sitemizde zorunlu çerezlerin yanı sıra, reklamlarımızın performansını ölçmek ve size uygun içerik sunmak için
      pazarlama ve analitik çerezleri (Meta, HubSpot) kullanmak istiyoruz. Bu çerezler yalnızca onayınızla kullanılır.
      <a href="/gizlilik-politikasi.html#cerezler">Ayrıntılı bilgi</a></p>
      <div class="cerez-butonlar">
        <button type="button" data-tercih="red">Reddet</button>
        <button type="button" data-tercih="kabul">Kabul Et</button>
      </div>`;
    el.addEventListener('click', (e) => {
      const tercih = e.target.dataset && e.target.dataset.tercih;
      if (!tercih) return;
      const onceki = tercihOku();
      tercihYaz(tercih);
      bannerKapat();
      if (tercih === 'kabul') izlemeyiBaslat();
      // Daha önce kabul edilip şimdi reddedildiyse yüklü izleme kodlarını kaldırmak için sayfayı yenile
      else if (onceki === 'kabul') location.reload();
    });
    document.body.appendChild(el);
  }

  // Altbilgideki "Çerez Tercihleri" bağlantısı için
  window.cerezTercihleriniAc = bannerGoster;

  document.addEventListener('DOMContentLoaded', () => {
    const tercih = tercihOku();
    if (tercih === 'kabul') hubspotIzlemeYukle();
    else if (tercih !== 'red') bannerGoster();
  });
})();
