import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { fetchTmdbData } from "../actions";
import { ShowDetailClient } from "./page-client";

export default async function ShowDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch show
  const { data: show } = await supabase
    .from("shows")
    .select("*")
    .eq("id", id)
    .single();

  if (!show) notFound();

  // Lazily fetch TMDB data if not yet done.
  // Condition covers: tmdb_fetched=false (post-migration) OR negative tmdb_id (pre-migration placeholder).
  const needsFetch =
    (show as unknown as { tmdb_fetched?: boolean }).tmdb_fetched === false ||
    (show.tmdb_id !== null && show.tmdb_id < 0) ||
    show.tmdb_id === null;

  const enrichedShow = needsFetch ? await fetchTmdbData(id) : show;
  const finalShow = enrichedShow ?? show;

  // Aggregate stats: how many lists contain this show + average rating
  const { data: listItems } = await supabase
    .from("list_items")
    .select("rating, list_id")
    .eq("show_id", id);

  const listCount = new Set(listItems?.map((i) => i.list_id)).size;
  const ratings = (listItems ?? [])
    .map((i) => i.rating)
    .filter((r): r is number => r !== null);
  const avgRating =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) /
        10
      : null;

  // Fetch public lists that include this show, with owner info
  const { data: publicListItems } = await supabase
    .from("list_items")
    .select(
      "rating, list_id, lists!inner(id, name, is_public, user_id, profiles!inner(username, avatar_url))",
    )
    .eq("show_id", id)
    .eq("lists.is_public", true);

  const publicLists = (publicListItems ?? []).map((item) => {
    const list = item.lists as unknown as {
      id: string;
      name: string;
      is_public: boolean;
      user_id: string;
      profiles: { username: string; avatar_url: string | null };
    };
    return {
      id: list.id,
      name: list.name,
      rating: item.rating,
      owner: {
        username: list.profiles.username,
        avatarUrl: list.profiles.avatar_url,
      },
    };
  });

  return (
    <ShowDetailClient
      show={finalShow}
      stats={{ listCount, avgRating, ratingCount: ratings.length }}
      publicLists={publicLists}
    />
  );
}
