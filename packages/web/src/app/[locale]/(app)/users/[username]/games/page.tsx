import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { computeGameListSimilarity } from "@/lib/similarity";
import { UserGameListClient } from "../user-game-list-client";
import { type GameItem } from "../../../games/actions";
import { Link } from "@/i18n/navigation";
import { GameController } from "@phosphor-icons/react/dist/ssr";

const PAGE_SIZE = 50;

export default async function UserGamesPage({
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

  const { data: gameList } = await supabase
    .from("game_lists")
    .select("id, is_public")
    .eq("user_id", profile.id)
    .single();

  // Fetch game items (first page)
  let gameItems: GameItem[] = [];
  let itemCount = 0;
  let hasMore = false;
  if (gameList) {
    const { data: itemsData, count } = await supabase
      .from("game_list_items")
      .select("*, games(*)", { count: "exact" })
      .eq("game_list_id", gameList.id)
      .order("rating", { ascending: false, nullsFirst: false })
      .order("position", { ascending: true })
      .range(0, PAGE_SIZE - 1);
    gameItems = (itemsData ?? []) as unknown as GameItem[];
    itemCount = count ?? gameItems.length;
    hasMore = gameItems.length === PAGE_SIZE && itemCount > PAGE_SIZE;
  }

  // Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  // Compute game similarity
  let gameSimilarityScore: number | null = null;
  if (user && !isOwnProfile && gameList) {
    const { data: viewerGameList } = await supabase
      .from("game_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (viewerGameList) {
      const [viewerGameItems, profileGameItems] = await Promise.all([
        supabase
          .from("game_list_items")
          .select("game_id, rating, position")
          .eq("game_list_id", viewerGameList.id)
          .order("position", { ascending: true }),
        supabase
          .from("game_list_items")
          .select("game_id, rating, position")
          .eq("game_list_id", gameList.id)
          .order("position", { ascending: true }),
      ]);
      const gameListA = (viewerGameItems.data ?? []).map((i, idx) => ({
        gameId: i.game_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const gameListB = (profileGameItems.data ?? []).map((i, idx) => ({
        gameId: i.game_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      gameSimilarityScore = computeGameListSimilarity(gameListA, gameListB);
    }
  }

  // Fetch viewer's game IDs for "already in my list" markers
  let viewerGameIds = new Set<string>();
  if (user && !isOwnProfile && gameList) {
    const { data: viewerGameList } = await supabase
      .from("game_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (viewerGameList) {
      const { data: viewerItems } = await supabase
        .from("game_list_items")
        .select("game_id")
        .eq("game_list_id", viewerGameList.id);
      viewerGameIds = new Set((viewerItems ?? []).map((i) => i.game_id));
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
          {gameSimilarityScore !== null && (
            <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
              <span className="text-sm font-semibold text-accent">
                {gameSimilarityScore}%
              </span>
              <span className="text-xs text-text-muted">
                {tUsers("compatible")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Game count */}
      {gameList && (
        <div className="mb-4 flex items-center gap-2">
          <GameController size={16} className="text-text-muted" />
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {tUsers("gameCount", { count: itemCount })}
          </p>
        </div>
      )}

      {/* List */}
      {gameList ? (
        gameItems.length === 0 ? (
          <p className="text-sm text-text-muted">{tUsers("noGames")}</p>
        ) : (
          <UserGameListClient
            gameListId={gameList.id}
            initialItems={gameItems}
            initialHasMore={hasMore}
            isLoggedIn={!!user && !isOwnProfile}
            viewerGameIds={viewerGameIds}
            ratingLabels={profile.rating_labels}
          />
        )
      ) : (
        <p className="text-sm text-text-muted">{tUsers("privateGameList")}</p>
      )}
    </div>
  );
}
