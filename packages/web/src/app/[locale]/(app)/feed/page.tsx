import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { Link } from "@/i18n/navigation";
import { EmptyState } from "@/components/EmptyState";
import { getPosterUrl } from "@/lib/tmdb/client";
import type { Database } from "@/lib/supabase/types";
import {
  Television,
  FilmSlate,
  GameController,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

type FeedEvent = {
  id: string;
  event_type: "add_item" | "rate_item";
  content_type: "show" | "movie" | "anime" | "game";
  item_id: string;
  list_id: string;
  item_title: string;
  poster_path: string | null;
  rating: number | null;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  } | null;
};

type FeedEventRow = Database["public"]["Tables"]["feed_events"]["Row"];

type FeedEventQueryRow = FeedEventRow & {
  user:
    | {
        id: string;
        username: string;
        avatar_url: string | null;
      }
    | {
        id: string;
        username: string;
        avatar_url: string | null;
      }[]
    | null;
};

const CONTENT_TYPE_ROUTES: Record<string, string> = {
  show: "shows",
  movie: "movies",
  anime: "anime",
  game: "games",
};

function getImageUrl(
  contentType: string,
  posterPath: string | null,
): string | null {
  if (!posterPath) return null;
  // Games store full IGDB URLs; shows/movies/anime store TMDB relative paths
  if (contentType === "game") return posterPath;
  return getPosterUrl(posterPath, "w185");
}

function ContentIcon({ type }: { type: string }) {
  if (type === "game")
    return <GameController size={14} className="text-text-faint" />;
  if (type === "show" || type === "anime")
    return <Television size={14} className="text-text-faint" />;
  return <FilmSlate size={14} className="text-text-faint" />;
}

function formatTime(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return locale === "it" ? "Adesso" : "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return locale === "it" ? `${minutes} min fa` : `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return locale === "it" ? `${hours}h fa` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return locale === "it" ? `${days}g fa` : `${days}d ago`;

  return date.toLocaleDateString(locale === "it" ? "it-IT" : "en-US", {
    day: "numeric",
    month: "short",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export default async function FeedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const t = await getTranslations("feed");

  const { data: follows } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id);

  const followingIds = (follows ?? []).map((f) => f.following_id);

  let events: FeedEvent[] = [];

  if (followingIds.length > 0) {
    const feedEventsQuery = supabase
      .from("feed_events")
      .select(
        "id, event_type, content_type, item_id, list_id, item_title, poster_path, rating, created_at, user:profiles!feed_events_user_id_fkey(id, username, avatar_url)",
      )
      .in("user_id", followingIds)
      .order("created_at", { ascending: false })
      .limit(100)
      .overrideTypes<FeedEventQueryRow[]>();

    const { data: rawEvents } = await feedEventsQuery;

    events = (rawEvents ?? []).map((event) => ({
      id: event.id,
      event_type: event.event_type as FeedEvent["event_type"],
      content_type: event.content_type as FeedEvent["content_type"],
      item_id: event.item_id,
      list_id: event.list_id,
      item_title: event.item_title,
      poster_path: event.poster_path,
      rating: event.rating,
      created_at: event.created_at,
      user: Array.isArray(event.user) ? (event.user[0] ?? null) : event.user,
    }));
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-text-primary">
          {t("title")}
        </h1>
      </div>

      {events.length === 0 ? (
        <EmptyState
          title={t("emptyTitle")}
          description={t("emptyDescription")}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {events.map((event) => {
            const actor = event.user;
            if (!actor) return null;

            const contentRoute = CONTENT_TYPE_ROUTES[event.content_type];
            const itemHref = `/${contentRoute}/${event.item_id}`;
            const listHref = `/users/${actor.username}/${contentRoute}`;
            const listLabel = t(
              `${event.content_type}List` as
                | "showList"
                | "movieList"
                | "animeList"
                | "gameList",
            );
            const imageUrl = getImageUrl(event.content_type, event.poster_path);
            const isRating = event.event_type === "rate_item";

            return (
              <div
                key={event.id}
                className="flex gap-3 rounded-xl border border-border bg-bg-surface p-4 transition-colors hover:border-border-hover"
              >
                {/* Poster */}
                <Link href={itemHref} className="shrink-0">
                  <div className="relative h-36 w-24 overflow-hidden rounded-lg border border-border bg-bg-elevated">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={event.item_title}
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized={event.content_type === "game"}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ContentIcon type={event.content_type} />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Body */}
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  {/* Top row: avatar + username + time */}
                  <div className="flex items-start gap-2.5">
                    <Link
                      href={`/users/${actor.username}`}
                      className="shrink-0 mt-0.5"
                    >
                      <UserAvatar
                        url={actor.avatar_url}
                        username={actor.username}
                        size={32}
                      />
                    </Link>
                    <div className="flex min-w-0 flex-col">
                      <Link
                        href={`/users/${actor.username}`}
                        className="text-sm font-semibold text-text-primary hover:underline truncate"
                      >
                        {actor.username}
                      </Link>
                      <span className="text-xs tabular-nums text-text-muted">
                        {formatTime(event.created_at, locale)}
                      </span>
                    </div>
                  </div>

                  {/* Action text */}
                  <p className="text-base leading-snug text-text-secondary mt-4">
                    {isRating
                      ? t.rich("ratedItem", {
                          itemTitle: event.item_title,
                          listLabel,
                          item: (chunks) => (
                            <Link
                              href={itemHref}
                              className="font-medium text-text-primary hover:underline"
                            >
                              {chunks}
                            </Link>
                          ),
                          list: (chunks) => (
                            <Link
                              href={listHref}
                              className="font-medium text-text-primary hover:underline"
                            >
                              {chunks}
                            </Link>
                          ),
                        })
                      : t.rich("addedItem", {
                          itemTitle: event.item_title,
                          listLabel,
                          item: (chunks) => (
                            <Link
                              href={itemHref}
                              className="font-medium text-text-primary hover:underline"
                            >
                              {chunks}
                            </Link>
                          ),
                          list: (chunks) => (
                            <Link
                              href={listHref}
                              className="font-medium text-text-primary hover:underline"
                            >
                              {chunks}
                            </Link>
                          ),
                        })}
                  </p>
                </div>

                {/* Right badge */}
                <div className="shrink-0 flex items-center">
                  {isRating && event.rating != null && (
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 border border-accent/20">
                      <span className="text-base font-bold tabular-nums text-accent leading-none">
                        {event.rating}/10
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
