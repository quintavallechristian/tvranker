import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, GameController } from "@phosphor-icons/react/dist/ssr";
import { UserAvatar } from "@/components/UserAvatar";
import { UserGameListClient } from "@/app/[locale]/(app)/users/[username]/user-game-list-client";
import type { GameItem } from "../../actions";

const PAGE_SIZE = 50;

export default async function PublicGameListPage({
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

  const { data: gameList } = await supabase
    .from("game_lists")
    .select("id, user_id, name, is_public, rating_labels")
    .eq("id", id)
    .single();

  if (!gameList) notFound();
  if (!gameList.is_public && user?.id !== gameList.user_id) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, rating_labels")
    .eq("id", gameList.user_id)
    .single();

  if (!profile) notFound();

  const { data: itemsData, count } = await supabase
    .from("game_list_items")
    .select("*, games(*)", { count: "exact" })
    .eq("game_list_id", gameList.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const gameItems = (itemsData ?? []) as unknown as GameItem[];
  const itemCount = count ?? gameItems.length;
  const hasMore = gameItems.length === PAGE_SIZE && itemCount > PAGE_SIZE;
  const isOwnList = user?.id === gameList.user_id;

  let viewerGameIds = new Set<string>();
  if (user && !isOwnList) {
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

  const ratingLabels = (gameList.rating_labels ?? profile.rating_labels) as
    | string[]
    | null;

  return (
    <div>
      <Link
        href={`/users/${profile.username}/games`}
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
        <GameController size={16} className="text-text-muted" />
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {tUsers("gameCount", { count: itemCount })}
        </p>
      </div>

      {gameItems.length === 0 ? (
        <p className="text-sm text-text-muted">{tUsers("noGames")}</p>
      ) : (
        <UserGameListClient
          gameListId={gameList.id}
          initialItems={gameItems}
          initialHasMore={hasMore}
          isLoggedIn={!!user && !isOwnList}
          viewerGameIds={viewerGameIds}
          ratingLabels={ratingLabels}
        />
      )}
    </div>
  );
}
