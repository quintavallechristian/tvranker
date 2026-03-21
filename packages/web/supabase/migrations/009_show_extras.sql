-- Migration: Add seasons, trailer, and streaming provider data to shows
-- These fields are populated lazily alongside existing TMDB enrichment.

-- seasons_data: JSON array of { season_number, name, episode_count, air_date, overview }
ALTER TABLE public.shows ADD COLUMN IF NOT EXISTS seasons_data jsonb;

-- trailer_url: YouTube video URL (from TMDB videos endpoint)
ALTER TABLE public.shows ADD COLUMN IF NOT EXISTS trailer_url text;

-- watch_providers: JSON object of streaming providers per region (from TMDB watch/providers)
ALTER TABLE public.shows ADD COLUMN IF NOT EXISTS watch_providers jsonb;

-- Reset tmdb_fetched so existing shows pick up the new fields on next visit
UPDATE public.shows SET tmdb_fetched = false WHERE tmdb_fetched = true;
