import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { UserAvatar } from "@/components/UserAvatar";
import { FollowButton } from "@/components/FollowButton";
import {
  computeListSimilarity,
  computeMovieListSimilarity,
  computeAnimeListSimilarity,
  computeGameListSimilarity,
  computeBoardgameListSimilarity,
} from "@/lib/similarity";
import { fetchAllRows } from "@/lib/supabase/fetchAll";
import { Link } from "@/i18n/navigation";
import { PodiumWidget } from "@/components/widgets/PodiumWidget";
import type { PodiumItem } from "@/components/widgets/PodiumWidget";
import { CountWidget } from "@/components/widgets/CountWidget";

export default async function UserProfilePage({
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

  // Fetch all lists in parallel
  const [
    { data: list },
    { data: movieList },
    { data: animeList },
    { data: gameList },
    { data: boardgameList },
  ] = await Promise.all([
    supabase
      .from("lists")
      .select("id, is_public")
      .eq("user_id", profile.id)
      .single(),
    supabase
      .from("movie_lists")
      .select("id, is_public")
      .eq("user_id", profile.id)
      .single(),
    supabase
      .from("anime_lists")
      .select("id, is_public")
      .eq("user_id", profile.id)
      .single(),
    supabase
      .from("game_lists")
      .select("id, is_public")
      .eq("user_id", profile.id)
      .single(),
    supabase
      .from("boardgame_lists")
      .select("id, is_public")
      .eq("user_id", profile.id)
      .single(),
  ]);

  // Fetch top 10 shows, movies, anime, games + counts in parallel
  const [
    showTopResult,
    showCountResult,
    movieTopResult,
    movieCountResult,
    animeTopResult,
    animeCountResult,
    gameTopResult,
    gameCountResult,
    boardgameTopResult,
    boardgameCountResult,
  ] = await Promise.all([
    list
      ? supabase
          .from("list_items")
          .select("rating, shows(id, title, poster_path)")
          .eq("list_id", list.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .range(0, 9)
      : Promise.resolve({ data: null }),
    list
      ? supabase
          .from("list_items")
          .select("id", { count: "exact", head: true })
          .eq("list_id", list.id)
      : Promise.resolve({ count: 0 }),
    movieList
      ? supabase
          .from("movie_list_items")
          .select("rating, movies(id, title, poster_path)")
          .eq("movie_list_id", movieList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .range(0, 9)
      : Promise.resolve({ data: null }),
    movieList
      ? supabase
          .from("movie_list_items")
          .select("id", { count: "exact", head: true })
          .eq("movie_list_id", movieList.id)
      : Promise.resolve({ count: 0 }),
    animeList
      ? supabase
          .from("anime_list_items")
          .select("rating, animes(id, title, poster_path)")
          .eq("anime_list_id", animeList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .range(0, 9)
      : Promise.resolve({ data: null }),
    animeList
      ? supabase
          .from("anime_list_items")
          .select("id", { count: "exact", head: true })
          .eq("anime_list_id", animeList.id)
      : Promise.resolve({ count: 0 }),
    gameList
      ? supabase
          .from("game_list_items")
          .select("rating, games(id, title, cover_url)")
          .eq("game_list_id", gameList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .range(0, 9)
      : Promise.resolve({ data: null }),
    gameList
      ? supabase
          .from("game_list_items")
          .select("id", { count: "exact", head: true })
          .eq("game_list_id", gameList.id)
      : Promise.resolve({ count: 0 }),
    boardgameList
      ? supabase
          .from("boardgame_list_items")
          .select("rating, boardgames(id, title, thumbnail_url)")
          .eq("boardgame_list_id", boardgameList.id)
          .order("rating", { ascending: false, nullsFirst: false })
          .order("position", { ascending: true })
          .range(0, 9)
      : Promise.resolve({ data: null }),
    boardgameList
      ? supabase
          .from("boardgame_list_items")
          .select("id", { count: "exact", head: true })
          .eq("boardgame_list_id", boardgameList.id)
      : Promise.resolve({ count: 0 }),
  ]);

  const showPodiumItems: PodiumItem[] = (showTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.shows.id,
      title: item.shows.title,
      poster_path: item.shows.poster_path,
      rating: item.rating,
    }),
  );

  const moviePodiumItems: PodiumItem[] = (movieTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.movies.id,
      title: item.movies.title,
      poster_path: item.movies.poster_path,
      rating: item.rating,
    }),
  );

  const animePodiumItems: PodiumItem[] = (animeTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.animes.id,
      title: item.animes.title,
      poster_path: item.animes.poster_path,
      rating: item.rating,
    }),
  );

  const gamePodiumItems: PodiumItem[] = (gameTopResult.data ?? []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.games.id,
      title: item.games.title,
      poster_path: null,
      imageUrl: item.games.cover_url,
      rating: item.rating,
    }),
  );

  const boardgamePodiumItems: PodiumItem[] = (
    boardgameTopResult.data ?? []
  ).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => ({
      id: item.boardgames.id,
      title: item.boardgames.title,
      poster_path: null,
      imageUrl: item.boardgames.thumbnail_url,
      rating: item.rating,
    }),
  );

  // Current user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  // Compute similarities for logged-in viewers
  let showSimilarityScore: number | null = null;
  let movieSimilarityScore: number | null = null;
  let animeSimilarityScore: number | null = null;
  let gameSimilarityScore: number | null = null;
  let boardgameSimilarityScore: number | null = null;

  if (user && !isOwnProfile) {
    const [
      { data: viewerList },
      { data: viewerMovieList },
      { data: viewerAnimeList },
      { data: viewerGameList },
      { data: viewerBoardgameList },
    ] = await Promise.all([
      supabase.from("lists").select("id").eq("user_id", user.id).single(),
      supabase.from("movie_lists").select("id").eq("user_id", user.id).single(),
      supabase.from("anime_lists").select("id").eq("user_id", user.id).single(),
      supabase.from("game_lists").select("id").eq("user_id", user.id).single(),
      supabase
        .from("boardgame_lists")
        .select("id")
        .eq("user_id", user.id)
        .single(),
    ]);
    if (viewerGameList && gameList) {
      const [viewerGameItemsData, profileGameItemsData] = await Promise.all([
        fetchAllRows((from, to) =>
          supabase
            .from("game_list_items")
            .select("game_id, rating, position")
            .eq("game_list_id", viewerGameList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
        fetchAllRows((from, to) =>
          supabase
            .from("game_list_items")
            .select("game_id, rating, position")
            .eq("game_list_id", gameList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
      ]);
      const gameListA = viewerGameItemsData.map((i, idx) => ({
        gameId: i.game_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const gameListB = profileGameItemsData.map((i, idx) => ({
        gameId: i.game_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      if (gameListA.length > 0 && gameListB.length > 0) {
        gameSimilarityScore = computeGameListSimilarity(gameListA, gameListB);
      }
    }

    if (viewerList && list) {
      const [viewerItemsData, profileItemsData] = await Promise.all([
        fetchAllRows((from, to) =>
          supabase
            .from("list_items")
            .select("show_id, rating, position")
            .eq("list_id", viewerList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
        fetchAllRows((from, to) =>
          supabase
            .from("list_items")
            .select("show_id, rating, position")
            .eq("list_id", list.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
      ]);
      const listA = viewerItemsData.map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const listB = profileItemsData.map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      // Only compute similarity if both lists are non-empty (compiled)
      if (listA.length > 0 && listB.length > 0) {
        showSimilarityScore = computeListSimilarity(listA, listB);
      }
    }

    if (viewerMovieList && movieList) {
      const [viewerMovieItemsData, profileMovieItemsData] = await Promise.all([
        fetchAllRows((from, to) =>
          supabase
            .from("movie_list_items")
            .select("movie_id, rating, position")
            .eq("movie_list_id", viewerMovieList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
        fetchAllRows((from, to) =>
          supabase
            .from("movie_list_items")
            .select("movie_id, rating, position")
            .eq("movie_list_id", movieList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
      ]);
      const movieListA = viewerMovieItemsData.map((i, idx) => ({
        movieId: i.movie_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const movieListB = profileMovieItemsData.map((i, idx) => ({
        movieId: i.movie_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      // Only compute similarity if both lists are non-empty (compiled)
      if (movieListA.length > 0 && movieListB.length > 0) {
        movieSimilarityScore = computeMovieListSimilarity(
          movieListA,
          movieListB,
        );
      }
    }

    if (viewerAnimeList && animeList) {
      const [viewerAnimeItemsData, profileAnimeItemsData] = await Promise.all([
        fetchAllRows((from, to) =>
          supabase
            .from("anime_list_items")
            .select("anime_id, rating, position")
            .eq("anime_list_id", viewerAnimeList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
        fetchAllRows((from, to) =>
          supabase
            .from("anime_list_items")
            .select("anime_id, rating, position")
            .eq("anime_list_id", animeList.id)
            .order("position", { ascending: true })
            .range(from, to),
        ),
      ]);
      const animeListA = viewerAnimeItemsData.map((i, idx) => ({
        animeId: i.anime_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const animeListB = profileAnimeItemsData.map((i, idx) => ({
        animeId: i.anime_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      if (animeListA.length > 0 && animeListB.length > 0) {
        animeSimilarityScore = computeAnimeListSimilarity(
          animeListA,
          animeListB,
        );
      }
    }

    if (viewerBoardgameList && boardgameList) {
      const [viewerBoardgameItemsData, profileBoardgameItemsData] =
        await Promise.all([
          fetchAllRows((from, to) =>
            supabase
              .from("boardgame_list_items")
              .select("boardgame_id, rating, position")
              .eq("boardgame_list_id", viewerBoardgameList.id)
              .order("position", { ascending: true })
              .range(from, to),
          ),
          fetchAllRows((from, to) =>
            supabase
              .from("boardgame_list_items")
              .select("boardgame_id, rating, position")
              .eq("boardgame_list_id", boardgameList.id)
              .order("position", { ascending: true })
              .range(from, to),
          ),
        ]);
      const boardgameListA = viewerBoardgameItemsData.map((i, idx) => ({
        boardgameId: i.boardgame_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      const boardgameListB = profileBoardgameItemsData.map((i, idx) => ({
        boardgameId: i.boardgame_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));
      if (boardgameListA.length > 0 && boardgameListB.length > 0) {
        boardgameSimilarityScore = computeBoardgameListSimilarity(
          boardgameListA,
          boardgameListB,
        );
      }
    }
  }

  // Compatibility = average similarity of all lists both profiles have compiled
  let compatibilityScore: number | null = null;
  const scores = [
    showSimilarityScore,
    movieSimilarityScore,
    animeSimilarityScore,
    gameSimilarityScore,
    boardgameSimilarityScore,
  ].filter((s): s is number => s !== null);
  if (scores.length > 0) {
    compatibilityScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length,
    );
  }

  // Follow status
  let isFollowing = false;
  if (user && !isOwnProfile) {
    const { data: follow } = await supabase
      .from("follows")
      .select("id")
      .eq("follower_id", user.id)
      .eq("following_id", profile.id)
      .maybeSingle();
    isFollowing = !!follow;
  }

  return (
    <div>
      {/* User header */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <UserAvatar
          url={profile.avatar_url}
          username={profile.username}
          size={56}
        />
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-text-primary">
            @{profile.username}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-3">
          {compatibilityScore !== null && (
            <div className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-muted px-3 py-1.5">
              <span className="text-sm font-semibold text-accent">
                {compatibilityScore}%
              </span>
              <span className="text-xs text-text-muted">
                {tUsers("compatible")}
              </span>
            </div>
          )}
          {user && !isOwnProfile && (
            <FollowButton
              profileId={profile.id}
              initialFollowing={isFollowing}
            />
          )}
        </div>
      </div>

      {/* Count widgets */}
      {((showCountResult.count ?? 0) > 0 ||
        (movieCountResult.count ?? 0) > 0 ||
        (animeCountResult.count ?? 0) > 0 ||
        (gameCountResult.count ?? 0) > 0 ||
        (boardgameCountResult.count ?? 0) > 0) && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(showCountResult.count ?? 0) > 0 && (
            <CountWidget
              count={showCountResult.count ?? 0}
              topic="show"
              href={`/users/${profile.username}/shows`}
            />
          )}
          {(movieCountResult.count ?? 0) > 0 && (
            <CountWidget
              count={movieCountResult.count ?? 0}
              topic="movie"
              href={`/users/${profile.username}/movies`}
            />
          )}
          {(animeCountResult.count ?? 0) > 0 && (
            <CountWidget
              count={animeCountResult.count ?? 0}
              topic="anime"
              href={`/users/${profile.username}/anime`}
            />
          )}
          {(gameCountResult.count ?? 0) > 0 && (
            <CountWidget
              count={gameCountResult.count ?? 0}
              topic="game"
              href={`/users/${profile.username}/games`}
            />
          )}
          {(boardgameCountResult.count ?? 0) > 0 && (
            <CountWidget
              count={boardgameCountResult.count ?? 0}
              topic="boardgame"
              href={`/users/${profile.username}/boardgames`}
            />
          )}
        </div>
      )}

      {/* Podium cards — extended top10 with rowSpan=2 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {(showCountResult.count ?? 0) > 0 && (
          <div className="h-105">
            <PodiumWidget
              items={showPodiumItems}
              topic="show"
              rowSpan={2}
              viewAllHref={`/users/${profile.username}/shows`}
              badge={
                showSimilarityScore !== null ? (
                  <span className="text-xs font-semibold text-accent">
                    {showSimilarityScore}%
                  </span>
                ) : undefined
              }
            />
          </div>
        )}

        {(movieCountResult.count ?? 0) > 0 && (
          <div className="h-105">
            <PodiumWidget
              items={moviePodiumItems}
              topic="movie"
              rowSpan={2}
              viewAllHref={`/users/${profile.username}/movies`}
              badge={
                movieSimilarityScore !== null ? (
                  <span className="text-xs font-semibold text-accent">
                    {movieSimilarityScore}%
                  </span>
                ) : undefined
              }
            />
          </div>
        )}

        {(animeCountResult.count ?? 0) > 0 && (
          <div className="h-105">
            <PodiumWidget
              items={animePodiumItems}
              topic="anime"
              rowSpan={2}
              viewAllHref={`/users/${profile.username}/anime`}
              badge={
                animeSimilarityScore !== null ? (
                  <span className="text-xs font-semibold text-accent">
                    {animeSimilarityScore}%
                  </span>
                ) : undefined
              }
            />
          </div>
        )}

        {(gameCountResult.count ?? 0) > 0 && (
          <div className="h-105">
            <PodiumWidget
              items={gamePodiumItems}
              topic="game"
              rowSpan={2}
              viewAllHref={`/users/${profile.username}/games`}
              badge={
                gameSimilarityScore !== null ? (
                  <span className="text-xs font-semibold text-accent">
                    {gameSimilarityScore}%
                  </span>
                ) : undefined
              }
            />
          </div>
        )}

        {(boardgameCountResult.count ?? 0) > 0 && (
          <div className="h-105">
            <PodiumWidget
              items={boardgamePodiumItems}
              topic="boardgame"
              rowSpan={2}
              viewAllHref={`/users/${profile.username}/boardgames`}
              badge={
                boardgameSimilarityScore !== null ? (
                  <span className="text-xs font-semibold text-accent">
                    {boardgameSimilarityScore}%
                  </span>
                ) : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
