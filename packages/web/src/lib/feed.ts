"use server";

import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Record a feed event (add or rate).
 * Uses UPSERT on (user_id, content_type, item_id, event_date) so that
 * a rating on the same day as an add will overwrite the add event.
 *
 * Pass an already-authenticated supabase client to avoid extra auth calls.
 */
export async function recordFeedEvent(
  supabase: SupabaseClient,
  params: {
    userId: string;
    eventType: "add_item" | "rate_item";
    contentType: "show" | "movie" | "anime" | "game" | "boardgame";
    itemId: string;
    listId: string;
    itemTitle: string;
    posterPath?: string | null;
    rating?: number | null;
  },
) {
  const {
    userId,
    eventType,
    contentType,
    itemId,
    listId,
    itemTitle,
    posterPath,
    rating,
  } = params;

  await supabase.from("feed_events").upsert(
    {
      user_id: userId,
      event_type: eventType,
      content_type: contentType,
      item_id: itemId,
      list_id: listId,
      item_title: itemTitle,
      poster_path: posterPath ?? null,
      rating: rating ?? null,
      event_date: new Date().toISOString().split("T")[0],
    },
    {
      onConflict: "user_id,content_type,item_id,event_date",
    },
  );
  // Fire-and-forget: don't throw on feed insert failure
}
