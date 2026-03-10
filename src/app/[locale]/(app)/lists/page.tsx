import { createClient } from "@/lib/supabase/server";
import { ListsPageClient } from "./page-client";

export default async function ListsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: lists } = await supabase
    .from("lists")
    .select(
      `
      *,
      list_items(count)
    `,
    )
    .eq("user_id", user.id)
    .order("position", { ascending: true });

  const listsWithCount = (lists || []).map((list) => ({
    ...list,
    item_count:
      (list.list_items as unknown as { count: number }[])?.[0]?.count ?? 0,
  }));

  return <ListsPageClient lists={listsWithCount} />;
}
