"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function followUser(followingId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("follows").insert({
    follower_id: user.id,
    following_id: followingId,
  });
  if (error) throw error;

  revalidatePath("/seguiti");
}

export async function unfollowUser(followingId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", followingId);
  if (error) throw error;

  revalidatePath("/seguiti");
}

export type FollowedUser = {
  id: string;
  username: string;
  avatar_url: string | null;
  show_count: number;
  similarity: number | null;
};

export async function getFollowing(): Promise<FollowedUser[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: follows } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id);

  if (!follows || follows.length === 0) return [];

  const followingIds = follows.map((f) => f.following_id);

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, username, avatar_url")
    .in("id", followingIds);

  if (!profiles || profiles.length === 0) return [];

  // Get viewer's list for similarity computation
  const { data: viewerList } = await supabase
    .from("lists")
    .select("id")
    .eq("user_id", user.id)
    .single();

  let viewerItems: {
    showId: string;
    rating: number | null;
    position: number;
  }[] = [];
  if (viewerList) {
    const { data } = await supabase
      .from("list_items")
      .select("show_id, rating, position")
      .eq("list_id", viewerList.id)
      .order("position", { ascending: true });
    viewerItems = (data ?? []).map((i, idx) => ({
      showId: i.show_id,
      rating: i.rating,
      position: i.position ?? idx,
    }));
  }

  const { computeListSimilarity } = await import("@/lib/similarity");

  const results: FollowedUser[] = [];
  for (const profile of profiles) {
    const { data: pList } = await supabase
      .from("lists")
      .select("id, is_public")
      .eq("user_id", profile.id)
      .single();

    let show_count = 0;
    let similarity: number | null = null;

    if (pList?.is_public) {
      const { data: listItems, count } = await supabase
        .from("list_items")
        .select("show_id, rating, position", { count: "exact" })
        .eq("list_id", pList.id)
        .order("position", { ascending: true });

      show_count = count ?? 0;

      if (viewerItems.length > 0 && listItems && listItems.length > 0) {
        const otherItems = listItems.map((i, idx) => ({
          showId: i.show_id,
          rating: i.rating,
          position: i.position ?? idx,
        }));
        similarity = computeListSimilarity(viewerItems, otherItems);
      }
    }

    results.push({ ...profile, show_count, similarity });
  }

  return results;
}
