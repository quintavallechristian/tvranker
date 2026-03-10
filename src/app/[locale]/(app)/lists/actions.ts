"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createList(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || null;

  // Get max position
  const { data: lists } = await supabase
    .from("lists")
    .select("position")
    .eq("user_id", user.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (lists?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from("lists")
    .insert({
      user_id: user.id,
      name,
      description,
      position: nextPosition,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/lists");
  return data;
}

export async function updateList(
  listId: string,
  updates: { name?: string; description?: string; is_public?: boolean },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("lists")
    .update(updates)
    .eq("id", listId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/lists");
}

export async function deleteList(listId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("lists")
    .delete()
    .eq("id", listId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/lists");
}

export async function addShowToList(
  listId: string,
  show: {
    tmdb_id: number;
    title: string;
    poster_path: string | null;
    first_air_date?: string;
    overview?: string;
  },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Upsert show in shows table
  let { data: existingShow } = await supabase
    .from("shows")
    .select("id")
    .eq("tmdb_id", show.tmdb_id)
    .single();

  if (!existingShow) {
    const { data: newShow, error: showError } = await supabase
      .from("shows")
      .insert({
        tmdb_id: show.tmdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date || null,
        overview: show.overview || null,
      })
      .select()
      .single();

    if (showError) throw new Error(showError.message);
    existingShow = newShow;
  }

  // Get max position in list
  const { data: items } = await supabase
    .from("list_items")
    .select("position")
    .eq("list_id", listId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("list_items").insert({
    list_id: listId,
    show_id: existingShow!.id,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/lists/${listId}`);
}

export async function removeShowFromList(listId: string, itemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("list_items").delete().eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath(`/lists/${listId}`);
}

export async function updateShowRating(
  listId: string,
  itemId: string,
  rating: number,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  if (rating < 1 || rating > 10) throw new Error("Rating must be 1-10");

  const { error } = await supabase
    .from("list_items")
    .update({ rating })
    .eq("id", itemId);

  if (error) throw new Error(error.message);

  revalidatePath(`/lists/${listId}`);
}

export async function reorderListItems(listId: string, itemIds: string[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Update positions
  const updates = itemIds.map((id, index) =>
    supabase.from("list_items").update({ position: index }).eq("id", id),
  );

  await Promise.all(updates);

  revalidatePath(`/lists/${listId}`);
}

export async function importFromJson(jsonData: unknown) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { parseTraktJson } = await import("@/lib/import/trakt-parser");
  const parsed = parseTraktJson(jsonData);

  // Create the list
  const { data: lists } = await supabase
    .from("lists")
    .select("position")
    .eq("user_id", user.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (lists?.[0]?.position ?? -1) + 1;

  const { data: list, error: listError } = await supabase
    .from("lists")
    .insert({
      user_id: user.id,
      name: parsed.name,
      description: parsed.description || null,
      is_public: parsed.is_public,
      position: nextPosition,
    })
    .select()
    .single();

  if (listError) throw new Error(listError.message);

  // Insert shows directly without TMDB resolution.
  // TMDB data will be fetched lazily when visiting the show detail page.
  let position = 0;
  for (const show of parsed.shows) {
    try {
      let dbShowId: string | null = null;

      // Try to find existing show by imdb_id first, then by exact title
      if (show.imdb_id) {
        const { data: existing } = await supabase
          .from("shows")
          .select("id")
          .eq("imdb_id", show.imdb_id)
          .limit(1)
          .single();
        dbShowId = existing?.id ?? null;
      }

      if (!dbShowId) {
        const { data: existing } = await supabase
          .from("shows")
          .select("id")
          .ilike("title", show.title)
          .limit(1)
          .single();
        dbShowId = existing?.id ?? null;
      }

      // Insert new show if not found
      if (!dbShowId) {
        // Use a negative title hash as placeholder tmdb_id until TMDB data is fetched.
        // TMDB only uses positive IDs, so negatives are safe as placeholders.
        // If tmdb_id column is nullable (after migration), null would be used here instead.
        const placeholderTmdbId = -(
          Math.abs(
            show.title.split("").reduce((a, c) => a + c.charCodeAt(0) * 31, 0),
          ) % 2000000000
        );
        const { data: newShow } = await supabase
          .from("shows")
          .insert({
            title: show.title,
            imdb_id: show.imdb_id,
            tmdb_id: placeholderTmdbId,
            poster_path: null,
            first_air_date: null,
            overview: null,
          })
          .select("id")
          .single();
        dbShowId = newShow?.id ?? null;
      }

      if (dbShowId) {
        await supabase
          .from("list_items")
          .insert({ list_id: list.id, show_id: dbShowId, position });
        position++;
      }
    } catch (e) {
      console.error(`Failed to save show: ${show.title}`, e);
    }
  }

  revalidatePath("/lists");
  return { listId: list.id, importedCount: position };
}

export type ListItemWithShow = {
  id: string;
  list_id: string;
  show_id: string;
  rating: number | null;
  position: number;
  added_at: string;
  notes: string | null;
  shows: {
    id: string;
    tmdb_id: number | null;
    imdb_id: string | null;
    title: string;
    poster_path: string | null;
    first_air_date: string | null;
    overview: string | null;
    tmdb_fetched: boolean;
  };
};

export async function getListItemsPage(
  listId: string,
  page: number,
  pageSize = 50,
): Promise<{
  items: ListItemWithShow[];
  hasMore: boolean;
  showTagsMap: Record<string, string[]>;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: list } = await supabase
    .from("lists")
    .select("user_id, is_public")
    .eq("id", listId)
    .single();

  if (!list) throw new Error("List not found");
  if (!list.is_public && list.user_id !== user?.id)
    throw new Error("Unauthorized");

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await supabase
    .from("list_items")
    .select("*, shows(*)")
    .eq("list_id", listId)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(from, to);

  if (error) throw new Error(error.message);

  const items = (data ?? []) as unknown as ListItemWithShow[];
  const hasMore = items.length === pageSize;

  const showTagsMap: Record<string, string[]> = {};
  if (user && items.length > 0) {
    const { data: showTags } = await supabase
      .from("show_tags")
      .select("show_id, tag_id")
      .eq("user_id", user.id)
      .in(
        "show_id",
        items.map((i) => i.shows.id),
      );

    for (const st of showTags ?? []) {
      if (!showTagsMap[st.show_id]) showTagsMap[st.show_id] = [];
      showTagsMap[st.show_id].push(st.tag_id);
    }
  }

  return { items, hasMore, showTagsMap };
}

export async function addShowToMyList(
  targetListId: string,
  show: {
    id: string;
    tmdb_id: number | null;
    imdb_id: string | null;
    title: string;
    poster_path: string | null;
    first_air_date: string | null;
    overview: string | null;
  },
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify the target list belongs to the current user
  const { data: targetList } = await supabase
    .from("lists")
    .select("id, user_id")
    .eq("id", targetListId)
    .eq("user_id", user.id)
    .single();

  if (!targetList) throw new Error("List not found or not owned by you");

  // Ensure the show exists in our DB (reuse existing or create)
  let showId = show.id;
  const { data: existingShow } = await supabase
    .from("shows")
    .select("id")
    .eq("id", show.id)
    .single();

  if (!existingShow) {
    // Show might not exist if the DB is in a weird state — create it
    const { data: newShow, error: showError } = await supabase
      .from("shows")
      .insert({
        tmdb_id: show.tmdb_id ?? -(Math.abs(show.title.split("").reduce((a, c) => a + c.charCodeAt(0) * 31, 0)) % 2000000000),
        imdb_id: show.imdb_id,
        title: show.title,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        overview: show.overview,
      })
      .select("id")
      .single();
    if (showError) throw new Error(showError.message);
    showId = newShow!.id;
  }

  // Check if already in target list
  const { data: existing } = await supabase
    .from("list_items")
    .select("id")
    .eq("list_id", targetListId)
    .eq("show_id", showId)
    .single();

  if (existing) return { alreadyExists: true };

  // Get max position
  const { data: items } = await supabase
    .from("list_items")
    .select("position")
    .eq("list_id", targetListId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (items?.[0]?.position ?? -1) + 1;

  const { error } = await supabase.from("list_items").insert({
    list_id: targetListId,
    show_id: showId,
    position: nextPosition,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/lists/${targetListId}`);
  return { alreadyExists: false };
}

export async function duplicateList(sourceListId: string, newName: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  // Verify source list is public (or owned by user)
  const { data: sourceList } = await supabase
    .from("lists")
    .select("id, name, description, is_public, user_id")
    .eq("id", sourceListId)
    .single();

  if (!sourceList) throw new Error("List not found");
  if (!sourceList.is_public && sourceList.user_id !== user.id)
    throw new Error("Unauthorized");

  // Get max position for user's lists
  const { data: userLists } = await supabase
    .from("lists")
    .select("position")
    .eq("user_id", user.id)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (userLists?.[0]?.position ?? -1) + 1;

  // Create the new list
  const { data: newList, error: listError } = await supabase
    .from("lists")
    .insert({
      user_id: user.id,
      name: newName,
      description: sourceList.description,
      position: nextPosition,
      is_public: false,
    })
    .select()
    .single();

  if (listError) throw new Error(listError.message);

  // Fetch all items from source list
  const { data: sourceItems } = await supabase
    .from("list_items")
    .select("show_id, rating, position, notes")
    .eq("list_id", sourceListId)
    .order("position", { ascending: true });

  if (sourceItems && sourceItems.length > 0) {
    const inserts = sourceItems.map((item) => ({
      list_id: newList.id,
      show_id: item.show_id,
      rating: item.rating,
      position: item.position,
      notes: item.notes,
    }));

    const { error: insertError } = await supabase
      .from("list_items")
      .insert(inserts);

    if (insertError) throw new Error(insertError.message);
  }

  revalidatePath("/lists");
  return { listId: newList.id, itemCount: sourceItems?.length ?? 0 };
}
