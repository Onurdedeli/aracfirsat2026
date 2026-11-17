// ─── GÖMÜLÜ ARAÇ VERİLERİ (GitHub Pages statik mod) ─────
const ARAC_VERILERI = [
  { id:1, marka:"Toyota", model:"Corolla 1.5 Vision Plus", segment:"sedan", yakit:"benzin", motor:"1.5L Benzin", vites:"CVT", hp:125, fiyat:2545500, gorsel:"img/car-1.jpg", aktif:1 },
  { id:2, marka:"Toyota", model:"C-HR 1.8 Hybrid Flame", segment:"crossover", yakit:"hybrid", motor:"1.8L Hybrid", vites:"e-CVT", hp:140, fiyat:2859000, gorsel:"img/car-2.jpg", aktif:1 },
  { id:3, marka:"Honda", model:"Civic 1.5 Turbo Elegance", segment:"sedan", yakit:"benzin", motor:"1.5L Turbo", vites:"CVT", hp:182, fiyat:1520000, gorsel:"img/car-3.jpg", aktif:0 },
  { id:4, marka:"Hyundai", model:"Tucson 1.6 T-GDI Elite", segment:"suv", yakit:"benzin", motor:"1.6L Turbo", vites:"DCT 7", hp:180, fiyat:3520000, gorsel:"img/car-4.jpg", aktif:1 },
  { id:5, marka:"Volkswagen", model:"Golf 1.5 eTSI Style", segment:"hatchback", yakit:"hybrid", motor:"1.5L eTSI Mild Hybrid", vites:"DSG 7", hp:150, fiyat:3591100, gorsel:"img/car-5.jpg", aktif:1 },
  { id:6, marka:"Volkswagen", model:"Tiguan 1.5 eTSI Life", segment:"suv", yakit:"hybrid", motor:"1.5L eTSI Mild Hybrid", vites:"DSG 7", hp:150, fiyat:3600100, gorsel:"img/car-6.jpg", aktif:1 },
  { id:7, marka:"BMW", model:"320i M Sport", segment:"sedan", yakit:"benzin", motor:"1.6L Turbo", vites:"Otomatik 8", hp:170, fiyat:6378000, gorsel:"img/car-7.jpg", aktif:1 },
  { id:8, marka:"Mercedes", model:"A 200 AMG Line", segment:"hatchback", yakit:"benzin", motor:"1.3L Turbo", vites:"DCT 7", hp:163, fiyat:2750000, gorsel:"img/car-8.jpg", aktif:0 },
  { id:9, marka:"Renault", model:"Clio 1.2 TCe Evolution Plus", segment:"hatchback", yakit:"benzin", motor:"TCe Benzin", vites:"EDC", hp:115, fiyat:1830000, gorsel:"img/car-9.jpg", aktif:1 },
  { id:10, marka:"Fiat", model:"Egea Sedan 1.6 Multijet Urban", segment:"sedan", yakit:"dizel", motor:"1.6L Multijet Dizel", vites:"Manuel 6", hp:130, fiyat:1599900, gorsel:"img/car-10.jpg", aktif:1 },
  { id:11, marka:"Togg", model:"T10X V1 RWD Uzun Menzil", segment:"suv", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:218, fiyat:2219668, gorsel:"img/car-11.jpg", aktif:1 },
  { id:12, marka:"Kia", model:"Sportage 1.6 T-GDI GT-Line 4x4", segment:"suv", yakit:"benzin", motor:"1.6L Turbo", vites:"DCT 7", hp:180, fiyat:3500000, gorsel:"img/car-12.jpg", aktif:1 },
  { id:13, marka:"Skoda", model:"Octavia 1.5 TSI mHEV Elite", segment:"sedan", yakit:"hybrid", motor:"1.5L TSI Mild Hybrid", vites:"DSG 7", hp:150, fiyat:2780000, gorsel:"img/car-13.jpg", aktif:1 },
  { id:14, marka:"Peugeot", model:"3008 1.2 Hybrid 145 Allure", segment:"suv", yakit:"hybrid", motor:"1.2L Hybrid", vites:"eDCS6", hp:145, fiyat:2967000, gorsel:"img/car-14.jpg", aktif:1 },
  { id:15, marka:"Hyundai", model:"i20 1.0 T-GDI Elite", segment:"hatchback", yakit:"benzin", motor:"1.0L Turbo", vites:"DCT 7", hp:90, fiyat:2091000, gorsel:"img/car-15.jpg", aktif:1 },
  { id:16, marka:"Dacia", model:"Duster 1.3 TCe Evolution", segment:"suv", yakit:"benzin", motor:"1.3L Turbo", vites:"EDC", hp:145, fiyat:2050000, gorsel:"img/car-16.jpg", aktif:1 },
  { id:17, marka:"Volvo", model:"XC40 B3 Plus", segment:"suv", yakit:"hybrid", motor:"1.5L Mild Hybrid", vites:"Otomatik 7", hp:163, fiyat:2450000, gorsel:"img/car-17.jpg", aktif:0 },
  { id:18, marka:"Audi", model:"A3 Sedan 1.5 TFSI Advanced", segment:"sedan", yakit:"benzin", motor:"1.5L TFSI", vites:"S-Tronic 7", hp:150, fiyat:4297896, gorsel:"img/car-18.jpg", aktif:1 },
  { id:19, marka:"Tesla", model:"Model 3 Long Range", segment:"sedan", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:350, fiyat:2150000, gorsel:"img/car-19.jpg", aktif:0 },
  { id:20, marka:"Tesla", model:"Model Y Performance AWD", segment:"suv", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:462, fiyat:4966500, gorsel:"img/car-20.jpg", aktif:1 },
  { id:21, marka:"Ford", model:"Puma 1.0 EcoBoost mHEV Titanium", segment:"crossover", yakit:"hybrid", motor:"1.0L EcoBoost mHEV", vites:"Otomatik 7", hp:125, fiyat:2171100, gorsel:"img/car-21.jpg", aktif:1 },
  { id:22, marka:"Ford", model:"Kuga 1.5 EcoBoost Titanium", segment:"suv", yakit:"benzin", motor:"1.5L EcoBoost", vites:"Otomatik 8", hp:186, fiyat:2727200, gorsel:"img/car-22.jpg", aktif:1 },
  { id:23, marka:"Opel", model:"Corsa 1.2 Hybrid GS", segment:"hatchback", yakit:"hybrid", motor:"1.2L Hybrid", vites:"e-DCT6", hp:136, fiyat:1955000, gorsel:"img/car-23.jpg", aktif:1 },
  { id:24, marka:"Opel", model:"Grandland 1.2 Hybrid Edition", segment:"suv", yakit:"hybrid", motor:"1.2L Hybrid", vites:"e-DCT6", hp:136, fiyat:2850000, gorsel:"img/car-24.jpg", aktif:1 },
  { id:25, marka:"Nissan", model:"Qashqai 1.3 DIG-T Mild Hybrid Skypack", segment:"suv", yakit:"hybrid", motor:"1.3L Turbo Mild Hybrid", vites:"CVT", hp:158, fiyat:3308200, gorsel:"img/car-25.jpg", aktif:1 },
  { id:26, marka:"Citroen", model:"C3 1.2 PureTech Shine", segment:"hatchback", yakit:"benzin", motor:"1.2L PureTech", vites:"Manuel 5", hp:83, fiyat:820000, gorsel:"img/car-26.jpg", aktif:0 },
  { id:27, marka:"Cupra", model:"Formentor 1.5 eTSI Impulse", segment:"crossover", yakit:"hybrid", motor:"1.5L eTSI Mild Hybrid", vites:"DSG 7", hp:150, fiyat:2860100, gorsel:"img/car-27.jpg", aktif:1 },
  { id:28, marka:"Mazda", model:"CX-30 2.0 Skyactiv-G", segment:"crossover", yakit:"benzin", motor:"2.0L Skyactiv", vites:"Otomatik 6", hp:150, fiyat:1420000, gorsel:"img/car-28.jpg", aktif:0 },
  { id:29, marka:"MG", model:"ZS EV Luxury", segment:"suv", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:177, fiyat:1250000, gorsel:"img/car-29.jpg", aktif:0 },
  { id:30, marka:"BYD", model:"Seal AWD Excellence", segment:"sedan", yakit:"elektrik", motor:"Elektrik", vites:"Otonom", hp:523, fiyat:4077000, gorsel:"img/car-30.jpg", aktif:1 },
  { id:31, marka:"Toyota", model:"Yaris 1.5 Hybrid Flame", segment:"hatchback", yakit:"hybrid", motor:"1.5L Hybrid", vites:"e-CVT", hp:116, fiyat:2546500, gorsel:"img/car-31.jpg", aktif:1 },
  { id:32, marka:"Volkswagen", model:"Polo 1.0 TSI Life", segment:"hatchback", yakit:"benzin", motor:"1.0L TSI", vites:"DSG 7", hp:95, fiyat:1050000, gorsel:"img/car-32.jpg", aktif:0 },
  { id:33, marka:"Volkswagen", model:"T-Roc 1.5 eTSI Style", segment:"crossover", yakit:"hybrid", motor:"1.5L eTSI Mild Hybrid", vites:"DSG 7", hp:150, fiyat:3505100, gorsel:"img/car-33.jpg", aktif:1 },
  { id:34, marka:"Renault", model:"Taliant 1.0 TCe Joy", segment:"sedan", yakit:"benzin", motor:"1.0L Turbo", vites:"Manuel 5", hp:90, fiyat:685000, gorsel:"img/car-34.jpg", aktif:0 },
  { id:35, marka:"Renault", model:"Captur 1.3 Mild Hybrid Techno", segment:"crossover", yakit:"hybrid", motor:"1.3L Mild Hybrid", vites:"EDC", hp:140, fiyat:2325000, gorsel:"img/car-35.jpg", aktif:1 },
  { id:36, marka:"Fiat", model:"Egea Cross 1.6 Multijet Street", segment:"crossover", yakit:"dizel", motor:"1.6L Multijet Dizel", vites:"DCT 6", hp:130, fiyat:1990900, gorsel:"img/car-36.jpg", aktif:1 },
  { id:37, marka:"Dacia", model:"Sandero 1.0 TCe 100 Expression", segment:"hatchback", yakit:"benzin", motor:"1.0L Turbo", vites:"Manuel", hp:100, fiyat:1460000, gorsel:"img/car-37.jpg", aktif:1 },
  { id:38, marka:"Hyundai", model:"Bayon 1.0 T-GDI Elite", segment:"crossover", yakit:"benzin", motor:"1.0L Turbo", vites:"DCT 7", hp:90, fiyat:2212000, gorsel:"img/car-38.jpg", aktif:1 },
  { id:39, marka:"Peugeot", model:"208 1.2 PureTech Allure", segment:"hatchback", yakit:"benzin", motor:"1.2L PureTech", vites:"Otomatik 8", hp:100, fiyat:1020000, gorsel:"img/car-39.jpg", aktif:0 },
  { id:40, marka:"Peugeot", model:"2008 1.2 Hybrid 145 GT", segment:"crossover", yakit:"hybrid", motor:"1.2L Hybrid", vites:"eDCS6", hp:145, fiyat:2632000, gorsel:"img/car-40.jpg", aktif:1 },
  { id:41, marka:"Seat", model:"Leon 1.5 eTSI Style", segment:"hatchback", yakit:"hybrid", motor:"1.5L eTSI Mild Hybrid", vites:"DSG 7", hp:116, fiyat:2560100, gorsel:"img/car-41.jpg", aktif:1 },
  { id:42, marka:"Seat", model:"Arona 1.0 TSI Style Plus", segment:"crossover", yakit:"benzin", motor:"1.0L TSI", vites:"DSG 7", hp:116, fiyat:2050100, gorsel:"img/car-42.jpg", aktif:1 },
  { id:43, marka:"Toyota", model:"Corolla Cross 1.8 Hybrid Flame", segment:"suv", yakit:"hybrid", motor:"1.8L Hybrid", vites:"e-CVT", hp:140, fiyat:3413000, gorsel:"img/car-43.jpg", aktif:1 },
  { id:44, marka:"Skoda", model:"Kamiq 1.0 TSI Elite", segment:"crossover", yakit:"benzin", motor:"1.0L TSI", vites:"DSG 7", hp:115, fiyat:2150000, gorsel:"img/car-44.jpg", aktif:1 },
  { id:45, marka:"Kia", model:"Ceed 1.5 T-GDI GT-Line", segment:"hatchback", yakit:"benzin", motor:"1.5L Turbo", vites:"DCT 7", hp:160, fiyat:1290000, gorsel:"img/car-45.jpg", aktif:0 },
  { id:46, marka:"Honda", model:"HR-V 1.5 e:HEV Advance", segment:"suv", yakit:"hybrid", motor:"1.5L Hybrid", vites:"e-CVT", hp:131, fiyat:2965000, gorsel:"img/car-46.jpg", aktif:1 },
  { id:47, marka:"BMW", model:"X1 sDrive18i M Sport", segment:"suv", yakit:"benzin", motor:"1.5L Turbo", vites:"Otomatik 7", hp:136, fiyat:2850000, gorsel:"img/car-47.jpg", aktif:0 },
  { id:48, marka:"Mercedes", model:"GLA 200 AMG Line", segment:"suv", yakit:"benzin", motor:"1.3L Turbo", vites:"DCT 7", hp:163, fiyat:2950000, gorsel:"img/car-48.jpg", aktif:0 },
  { id:49, marka:"Chery", model:"Tiggo 7 1.6 TGDI Comfort", segment:"suv", yakit:"benzin", motor:"1.6L Turbo", vites:"DCT 7", hp:145, fiyat:2180000, gorsel:"img/car-49.jpg", aktif:1 },
  { id:50, marka:"Suzuki", model:"Vitara 1.4 Boosterjet GLX Black Edition", segment:"suv", yakit:"hybrid", motor:"1.4L Mild Hybrid", vites:"Otomatik 6", hp:129, fiyat:2665000, gorsel:"img/car-50.jpg", aktif:1 },
  { id:51, marka:"Volkswagen", model:"Passat 1.5 eTSI Elegance", segment:"sedan", yakit:"hybrid", motor:"1.5L eTSI Mild Hybrid", vites:"DSG 7", hp:150, fiyat:5053100, gorsel:"img/car-51.jpg", aktif:1 },
  { id:52, marka:"Citroen", model:"ë-C3 Elektrik 113 Max", segment:"hatchback", yakit:"elektrik", motor:"Elektrik", vites:"Otomatik", hp:113, fiyat:1725000, gorsel:"img/car-52.jpg", aktif:1 },
  { id:53, marka:"Citroen", model:"C3 Aircross 1.2 Hybrid 145 Max", segment:"suv", yakit:"hybrid", motor:"1.2L Hybrid", vites:"eDCS6", hp:145, fiyat:2320000, gorsel:"img/car-53.jpg", aktif:1 },
  { id:54, marka:"Citroen", model:"C4 X 1.2 Hybrid 145 Max", segment:"sedan", yakit:"hybrid", motor:"1.2L Hybrid", vites:"eDCS6", hp:145, fiyat:2345000, gorsel:"img/car-54.jpg", aktif:1 },
  { id:55, marka:"Citroen", model:"C5 Aircross 1.2 Hybrid 145 Plus", segment:"suv", yakit:"hybrid", motor:"1.2L Hybrid", vites:"eDCS6", hp:145, fiyat:2865000, gorsel:"img/car-55.jpg", aktif:1 },
  { id:56, marka:"Peugeot", model:"E-208 Elektrik 136 GT", segment:"hatchback", yakit:"elektrik", motor:"Elektrik", vites:"Otomatik", hp:136, fiyat:2080000, gorsel:"img/car-56.jpg", aktif:1 },
  { id:57, marka:"Peugeot", model:"408 1.2 Hybrid 145 Allure", segment:"crossover", yakit:"hybrid", motor:"1.2L Hybrid", vites:"eDCS6", hp:145, fiyat:2685000, gorsel:"img/car-57.jpg", aktif:1 },
  { id:58, marka:"Peugeot", model:"5008 1.2 Hybrid 145 Allure", segment:"suv", yakit:"hybrid", motor:"1.2L Hybrid", vites:"eDCS6", hp:145, fiyat:3426000, gorsel:"img/car-58.jpg", aktif:1 },
  { id:59, marka:"Opel", model:"Astra 1.5 Dizel 130 Edition", segment:"hatchback", yakit:"dizel", motor:"1.5L Dizel", vites:"Otomatik 8", hp:130, fiyat:2330000, gorsel:"img/car-59.jpg", aktif:1 },
  { id:60, marka:"Opel", model:"Mokka 1.2 Hybrid GS", segment:"crossover", yakit:"hybrid", motor:"1.2L Hybrid", vites:"e-DCT6", hp:136, fiyat:2350000, gorsel:"img/car-60.jpg", aktif:1 },
  { id:61, marka:"Opel", model:"Frontera 1.2 Hybrid Edition", segment:"suv", yakit:"hybrid", motor:"1.2L Hybrid", vites:"e-DCT6", hp:136, fiyat:2190000, gorsel:"img/car-61.jpg", aktif:1 },
  { id:62, marka:"Nissan", model:"Juke 1.0 DIG-T Platinum", segment:"crossover", yakit:"benzin", motor:"1.0L Turbo", vites:"DCT 7", hp:115, fiyat:2628500, gorsel:"img/car-62.jpg", aktif:1 },
  { id:63, marka:"Nissan", model:"Qashqai e-POWER Skypack", segment:"suv", yakit:"hybrid", motor:"1.5L e-POWER Hybrid", vites:"Otomatik", hp:190, fiyat:3993600, gorsel:"img/car-63.jpg", aktif:1 },
  { id:64, marka:"Nissan", model:"X-Trail 1.5 VC-T Mild Hybrid Platinum", segment:"suv", yakit:"hybrid", motor:"1.5L VC-T Mild Hybrid", vites:"CVT", hp:163, fiyat:5098300, gorsel:"img/car-64.jpg", aktif:1 }
];

// ─── GÖMÜLÜ MOTOSİKLET VERİLERİ (GitHub Pages statik mod) ─
// id'ler 101'den başlar, otomobil id'leriyle çakışmaz
const MOTOSIKLET_VERILERI = [
  { id:101, tip:"motosiklet", marka:"Honda", model:"PCX125", segment:"scooter", yakit:"benzin", motor:"125 cc", vites:"CVT", hp:13, fiyat:207000, gorsel:"img/moto-1.jpg", aktif:1 },
  { id:102, tip:"motosiklet", marka:"Yamaha", model:"NMAX 125", segment:"scooter", yakit:"benzin", motor:"125 cc", vites:"CVT", hp:12, fiyat:307000, gorsel:"img/moto-2.jpg", aktif:1 },
  { id:103, tip:"motosiklet", marka:"Honda", model:"Forza 250", segment:"scooter", yakit:"benzin", motor:"249 cc", vites:"CVT", hp:23, fiyat:385750, gorsel:"img/moto-3.jpg", aktif:1 },
  { id:104, tip:"motosiklet", marka:"Yamaha", model:"XMAX 250", segment:"scooter", yakit:"benzin", motor:"250 cc", vites:"CVT", hp:23, fiyat:401000, gorsel:"img/moto-4.jpg", aktif:1 },
  { id:105, tip:"motosiklet", marka:"Yamaha", model:"NEO's Çift Bataryalı", segment:"scooter", yakit:"elektrik", motor:"Elektrik", vites:"Otomatik", hp:3, fiyat:149500, gorsel:"img/moto-5.jpg", aktif:1 },
  { id:106, tip:"motosiklet", marka:"Bajaj", model:"Pulsar NS 200 UG2", segment:"naked", yakit:"benzin", motor:"199 cc", vites:"Manuel 6", hp:25, fiyat:231700, gorsel:"img/moto-6.jpg", aktif:1 },
  { id:107, tip:"motosiklet", marka:"KTM", model:"390 Duke", segment:"naked", yakit:"benzin", motor:"399 cc", vites:"Manuel 6", hp:45, fiyat:587000, gorsel:"img/moto-7.jpg", aktif:1 },
  { id:108, tip:"motosiklet", marka:"Yamaha", model:"MT-07", segment:"naked", yakit:"benzin", motor:"689 cc", vites:"Manuel 6", hp:73, fiyat:812500, gorsel:"img/moto-8.jpg", aktif:1 },
  { id:109, tip:"motosiklet", marka:"Honda", model:"CB650R", segment:"naked", yakit:"benzin", motor:"649 cc", vites:"Manuel 6", hp:95, fiyat:869250, gorsel:"img/moto-9.jpg", aktif:1 },
  { id:110, tip:"motosiklet", marka:"Honda", model:"NX500", segment:"adventure", yakit:"benzin", motor:"471 cc", vites:"Manuel 6", hp:48, fiyat:620000, gorsel:"img/moto-10.jpg", aktif:1 },
  { id:111, tip:"motosiklet", marka:"Yamaha", model:"Ténéré 700", segment:"adventure", yakit:"benzin", motor:"689 cc", vites:"Manuel 6", hp:73, fiyat:966500, gorsel:"img/moto-11.jpg", aktif:1 },
  { id:112, tip:"motosiklet", marka:"Honda", model:"CRF1100L Africa Twin ES-DCT", segment:"adventure", yakit:"benzin", motor:"1084 cc", vites:"DCT", hp:102, fiyat:1405000, gorsel:"img/moto-12.jpg", aktif:1 },
  { id:113, tip:"motosiklet", marka:"BMW", model:"R 1300 GS", segment:"adventure", yakit:"benzin", motor:"1300 cc Boxer", vites:"Manuel 6", hp:145, fiyat:2049823, gorsel:"img/moto-13.jpg", aktif:1 },
  { id:114, tip:"motosiklet", marka:"Yamaha", model:"YZF-R3", segment:"sport", yakit:"benzin", motor:"321 cc", vites:"Manuel 6", hp:42, fiyat:641500, gorsel:"img/moto-14.jpg", aktif:1 },
  { id:115, tip:"motosiklet", marka:"CFMoto", model:"675 SR-R", segment:"sport", yakit:"benzin", motor:"674 cc", vites:"Manuel 6", hp:95, fiyat:611800, gorsel:"img/moto-15.jpg", aktif:1 },
  { id:116, tip:"motosiklet", marka:"Honda", model:"CBR650R", segment:"sport", yakit:"benzin", motor:"649 cc", vites:"Manuel 6", hp:95, fiyat:885750, gorsel:"img/moto-16.jpg", aktif:1 },
  { id:117, tip:"motosiklet", marka:"Honda", model:"GL1800 Gold Wing", segment:"touring", yakit:"benzin", motor:"1833 cc Boxer", vites:"DCT", hp:126, fiyat:2857500, gorsel:"img/moto-17.jpg", aktif:1 }
];

let tumAraclar = [];

// ─── ARAÇ TİPLERİ ────────────────────────────────────────
const TIPLER = {
  otomobil: {
    etiket: 'Otomobil', baslik: 'Sıfır Otomobiller', ikon: '&#128663;',
    segmentler: { sedan: 'Sedan', suv: 'SUV', hatchback: 'Hatchback', crossover: 'Crossover' }
  },
  motosiklet: {
    etiket: 'Motosiklet', baslik: 'Sıfır Motosikletler', ikon: '&#127949;',
    segmentler: { scooter: 'Scooter', naked: 'Naked', adventure: 'Adventure', sport: 'Sport', touring: 'Touring', cruiser: 'Cruiser' }
  }
};
const YAKIT_ETIKETLERI = { benzin: 'Benzin', dizel: 'Dizel', hybrid: 'Hybrid', elektrik: 'Elektrik' };

// ?tip=motosiklet ile gelen ziyaretçi (ör. reklam linki) doğrudan motosiklet sekmesini görür
let aktifTip = new URLSearchParams(window.location.search).get('tip') === 'motosiklet' ? 'motosiklet' : 'otomobil';

function aracTipi(arac) {
  return arac.tip || 'otomobil';
}

// ─── STATİK MOD ALGILAMA ─────────────────────────────────
// GitHub Pages veya statik hosting'de API mevcut değil
const STATIK_MOD = !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1');

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

// Statik moddaki araç fiyatlarının en son güncellendiği tarih — fiyatları güncelleyince bunu da değiştirin
const FIYAT_GUNCELLEME_TARIHI = '2026-11-17';

// ─── YARDIMCILAR ─────────────────────────────────────────
function fiyatFormat(fiyat) {
  return new Intl.NumberFormat('tr-TR').format(fiyat) + ' ₺';
}

async function araclariYukle() {
  if (!STATIK_MOD) {
    try {
      const res = await fetch('/api/araclar');
      if (res.ok) { tumAraclar = await res.json(); return tumAraclar; }
    } catch {}
  }
  // Satıştan kalkan / güncel fiyatı doğrulanamayan araçlar aktif:0 ile gizlenir
  tumAraclar = [...ARAC_VERILERI, ...MOTOSIKLET_VERILERI].filter(a => a.aktif);
  return tumAraclar;
}

// Select'i ilk (boş) seçeneği koruyarak verilen [değer, etiket] çiftleriyle doldurur
function secenekleriYaz(id, secenekler) {
  const el = document.getElementById(id);
  el.length = 1;
  secenekler.forEach(([deger, etiket]) => el.add(new Option(etiket, deger)));
}

// Marka, segment ve yakıt filtrelerini aktif tipte bulunan araçlara göre doldurur
function filtreSecenekleriniDoldur() {
  const araclar = tumAraclar.filter(a => aracTipi(a) === aktifTip);
  const markalar = [...new Set(araclar.map(a => a.marka))].sort((a, b) => a.localeCompare(b, 'tr'));
  const segmentler = Object.entries(TIPLER[aktifTip].segmentler).filter(([s]) => araclar.some(a => a.segment === s));
  const yakitlar = Object.entries(YAKIT_ETIKETLERI).filter(([y]) => araclar.some(a => a.yakit === y));

  ['heroMarka', 'filtreMarka'].forEach(id => secenekleriYaz(id, markalar.map(m => [m, m])));
  ['heroSegment', 'filtreSegment'].forEach(id => secenekleriYaz(id, segmentler));
  secenekleriYaz('filtreYakit', yakitlar);
}

function tipSec(tip) {
  if (!TIPLER[tip]) return;
  aktifTip = tip;
  document.querySelectorAll('.tip-sekme').forEach(b => {
    const aktif = b.dataset.tip === tip;
    b.classList.toggle('active', aktif);
    b.setAttribute('aria-selected', aktif);
  });
  document.getElementById('listeBaslik').textContent = TIPLER[tip].baslik;
  filtreSecenekleriniDoldur();
  filtrele();

  // Paylaşılan link aynı sekmeyi açsın; UTM vb. diğer parametreler korunur
  const params = new URLSearchParams(window.location.search);
  if (tip === 'otomobil') params.delete('tip'); else params.set('tip', tip);
  const sorgu = params.toString();
  history.replaceState(null, '', window.location.pathname + (sorgu ? '?' + sorgu : '') + window.location.hash);
}

// ─── ARAC KARTI ──────────────────────────────────────────
function aracKarti(arac) {
  return `
    <div class="car-card" data-id="${arac.id}">
      <div class="car-img">
        <img src="${arac.gorsel}" alt="${arac.marka} ${arac.model}"
             onerror="this.parentElement.innerHTML='${TIPLER[aracTipi(arac)].ikon}'; this.remove();">
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

  let sonuc;
  if (!STATIK_MOD) {
    try {
      const params = new URLSearchParams({ tip: aktifTip });
      if (marka) params.set('marka', marka);
      if (segment) params.set('segment', segment);
      if (yakit) params.set('yakit', yakit);
      if (sirala) params.set('sirala', sirala);
      const res = await fetch('/api/araclar?' + params);
      if (res.ok) { sonuc = await res.json(); }
    } catch {}
  }

  if (!sonuc) {
    // Lokal filtreleme (GitHub Pages)
    sonuc = tumAraclar.filter(a => {
      if (aracTipi(a) !== aktifTip) return false;
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
    grid.innerHTML = `<p style="text-align:center;grid-column:1/-1;color:#999;padding:3rem;">${TIPLER[aktifTip].etiket} bulunamadı.</p>`;
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

// Araç seçimi dropdown'larını Otomobil / Motosiklet gruplarıyla doldurur
function aracSecenekleriEkle(el, metin) {
  Object.entries(TIPLER).forEach(([tip, t]) => {
    const araclar = tumAraclar.filter(a => aracTipi(a) === tip);
    if (araclar.length === 0) return;
    const grup = document.createElement('optgroup');
    grup.label = t.etiket;
    araclar.forEach(a => grup.appendChild(new Option(metin(a), a.id)));
    el.appendChild(grup);
  });
}

// ─── KARSILASTIRMA ───────────────────────────────────────
function karsilastirmaDropdownDoldur() {
  ['compare1', 'compare2'].forEach(id => {
    aracSecenekleriEkle(document.getElementById(id), a => `${a.marka} ${a.model}`);
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
    ['Tip', TIPLER[aracTipi(a1)].etiket, TIPLER[aracTipi(a2)].etiket],
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
  const telefon = telefonDogrula(document.getElementById('ctaTelefon'));
  if (!telefon) return false;

  const basarili = await gonderimKilidi(e, () => leadIlet({
    apiYolu: '/api/leads/hizli',
    apiBody: { telefon, kaynak: 'karsilastirma-cta', ...UTM },
    hubspot: { phone: telefon, kaynak: 'karsilastirma-cta' }
  }));
  if (!basarili) return false;
  metaLeadGonder('karsilastirma-cta');

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
  aracSecenekleriEkle(document.getElementById('formArac'), a => `${a.marka} ${a.model} - ${fiyatFormat(a.fiyat)}`);
}

// Form gonder
async function formGonder(e) {
  e.preventDefault();

  const telefon = telefonDogrula(document.getElementById('telefon'));
  if (!telefon) return false;

  const aracSelect = document.getElementById('formArac');
  const secilenArac = tumAraclar.find(a => a.id === parseInt(aracSelect.value));
  const body = {
    ad_soyad: document.getElementById('adSoyad').value,
    telefon,
    eposta: document.getElementById('eposta').value,
    arac: aracSelect.selectedOptions[0].textContent,
    sehir: document.getElementById('sehir').value,
    not_text: document.getElementById('notText').value,
    tercih_tarih: document.getElementById('tercihTarih').value,
    kaynak: 'form',
    ...UTM
  };

  const basarili = await gonderimKilidi(e, () => leadIlet({
    apiYolu: '/api/leads',
    apiBody: body,
    hubspot: {
      email: body.eposta,
      phone: body.telefon,
      firstname: body.ad_soyad,
      kaynak: 'test-surusu-formu',
      arac_tipi: secilenArac && TIPLER[aracTipi(secilenArac)].etiket,
      arac: body.arac,
      sehir: body.sehir,
      tercih_tarih: body.tercih_tarih,
      not_text: body.not_text,
      ticari_izin: document.getElementById('ticariIzin').checked
    }
  }));
  if (!basarili) return false;
  metaLeadGonder('test-surusu-formu');

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
  const telefon = telefonDogrula(document.getElementById('exitTelefon'));
  if (!telefon) return false;

  const basarili = await gonderimKilidi(e, () => leadIlet({
    apiYolu: '/api/leads/hizli',
    apiBody: { telefon, kaynak: 'exit-intent', ...UTM },
    hubspot: { phone: telefon, kaynak: 'exit-intent' }
  }));
  if (!basarili) return false;
  metaLeadGonder('exit-intent');

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
  if (!STATIK_MOD) {
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
  }
  const el = document.getElementById('sonGuncelleme');
  if (el) el.textContent = `Fiyatlar son güncelleme: ${new Date(FIYAT_GUNCELLEME_TARIHI).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}`;
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
const HUBSPOT_PORTAL_ID = '148267519';
const HUBSPOT_FORM_ID = '6682f757-8340-4c04-a898-a7c480a431b6';

// Meta Pixel Lead olayı (lead kampanyaları optimizasyonu için)
function metaLeadGonder(kaynak) {
  if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: kaynak });
}

// Türkiye cep telefonu: 05XX XXX XX XX, 5XX..., +90 5XX... kabul edilir; +905XXXXXXXXX döner
function telefonDogrula(input) {
  const rakam = input.value.replace(/\D/g, '').replace(/^(90|0)/, '');
  const gecerli = /^5\d{9}$/.test(rakam);
  input.setCustomValidity(gecerli ? '' : 'Lütfen geçerli bir cep telefonu girin (05XX XXX XX XX).');
  if (!gecerli) {
    input.reportValidity();
    return null;
  }
  return '+90' + rakam;
}

// Gönderim sürerken butonu kilitler, çift gönderimi engeller
async function gonderimKilidi(e, islem) {
  const buton = e.submitter || e.target.querySelector('[type=submit]');
  if (buton) buton.disabled = true;
  try {
    const basarili = await islem();
    if (!basarili) alert('Talebiniz iletilemedi. Lütfen birazdan tekrar deneyin.');
    return basarili;
  } finally {
    if (buton) buton.disabled = false;
  }
}

// ─── SUPABASE (statik sitenin lead kaydı) ────────────────
// Tablo ve izinler: supabase/leads.sql. Anon anahtar yalnızca INSERT yapabilir, tarayıcıda durması güvenlidir.
// Boş bırakılırsa Supabase atlanır.
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

async function supabaseLeadKaydet(data) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  const bos = v => (v === undefined || v === '' ? null : v);
  const satir = {
    kaynak: data.kaynak,
    telefon: data.phone,
    ad_soyad: bos(data.firstname),
    eposta: bos(data.email),
    arac: bos(data.arac),
    arac_tipi: bos(data.arac_tipi),
    sehir: bos(data.sehir),
    tercih_tarih: bos(data.tercih_tarih),
    not_text: bos(data.not_text),
    ticari_izin: data.ticari_izin ?? null,
    kvkk_onay: true,
    utm_source: bos(UTM.utm_source),
    utm_medium: bos(UTM.utm_medium),
    utm_campaign: bos(UTM.utm_campaign),
    sayfa: window.location.href.slice(0, 500)
  };
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY, // yeni sb_publishable_ anahtarlar JWT değildir; Authorization başlığı gönderilmez
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(satir)
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Lead'i API'ye (sunucu modunda), Supabase'e ve HubSpot'a iletir; en az biri başarılıysa true
async function leadIlet({ apiYolu, apiBody, hubspot }) {
  let apiBasarili = false;
  if (!STATIK_MOD) {
    try {
      const res = await fetch(apiYolu, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiBody)
      });
      apiBasarili = res.ok;
    } catch {}
  }
  // HubSpot formu e-postayı zorunlu tutuyor; e-postasız (telefon-only) leadler yalnızca Supabase'e yazılır
  const [supabaseBasarili, hubspotBasarili] = await Promise.all([
    supabaseLeadKaydet(hubspot),
    hubspot.email ? hubspotLeadGonder(hubspot) : false
  ]);
  return apiBasarili || supabaseBasarili || hubspotBasarili;
}

async function hubspotLeadGonder(data) {
  const temel = [];
  if (data.email) temel.push({ name: 'email', value: data.email });
  if (data.phone) temel.push({ name: 'phone', value: data.phone });
  if (data.firstname) temel.push({ name: 'firstname', value: data.firstname });

  // Araç, şehir, kaynak ve UTM bilgisi satış ekibi için not alanına yazılır
  const params = new URLSearchParams(window.location.search);
  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .filter(k => params.get(k)).map(k => `${k}=${params.get(k)}`).join(', ');
  const not = [
    `Kaynak: ${data.kaynak}`,
    data.arac_tipi && `Araç tipi: ${data.arac_tipi}`,
    data.arac && `Araç: ${data.arac}`,
    data.sehir && `Şehir: ${data.sehir}`,
    data.tercih_tarih && `Tercih edilen tarih: ${data.tercih_tarih}`,
    data.not_text && `Not: ${data.not_text}`,
    `UTM: ${utm || '-'}`,
    `KVKK aydınlatma/yurt dışı aktarım onayı: evet (${new Date().toLocaleString('tr-TR')})`,
    data.ticari_izin !== undefined && `Ticari ileti izni: ${data.ticari_izin ? 'evet' : 'hayır'}`
  ].filter(Boolean).join('\n');

  const ek = [{ name: 'message', value: not }];
  if (data.sehir) ek.push({ name: 'city', value: data.sehir });

  const gonder = async (fields) => {
    try {
      const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields, context: { pageUri: window.location.href, pageName: document.title } })
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  // HubSpot ek alanları reddederse lead'i kaybetmemek için temel alanlarla tekrar dene
  return (await gonder([...temel, ...ek])) || (await gonder(temel));
}

// ─── SAYFA YÜKLENDİĞİNDE ────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await araclariYukle();
  karsilastirmaDropdownDoldur();
  formAracDoldur();
  tipSec(aktifTip);
  mobilKontrol();
  tarihMinAyarla();
  sonGuncellemeGoster();
  document.querySelectorAll('input[type=tel]').forEach(i => i.addEventListener('input', () => i.setCustomValidity('')));
  window.addEventListener('resize', mobilKontrol);

  // GSAP başlat
  if (typeof gsap !== 'undefined') {
    gsapInit();
    kartHoverInit();
  }
});
