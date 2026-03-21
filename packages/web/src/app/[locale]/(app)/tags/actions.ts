"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type TagRow = {
  id: string;
  user_id: string | null;
  name: string;
  color: string;
  is_default: boolean;
  created_at: string;
};

/** Returns all tags visible to the current user: default + their own custom tags */
export async function getUserTags(): Promise<TagRow[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("tags")
    .select("*")
    .order("is_default", { ascending: false })
    .order("name");

  if (error) throw new Error(error.message);

  // Filter to only default + own (RLS also enforces this, but be explicit)
  return (data ?? []).filter(
    (t) => t.is_default || t.user_id === user?.id,
  ) as TagRow[];
}

/** Creates a new custom tag for the authenticated user */
export async function createTag(
  name: string,
  color = "slate",
): Promise<TagRow> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 50) throw new Error("Invalid tag name");

  const { data, error } = await supabase
    .from("tags")
    .insert({ user_id: user.id, name: trimmed, color, is_default: false })
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/profile");
  return data as TagRow;
}

/** Updates the color of a custom tag owned by the authenticated user */
export async function updateTagColor(
  tagId: string,
  color: string,
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("tags")
    .update({ color })
    .eq("id", tagId)
    .eq("user_id", user.id)
    .eq("is_default", false);

  if (error) throw new Error(error.message);
}

/** Deletes a custom tag owned by the authenticated user (default tags cannot be deleted) */
export async function deleteTag(tagId: string): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("tags")
    .delete()
    .eq("id", tagId)
    .eq("user_id", user.id)
    .eq("is_default", false);

  if (error) throw new Error(error.message);
  revalidatePath("/profile");
}

/** Assigns a tag to a show for the current user */
export async function addTagToShow(
  showId: string,
  tagId: string,
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("show_tags").insert({
    user_id: user.id,
    show_id: showId,
    tag_id: tagId,
  });

  // Ignore duplicate (already tagged)
  if (error && error.code !== "23505") throw new Error(error.message);
}

/** Removes a tag from a show for the current user */
export async function removeTagFromShow(
  showId: string,
  tagId: string,
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase
    .from("show_tags")
    .delete()
    .eq("user_id", user.id)
    .eq("show_id", showId)
    .eq("tag_id", tagId);

  if (error) throw new Error(error.message);
}

/** Returns tag IDs assigned to a specific show by the current user */
export async function getShowTagIds(showId: string): Promise<string[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("show_tags")
    .select("tag_id")
    .eq("user_id", user.id)
    .eq("show_id", showId);

  return (data ?? []).map((r) => r.tag_id);
}
