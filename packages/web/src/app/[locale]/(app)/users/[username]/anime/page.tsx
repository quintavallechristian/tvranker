import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { computeAnimeListSimilarity } from "@/lib/similarity";
import { UserAnimeListClient } from "../user-anime-list-client";
import { type AnimeItem } from "../../../anime/actions";
import { Link } from "@/i18n/navigation";
import { FilmSlate } from "@phosphor-icons/react/dist/ssr";

const PAGE_SIZE = 50;

export default async function UserAnimePage({
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

  const { data: animeList } = await supabase
    .from("anime_lists")
    .select("id, is_public, rating_labels")
    .eq("user_id", profile.id)
    .single();

  // Fetch anime items (first page)
  let animeItems: AnimeItem[] = [];
  let itemCount = 0;
  let hasMore = false;
  if (animeList) {
    const { data: itemsData, count } = await supabase
      .from("anime_list_items")
      .select("*, animes(*)", { count: "exact" })
      .eq("anime_list_id", animeList.id)
      .order("rating", { ascending: false, nullsFirst: false })
      .order("position", { ascending: true })
      .range(0, PAGE_SIZE - 1);
    animeItems = (itemsData ?? []) as unknown as AnimeItem[];
    itemCount = count ?? animeItems.length;
    hasMore = animeItems.length === PAGE_SIZE && itemCount > PAGE_SIZE;
  }

  // Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  // Compute anime similarity
  let animeSimilarityScore: number | null = null;
  if (user && !isOwnProfile && animeList) {
    const { data: viewerAnimeList } = await supabase
      .from("anime_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (viewerAnimeList) {
      const [viewerAnimeItems, profileAnimeItems] = await Promise.all([
        supabase
          .from("anime_list_items")
          .select("anime_id, rating, position")
          .eq("anime_list_id", viewerAnimeList.id)
          .order("position", { ascending: true }),
        supabase
          .from("anime_list_items")
          .select("anime_id, rating, position")
          .eq("anime_list_id", animeList.id)
          .order("position", { ascending: true }),
      ]);
      const animeListA = (viewerAnimeItems.data ?? []).map((i, idx) => ({
        animeId: i.anime_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const animeListB = (profileAnimeItems.data ?? []).map((i, idx) => ({
        animeId: i.anime_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      animeSimilarityScore = computeAnimeListSimilarity(animeListA, animeListB);
    }
  }

  // Fetch viewer's anime IDs for "already in my list" markers
  let viewerAnimeIds = new Set<string>();
  if (user && !isOwnProfile && animeList) {
    const { data: viewerAnimeList } = await supabase
      .from("anime_lists")
      .select("id")
      .eq("user_id", user.id)
      .single();
    if (viewerAnimeList) {
      const { data: viewerItems } = await supabase
        .from("anime_list_items")
        .select("anime_id")
        .eq("anime_list_id", viewerAnimeList.id);
      viewerAnimeIds = new Set((viewerItems ?? []).map((i) => i.anime_id));
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
          {animeSimilarityScore !== null && (
            <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
              <span className="text-sm font-semibold text-accent">
                {animeSimilarityScore}%
              </span>
              <span className="text-xs text-text-muted">
                {tUsers("compatible")}
              </span>
            </div>
          )}
          <Link
            href={`/users/${profile.username}/anime/analytics`}
            className="rounded-md border border-border px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-border-hover hover:text-text-secondary"
          >
            {tUsers("analytics")}
          </Link>
        </div>
      </div>

      {/* Anime count */}
      {animeList && (
        <div className="mb-4 flex items-center gap-2">
          <FilmSlate size={16} className="text-text-muted" />
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
            {tUsers("animeCount", { count: itemCount })}
          </p>
        </div>
      )}

      {/* List */}
      {animeList ? (
        animeItems.length === 0 ? (
          <p className="text-sm text-text-muted">{tUsers("noAnime")}</p>
        ) : (
          <UserAnimeListClient
            animeListId={animeList.id}
            initialItems={animeItems}
            initialHasMore={hasMore}
            isLoggedIn={!!user && !isOwnProfile}
            viewerAnimeIds={viewerAnimeIds}
            ratingLabels={animeList.rating_labels ?? profile.rating_labels}
          />
        )
      ) : (
        <p className="text-sm text-text-muted">{tUsers("privateAnimeList")}</p>
      )}
    </div>
  );
}
