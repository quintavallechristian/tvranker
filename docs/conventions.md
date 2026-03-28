# Conventions

## Topics (Argomenti)

A **topic** is a content category that users can track and rank. Currently: TV shows and movies. Every topic shares the same structure:

### Topic structure

Each topic has:

- **A user list** — each user can build their own list for that topic
- **A ranking** — community-wide chart derived from user ratings
- **Widgets** — dashboard cards available for that topic
- **An Explore section** — discovery tab for that topic

### Widgets

Every topic supports the following widgets:

- **Podium** (or Top 10 in extended form) — top-rated items from the user's list
- **Last added** — most recently added item
- **Count** — total number of items in the list
- **Suggestions** — personalised recommendations for that topic

### Lists

All topic lists are accessible under **My Lists**.

Each list has **analytics**. The analytics that must be implemented for every list type are:

- Tag distribution
- Rating distribution
- Average rating per tag
- Release decade distribution
- Average rating per decade
- Items added over time
- Item with most seasons/volumes (if applicable to the topic)
- Longest item (if applicable to the topic)
- Longest item by release year (if applicable to the topic)

Lists and their analytics are visible on user profiles subject to the user's visibility settings.

### Similarity

For each topic, similarity is computed between two lists of that same topic. See the Recommender System section below.

### Implementation principle

**Reuse all components** — lists, widgets, analytics, explore tiles — across topics. Only the data model that populates them changes. Never duplicate UI or logic for a new topic; extend the existing components instead.

---

## Recommender System Terminology

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
