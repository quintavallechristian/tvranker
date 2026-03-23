import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfilePageClient } from "./page-client";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  const { count } = await supabase
    .from("lists")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_public", true);

  // Fetch the user's single list for visibility settings
  const { data: userList } = await supabase
    .from("lists")
    .select("id, is_public, visible_to_followers, visible_to_following")
    .eq("user_id", user.id)
    .single();

  // Fetch all tags visible to user (default + custom)
  const { data: tags } = await supabase
    .from("tags")
    .select("*")
    .order("is_default", { ascending: false })
    .order("name");

  return (
    <ProfilePageClient
      profile={profile}
      publicListCount={count ?? 0}
      initialTags={(tags ?? []) as TagResult[]}
      list={userList ?? null}
    />
  );
}

type TagResult = {
  id: string;
  user_id: string | null;
  name: string;
  color: string;
  is_default: boolean;
  created_at: string;
};
