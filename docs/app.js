// ─── GÖMÜLÜ ARAÇ VERİLERİ (GitHub Pages statik mod) ─────
const ARAC_VERILERI = [
  { id:1, marka:"Toyota", model:"Corolla 1.5 Vision", segment:"sedan", yakit:"benzin", motor:"1.5L Benzin", vites:"CVT", hp:125, fiyat:1285000, gorsel:"img/car-1.jpg", aktif:1 },
  { id:2, marka:"Toyota", model:"C-HR 1.8 Hybrid", segment:"crossover", yakit:"hybrid", motor:"1.8L Hybrid", vites:"e-CVT", hp:140, fiyat:1695000, gorsel:"img/car-2.jpg", aktif:1 },
  { id:3, marka:"Honda", model:"Civic 1.5 Turbo Elegance", segment:"sedan", yakit:"benzin", motor:"1.5L Turbo", vites:"CVT", hp:182, fiyat:1520000, gorsel:"img/car-3.jpg", aktif:1 },
  { id:4, marka:"Hyundai", model:"Tucson 1.6 T-GDI Elite", segment:"suv", yakit:"benzin", motor:"1.6L Turbo", vites:"DCT 7", hp:180, fiyat:1750000, gorsel:"img/car-4.jpg", aktif:1 },
  { id:5, marka:"Volkswagen", model:"Golf 1.5 TSI Style", segment:"hatchback", yakit:"benzin", motor:"1.5L TSI", vites:"DSG 7", hp:150, fiyat:1450000, gorsel:"img/car-5.jpg", aktif:1 },
  { id:6, marka:"Volkswagen", model:"Tiguan 1.5 TSI Life", segment:"suv", yakit:"benzin", motor:"1.5L TSI", vites:"DSG 7", hp:150, fiyat:2100000, gorsel:"img/car-6.jpg", aktif:1 },
  { id:7, marka:"BMW", model:"320i M Sport", segment:"sedan", yakit:"benzin", motor:"2.0L Turbo", vites:"Otomatik 8", hp:184, fiyat:3250000, gorsel:"img/car-7.jpg", aktif:1 },
  { id:8, marka:"Mercedes", model:"A 200 AMG Line", segment:"hatchback", yakit:"benzin", motor:"1.3L Turbo", vites:"DCT 7", hp:163, fiyat:2750000, gorsel:"img/car-8.jpg", aktif:1 },
  { id:9, marka:"Renault", model:"Clio 1.0 TCe Touch", segment:"hatchback", yakit:"benzin", motor:"1.0L Turbo", vites:"Manuel 5", hp:100, fiyat:875000, gorsel:"img/car-9.jpg", aktif:1 },
  { id:10, marka:"Fiat", model:"Egea 1.4 Urban Plus", segment:"sedan", yakit:"benzin", motor:"1.4L", vites:"Manuel 5", hp:95, fiyat:785000, gorsel:"img/car-10.jpg", aktif:1 },
  { id:11, marka:"Togg", model:"T10X Uzun Menzil", segment:"suv", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:400, fiyat:1550000, gorsel:"img/car-11.jpg", aktif:1 },
  { id:12, marka:"Kia", model:"Sportage 1.6 T-GDI GT-Line", segment:"suv", yakit:"hybrid", motor:"1.6L Turbo Hybrid", vites:"Otomatik 6", hp:230, fiyat:1890000, gorsel:"img/car-12.jpg", aktif:1 },
  { id:13, marka:"Skoda", model:"Octavia 1.5 TSI Style", segment:"sedan", yakit:"benzin", motor:"1.5L TSI", vites:"DSG 7", hp:150, fiyat:1380000, gorsel:"img/car-13.jpg", aktif:1 },
  { id:14, marka:"Peugeot", model:"3008 1.2 Allure", segment:"suv", yakit:"benzin", motor:"1.2L Turbo", vites:"Otomatik 8", hp:130, fiyat:1650000, gorsel:"img/car-14.jpg", aktif:1 },
  { id:15, marka:"Hyundai", model:"i20 1.4 MPI Elite", segment:"hatchback", yakit:"benzin", motor:"1.4L", vites:"Otomatik 6", hp:100, fiyat:945000, gorsel:"img/car-15.jpg", aktif:1 },
  { id:16, marka:"Dacia", model:"Duster 1.3 TCe Journey", segment:"suv", yakit:"benzin", motor:"1.3L Turbo", vites:"CVT", hp:150, fiyat:1150000, gorsel:"img/car-16.jpg", aktif:1 },
  { id:17, marka:"Volvo", model:"XC40 B3 Plus", segment:"suv", yakit:"hybrid", motor:"1.5L Mild Hybrid", vites:"Otomatik 7", hp:163, fiyat:2450000, gorsel:"img/car-17.jpg", aktif:1 },
  { id:18, marka:"Audi", model:"A3 Sedan 35 TFSI", segment:"sedan", yakit:"benzin", motor:"1.5L TFSI", vites:"S-Tronic 7", hp:150, fiyat:2380000, gorsel:"img/car-18.jpg", aktif:1 },
  { id:19, marka:"Tesla", model:"Model 3 Long Range", segment:"sedan", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:350, fiyat:2150000, gorsel:"img/car-19.jpg", aktif:1 },
  { id:20, marka:"Tesla", model:"Model Y Performance", segment:"suv", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:462, fiyat:2650000, gorsel:"img/car-20.jpg", aktif:1 },
  { id:21, marka:"Ford", model:"Puma 1.0 EcoBoost ST-Line", segment:"crossover", yakit:"hybrid", motor:"1.0L EcoBoost mHEV", vites:"Otomatik 7", hp:125, fiyat:1320000, gorsel:"img/car-21.jpg", aktif:1 },
  { id:22, marka:"Ford", model:"Kuga 1.5 EcoBoost Titanium", segment:"suv", yakit:"benzin", motor:"1.5L EcoBoost", vites:"Otomatik 8", hp:150, fiyat:1780000, gorsel:"img/car-22.jpg", aktif:1 },
  { id:23, marka:"Opel", model:"Corsa 1.2 Turbo GS Line", segment:"hatchback", yakit:"benzin", motor:"1.2L Turbo", vites:"Otomatik 8", hp:130, fiyat:985000, gorsel:"img/car-23.jpg", aktif:1 },
  { id:24, marka:"Opel", model:"Grandland 1.2 Turbo Elegance", segment:"suv", yakit:"benzin", motor:"1.2L Turbo", vites:"Otomatik 8", hp:130, fiyat:1580000, gorsel:"img/car-24.jpg", aktif:1 },
  { id:25, marka:"Nissan", model:"Qashqai 1.3 DIG-T N-Connecta", segment:"suv", yakit:"benzin", motor:"1.3L Turbo", vites:"CVT", hp:158, fiyat:1650000, gorsel:"img/car-25.jpg", aktif:1 },
  { id:26, marka:"Citroen", model:"C3 1.2 PureTech Shine", segment:"hatchback", yakit:"benzin", motor:"1.2L PureTech", vites:"Manuel 5", hp:83, fiyat:820000, gorsel:"img/car-26.jpg", aktif:1 },
  { id:27, marka:"Cupra", model:"Formentor 1.5 TSI V", segment:"crossover", yakit:"benzin", motor:"1.5L TSI", vites:"DSG 7", hp:150, fiyat:1750000, gorsel:"img/car-27.jpg", aktif:1 },
  { id:28, marka:"Mazda", model:"CX-30 2.0 Skyactiv-G", segment:"crossover", yakit:"benzin", motor:"2.0L Skyactiv", vites:"Otomatik 6", hp:150, fiyat:1420000, gorsel:"img/car-28.jpg", aktif:1 },
  { id:29, marka:"MG", model:"ZS EV Luxury", segment:"suv", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:177, fiyat:1250000, gorsel:"img/car-29.jpg", aktif:1 },
  { id:30, marka:"BYD", model:"Seal Design", segment:"sedan", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:313, fiyat:1950000, gorsel:"img/car-30.jpg", aktif:1 },
  { id:31, marka:"Toyota", model:"Yaris 1.5 Hybrid Fun", segment:"hatchback", yakit:"hybrid", motor:"1.5L Hybrid", vites:"e-CVT", hp:116, fiyat:1085000, gorsel:"img/car-31.jpg", aktif:1 },
  { id:32, marka:"Volkswagen", model:"Polo 1.0 TSI Life", segment:"hatchback", yakit:"benzin", motor:"1.0L TSI", vites:"DSG 7", hp:95, fiyat:1050000, gorsel:"img/car-32.jpg", aktif:1 },
  { id:33, marka:"Volkswagen", model:"T-Roc 1.5 TSI Style", segment:"crossover", yakit:"benzin", motor:"1.5L TSI", vites:"DSG 7", hp:150, fiyat:1680000, gorsel:"img/car-33.jpg", aktif:1 },
  { id:34, marka:"Renault", model:"Taliant 1.0 TCe Joy", segment:"sedan", yakit:"benzin", motor:"1.0L Turbo", vites:"Manuel 5", hp:90, fiyat:685000, gorsel:"img/car-34.jpg", aktif:1 },
  { id:35, marka:"Renault", model:"Captur 1.3 TCe Iconic", segment:"crossover", yakit:"benzin", motor:"1.3L Turbo", vites:"EDC 7", hp:130, fiyat:1280000, gorsel:"img/car-35.jpg", aktif:1 },
  { id:36, marka:"Fiat", model:"Egea Cross 1.4 Fire", segment:"crossover", yakit:"benzin", motor:"1.4L", vites:"Manuel 5", hp:95, fiyat:920000, gorsel:"img/car-36.jpg", aktif:1 },
  { id:37, marka:"Dacia", model:"Sandero 1.0 TCe Comfort", segment:"hatchback", yakit:"benzin", motor:"1.0L Turbo", vites:"CVT", hp:90, fiyat:720000, gorsel:"img/car-37.jpg", aktif:1 },
  { id:38, marka:"Hyundai", model:"Bayon 1.0 T-GDI Elite", segment:"crossover", yakit:"benzin", motor:"1.0L Turbo", vites:"DCT 7", hp:100, fiyat:1050000, gorsel:"img/car-38.jpg", aktif:1 },
  { id:39, marka:"Peugeot", model:"208 1.2 PureTech Allure", segment:"hatchback", yakit:"benzin", motor:"1.2L PureTech", vites:"Otomatik 8", hp:100, fiyat:1020000, gorsel:"img/car-39.jpg", aktif:1 },
  { id:40, marka:"Peugeot", model:"2008 1.2 PureTech GT", segment:"crossover", yakit:"benzin", motor:"1.2L PureTech", vites:"Otomatik 8", hp:130, fiyat:1380000, gorsel:"img/car-40.jpg", aktif:1 },
  { id:41, marka:"Seat", model:"Leon 1.5 TSI FR", segment:"hatchback", yakit:"benzin", motor:"1.5L TSI", vites:"DSG 7", hp:150, fiyat:1350000, gorsel:"img/car-41.jpg", aktif:1 },
  { id:42, marka:"Seat", model:"Arona 1.0 TSI Xperience", segment:"crossover", yakit:"benzin", motor:"1.0L TSI", vites:"DSG 7", hp:110, fiyat:1180000, gorsel:"img/car-42.jpg", aktif:1 },
  { id:43, marka:"Toyota", model:"Corolla Cross 1.8 Hybrid", segment:"suv", yakit:"hybrid", motor:"1.8L Hybrid", vites:"e-CVT", hp:140, fiyat:1550000, gorsel:"img/car-43.jpg", aktif:1 },
  { id:44, marka:"Skoda", model:"Kamiq 1.0 TSI Style", segment:"crossover", yakit:"benzin", motor:"1.0L TSI", vites:"DSG 7", hp:110, fiyat:1180000, gorsel:"img/car-44.jpg", aktif:1 },
  { id:45, marka:"Kia", model:"Ceed 1.5 T-GDI GT-Line", segment:"hatchback", yakit:"benzin", motor:"1.5L Turbo", vites:"DCT 7", hp:160, fiyat:1290000, gorsel:"img/car-45.jpg", aktif:1 },
  { id:46, marka:"Honda", model:"HR-V 1.5 e:HEV Advance", segment:"suv", yakit:"hybrid", motor:"1.5L Hybrid", vites:"e-CVT", hp:131, fiyat:1480000, gorsel:"img/car-46.jpg", aktif:1 },
  { id:47, marka:"BMW", model:"X1 sDrive18i M Sport", segment:"suv", yakit:"benzin", motor:"1.5L Turbo", vites:"Otomatik 7", hp:136, fiyat:2850000, gorsel:"img/car-47.jpg", aktif:1 },
  { id:48, marka:"Mercedes", model:"GLA 200 AMG Line", segment:"suv", yakit:"benzin", motor:"1.3L Turbo", vites:"DCT 7", hp:163, fiyat:2950000, gorsel:"img/car-48.jpg", aktif:1 },
  { id:49, marka:"Chery", model:"Tiggo 7 Pro 1.5 Turbo", segment:"suv", yakit:"benzin", motor:"1.5L Turbo", vites:"CVT", hp:147, fiyat:1280000, gorsel:"img/car-49.jpg", aktif:1 },
  { id:50, marka:"Suzuki", model:"Vitara 1.4 Boosterjet GLX", segment:"suv", yakit:"hybrid", motor:"1.4L Mild Hybrid", vites:"Otomatik 6", hp:129, fiyat:1350000, gorsel:"img/car-50.jpg", aktif:1 },
  { id:51, marka:"Volkswagen", model:"Passat 1.5 TSI Elegance", segment:"sedan", yakit:"benzin", motor:"1.5L TSI", vites:"DSG 7", hp:150, fiyat:2050000, gorsel:"img/car-51.jpg", aktif:1 }
];

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
  try {
    const res = await fetch('/api/araclar');
    if (res.ok) { tumAraclar = await res.json(); return tumAraclar; }
  } catch {}
  // Fallback: gömülü veri (GitHub Pages)
  tumAraclar = ARAC_VERILERI;
  return tumAraclar;
}

async function markalariDoldur() {
  let markalar;
  try {
    const res = await fetch('/api/markalar');
    if (res.ok) { markalar = await res.json(); }
  } catch {}
  if (!markalar) {
    markalar = [...new Set(ARAC_VERILERI.map(a => a.marka))].sort();
  }
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

  // Önce API'den dene, yoksa lokal filtrele
  let sonuc;
  try {
    const params = new URLSearchParams();
    if (marka) params.set('marka', marka);
    if (segment) params.set('segment', segment);
    if (yakit) params.set('yakit', yakit);
    if (sirala) params.set('sirala', sirala);
    const res = await fetch('/api/araclar?' + params);
    if (res.ok) { sonuc = await res.json(); }
  } catch {}

  if (!sonuc) {
    // Lokal filtreleme (GitHub Pages)
    sonuc = tumAraclar.filter(a => {
      if (marka && a.marka !== marka) return false;
      if (segment && a.segment !== segment) return false;
      if (yakit && a.yakit !== yakit) return false;
      return true;
    });
    if (sirala === 'fiyat-artan') sonuc.sort((a, b) => a.fiyat - b.fiyat);
    else if (sirala === 'fiyat-azalan') sonuc.sort((a, b) => b.fiyat - a.fiyat);
    else if (sirala === 'isim') sonuc.sort((a, b) => a.model.localeCompare(b.model));
    else sonuc.sort((a, b) => a.fiyat - b.fiyat);
  }

  const grid = document.getElementById('aracListesi');
  if (sonuc.length === 0) {
    grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#999;padding:3rem;">Araç bulunamadı.</p>';
  } else {
    grid.innerHTML = sonuc.map(aracKarti).join('');
    kartAnimasyonu();
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

  cta.style.display = 'block';
  tabloAnimasyonu();
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
  } catch {}

  // HubSpot'a lead gönder
  hubspotLeadGonder({ phone: telefon, kaynak: 'karsilastirma-cta' });

  document.querySelector('.cta-form').style.display = 'none';
  document.getElementById('ctaBasari').style.display = 'block';
  setTimeout(() => {
    document.querySelector('.cta-form').style.display = 'flex';
    document.getElementById('ctaBasari').style.display = 'none';
    document.getElementById('ctaTelefon').value = '';
  }, 3000);
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

  const prev = currentStep;
  currentStep = step;
  document.querySelectorAll('.step-label').forEach(l => {
    l.classList.toggle('active', parseInt(l.dataset.step) <= step);
  });

  if (typeof gsap !== 'undefined') {
    formAdimAnimasyonu(prev, step, true);
  } else {
    document.getElementById('step' + prev).classList.remove('active');
    document.getElementById('step' + step).classList.add('active');
    document.getElementById('stepFill').style.width = (step * 33.33) + '%';
  }
}

function adimGeri(step) {
  const prev = currentStep;
  currentStep = step;
  document.querySelectorAll('.step-label').forEach(l => {
    l.classList.toggle('active', parseInt(l.dataset.step) <= step);
  });

  if (typeof gsap !== 'undefined') {
    formAdimAnimasyonu(prev, step, false);
  } else {
    document.getElementById('step' + prev).classList.remove('active');
    document.getElementById('step' + step).classList.add('active');
    document.getElementById('stepFill').style.width = (step * 33.33) + '%';
  }
}

function testSurusuGit(id) {
  document.getElementById('formArac').value = id;
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

// Form gonder
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
    if (!data.success) throw new Error();
  } catch {
    // GitHub Pages'da API yok, yine de başarı göster
  }

  // HubSpot'a lead gönder
  hubspotLeadGonder({
    email: body.eposta,
    phone: body.telefon,
    firstname: body.ad_soyad,
    kaynak: 'test-surusu-formu',
    arac: body.arac,
    sehir: body.sehir
  });

  document.getElementById('leadForm').style.display = 'none';
  document.querySelector('.step-progress').style.display = 'none';
  basariAnimasyonu('formBasari');
  setTimeout(() => {
    document.getElementById('leadForm').reset();
    document.getElementById('leadForm').style.display = 'block';
    document.querySelector('.step-progress').style.display = 'block';
    document.getElementById('formBasari').style.display = 'none';
    currentStep = 3;
    adimGeri(1);
  }, 5000);

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
  exitPopupAnimasyonAc();
}

function exitKapat() {
  if (typeof gsap !== 'undefined') {
    exitPopupAnimasyonKapat(() => {
      document.getElementById('exitPopup').classList.remove('active');
      // Reset opacity for potential re-show
      gsap.set('#exitPopup', { opacity: 1 });
      gsap.set('.exit-modal', { opacity: 1, y: 0 });
    });
  } else {
    document.getElementById('exitPopup').classList.remove('active');
  }
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
  } catch {}

  // HubSpot'a lead gönder
  hubspotLeadGonder({ phone: telefon, kaynak: 'exit-intent' });

  document.querySelector('.exit-form').style.display = 'none';
  document.getElementById('exitBasari').style.display = 'block';
  setTimeout(() => exitKapat(), 2500);
  return false;
}

// Mouse exit intent (desktop)
document.addEventListener('mouseout', (e) => {
  if (e.clientY < 5 && e.relatedTarget === null) {
    exitPopupGoster();
  }
});

// Scroll-up exit intent (mobile)
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
    if (res.ok) {
      const data = await res.json();
      if (data.tarih) {
        const tarih = new Date(data.tarih);
        const formatted = tarih.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
        const el = document.getElementById('sonGuncelleme');
        if (el) el.textContent = `Fiyatlar son güncelleme: ${formatted}`;
        return;
      }
    }
  } catch {}
  // Fallback
  const el = document.getElementById('sonGuncelleme');
  if (el) el.textContent = `Fiyatlar son güncelleme: ${new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

// ─── GSAP ANIMASYONLARI ──────────────────────────────────
function gsapInit() {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero açılış animasyonu
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .to('.hero h1', { opacity: 1, y: 0, duration: 0.8 }, 0)
    .fromTo('.hero h1', { y: -30 }, { y: 0 }, 0)
    .to('.hero p', { opacity: 1, y: 0, duration: 0.7 }, 0.2)
    .fromTo('.hero p', { y: 20 }, { y: 0 }, 0.2)
    .to('.hero-search', { opacity: 1, y: 0, duration: 0.7 }, 0.4)
    .fromTo('.hero-search', { y: 30 }, { y: 0 }, 0.4);

  // 8. Scroll-triggered section başlıkları
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.to(title, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: title, start: 'top 85%', once: true }
    });
    gsap.set(title, { y: 20 });
  });
  gsap.utils.toArray('.section-desc').forEach(desc => {
    gsap.to(desc, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: desc, start: 'top 85%', once: true }
    });
    gsap.set(desc, { y: 15 });
  });

  // 9. Navbar scroll efekti
  ScrollTrigger.create({
    start: 'top -80',
    onEnter: () => gsap.to('.navbar', { boxShadow: '0 4px 20px rgba(0,0,0,0.3)', duration: 0.3 }),
    onLeaveBack: () => gsap.to('.navbar', { boxShadow: 'none', duration: 0.3 })
  });

  // 10. Click-to-call GSAP pulse
  function clickToCallPulse() {
    const btn = document.getElementById('clickToCall');
    if (btn && btn.style.display === 'flex') {
      gsap.to(btn, {
        scale: 1.1,
        boxShadow: '0 4px 28px rgba(39,174,96,0.7)',
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  }
  setInterval(clickToCallPulse, 3000);
}

// Kart giriş animasyonu (filtreleme sonrası da çağrılır)
function kartAnimasyonu() {
  if (typeof gsap === 'undefined') return;
  const kartlar = document.querySelectorAll('.car-card');
  if (kartlar.length === 0) return;

  gsap.fromTo(kartlar,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
  );
}

// 3. Kart hover animasyonları
function kartHoverInit() {
  if (typeof gsap === 'undefined') return;
  document.getElementById('aracListesi').addEventListener('mouseenter', (e) => {
    const card = e.target.closest('.car-card');
    if (!card) return;
    gsap.to(card, { y: -8, boxShadow: '0 12px 32px rgba(0,0,0,0.15)', duration: 0.3, ease: 'power2.out' });
    const img = card.querySelector('.car-img img');
    if (img) gsap.to(img, { scale: 1.05, duration: 0.4, ease: 'power2.out' });
    const price = card.querySelector('.car-price');
    if (price) gsap.to(price, { scale: 1.05, duration: 0.2 });
  }, true);

  document.getElementById('aracListesi').addEventListener('mouseleave', (e) => {
    const card = e.target.closest('.car-card');
    if (!card) return;
    gsap.to(card, { y: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', duration: 0.3, ease: 'power2.out' });
    const img = card.querySelector('.car-img img');
    if (img) gsap.to(img, { scale: 1, duration: 0.3 });
    const price = card.querySelector('.car-price');
    if (price) gsap.to(price, { scale: 1, duration: 0.2 });
  }, true);
}

// 4. Karşılaştırma tablosu satır animasyonu
function tabloAnimasyonu() {
  if (typeof gsap === 'undefined') return;
  const rows = document.querySelectorAll('.compare-table tbody tr');
  if (rows.length === 0) return;

  gsap.fromTo(rows,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
  );

  // Kazanan hücre vurgusu
  setTimeout(() => {
    document.querySelectorAll('.compare-better').forEach(cell => {
      gsap.fromTo(cell, { scale: 1 }, { scale: 1.08, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.inOut' });
    });
  }, rows.length * 80 + 200);
}

// 5. Form adım geçiş animasyonu
function formAdimAnimasyonu(cikanStep, girenStep, ileri) {
  if (typeof gsap === 'undefined') return;
  const cikan = document.getElementById('step' + cikanStep);
  const giren = document.getElementById('step' + girenStep);
  const yonX = ileri ? -30 : 30;

  gsap.to(cikan, {
    opacity: 0, x: yonX, duration: 0.25, ease: 'power2.in',
    onComplete: () => {
      cikan.classList.remove('active');
      giren.classList.add('active');
      gsap.fromTo(giren,
        { opacity: 0, x: -yonX },
        { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  });

  // Progress bar
  gsap.to('#stepFill', { width: (girenStep * 33.33) + '%', duration: 0.4, ease: 'power2.inOut' });
}

// 6. Başarı mesajı bounce animasyonu
function basariAnimasyonu(elementId) {
  if (typeof gsap === 'undefined') return;
  const el = document.getElementById(elementId);
  if (!el) return;

  el.style.display = 'block';
  gsap.fromTo(el,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
  );

  const icon = el.querySelector('.success-icon');
  if (icon) {
    gsap.fromTo(icon, { rotation: 0, scale: 0 }, { rotation: 360, scale: 1, duration: 0.6, ease: 'back.out(2)' });
  }
}

// 7. Exit popup animasyonu
function exitPopupAnimasyonAc() {
  if (typeof gsap === 'undefined') return;
  const overlay = document.getElementById('exitPopup');
  const modal = overlay.querySelector('.exit-modal');
  const children = modal.querySelectorAll('.exit-icon, .exit-content h3, .exit-content > p, .exit-form, .exit-note');

  gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  gsap.fromTo(modal,
    { y: -40, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)', delay: 0.1 }
  );
  gsap.fromTo(children,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
  );
}

function exitPopupAnimasyonKapat(callback) {
  if (typeof gsap === 'undefined') { if (callback) callback(); return; }
  const overlay = document.getElementById('exitPopup');
  const modal = overlay.querySelector('.exit-modal');

  gsap.to(modal, { y: -30, opacity: 0, duration: 0.25, ease: 'power2.in' });
  gsap.to(overlay, {
    opacity: 0, duration: 0.3, delay: 0.1,
    onComplete: () => { if (callback) callback(); }
  });
}

// ─── HUBSPOT ENTEGRASYONU ────────────────────────────────
function hubspotLeadGonder(data) {
  var _hsq = window._hsq = window._hsq || [];
  // Identify contact
  _hsq.push(['identify', {
    email: data.email || '',
    phone: data.phone || '',
    firstname: data.firstname || '',
    company: data.company || '',
    hs_lead_status: 'NEW'
  }]);
  // Track event
  _hsq.push(['trackCustomBehavioralEvent', {
    name: 'pe148267297_aracfirsat_lead',
    properties: {
      kaynak: data.kaynak || '',
      arac: data.arac || '',
      sehir: data.sehir || '',
      telefon: data.phone || ''
    }
  }]);
  // Track pageview to flush identify
  _hsq.push(['trackPageView']);
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

  // GSAP başlat
  if (typeof gsap !== 'undefined') {
    gsapInit();
    kartHoverInit();
  }
});
