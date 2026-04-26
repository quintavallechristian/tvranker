import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, FilmSlate } from "@phosphor-icons/react/dist/ssr";
import { UserAvatar } from "@/components/UserAvatar";
import { UserAnimeListClient } from "@/app/[locale]/(app)/users/[username]/user-anime-list-client";
import type { AnimeItem } from "../../actions";

const PAGE_SIZE = 50;

export default async function PublicAnimeListPage({
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

  const { data: animeList } = await supabase
    .from("anime_lists")
    .select("id, user_id, name, is_public, rating_labels")
    .eq("id", id)
    .single();

  if (!animeList) notFound();
  if (!animeList.is_public && user?.id !== animeList.user_id) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, avatar_url, rating_labels")
    .eq("id", animeList.user_id)
    .single();

  if (!profile) notFound();

  const { data: itemsData, count } = await supabase
    .from("anime_list_items")
    .select("*, animes(*)", { count: "exact" })
    .eq("anime_list_id", animeList.id)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("position", { ascending: true })
    .range(0, PAGE_SIZE - 1);

  const animeItems = (itemsData ?? []) as unknown as AnimeItem[];
  const itemCount = count ?? animeItems.length;
  const hasMore = animeItems.length === PAGE_SIZE && itemCount > PAGE_SIZE;
  const isOwnList = user?.id === animeList.user_id;

  let viewerAnimeIds = new Set<string>();
  if (user && !isOwnList) {
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

  const ratingLabels = (animeList.rating_labels ?? profile.rating_labels) as
    | string[]
    | null;

  return (
    <div>
      <Link
        href={`/users/${profile.username}/anime`}
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
        <FilmSlate size={16} className="text-text-muted" />
        <p className="text-xs font-medium uppercase tracking-widest text-text-muted">
          {tUsers("animeCount", { count: itemCount })}
        </p>
      </div>

      {animeItems.length === 0 ? (
        <p className="text-sm text-text-muted">{tUsers("noAnime")}</p>
      ) : (
        <UserAnimeListClient
          animeListId={animeList.id}
          initialItems={animeItems}
          initialHasMore={hasMore}
          isLoggedIn={!!user && !isOwnList}
          viewerAnimeIds={viewerAnimeIds}
          ratingLabels={ratingLabels}
        />
      )}
    </div>
  );
}
