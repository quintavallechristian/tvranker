-- =============================================
-- Aggiornamento rating labels e voti serie
-- Esegui nel SQL Editor di Supabase
-- =============================================

BEGIN;

-- -----------------------------------------------
-- Step 1: Aggiorna le label dei rating
-- (array di 10 elementi: indice 0 = voto 1, ecc.)
-- -----------------------------------------------
UPDATE public.profiles
SET rating_labels = '["CAVATEMI GLI OCCHI","SCHIFO","SOGLIA DI ABBANDONO","SOFFERENZA","INDIFFERENTE","MEDIOCRE/NOIOSA","BUONA","UNA DROGA","AMORE","OLTRE PROPRIO"]'::jsonb;

-- -----------------------------------------------
-- Step 2: Assegna i voti a ogni serie
-- -----------------------------------------------

-- 10 - OLTRE PROPRIO
UPDATE public.list_items li SET rating = 10
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE '%Marvelous%Maisel%'
  OR s.title ILIKE 'Ted Lasso'
  OR s.title ILIKE '%Peaky Blinder%'
);

-- 9 - AMORE
UPDATE public.list_items li SET rating = 9
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE 'Lost'
  OR s.title ILIKE 'Sherlock'
  OR s.title ILIKE 'House of Cards'
  OR s.title ILIKE 'House of Card'
);

-- 8 - UNA DROGA
UPDATE public.list_items li SET rating = 8
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE 'The Boys'
  OR s.title ILIKE '%Game of Thrones%'
  OR s.title ILIKE 'Chernobyl'
  OR s.title ILIKE '%How I Met Your Mother%'
  OR s.title ILIKE 'Boris'
  OR s.title ILIKE '%Queen%Gambit%'
  OR s.title ILIKE '%Brooklyn Nine%'
  OR s.title ILIKE 'Fleabag'
  OR s.title ILIKE '%Handmaid%Tale%'
);

-- 7 - BUONA
UPDATE public.list_items li SET rating = 7
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE 'Upload'
  OR s.title ILIKE '%Black Mirror%'
  OR s.title ILIKE '%Young Sheldon%'
  OR s.title ILIKE '%Big Bang Theory%'
  OR s.title ILIKE 'Friends'
  OR s.title ILIKE '%Good Place%'
  OR s.title ILIKE '%Modern Family%'
  OR s.title ILIKE '%Never Have I Ever%'
  OR s.title ILIKE '%Squid Game%'
  OR s.title ILIKE 'Loki'
  OR s.title ILIKE 'WandaVision'
  OR s.title ILIKE '%Casa de Papel%'   -- Money Heist / La Casa de Papel
  OR s.title ILIKE '%Casa di Carta%'   -- titolo italiano
  OR s.title ILIKE '%Money Heist%'
  OR s.title ILIKE '%Santa Clarita Diet%'
  OR s.title ILIKE '%Sex Education%'
  OR s.title ILIKE '%Umbrella Academy%'
  OR s.title ILIKE 'Dark'
  OR s.title ILIKE '%The Crown%'
  OR s.title ILIKE 'SanPa%'
  OR s.title ILIKE 'Sanpa%'
  OR s.title ILIKE '%Generazione 56%'
  OR s.title ILIKE '%Generation 56%'
  OR s.title ILIKE 'Hunters'
  OR s.title ILIKE '%The Undoing%'
  OR s.title ILIKE 'Sense8'
  OR s.title ILIKE '%The Hunting%'     -- o The Haunting se è quello
  OR s.title ILIKE '%Haunting%'
  OR s.title ILIKE '%Medici%'
  OR s.title ILIKE '%How to Get Away%'
  OR s.title ILIKE '%Person of Interest%'
);

-- 6 - MEDIOCRE/NOIOSA
UPDATE public.list_items li SET rating = 6
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE '%Man in the High Castle%'
  OR s.title ILIKE 'Agent Carter'
  OR s.title ILIKE '%Series of Unfortunate Events%'
  OR s.title ILIKE '%Serie%Sfortunati%'   -- titolo italiano
  OR s.title ILIKE 'Space Force'
  OR s.title ILIKE 'Breaking Bad'
  OR s.title ILIKE 'Touch'
  OR s.title ILIKE '3%'
  OR s.title ILIKE '%Orange Is the New Black%'
  OR s.title ILIKE '%Orange%New Black%'
  OR s.title ILIKE '%Stranger Things%'
  OR s.title ILIKE '%Ginny%Georgia%'
  OR s.title ILIKE 'Snowpiercer'
  OR s.title ILIKE 'Westworld'
  OR s.title ILIKE '%Miracle Workers%'
  OR s.title ILIKE '%Good Omens%'
  OR s.title ILIKE '%The Punisher%'
  OR s.title ILIKE 'Punisher'
  OR s.title ILIKE '%Jessica Jones%'
);

-- 5 - INDIFFERENTE
UPDATE public.list_items li SET rating = 5
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE 'The 100'
  OR s.title ILIKE '%Behind Her Eyes%'
  OR s.title ILIKE '%Dietro%Occhi%'    -- titolo italiano
  OR s.title ILIKE '%The Defenders%'
  OR s.title ILIKE 'Daredevil'
  OR s.title ILIKE '%Locke%Key%'
  OR s.title ILIKE 'Lupin'
  OR s.title ILIKE '%Altered Carbon%'
);

-- 4 - SOFFERENZA
UPDATE public.list_items li SET rating = 4
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE 'Cobra Kai'
  OR s.title ILIKE '%13 Reason%'
  OR s.title ILIKE '%The Leftovers%'
  OR s.title ILIKE '%Agents of S.H.I.E.L.D%'
  OR s.title ILIKE '%Agents of Shield%'
  OR s.title ILIKE '%Iron Fist%'
  OR s.title ILIKE 'Luke Cage'
  OR s.title ILIKE '%Winx%'
);

-- 3 - SOGLIA DI ABBANDONO
UPDATE public.list_items li SET rating = 3
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE 'Mr. Robot'
  OR s.title ILIKE 'Mr Robot'
  OR s.title ILIKE '%Twin Peaks%'
);

-- 2 - SCHIFO
UPDATE public.list_items li SET rating = 2
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE 'The OA'
  OR s.title ILIKE '%The Witcher%'
  OR s.title ILIKE 'Fringe'
);

-- 1 - CAVATEMI GLI OCCHI
UPDATE public.list_items li SET rating = 1
FROM public.shows s WHERE li.show_id = s.id AND (
  s.title ILIKE '%The Flash%'
  OR s.title ILIKE 'Flash'
  OR s.title ILIKE 'Gotham'
  OR s.title ILIKE '%Once Upon a Time%'
);

COMMIT;

-- -----------------------------------------------
-- Query di verifica: mostra il risultato finale
-- (esegui separatamente dopo il blocco sopra)
-- -----------------------------------------------
/*
SELECT s.title, li.rating
FROM public.list_items li
JOIN public.shows s ON li.show_id = s.id
ORDER BY li.rating DESC NULLS LAST, s.title;
*/
