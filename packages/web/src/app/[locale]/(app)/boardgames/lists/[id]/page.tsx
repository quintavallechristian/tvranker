import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, PuzzlePiece } from "@phosphor-icons/react/dist/ssr";
import { UserAvatar } from "@/components/UserAvatar";
import { UserBoardgameListClient } from "@/app/[locale]/(app)/users/[username]/user-boardgame-list-client";
import type { BoardgameItem } from "../../actions";

const PAGE_SIZE = 50;

export default async function PublicBoardgameListPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const tUsers = await getTranslations("users");
  const tCommon = await getTranslations("common");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: boardgameList } = await supabase
    .from("boardgame_lists")
    .select("id, user_id, name, is_public, rating_labels")
    .eq("id", id)
    .single();

  if (!boardgameList) notFound();
  if (!boardgameList.is_public && user?.id !== boardgameList.user_id)
    notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, rating_labels")
    .eq("id", boardgameList.user_id)
    .single();

  if (!profile) notFound();

  const { data: itemsData, count } = await supabase
    .from("boardgame_list_items")
    .select("*, boardgames(*)", { count: "exact" })
    .eq("boardgame_list_id", boardgameList.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const boardgameItems = (itemsData ?? []) as unknown as BoardgameItem[];
  const itemCount = count ?? boardgameItems.length;
  const hasMore = boardgameItems.length === PAGE_SIZE && itemCount > PAGE_SIZE;
  const isOwnList = user?.id === boardgameList.user_id;

  let viewerBoardgameIds = new Set<string>();
  if (user && !isOwnList) {
    const { data: viewerBoardgameList } = await supabase
      .from("boardgame_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (viewerBoardgameList) {
      const { data: viewerItems } = await supabase
        .from("boardgame_list_items")
        .select("boardgame_id")
        .eq("boardgame_list_id", viewerBoardgameList.id);
      viewerBoardgameIds = new Set(
        (viewerItems ?? []).map((i) => i.boardgame_id),
      );
    }
  }

  const ratingLabels = (boardgameList.rating_labels ??
    profile.rating_labels) as string[] | null;

  return (
    <div>
      <Link
        href={`/users/${profile.username}/boardgames`}
        className="mb-6 inline-flex items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-text-secondary"
      >
        <ArrowLeft size={13} />
        {tCommon("back")}
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/users/${profile.username}`}
          className="flex items-center gap-3"
        >
          <UserAvatar
            url={profile.avatar_url}
            username={profile.username}
            size={40}
          />
          <span className="text-base font-semibold tracking-tight text-text-primary">
            @{profile.username}
          </span>
        </Link>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <PuzzlePiece size={16} className="text-text-muted" />
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {tUsers("boardgameCount", { count: itemCount })}
        </p>
      </div>

      {boardgameItems.length === 0 ? (
        <p className="text-sm text-text-muted">{tUsers("noBoardgames")}</p>
      ) : (
        <UserBoardgameListClient
          boardgameListId={boardgameList.id}
          initialItems={boardgameItems}
          initialHasMore={hasMore}
          isLoggedIn={!!user && !isOwnList}
          viewerBoardgameIds={viewerBoardgameIds}
          ratingLabels={ratingLabels}
        />
      )}
    </div>
  );
}
