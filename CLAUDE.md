# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AracFirsat2026 is a Turkish zero-kilometer (new) car price comparison website with test drive lead collection. It runs as an Express.js server with a SQLite database (better-sqlite3) and serves a vanilla HTML/CSS/JS frontend.

## Commands

- **Start server:** `npm start` (runs on port 3000, or `PORT` env)
- **Dev mode (auto-reload):** `npm run dev` (uses `node --watch`)
- **Install dependencies:** `npm install`

No test framework, linter, or build step is configured.

## Architecture

### Backend (`server.js` - single file)

All backend logic lives in one file:
- **Database:** SQLite via better-sqlite3 with WAL mode. DB file is `aracfirsat.db`. Tables: `araclar` (vehicles), `leads` (test drive requests), `fiyat_gecmisi` (price history). Schema is created on startup with ALTER TABLE migrations for new columns.
- **Seed data:** 51 cars are seeded on first run when `araclar` table is empty; 17 motorcycles are seeded when there are no `tip = 'motosiklet'` rows.
- **Vehicle type:** `araclar.tip` is `otomobil` or `motosiklet`. Car segments: sedan/suv/hatchback/crossover; motorcycle segments: scooter/naked/adventure/sport/touring/cruiser. Motorcycle `hp` is metric PS.
- **Lead scoring:** `leadPuanHesapla()` scores leads 0-100 based on luxury brand, email provided, notes length, preferred date, city size, and vehicle price.
- **Admin auth:** Simple header-based auth (`x-admin-key` header) - not session-based.
- **Email:** Nodemailer integration (disabled by default via `MAIL_CONFIG.enabled`).
- **Cron:** Monthly price update reminder via node-cron (1st of each month, 09:00 Istanbul time).

### API Routes

Public:
- `GET /api/araclar` - list vehicles (filterable by tip/marka/segment/yakit, sortable)
- `GET /api/markalar` - distinct brand list (optional `?tip=`)
- `POST /api/leads` - submit test drive lead
- `POST /api/leads/hizli` - quick lead (phone only, for exit-intent)
- `GET /api/fiyat-gecmisi/:aracId` - price history for a vehicle

Admin (require `x-admin-key` header):
- CRUD for leads and vehicles under `/api/admin/`
- `GET /api/admin/istatistikler` - dashboard stats
- `PATCH /api/admin/araclar/:id/fiyat` - single price update with history
- `POST /api/admin/fiyat-guncelle/toplu` - bulk percentage-based price update
- `GET /api/admin/leads/export` - CSV export

### Frontend

- `public/index.html` - main consumer-facing page (vehicle listing, comparison, test drive form)
- `public/admin.html` - admin panel
- `public/app.js` - client-side JS with embedded vehicle data for static fallback
- `public/style.css` - all styles

### Dual Deployment

- **Dynamic:** Express server with SQLite (`server.js` + `public/`)
- **Static (GitHub Pages):** `docs/` folder mirrors `public/` with hardcoded vehicle data in `app.js` (no API calls). When updating vehicles or frontend, `docs/` must be synced manually.

### Lead Storage on the Static Site

- On GitHub Pages there is no server, so `leadIlet()` in `app.js` writes every lead to Supabase (`SUPABASE_URL` / `SUPABASE_ANON_KEY` constants; empty = skipped) and, only when an email is present, to the HubSpot form. The HubSpot form requires `email` and rejects phone-only submissions with 400.
- Table, RLS and grants: `supabase/leads.sql` (anon can only INSERT; leads are read in the Supabase dashboard).

## Key Conventions

- All UI text, variable names, and comments are in Turkish
- Currency is Turkish Lira (TRY), formatted as `1.285.000 ₺`
- Vehicle images follow `car-{N}.jpg` (cars) and `moto-{N}.jpg` (motorcycles) in `public/img/` and `docs/img/`; every photo needs a credit in `fotograf-kaynaklari.html`
- Static motorcycle data lives in `MOTOSIKLET_VERILERI` in `app.js` (ids start at 101); `?tip=motosiklet` opens the motorcycle tab
- Database column names are in Turkish (e.g., `marka`, `fiyat`, `yakit`, `sehir`)
- Lead statuses: `yeni`, `arandi`, `randevu`, `tamamlandi`, `iptal`

## Fiyat Radarı (social media price-change images)

- `node kreatif/fiyat-radari.js kaydet [YYYY-MM-DD]` snapshots active prices from `docs/app.js` into `veri/fiyat-gecmisi.json`. Run it after every monthly price update.
- `node kreatif/fiyat-radari.js uret [--tip otomobil|motosiklet|hepsi] [--adet 5]` diffs the last two snapshots and renders feed (1080x1350) and story (1080x1920) PNGs into `kreatif/cikti/` (gitignored) via headless Chrome, using `kreatif/fiyat-radari.html`.
- `node kreatif/fiyat-guncelle.js guncellemeler.json [YYYY-MM-DD]` writes researched prices (`[{id, fiyat, yeni_model?, aktif?}]`, `fiyat: null` = skip) into `public/app.js`, copies it to `docs/app.js` and sets `FIYAT_GUNCELLEME_TARIHI`. Monthly order: research → fiyat-guncelle → seo-uret → fiyat-radari kaydet → fiyat-radari uret.

## SEO pages (`kreatif/seo-uret.js`)

- The homepage renders vehicles with JS, which AI crawlers (GPTBot, ClaudeBot, PerplexityBot) don't run. `node kreatif/seo-uret.js` reads `docs/app.js` and writes static HTML: `docs/fiyat/<slug>.html` per active vehicle, `docs/fiyat-listesi.html`, `docs/sitemap.xml`, `docs/llms.txt`, and the `<!-- SEO:KARTLAR -->` / `<!-- SEO:ITEMLIST -->` blocks in `docs/index.html` and `public/index.html`. Never hand-edit those outputs; rerun the script after any vehicle or price change.
- `aracSlug()` in `app.js` and `slugYap()` in the script must stay identical, or card links break.
- The FAQ text exists twice in `index.html` (visible `#sss` section and `FAQPage` JSON-LD); keep them in sync.
- `uret` ignores changes below `--esik` percent (default 0.5) so 100 TL roundings don't appear.
- A vehicle is only compared when its marka+model string is identical in both snapshots (trim changes are skipped). `--ornek` renders with made-up prices and an "ÖRNEK" watermark — never post those.
