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
    .select("id, user_id, name, description, is_public")
    .eq("user_id", user.id)
    .single();

  if (!movieList) {
    const { data: created } = await supabase
      .from("movie_lists")
      .insert({ user_id: user.id, name: "My Movies" })
      .select("id, user_id, name, description, is_public")
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

  // Fetch owner's rating labels
  const { data: ownerProfile } = await supabase
    .from("profiles")
    .select("rating_labels")
    .eq("id", user.id)
    .single();

  return (
    <MovieListClient
      movieListId={movieList.id}
      description={movieList.description ?? null}
      isPublic={movieList.is_public ?? false}
      initialItems={firstPageItems}
      existingTmdbIds={existingTmdbIds}
      ratingLabels={ownerProfile?.rating_labels as string[] | null}
      hasMore={hasMore}
    />
  );
}
