-- Migration: Make tmdb_id nullable + add tmdb_fetched column
-- Run this in Supabase SQL Editor

-- 1. Make tmdb_id nullable (was NOT NULL)
ALTER TABLE public.shows ALTER COLUMN tmdb_id DROP NOT NULL;

-- 2. Add tmdb_fetched column (tracks if TMDB data has been lazily loaded)
ALTER TABLE public.shows ADD COLUMN IF NOT EXISTS tmdb_fetched boolean DEFAULT false NOT NULL;

-- 3. Mark existing shows with tmdb_id as already fetched
UPDATE public.shows SET tmdb_fetched = true WHERE tmdb_id IS NOT NULL;

-- 4. Allow authenticated users to update shows (for lazy TMDB data loading)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can update shows' AND tablename = 'shows'
  ) THEN
    CREATE POLICY "Authenticated users can update shows" ON public.shows
      FOR UPDATE USING (auth.role() = 'authenticated');
  END IF;
END
$$;
