-- ─── SUPABASE LEAD TABLOSU ───────────────────────────────
-- Statik sitenin (aracfirsat.com) formları leadleri buraya yazar; HubSpot'a ayrıca gönderilir.
-- Supabase panelinde SQL Editor'e yapıştırıp bir kez çalıştırın.
--
-- Güvenlik: tarayıcıdaki anon (publishable) anahtar yalnızca INSERT yapabilir.
-- Okuma/güncelleme/silme politikası yoktur; leadler yalnızca panelden veya service_role ile görülür.

create table if not exists public.leads (
  id            bigint generated always as identity primary key,
  olusturma     timestamptz not null default now(),
  kaynak        text not null check (kaynak in ('test-surusu-formu', 'karsilastirma-cta', 'exit-intent')),
  telefon       text not null check (telefon ~ '^\+905[0-9]{9}$'),
  ad_soyad      text check (char_length(ad_soyad) <= 120),
  eposta        text check (char_length(eposta) <= 200),
  arac          text check (char_length(arac) <= 200),
  arac_tipi     text check (char_length(arac_tipi) <= 30),
  sehir         text check (char_length(sehir) <= 60),
  tercih_tarih  date,
  not_text      text check (char_length(not_text) <= 1000),
  ticari_izin   boolean,
  kvkk_onay     boolean not null default true,
  utm_source    text check (char_length(utm_source) <= 200),
  utm_medium    text check (char_length(utm_medium) <= 200),
  utm_campaign  text check (char_length(utm_campaign) <= 200),
  sayfa         text check (char_length(sayfa) <= 500),
  durum         text not null default 'yeni' check (durum in ('yeni', 'arandi', 'randevu', 'tamamlandi', 'iptal'))
);

alter table public.leads enable row level security;

drop policy if exists "Site formlari lead ekleyebilir" on public.leads;
create policy "Site formlari lead ekleyebilir" on public.leads
  for insert to anon
  with check (durum = 'yeni' and kvkk_onay);

-- anon yalnızca ekleyebilsin (Supabase varsayılan grant'leri daha geniş)
revoke all on public.leads from anon;
grant insert (kaynak, telefon, ad_soyad, eposta, arac, arac_tipi, sehir, tercih_tarih, not_text,
              ticari_izin, kvkk_onay, utm_source, utm_medium, utm_campaign, sayfa)
  on public.leads to anon;

create index if not exists leads_olusturma_idx on public.leads (olusturma desc);
