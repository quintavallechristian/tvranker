-- Aggiunge una colonna per tracciare se gli episodi di ogni stagione sono stati fetchati da TMDB.
-- episodes_fetched = false per default: lo script enrich-episodes.ts si occupa di popolare
-- seasons_data con gli episodi (titolo + durata) e poi imposta questo flag a true.

ALTER TABLE shows ADD COLUMN episodes_fetched boolean NOT NULL DEFAULT false;
