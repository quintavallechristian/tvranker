import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MovieListClient } from "./page-client";
import type { MovieItem } from "./actions";

const PAGE_SIZE = 50;

export default async function MoviesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch (or auto-create) the user's movie_list via upsert
  let { data: movieList } = await supabase
    .from("movie_lists")
    .select("id, user_id, name, description, is_public, visible_to_followers, visible_to_following, rating_labels, custom_visibility")
    .eq("user_id", user.id)
    .single();

  if (!movieList) {
    const { data: created } = await supabase
      .from("movie_lists")
      .insert({ user_id: user.id, name: "My Movies" })
      .select("id, user_id, name, description, is_public, visible_to_followers, visible_to_following, rating_labels, custom_visibility")
      .single();
    movieList = created;
  }

  if (!movieList) redirect("/home");

  // Fetch first page of movie items
  const { data: firstPageData } = await supabase
    .from("movie_list_items")
    .select("*, movies(*)")
    .eq("movie_list_id", movieList.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const firstPageItems = (firstPageData ?? []) as unknown as MovieItem[];
  const hasMore = firstPageItems.length === PAGE_SIZE;

  // Fetch all TMDB ids for "already added" check
  const { data: allTmdbRows } = await supabase
    .from("movie_list_items")
    .select("movies(tmdb_id)")
    .eq("movie_list_id", movieList.id);

  const existingTmdbIds = (allTmdbRows ?? [])
    .map((row) => (row.movies as { tmdb_id: number | null } | null)?.tmdb_id)
    .filter((v): v is number => v != null && v > 0);

  // Fetch owner's rating labels and visibility defaults
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("rating_labels, default_is_public, default_visible_to_followers, default_visible_to_following")
    .eq("id", user.id)
    .single();

  const profileRatingLabels = ownerProfile?.rating_labels as string[] | null;
  const listRatingLabels = movieList.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <MovieListClient
      movieListId={movieList.id}
      description={movieList.description ?? null}
      isPublic={movieList.is_public ?? false}
      initialItems={firstPageItems}
      existingTmdbIds={existingTmdbIds}
      ratingLabels={effectiveRatingLabels}
      hasMore={hasMore}
      listSettings={{
        is_public: movieList.is_public ?? true,
        visible_to_followers: movieList.visible_to_followers ?? false,
        visible_to_following: movieList.visible_to_following ?? false,
        rating_labels: listRatingLabels,
        custom_visibility: movieList.custom_visibility ?? false,
      }}
      profileRatingLabels={profileRatingLabels}
      profileVisibility={{
        is_public: ownerProfile?.default_is_public ?? false,
        visible_to_followers: ownerProfile?.default_visible_to_followers ?? false,
        visible_to_following: ownerProfile?.default_visible_to_following ?? false,
      }}
    />
  );
}
