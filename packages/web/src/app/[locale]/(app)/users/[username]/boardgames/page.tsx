import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { computeBoardgameListSimilarity } from "@/lib/similarity";
import { UserBoardgameListClient } from "../user-boardgame-list-client";
import { type BoardgameItem } from "../../../boardgames/actions";
import { Link } from "@/i18n/navigation";
import { PuzzlePiece } from "@phosphor-icons/react/dist/ssr";

const PAGE_SIZE = 50;

export default async function UserBoardgamesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();
  const tUsers = await getTranslations("users");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: boardgameList } = await supabase
    .from("boardgame_lists")
    .select("id, is_public, rating_labels")
    .eq("user_id", profile.id)
    .single();

  let boardgameItems: BoardgameItem[] = [];
  let itemCount = 0;
  let hasMore = false;
  if (boardgameList) {
    const { data: itemsData, count } = await supabase
      .from("boardgame_list_items")
      .select("*, boardgames(*)", { count: "exact" })
      .eq("boardgame_list_id", boardgameList.id)
      .order("rating", { ascending: false, nullsFirst: false })
      .order("position", { ascending: true })
      .range(0, PAGE_SIZE - 1);
    boardgameItems = (itemsData ?? []) as unknown as BoardgameItem[];
    itemCount = count ?? boardgameItems.length;
    hasMore = boardgameItems.length === PAGE_SIZE && itemCount > PAGE_SIZE;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  let boardgameSimilarityScore: number | null = null;
  if (user && !isOwnProfile && boardgameList) {
    const { data: viewerList } = await supabase
      .from("boardgame_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (viewerList) {
      const [viewerItems, profileItems] = await Promise.all([
        supabase
          .from("boardgame_list_items")
          .select("boardgame_id, rating, position")
          .eq("boardgame_list_id", viewerList.id)
          .order("position", { ascending: true }),
        supabase
          .from("boardgame_list_items")
          .select("boardgame_id, rating, position")
          .eq("boardgame_list_id", boardgameList.id)
          .order("position", { ascending: true }),
      ]);
      const listA = (viewerItems.data ?? []).map((i, idx) => ({
        boardgameId: i.boardgame_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const listB = (profileItems.data ?? []).map((i, idx) => ({
        boardgameId: i.boardgame_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      boardgameSimilarityScore = computeBoardgameListSimilarity(listA, listB);
    }
  }

  let viewerBoardgameIds = new Set<string>();
  if (user && !isOwnProfile && boardgameList) {
    const { data: viewerList } = await supabase
      .from("boardgame_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (viewerList) {
      const { data: viewerItems } = await supabase
        .from("boardgame_list_items")
        .select("boardgame_id")
        .eq("boardgame_list_id", viewerList.id);
      viewerBoardgameIds = new Set(
        (viewerItems ?? []).map((i) => i.boardgame_id),
      );
    }
  }

  return (
    <div>
      {/* Header */}
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

        <div className="ml-auto flex items-center gap-3">
          {boardgameSimilarityScore !== null && (
            <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
              <span className="text-sm font-semibold text-accent">
                {boardgameSimilarityScore}%
              </span>
              <span className="text-xs text-text-muted">
                {tUsers("compatible")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Boardgame count */}
      {boardgameList && (
        <div className="mb-4 flex items-center gap-2">
          <PuzzlePiece size={16} className="text-text-muted" />
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {tUsers("boardgameCount", { count: itemCount })}
          </p>
        </div>
      )}

      {/* List */}
      {boardgameList ? (
        boardgameItems.length === 0 ? (
          <p className="text-sm text-text-muted">{tUsers("noBoardgames")}</p>
        ) : (
          <UserBoardgameListClient
            boardgameListId={boardgameList.id}
            initialItems={boardgameItems}
            initialHasMore={hasMore}
            isLoggedIn={!!user && !isOwnProfile}
            viewerBoardgameIds={viewerBoardgameIds}
            ratingLabels={
              (boardgameList.rating_labels ?? profile.rating_labels) as
                | string[]
                | null
            }
          />
        )
      ) : (
        <p className="text-sm text-text-muted">
          {tUsers("privateBoardgameList")}
        </p>
      )}
    </div>
  );
}
