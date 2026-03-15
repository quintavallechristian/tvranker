"use server";

import { createClient } from "@/lib/supabase/server";
import { scoreRecommendations, type UserList } from "@/lib/recommendations";
import type { ListEntry } from "@/lib/similarity";

export type RecommendedShow = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  overview: string | null;
  score: number;
  recommendedBy: number;
};

export async function getRecommendations(): Promise<RecommendedShow[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // 1. Get current user's list + items
  const { data: myList } = await supabase
    .from("lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!myList) return [];

  const { data: myItems } = await supabase
    .from("list_items")
    .select("show_id, rating, position")
    .eq("list_id", myList.id)
    .order("position", { ascending: true });

  if (!myItems || myItems.length === 0) return [];

  const viewerList: ListEntry[] = myItems.map((i, idx) => ({
    showId: i.show_id,
    rating: i.rating,
    position: i.position ?? idx,
  }));

  // 2. Fetch all other public lists with their items in one query
  const { data: publicLists } = await supabase
    .from("lists")
    .select("id, user_id")
    .eq("is_public", true)
    .neq("user_id", user.id);

  if (!publicLists || publicLists.length === 0) return [];

  const listIds = publicLists.map((l) => l.id);

  // Fetch all list items for those lists in one batch
  const { data: allItems } = await supabase
    .from("list_items")
    .select("list_id, show_id, rating, position")
    .in("list_id", listIds)
    .order("position", { ascending: true });

  if (!allItems || allItems.length === 0) return [];

  // 3. Group items by user
  const listToUser = new Map<string, string>();
  for (const l of publicLists) {
    listToUser.set(l.id, l.user_id);
  }

  const userItemsMap = new Map<string, ListEntry[]>();
  for (const item of allItems) {
    const userId = listToUser.get(item.list_id);
    if (!userId) continue;
    if (!userItemsMap.has(userId)) userItemsMap.set(userId, []);
    userItemsMap.get(userId)!.push({
      showId: item.show_id,
      rating: item.rating,
      position: item.position,
    });
  }

  const otherLists: UserList[] = [];
  for (const [userId, items] of userItemsMap) {
    otherLists.push({ userId, items });
  }

  // 4. Run scoring algorithm
  const scored = scoreRecommendations(viewerList, otherLists);

  if (scored.length === 0) return [];

  // 5. Fetch show metadata for recommended shows
  const showIds = scored.map((s) => s.showId);
  const { data: shows } = await supabase
    .from("shows")
    .select("id, tmdb_id, title, poster_path, first_air_date, overview")
    .in("id", showIds);

  if (!shows) return [];

  const showMap = new Map(shows.map((s) => [s.id, s]));

  return scored
    .map((s) => {
      const show = showMap.get(s.showId);
      if (!show) return null;
      return {
        id: show.id,
        tmdb_id: show.tmdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
        score: Math.round(s.score * 100) / 100,
        recommendedBy: s.recommendedBy,
      };
    })
    .filter((r): r is RecommendedShow => r !== null);
}
