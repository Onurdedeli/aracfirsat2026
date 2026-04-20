# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AracFirsat2026 is a Turkish zero-kilometer (new) car price comparison website with test drive lead collection. It runs as an Express.js server with a SQLite database (better-sqlite3) and serves a vanilla HTML/CSS/JS frontend.

## Commands

- **Start server:** `npm start` (runs on port 3000)
- **Dev mode (auto-reload):** `npm run dev` (uses `node --watch`)
- **Install dependencies:** `npm install`

No test framework, linter, or build step is configured.

## Architecture

### Backend (`server.js` - single file)

All backend logic lives in one file:
- **Database:** SQLite via better-sqlite3 with WAL mode. DB file is `aracfirsat.db`. Tables: `araclar` (vehicles), `leads` (test drive requests), `fiyat_gecmisi` (price history). Schema is created on startup with ALTER TABLE migrations for new columns.
- **Seed data:** 51 vehicles are seeded on first run when `araclar` table is empty.
- **Lead scoring:** `leadPuanHesapla()` scores leads 0-100 based on luxury brand, email provided, notes length, preferred date, city size, and vehicle price.
- **Admin auth:** Simple header-based auth (`x-admin-key` header) - not session-based.
- **Email:** Nodemailer integration (disabled by default via `MAIL_CONFIG.enabled`).
- **Cron:** Monthly price update reminder via node-cron (1st of each month, 09:00 Istanbul time).

### API Routes

Public:
- `GET /api/araclar` - list vehicles (filterable by marka/segment/yakit, sortable)
- `GET /api/markalar` - distinct brand list
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

## Key Conventions

- All UI text, variable names, and comments are in Turkish
- Currency is Turkish Lira (TRY), formatted as `1.285.000 ₺`
- Vehicle images follow `car-{N}.jpg` pattern in `public/img/` and `docs/img/`
- Database column names are in Turkish (e.g., `marka`, `fiyat`, `yakit`, `sehir`)
- Lead statuses: `yeni`, `arandi`, `randevu`, `tamamlandi`, `iptal`
