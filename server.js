const express = require('express');
const Database = require('better-sqlite3');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ─── VERİTABANI ─────────────────────────────────────────
const db = new Database(path.join(__dirname, 'aracfirsat.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ad_soyad TEXT NOT NULL,
    telefon TEXT NOT NULL,
    eposta TEXT,
    arac TEXT NOT NULL,
    sehir TEXT NOT NULL,
    not_text TEXT,
    tercih_tarih TEXT,
    durum TEXT DEFAULT 'yeni',
    puan INTEGER DEFAULT 0,
    kaynak TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS araclar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    marka TEXT NOT NULL,
    model TEXT NOT NULL,
    segment TEXT NOT NULL,
    yakit TEXT NOT NULL,
    motor TEXT NOT NULL,
    vites TEXT NOT NULL,
    hp INTEGER NOT NULL,
    fiyat INTEGER NOT NULL,
    gorsel TEXT,
    aktif INTEGER DEFAULT 1,
    son_guncelleme TEXT
  );

  CREATE TABLE IF NOT EXISTS fiyat_gecmisi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    arac_id INTEGER NOT NULL,
    eski_fiyat INTEGER NOT NULL,
    yeni_fiyat INTEGER NOT NULL,
    degisim_yuzde REAL,
    guncelleme_tipi TEXT DEFAULT 'manuel',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (arac_id) REFERENCES araclar(id)
  );
`);

// Yeni kolonları ekle (mevcut DB için)
try { db.exec('ALTER TABLE leads ADD COLUMN puan INTEGER DEFAULT 0'); } catch {}
try { db.exec('ALTER TABLE leads ADD COLUMN kaynak TEXT'); } catch {}
try { db.exec('ALTER TABLE leads ADD COLUMN utm_source TEXT'); } catch {}
try { db.exec('ALTER TABLE leads ADD COLUMN utm_medium TEXT'); } catch {}
try { db.exec('ALTER TABLE leads ADD COLUMN utm_campaign TEXT'); } catch {}
try { db.exec('ALTER TABLE leads ADD COLUMN tercih_tarih TEXT'); } catch {}
try { db.exec("ALTER TABLE araclar ADD COLUMN son_guncelleme TEXT"); } catch {}
try { db.exec("UPDATE araclar SET son_guncelleme = datetime('now') WHERE son_guncelleme IS NULL"); } catch {}

// Araçları seed et (tablo boşsa)
const aracSayisi = db.prepare('SELECT COUNT(*) as c FROM araclar').get().c;
if (aracSayisi === 0) {
  const araclarSeed = [
    { marka: "Toyota", model: "Corolla 1.5 Vision", segment: "sedan", yakit: "benzin", motor: "1.5L Benzin", vites: "CVT", hp: 125, fiyat: 1285000, gorsel: "/img/car-1.jpg" },
    { marka: "Toyota", model: "C-HR 1.8 Hybrid", segment: "crossover", yakit: "hybrid", motor: "1.8L Hybrid", vites: "e-CVT", hp: 140, fiyat: 1695000, gorsel: "/img/car-2.jpg" },
    { marka: "Honda", model: "Civic 1.5 Turbo Elegance", segment: "sedan", yakit: "benzin", motor: "1.5L Turbo", vites: "CVT", hp: 182, fiyat: 1520000, gorsel: "/img/car-3.jpg" },
    { marka: "Hyundai", model: "Tucson 1.6 T-GDI Elite", segment: "suv", yakit: "benzin", motor: "1.6L Turbo", vites: "DCT 7", hp: 180, fiyat: 1750000, gorsel: "/img/car-4.jpg" },
    { marka: "Volkswagen", model: "Golf 1.5 TSI Style", segment: "hatchback", yakit: "benzin", motor: "1.5L TSI", vites: "DSG 7", hp: 150, fiyat: 1450000, gorsel: "/img/car-5.jpg" },
    { marka: "Volkswagen", model: "Tiguan 1.5 TSI Life", segment: "suv", yakit: "benzin", motor: "1.5L TSI", vites: "DSG 7", hp: 150, fiyat: 2100000, gorsel: "/img/car-6.jpg" },
    { marka: "BMW", model: "320i M Sport", segment: "sedan", yakit: "benzin", motor: "2.0L Turbo", vites: "Otomatik 8", hp: 184, fiyat: 3250000, gorsel: "/img/car-7.jpg" },
    { marka: "Mercedes", model: "A 200 AMG Line", segment: "hatchback", yakit: "benzin", motor: "1.3L Turbo", vites: "DCT 7", hp: 163, fiyat: 2750000, gorsel: "/img/car-8.jpg" },
    { marka: "Renault", model: "Clio 1.0 TCe Touch", segment: "hatchback", yakit: "benzin", motor: "1.0L Turbo", vites: "Manuel 5", hp: 100, fiyat: 875000, gorsel: "/img/car-9.jpg" },
    { marka: "Fiat", model: "Egea 1.4 Urban Plus", segment: "sedan", yakit: "benzin", motor: "1.4L", vites: "Manuel 5", hp: 95, fiyat: 785000, gorsel: "/img/car-10.jpg" },
    { marka: "Togg", model: "T10X Uzun Menzil", segment: "suv", yakit: "elektrik", motor: "Elektrik", vites: "Otonom", hp: 400, fiyat: 1550000, gorsel: "/img/car-11.jpg" },
    { marka: "Kia", model: "Sportage 1.6 T-GDI GT-Line", segment: "suv", yakit: "hybrid", motor: "1.6L Turbo Hybrid", vites: "Otomatik 6", hp: 230, fiyat: 1890000, gorsel: "/img/car-12.jpg" },
    { marka: "Skoda", model: "Octavia 1.5 TSI Style", segment: "sedan", yakit: "benzin", motor: "1.5L TSI", vites: "DSG 7", hp: 150, fiyat: 1380000, gorsel: "/img/car-13.jpg" },
    { marka: "Peugeot", model: "3008 1.2 Allure", segment: "suv", yakit: "benzin", motor: "1.2L Turbo", vites: "Otomatik 8", hp: 130, fiyat: 1650000, gorsel: "/img/car-14.jpg" },
    { marka: "Hyundai", model: "i20 1.4 MPI Elite", segment: "hatchback", yakit: "benzin", motor: "1.4L", vites: "Otomatik 6", hp: 100, fiyat: 945000, gorsel: "/img/car-15.jpg" },
    { marka: "Dacia", model: "Duster 1.3 TCe Journey", segment: "suv", yakit: "benzin", motor: "1.3L Turbo", vites: "CVT", hp: 150, fiyat: 1150000, gorsel: "/img/car-16.jpg" },
    { marka: "Volvo", model: "XC40 B3 Plus", segment: "suv", yakit: "hybrid", motor: "1.5L Mild Hybrid", vites: "Otomatik 7", hp: 163, fiyat: 2450000, gorsel: "/img/car-17.jpg" },
    { marka: "Audi", model: "A3 Sedan 35 TFSI", segment: "sedan", yakit: "benzin", motor: "1.5L TFSI", vites: "S-Tronic 7", hp: 150, fiyat: 2380000, gorsel: "/img/car-18.jpg" },
    { marka: "Tesla", model: "Model 3 Long Range", segment: "sedan", yakit: "elektrik", motor: "Elektrik", vites: "Otonom", hp: 350, fiyat: 2150000, gorsel: "/img/car-19.jpg" },
    { marka: "Tesla", model: "Model Y Performance", segment: "suv", yakit: "elektrik", motor: "Elektrik", vites: "Otonom", hp: 462, fiyat: 2650000, gorsel: "/img/car-20.jpg" },
    { marka: "Ford", model: "Puma 1.0 EcoBoost ST-Line", segment: "crossover", yakit: "hybrid", motor: "1.0L EcoBoost mHEV", vites: "Otomatik 7", hp: 125, fiyat: 1320000, gorsel: "/img/car-21.jpg" },
    { marka: "Ford", model: "Kuga 1.5 EcoBoost Titanium", segment: "suv", yakit: "benzin", motor: "1.5L EcoBoost", vites: "Otomatik 8", hp: 150, fiyat: 1780000, gorsel: "/img/car-22.jpg" },
    { marka: "Opel", model: "Corsa 1.2 Turbo GS Line", segment: "hatchback", yakit: "benzin", motor: "1.2L Turbo", vites: "Otomatik 8", hp: 130, fiyat: 985000, gorsel: "/img/car-23.jpg" },
    { marka: "Opel", model: "Grandland 1.2 Turbo Elegance", segment: "suv", yakit: "benzin", motor: "1.2L Turbo", vites: "Otomatik 8", hp: 130, fiyat: 1580000, gorsel: "/img/car-24.jpg" },
    { marka: "Nissan", model: "Qashqai 1.3 DIG-T N-Connecta", segment: "suv", yakit: "benzin", motor: "1.3L Turbo", vites: "CVT", hp: 158, fiyat: 1650000, gorsel: "/img/car-25.jpg" },
    { marka: "Citroen", model: "C3 1.2 PureTech Shine", segment: "hatchback", yakit: "benzin", motor: "1.2L PureTech", vites: "Manuel 5", hp: 83, fiyat: 820000, gorsel: "/img/car-26.jpg" },
    { marka: "Cupra", model: "Formentor 1.5 TSI V", segment: "crossover", yakit: "benzin", motor: "1.5L TSI", vites: "DSG 7", hp: 150, fiyat: 1750000, gorsel: "/img/car-27.jpg" },
    { marka: "Mazda", model: "CX-30 2.0 Skyactiv-G", segment: "crossover", yakit: "benzin", motor: "2.0L Skyactiv", vites: "Otomatik 6", hp: 150, fiyat: 1420000, gorsel: "/img/car-28.jpg" },
    { marka: "MG", model: "ZS EV Luxury", segment: "suv", yakit: "elektrik", motor: "Elektrik", vites: "Otonom", hp: 177, fiyat: 1250000, gorsel: "/img/car-29.jpg" },
    { marka: "BYD", model: "Seal Design", segment: "sedan", yakit: "elektrik", motor: "Elektrik", vites: "Otonom", hp: 313, fiyat: 1950000, gorsel: "/img/car-30.jpg" },
    { marka: "Toyota", model: "Yaris 1.5 Hybrid Fun", segment: "hatchback", yakit: "hybrid", motor: "1.5L Hybrid", vites: "e-CVT", hp: 116, fiyat: 1085000, gorsel: "/img/car-31.jpg" },
    { marka: "Volkswagen", model: "Polo 1.0 TSI Life", segment: "hatchback", yakit: "benzin", motor: "1.0L TSI", vites: "DSG 7", hp: 95, fiyat: 1050000, gorsel: "/img/car-32.jpg" },
    { marka: "Volkswagen", model: "T-Roc 1.5 TSI Style", segment: "crossover", yakit: "benzin", motor: "1.5L TSI", vites: "DSG 7", hp: 150, fiyat: 1680000, gorsel: "/img/car-33.jpg" },
    { marka: "Renault", model: "Taliant 1.0 TCe Joy", segment: "sedan", yakit: "benzin", motor: "1.0L Turbo", vites: "Manuel 5", hp: 90, fiyat: 685000, gorsel: "/img/car-34.jpg" },
    { marka: "Renault", model: "Captur 1.3 TCe Iconic", segment: "crossover", yakit: "benzin", motor: "1.3L Turbo", vites: "EDC 7", hp: 130, fiyat: 1280000, gorsel: "/img/car-35.jpg" },
    { marka: "Fiat", model: "Egea Cross 1.4 Fire", segment: "crossover", yakit: "benzin", motor: "1.4L", vites: "Manuel 5", hp: 95, fiyat: 920000, gorsel: "/img/car-36.jpg" },
    { marka: "Dacia", model: "Sandero 1.0 TCe Comfort", segment: "hatchback", yakit: "benzin", motor: "1.0L Turbo", vites: "CVT", hp: 90, fiyat: 720000, gorsel: "/img/car-37.jpg" },
    { marka: "Hyundai", model: "Bayon 1.0 T-GDI Elite", segment: "crossover", yakit: "benzin", motor: "1.0L Turbo", vites: "DCT 7", hp: 100, fiyat: 1050000, gorsel: "/img/car-38.jpg" },
    { marka: "Peugeot", model: "208 1.2 PureTech Allure", segment: "hatchback", yakit: "benzin", motor: "1.2L PureTech", vites: "Otomatik 8", hp: 100, fiyat: 1020000, gorsel: "/img/car-39.jpg" },
    { marka: "Peugeot", model: "2008 1.2 PureTech GT", segment: "crossover", yakit: "benzin", motor: "1.2L PureTech", vites: "Otomatik 8", hp: 130, fiyat: 1380000, gorsel: "/img/car-40.jpg" },
    { marka: "Seat", model: "Leon 1.5 TSI FR", segment: "hatchback", yakit: "benzin", motor: "1.5L TSI", vites: "DSG 7", hp: 150, fiyat: 1350000, gorsel: "/img/car-41.jpg" },
    { marka: "Seat", model: "Arona 1.0 TSI Xperience", segment: "crossover", yakit: "benzin", motor: "1.0L TSI", vites: "DSG 7", hp: 110, fiyat: 1180000, gorsel: "/img/car-42.jpg" },
    { marka: "Toyota", model: "Corolla Cross 1.8 Hybrid", segment: "suv", yakit: "hybrid", motor: "1.8L Hybrid", vites: "e-CVT", hp: 140, fiyat: 1550000, gorsel: "/img/car-43.jpg" },
    { marka: "Skoda", model: "Kamiq 1.0 TSI Style", segment: "crossover", yakit: "benzin", motor: "1.0L TSI", vites: "DSG 7", hp: 110, fiyat: 1180000, gorsel: "/img/car-44.jpg" },
    { marka: "Kia", model: "Ceed 1.5 T-GDI GT-Line", segment: "hatchback", yakit: "benzin", motor: "1.5L Turbo", vites: "DCT 7", hp: 160, fiyat: 1290000, gorsel: "/img/car-45.jpg" },
    { marka: "Honda", model: "HR-V 1.5 e:HEV Advance", segment: "suv", yakit: "hybrid", motor: "1.5L Hybrid", vites: "e-CVT", hp: 131, fiyat: 1480000, gorsel: "/img/car-46.jpg" },
    { marka: "BMW", model: "X1 sDrive18i M Sport", segment: "suv", yakit: "benzin", motor: "1.5L Turbo", vites: "Otomatik 7", hp: 136, fiyat: 2850000, gorsel: "/img/car-47.jpg" },
    { marka: "Mercedes", model: "GLA 200 AMG Line", segment: "suv", yakit: "benzin", motor: "1.3L Turbo", vites: "DCT 7", hp: 163, fiyat: 2950000, gorsel: "/img/car-48.jpg" },
    { marka: "Chery", model: "Tiggo 7 Pro 1.5 Turbo", segment: "suv", yakit: "benzin", motor: "1.5L Turbo", vites: "CVT", hp: 147, fiyat: 1280000, gorsel: "/img/car-49.jpg" },
    { marka: "Suzuki", model: "Vitara 1.4 Boosterjet GLX", segment: "suv", yakit: "hybrid", motor: "1.4L Mild Hybrid", vites: "Otomatik 6", hp: 129, fiyat: 1350000, gorsel: "/img/car-50.jpg" },
    { marka: "Volkswagen", model: "Passat 1.5 TSI Elegance", segment: "sedan", yakit: "benzin", motor: "1.5L TSI", vites: "DSG 7", hp: 150, fiyat: 2050000, gorsel: "/img/car-51.jpg" }
  ];

  const stmt = db.prepare(`INSERT INTO araclar (marka, model, segment, yakit, motor, vites, hp, fiyat, gorsel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const a of araclarSeed) {
    stmt.run(a.marka, a.model, a.segment, a.yakit, a.motor, a.vites, a.hp, a.fiyat, a.gorsel);
  }
  console.log('Araclar veritabanina eklendi.');
}

// ─── LEAD SCORING ────────────────────────────────────────
const LUKS_MARKALAR = ['BMW', 'Mercedes', 'Audi', 'Volvo', 'Tesla'];
const BUYUK_SEHIRLER = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'];

function leadPuanHesapla(lead) {
  let puan = 10; // base

  // Lüks araç
  const luksmu = LUKS_MARKALAR.some(m => lead.arac && lead.arac.toLowerCase().includes(m.toLowerCase()));
  if (luksmu) puan += 25;

  // E-posta bıraktıysa
  if (lead.eposta) puan += 15;

  // Not yazdıysa (motivasyonlu)
  if (lead.not_text && lead.not_text.length > 10) puan += 15;

  // Tercih tarihi seçtiyse
  if (lead.tercih_tarih) puan += 10;

  // Büyük şehir
  const buyukSehirMi = BUYUK_SEHIRLER.some(s => lead.sehir && lead.sehir.toLowerCase().includes(s.toLowerCase()));
  if (buyukSehirMi) puan += 10;

  // Fiyatı 2M+ araç
  if (lead.arac) {
    const fiyatMatch = lead.arac.match(/([\d.]+)\s*₺/);
    if (fiyatMatch) {
      const fiyat = parseInt(fiyatMatch[1].replace(/\./g, ''));
      if (fiyat >= 2000000) puan += 15;
    }
  }

  return Math.min(puan, 100);
}

// ─── E-POSTA AYARLARI ────────────────────────────────────
const MAIL_CONFIG = {
  enabled: false,
  host: 'smtp.gmail.com',
  port: 587,
  user: 'your-email@gmail.com',
  pass: 'your-app-password',
  to: 'leads@aracfirsat.com'
};

let transporter = null;
if (MAIL_CONFIG.enabled) {
  transporter = nodemailer.createTransport({
    host: MAIL_CONFIG.host,
    port: MAIL_CONFIG.port,
    secure: false,
    auth: { user: MAIL_CONFIG.user, pass: MAIL_CONFIG.pass }
  });
}

async function leadMailGonder(lead) {
  if (!transporter) return;
  try {
    const sicaklik = lead.puan >= 70 ? 'SICAK' : lead.puan >= 40 ? 'ILIK' : 'SOGUK';
    await transporter.sendMail({
      from: MAIL_CONFIG.user,
      to: MAIL_CONFIG.to,
      subject: `[${sicaklik}] Yeni Test Surusu Talebi - ${lead.ad_soyad} (${lead.puan} puan)`,
      html: `
        <h2>Yeni Test Surusu Talebi</h2>
        <div style="background:${lead.puan >= 70 ? '#d4edda' : lead.puan >= 40 ? '#fff3cd' : '#f8f9fa'};padding:12px;border-radius:8px;margin-bottom:16px;">
          <strong>Lead Puani: ${lead.puan}/100 - ${sicaklik}</strong>
        </div>
        <table style="border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:bold;">Ad Soyad:</td><td style="padding:8px;">${lead.ad_soyad}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Telefon:</td><td style="padding:8px;">${lead.telefon}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">E-posta:</td><td style="padding:8px;">${lead.eposta || '-'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Arac:</td><td style="padding:8px;">${lead.arac}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Sehir:</td><td style="padding:8px;">${lead.sehir}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Tercih Tarihi:</td><td style="padding:8px;">${lead.tercih_tarih || '-'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Not:</td><td style="padding:8px;">${lead.not_text || '-'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Kaynak:</td><td style="padding:8px;">${lead.kaynak || '-'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">UTM:</td><td style="padding:8px;">${lead.utm_source || '-'} / ${lead.utm_medium || '-'} / ${lead.utm_campaign || '-'}</td></tr>
        </table>
      `
    });
    console.log('Lead e-postasi gonderildi:', lead.ad_soyad);
  } catch (err) {
    console.error('E-posta gonderilemedi:', err.message);
  }
}

// ─── WHATSAPP MESAJ AKISI ────────────────────────────────
// WhatsApp Business API entegrasyonu icin placeholder
// Gercek kullanımda Twilio, WATI veya 360dialog entegre edin
function whatsappAkisiBaslat(lead) {
  console.log(`[WhatsApp Akisi] ${lead.ad_soyad} - ${lead.telefon}`);
  console.log(`  0dk: Talep alindi mesaji`);
  console.log(`  1sa: Arac bilgi + brosur`);
  console.log(`  24sa: Hatirlatma mesaji`);
  console.log(`  72sa: Kampanya bildirimi`);

  // Gercek entegrasyon ornegi:
  // await fetch('https://api.whatsapp.com/...', { ... })
}

// ─── API: ARACLAR ────────────────────────────────────────
app.get('/api/araclar', (req, res) => {
  const { marka, segment, yakit, sirala } = req.query;
  let sql = 'SELECT * FROM araclar WHERE aktif = 1';
  const params = [];

  if (marka) { sql += ' AND marka = ?'; params.push(marka); }
  if (segment) { sql += ' AND segment = ?'; params.push(segment); }
  if (yakit) { sql += ' AND yakit = ?'; params.push(yakit); }

  if (sirala === 'fiyat-artan') sql += ' ORDER BY fiyat ASC';
  else if (sirala === 'fiyat-azalan') sql += ' ORDER BY fiyat DESC';
  else if (sirala === 'isim') sql += ' ORDER BY model ASC';
  else sql += ' ORDER BY fiyat ASC';

  res.json(db.prepare(sql).all(...params));
});

app.get('/api/araclar/:id', (req, res) => {
  const arac = db.prepare('SELECT * FROM araclar WHERE id = ?').get(req.params.id);
  if (!arac) return res.status(404).json({ error: 'Arac bulunamadi' });
  res.json(arac);
});

app.get('/api/markalar', (req, res) => {
  const markalar = db.prepare('SELECT DISTINCT marka FROM araclar WHERE aktif = 1 ORDER BY marka').all();
  res.json(markalar.map(m => m.marka));
});

// ─── API: LEADLER ────────────────────────────────────────
app.post('/api/leads', async (req, res) => {
  const { ad_soyad, telefon, eposta, arac, sehir, not_text, tercih_tarih, kaynak, utm_source, utm_medium, utm_campaign } = req.body;

  if (!ad_soyad || !telefon || !arac || !sehir) {
    return res.status(400).json({ error: 'Zorunlu alanlari doldurun' });
  }

  const lead = { ad_soyad, telefon, eposta, arac, sehir, not_text, tercih_tarih };
  const puan = leadPuanHesapla(lead);

  const result = db.prepare(
    'INSERT INTO leads (ad_soyad, telefon, eposta, arac, sehir, not_text, tercih_tarih, puan, kaynak, utm_source, utm_medium, utm_campaign) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(ad_soyad, telefon, eposta || null, arac, sehir, not_text || null, tercih_tarih || null, puan, kaynak || null, utm_source || null, utm_medium || null, utm_campaign || null);

  const fullLead = { ...lead, puan, kaynak, utm_source, utm_medium, utm_campaign };
  leadMailGonder(fullLead);
  whatsappAkisiBaslat(fullLead);

  res.json({ success: true, id: result.lastInsertRowid, puan });
});

// Hizli lead (exit intent / karsilastirma CTA - sadece telefon)
app.post('/api/leads/hizli', async (req, res) => {
  const { telefon, kaynak, utm_source, utm_medium, utm_campaign } = req.body;

  if (!telefon) {
    return res.status(400).json({ error: 'Telefon zorunlu' });
  }

  const puan = 20; // hizli lead daha dusuk puan
  const result = db.prepare(
    'INSERT INTO leads (ad_soyad, telefon, arac, sehir, puan, kaynak, utm_source, utm_medium, utm_campaign) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run('Hizli Lead', telefon, 'Belirtilmedi', 'Belirtilmedi', puan, kaynak || 'exit-intent', utm_source || null, utm_medium || null, utm_campaign || null);

  res.json({ success: true, id: result.lastInsertRowid });
});

// ─── API: ADMIN ──────────────────────────────────────────
const ADMIN_SIFRE = '11041984';

function adminAuth(req, res, next) {
  const sifre = req.headers['x-admin-key'];
  if (sifre !== ADMIN_SIFRE) {
    return res.status(401).json({ error: 'Yetkisiz erisim' });
  }
  next();
}

app.get('/api/admin/leads', adminAuth, (req, res) => {
  const { durum, sayfa = 1, sirala } = req.query;
  const limit = 20;
  const offset = (sayfa - 1) * limit;

  let sql = 'SELECT * FROM leads';
  let countSql = 'SELECT COUNT(*) as total FROM leads';
  const params = [];

  if (durum) {
    sql += ' WHERE durum = ?';
    countSql += ' WHERE durum = ?';
    params.push(durum);
  }

  if (sirala === 'puan') sql += ' ORDER BY puan DESC, created_at DESC';
  else sql += ' ORDER BY created_at DESC';

  sql += ' LIMIT ? OFFSET ?';

  const total = db.prepare(countSql).get(...params).total;
  const leads = db.prepare(sql).all(...params, limit, offset);

  res.json({ leads, total, sayfa: Number(sayfa), toplam_sayfa: Math.ceil(total / limit) });
});

app.patch('/api/admin/leads/:id', adminAuth, (req, res) => {
  const { durum } = req.body;
  const validDurumlar = ['yeni', 'arandi', 'randevu', 'tamamlandi', 'iptal'];
  if (!validDurumlar.includes(durum)) {
    return res.status(400).json({ error: 'Gecersiz durum' });
  }
  db.prepare('UPDATE leads SET durum = ? WHERE id = ?').run(durum, req.params.id);
  res.json({ success: true });
});

app.delete('/api/admin/leads/:id', adminAuth, (req, res) => {
  db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.get('/api/admin/istatistikler', adminAuth, (req, res) => {
  const toplam = db.prepare('SELECT COUNT(*) as c FROM leads').get().c;
  const yeni = db.prepare("SELECT COUNT(*) as c FROM leads WHERE durum = 'yeni'").get().c;
  const arandi = db.prepare("SELECT COUNT(*) as c FROM leads WHERE durum = 'arandi'").get().c;
  const randevu = db.prepare("SELECT COUNT(*) as c FROM leads WHERE durum = 'randevu'").get().c;
  const tamamlandi = db.prepare("SELECT COUNT(*) as c FROM leads WHERE durum = 'tamamlandi'").get().c;
  const populerAraclar = db.prepare(
    "SELECT arac, COUNT(*) as sayi FROM leads GROUP BY arac ORDER BY sayi DESC LIMIT 5"
  ).all();
  const populerSehirler = db.prepare(
    "SELECT sehir, COUNT(*) as sayi FROM leads GROUP BY sehir ORDER BY sayi DESC LIMIT 5"
  ).all();

  // Ort puan
  const ortPuan = db.prepare("SELECT AVG(puan) as ort FROM leads").get().ort || 0;

  // Sicak lead sayisi
  const sicakLead = db.prepare("SELECT COUNT(*) as c FROM leads WHERE puan >= 70").get().c;

  // Bekleyen (2 saatten eski yeni leadler)
  const bekleyen = db.prepare(
    "SELECT COUNT(*) as c FROM leads WHERE durum = 'yeni' AND created_at <= datetime('now', '-2 hours')"
  ).get().c;

  // Takip edilmesi gereken (arandi ama 48 saattir guncellenmemis)
  const takipGerekli = db.prepare(
    "SELECT COUNT(*) as c FROM leads WHERE durum = 'arandi' AND created_at <= datetime('now', '-48 hours')"
  ).get().c;

  // UTM kaynaklari
  const kaynaklar = db.prepare(
    "SELECT COALESCE(kaynak, 'direkt') as kaynak, COUNT(*) as sayi FROM leads GROUP BY kaynak ORDER BY sayi DESC LIMIT 5"
  ).all();

  res.json({ toplam, yeni, arandi, randevu, tamamlandi, populerAraclar, populerSehirler, ortPuan: Math.round(ortPuan), sicakLead, bekleyen, takipGerekli, kaynaklar });
});

// Admin arac CRUD
app.post('/api/admin/araclar', adminAuth, (req, res) => {
  const { marka, model, segment, yakit, motor, vites, hp, fiyat, gorsel } = req.body;
  const result = db.prepare(
    'INSERT INTO araclar (marka, model, segment, yakit, motor, vites, hp, fiyat, gorsel) VALUES (?,?,?,?,?,?,?,?,?)'
  ).run(marka, model, segment, yakit, motor, vites, hp, fiyat, gorsel || null);
  res.json({ success: true, id: result.lastInsertRowid });
});

app.put('/api/admin/araclar/:id', adminAuth, (req, res) => {
  const { marka, model, segment, yakit, motor, vites, hp, fiyat, gorsel, aktif } = req.body;
  db.prepare(
    'UPDATE araclar SET marka=?, model=?, segment=?, yakit=?, motor=?, vites=?, hp=?, fiyat=?, gorsel=?, aktif=? WHERE id=?'
  ).run(marka, model, segment, yakit, motor, vites, hp, fiyat, gorsel || null, aktif ?? 1, req.params.id);
  res.json({ success: true });
});

app.delete('/api/admin/araclar/:id', adminAuth, (req, res) => {
  db.prepare('DELETE FROM araclar WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// CSV Export
app.get('/api/admin/leads/export', adminAuth, (req, res) => {
  const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
  const header = 'ID,Ad Soyad,Telefon,E-posta,Arac,Sehir,Not,Tercih Tarih,Durum,Puan,Kaynak,UTM Source,UTM Medium,UTM Campaign,Tarih\n';
  const rows = leads.map(l =>
    `${l.id},"${l.ad_soyad}","${l.telefon}","${l.eposta || ''}","${l.arac}","${l.sehir}","${l.not_text || ''}","${l.tercih_tarih || ''}","${l.durum}",${l.puan},"${l.kaynak || ''}","${l.utm_source || ''}","${l.utm_medium || ''}","${l.utm_campaign || ''}","${l.created_at}"`
  ).join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
  res.send('\uFEFF' + header + rows);
});

// ─── API: FİYAT GÜNCELLEMELERİ ─────────────────────────

// Son güncelleme tarihi (public)
app.get('/api/son-guncelleme', (req, res) => {
  const row = db.prepare('SELECT MAX(son_guncelleme) as tarih FROM araclar').get();
  res.json({ tarih: row.tarih || null });
});

// Fiyat geçmişi (public)
app.get('/api/fiyat-gecmisi/:aracId', (req, res) => {
  const gecmis = db.prepare(
    'SELECT * FROM fiyat_gecmisi WHERE arac_id = ? ORDER BY created_at DESC LIMIT 12'
  ).all(req.params.aracId);
  res.json(gecmis);
});

// Tek araç fiyat güncelle (admin)
app.patch('/api/admin/araclar/:id/fiyat', adminAuth, (req, res) => {
  const { yeni_fiyat } = req.body;
  if (!yeni_fiyat || yeni_fiyat <= 0) {
    return res.status(400).json({ error: 'Gecerli bir fiyat girin' });
  }

  const arac = db.prepare('SELECT * FROM araclar WHERE id = ?').get(req.params.id);
  if (!arac) return res.status(404).json({ error: 'Arac bulunamadi' });

  const eskiFiyat = arac.fiyat;
  const degisimYuzde = ((yeni_fiyat - eskiFiyat) / eskiFiyat * 100).toFixed(2);

  db.prepare('INSERT INTO fiyat_gecmisi (arac_id, eski_fiyat, yeni_fiyat, degisim_yuzde, guncelleme_tipi) VALUES (?,?,?,?,?)')
    .run(arac.id, eskiFiyat, yeni_fiyat, degisimYuzde, 'manuel');

  db.prepare('UPDATE araclar SET fiyat = ?, son_guncelleme = CURRENT_TIMESTAMP WHERE id = ?')
    .run(yeni_fiyat, req.params.id);

  res.json({ success: true, eski_fiyat: eskiFiyat, yeni_fiyat, degisim_yuzde: degisimYuzde });
});

// Toplu fiyat güncelle - yüzde bazlı (admin)
app.post('/api/admin/fiyat-guncelle/toplu', adminAuth, (req, res) => {
  const { yuzde, marka } = req.body;
  if (yuzde === undefined || yuzde === null) {
    return res.status(400).json({ error: 'Yuzde degeri gerekli' });
  }

  let sql = 'SELECT * FROM araclar WHERE aktif = 1';
  const params = [];
  if (marka) { sql += ' AND marka = ?'; params.push(marka); }

  const araclar = db.prepare(sql).all(...params);

  const guncelleme = db.transaction(() => {
    const sonuclar = [];
    for (const arac of araclar) {
      const eskiFiyat = arac.fiyat;
      const yeniFiyat = Math.round(eskiFiyat * (1 + yuzde / 100));
      const degisimYuzde = yuzde.toFixed(2);

      db.prepare('INSERT INTO fiyat_gecmisi (arac_id, eski_fiyat, yeni_fiyat, degisim_yuzde, guncelleme_tipi) VALUES (?,?,?,?,?)')
        .run(arac.id, eskiFiyat, yeniFiyat, degisimYuzde, 'toplu');

      db.prepare('UPDATE araclar SET fiyat = ?, son_guncelleme = CURRENT_TIMESTAMP WHERE id = ?')
        .run(yeniFiyat, arac.id);

      sonuclar.push({ id: arac.id, marka: arac.marka, model: arac.model, eski_fiyat: eskiFiyat, yeni_fiyat: yeniFiyat });
    }
    return sonuclar;
  });

  const sonuclar = guncelleme();
  res.json({ success: true, guncellenen: sonuclar.length, detay: sonuclar });
});

// Fiyat geçmişi listesi (admin)
app.get('/api/admin/fiyat-gecmisi', adminAuth, (req, res) => {
  const gecmis = db.prepare(`
    SELECT fg.*, a.marka, a.model
    FROM fiyat_gecmisi fg
    JOIN araclar a ON fg.arac_id = a.id
    ORDER BY fg.created_at DESC
    LIMIT 100
  `).all();
  res.json(gecmis);
});

// ─── CRON: AYLIK FİYAT GÜNCELLEME HATIRLATMASI ─────────
// Her ayın 1'i saat 09:00'da çalışır
cron.schedule('0 9 1 * *', () => {
  const now = new Date().toLocaleString('tr-TR');
  console.log(`\n[CRON] ${now} - Aylık fiyat güncelleme zamanı!`);

  const aracSayisi = db.prepare('SELECT COUNT(*) as c FROM araclar WHERE aktif = 1').get().c;
  console.log(`[CRON] ${aracSayisi} aktif araç fiyat güncellemesi bekliyor.`);
  console.log(`[CRON] Admin panelinden toplu veya tek tek fiyat güncellemesi yapabilirsiniz.`);
  console.log(`[CRON] Admin: http://localhost:${PORT}/admin -> Fiyat Güncelle sekmesi\n`);

  // E-posta ile bildirim (eğer aktifse)
  if (transporter) {
    transporter.sendMail({
      from: MAIL_CONFIG.user,
      to: MAIL_CONFIG.to,
      subject: `[AraçFırsat] Aylık Fiyat Güncelleme Hatırlatması`,
      html: `
        <h2>Aylık Fiyat Güncelleme Zamanı!</h2>
        <p>${aracSayisi} aktif aracın fiyatları güncellenmeyi bekliyor.</p>
        <p><a href="http://localhost:${PORT}/admin">Admin Paneline Git</a></p>
      `
    }).catch(err => console.error('[CRON] E-posta gönderilemedi:', err.message));
  }
}, { timezone: 'Europe/Istanbul' });

console.log('[CRON] Aylık fiyat güncelleme hatırlatması aktif (her ayın 1\'i saat 09:00)');

// Sayfalar
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// ─── SUNUCU BASLAT ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`AracFirsat sunucusu calisiyor: http://localhost:${PORT}`);
  console.log(`Admin paneli: http://localhost:${PORT}/admin`);
});
