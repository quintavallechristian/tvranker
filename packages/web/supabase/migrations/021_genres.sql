-- Aggiunge il campo genres (jsonb) alle tabelle shows, movies e animes.
-- Il formato è [{id: number, name: string}], coerente con la tabella games.
-- I dati vengono popolati tramite lo script scripts/enrich-genres.ts.

alter table public.shows add column if not exists genres jsonb;
alter table public.movies add column if not exists genres jsonb;
alter table public.animes add column if not exists genres jsonb;
