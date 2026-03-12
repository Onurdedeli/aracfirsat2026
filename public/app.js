let tumAraclar = [];

// ─── UTM TAKIBI ──────────────────────────────────────────
function getUTM() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || ''
  };
}
const UTM = getUTM();

// ─── YARDIMCILAR ─────────────────────────────────────────
function fiyatFormat(fiyat) {
  return new Intl.NumberFormat('tr-TR').format(fiyat) + ' ₺';
}

async function araclariYukle() {
  const res = await fetch('/api/araclar');
  tumAraclar = await res.json();
  return tumAraclar;
}

async function markalariDoldur() {
  const res = await fetch('/api/markalar');
  const markalar = await res.json();
  ['heroMarka', 'filtreMarka'].forEach(id => {
    const el = document.getElementById(id);
    markalar.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m; opt.textContent = m;
      el.appendChild(opt);
    });
  });
}

// ─── ARAC KARTI ──────────────────────────────────────────
function aracKarti(arac) {
  return `
    <div class="car-card" data-id="${arac.id}">
      <div class="car-img">
        <img src="${arac.gorsel}" alt="${arac.marka} ${arac.model}"
             onerror="this.parentElement.innerHTML='&#128663;'; this.remove();">
      </div>
      <div class="car-info">
        <div class="car-brand">${arac.marka}</div>
        <div class="car-name">${arac.model}</div>
        <div class="car-specs">
          <span class="car-spec">${arac.motor}</span>
          <span class="car-spec">${arac.vites}</span>
          <span class="car-spec">${arac.hp} HP</span>
          <span class="car-spec">${arac.yakit}</span>
        </div>
        <div class="car-price">${fiyatFormat(arac.fiyat)}</div>
        <div class="car-actions">
          <button class="btn-compare" onclick="karsilastirmayaEkle(${arac.id})">Karşılaştır</button>
          <button class="btn-test" onclick="testSurusuGit(${arac.id})">Test Sürüşü</button>
        </div>
      </div>
    </div>
  `;
}

// ─── FILTRELEME ──────────────────────────────────────────
async function filtrele() {
  const marka = document.getElementById('filtreMarka').value;
  const segment = document.getElementById('filtreSegment').value;
  const yakit = document.getElementById('filtreYakit').value;
  const sirala = document.getElementById('filtreSirala').value;

  const params = new URLSearchParams();
  if (marka) params.set('marka', marka);
  if (segment) params.set('segment', segment);
  if (yakit) params.set('yakit', yakit);
  if (sirala) params.set('sirala', sirala);

  const res = await fetch('/api/araclar?' + params);
  const sonuc = await res.json();

  const grid = document.getElementById('aracListesi');
  if (sonuc.length === 0) {
    grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#999;padding:3rem;">Araç bulunamadı.</p>';
  } else {
    grid.innerHTML = sonuc.map(aracKarti).join('');
  }
}

function heroAra() {
  document.getElementById('filtreMarka').value = document.getElementById('heroMarka').value;
  document.getElementById('filtreSegment').value = document.getElementById('heroSegment').value;
  filtrele();
  document.getElementById('araclar').scrollIntoView({ behavior: 'smooth' });
}

// ─── KARSILASTIRMA ───────────────────────────────────────
function karsilastirmaDropdownDoldur() {
  ['compare1', 'compare2'].forEach(id => {
    const el = document.getElementById(id);
    tumAraclar.forEach(a => {
      const opt = document.createElement('option');
      opt.value = a.id;
      opt.textContent = `${a.marka} ${a.model}`;
      el.appendChild(opt);
    });
  });
}

function karsilastir() {
  const id1 = parseInt(document.getElementById('compare1').value);
  const id2 = parseInt(document.getElementById('compare2').value);
  const wrapper = document.getElementById('compareResult');
  const cta = document.getElementById('compareCTA');

  if (!id1 || !id2) { wrapper.innerHTML = ''; cta.style.display = 'none'; return; }

  const a1 = tumAraclar.find(a => a.id === id1);
  const a2 = tumAraclar.find(a => a.id === id2);
  if (!a1 || !a2) return;

  const rows = [
    ['Marka', a1.marka, a2.marka],
    ['Model', a1.model, a2.model],
    ['Segment', a1.segment.toUpperCase(), a2.segment.toUpperCase()],
    ['Motor', a1.motor, a2.motor],
    ['Beygir Gücü', a1.hp + ' HP', a2.hp + ' HP', a1.hp > a2.hp ? 1 : a2.hp > a1.hp ? 2 : 0],
    ['Vites', a1.vites, a2.vites],
    ['Yakıt', a1.yakit, a2.yakit],
    ['Fiyat', fiyatFormat(a1.fiyat), fiyatFormat(a2.fiyat), a1.fiyat < a2.fiyat ? 1 : a2.fiyat < a1.fiyat ? 2 : 0],
  ];

  wrapper.innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>Özellik</th>
          <th><img src="${a1.gorsel}" class="compare-img" onerror="this.style.display='none'"><br>${a1.marka} ${a1.model}</th>
          <th><img src="${a2.gorsel}" class="compare-img" onerror="this.style.display='none'"><br>${a2.marka} ${a2.model}</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>
            <td class="compare-label">${r[0]}</td>
            <td class="${r[3] === 1 ? 'compare-better' : ''}">${r[1]}</td>
            <td class="${r[3] === 2 ? 'compare-better' : ''}">${r[2]}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // CTA goster
  cta.style.display = 'block';
}

// Karsilastirma CTA formu
async function ctaFormGonder(e) {
  e.preventDefault();
  const telefon = document.getElementById('ctaTelefon').value;
  try {
    await fetch('/api/leads/hizli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefon, kaynak: 'karsilastirma-cta', ...UTM })
    });
    document.querySelector('.cta-form').style.display = 'none';
    document.getElementById('ctaBasari').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.cta-form').style.display = 'flex';
      document.getElementById('ctaBasari').style.display = 'none';
      document.getElementById('ctaTelefon').value = '';
    }, 3000);
  } catch {}
  return false;
}

let compareSlot = 1;
function karsilastirmayaEkle(id) {
  document.getElementById('compare' + compareSlot).value = id;
  compareSlot = compareSlot === 1 ? 2 : 1;
  karsilastir();
  document.getElementById('karsilastir').scrollIntoView({ behavior: 'smooth' });
}

// ─── MULTI-STEP FORM ─────────────────────────────────────
let currentStep = 1;

function adimIleri(step) {
  // Validasyon
  if (step === 2) {
    if (!document.getElementById('formArac').value) {
      document.getElementById('formArac').focus();
      return;
    }
  }
  if (step === 3) {
    if (!document.getElementById('sehir').value) {
      document.getElementById('sehir').focus();
      return;
    }
  }

  document.getElementById('step' + currentStep).classList.remove('active');
  document.getElementById('step' + step).classList.add('active');
  currentStep = step;

  // Progress bar
  document.getElementById('stepFill').style.width = (step * 33.33) + '%';
  document.querySelectorAll('.step-label').forEach(l => {
    l.classList.toggle('active', parseInt(l.dataset.step) <= step);
  });
}

function adimGeri(step) {
  document.getElementById('step' + currentStep).classList.remove('active');
  document.getElementById('step' + step).classList.add('active');
  currentStep = step;
  document.getElementById('stepFill').style.width = (step * 33.33) + '%';
  document.querySelectorAll('.step-label').forEach(l => {
    l.classList.toggle('active', parseInt(l.dataset.step) <= step);
  });
}

function testSurusuGit(id) {
  document.getElementById('formArac').value = id;
  // Direkt adım 2'ye atla (araç zaten seçili)
  currentStep = 1;
  adimIleri(2);
  document.getElementById('test-surusu').scrollIntoView({ behavior: 'smooth' });
}

function formAracDoldur() {
  const el = document.getElementById('formArac');
  tumAraclar.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.id;
    opt.textContent = `${a.marka} ${a.model} - ${fiyatFormat(a.fiyat)}`;
    el.appendChild(opt);
  });
}

// Form gonder (API'ye)
async function formGonder(e) {
  e.preventDefault();

  const aracSelect = document.getElementById('formArac');
  const body = {
    ad_soyad: document.getElementById('adSoyad').value,
    telefon: document.getElementById('telefon').value,
    eposta: document.getElementById('eposta').value,
    arac: aracSelect.selectedOptions[0].textContent,
    sehir: document.getElementById('sehir').value,
    not_text: document.getElementById('notText').value,
    tercih_tarih: document.getElementById('tercihTarih').value,
    kaynak: 'form',
    ...UTM
  };

  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (data.success) {
      document.getElementById('leadForm').style.display = 'none';
      document.querySelector('.step-progress').style.display = 'none';
      document.getElementById('formBasari').style.display = 'block';
      setTimeout(() => {
        document.getElementById('leadForm').reset();
        document.getElementById('leadForm').style.display = 'block';
        document.querySelector('.step-progress').style.display = 'block';
        document.getElementById('formBasari').style.display = 'none';
        // Adım 1'e dön
        currentStep = 3;
        adimGeri(1);
      }, 5000);
    }
  } catch (err) {
    alert('Bir hata oluştu. Lütfen tekrar deneyin.');
  }

  return false;
}

// ─── EXIT INTENT POPUP ───────────────────────────────────
let exitShown = false;

function exitPopupGoster() {
  if (exitShown) return;
  if (sessionStorage.getItem('exitShown')) return;
  exitShown = true;
  sessionStorage.setItem('exitShown', 'true');
  document.getElementById('exitPopup').classList.add('active');
}

function exitKapat() {
  document.getElementById('exitPopup').classList.remove('active');
}

async function exitFormGonder(e) {
  e.preventDefault();
  const telefon = document.getElementById('exitTelefon').value;
  try {
    await fetch('/api/leads/hizli', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefon, kaynak: 'exit-intent', ...UTM })
    });
    document.querySelector('.exit-form').style.display = 'none';
    document.getElementById('exitBasari').style.display = 'block';
    setTimeout(() => exitKapat(), 2500);
  } catch {}
  return false;
}

// Mouse exit intent (desktop)
document.addEventListener('mouseout', (e) => {
  if (e.clientY < 5 && e.relatedTarget === null) {
    exitPopupGoster();
  }
});

// Scroll-up exit intent (mobile) - kullanıcı hızla yukarı kaydırır
let lastScrollY = 0;
let scrollUpCount = 0;
window.addEventListener('scroll', () => {
  if (window.scrollY < lastScrollY - 100) {
    scrollUpCount++;
    if (scrollUpCount > 2) exitPopupGoster();
  } else {
    scrollUpCount = 0;
  }
  lastScrollY = window.scrollY;
});

// ─── CLICK-TO-CALL (Mobil göster) ────────────────────────
function mobilKontrol() {
  const btn = document.getElementById('clickToCall');
  if (window.innerWidth <= 768) {
    btn.style.display = 'flex';
  } else {
    btn.style.display = 'none';
  }
}

// ─── TARIH MIN AYARLA ────────────────────────────────────
function tarihMinAyarla() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('tercihTarih').setAttribute('min', today);
}

// ─── SON GÜNCELLEME TARİHİ ────────────────────────────────
async function sonGuncellemeGoster() {
  try {
    const res = await fetch('/api/son-guncelleme');
    const data = await res.json();
    if (data.tarih) {
      const tarih = new Date(data.tarih);
      const formatted = tarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
      const el = document.getElementById('sonGuncelleme');
      if (el) el.textContent = `Fiyatlar son güncelleme: ${formatted}`;
    }
  } catch {}
}

// ─── SAYFA YÜKLENDİĞİNDE ────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await araclariYukle();
  await markalariDoldur();
  karsilastirmaDropdownDoldur();
  formAracDoldur();
  filtrele();
  mobilKontrol();
  tarihMinAyarla();
  sonGuncellemeGoster();
  window.addEventListener('resize', mobilKontrol);
});
