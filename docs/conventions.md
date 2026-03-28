# Conventions — Recommender System Terminology

## Definitions

### Similarity (Similarità)

The percentage (0–100%) that measures how similar **two lists** are to each other.

Computed by `computeListSimilarity` (TV show lists) or `computeMovieListSimilarity` (movie lists).

Formula: `overlap × (50% rating closeness + 50% position closeness) × 100`

- **Overlap** — how many items both lists share, relative to the smaller list
- **Rating closeness** — how close the ratings are for items both users have rated
- **Position closeness** — how similarly items are ranked in the two lists

### Compatibility (Compatibilità)

The percentage (0–100%) that measures how similar **two profiles (users)** are overall.

Computed as the **average similarity of all lists that both profiles have compiled**.
Only lists where both profiles have at least one item are included; non-compiled lists are ignored.

Examples:

- Profile A has a show list + movie list, Profile B has a show list + movie list → compatibility = average of show list similarity and movie list similarity
- Profile A has a show list + movie list, Profile B has only a show list → compatibility = show list similarity (movie list ignored)

### Affinity (Affinità)

The percentage (0–100%) that measures how well **a specific show or movie** matches **a given profile**.

Used in the recommendations engine to score candidate shows/movies for a user based on how similar neighbour users rate and rank that content.
