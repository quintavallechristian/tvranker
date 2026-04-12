import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getMovieListAnalytics } from "../../../../movies/analytics/actions";

export default async function UserMovieAnalyticsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, rating_labels")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: movieList } = await supabase
    .from("movie_lists")
    .select("id, is_public, rating_labels")
    .eq("user_id", profile.id)
    .single();

  if (!movieList) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user?.id === profile.id;
  if (!movieList.is_public && !isOwner) notFound();

  const [data, t, tLists] = await Promise.all([
    getMovieListAnalytics(movieList.id),
    getTranslations("movies"),
    getTranslations("lists"),
  ]);

  const listRatingLabels = movieList.rating_labels as string[] | null;
  const profileRatingLabels = profile.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <ListAnalyticsPage
      data={data}
      itemType="movie"
      ratingLabels={effectiveRatingLabels}
      backHref={`/users/${username}/movies`}
      labels={{
        title: t("analytics"),
        backToList: `@${username}`,
        totalShows: t("totalMovies"),
        ratedShows: t("ratedMovies"),
        avgRating: tLists("avgRating"),
        tagDistribution: tLists("tagDistribution"),
        ratingDistribution: tLists("ratingDistribution"),
        noTags: tLists("noTags"),
        noRatings: tLists("noRatings"),
        shows: t("moviesCount"),
        emptyHint: t("analyticsEmptyHint"),
        avgRatingPerTag: tLists("avgRatingPerTag"),
        addedOverTime: tLists("addedOverTime"),
        releaseDecades: tLists("releaseDecades"),
        avgRatingByDecade: tLists("avgRatingByDecade"),
        backToDecades: tLists("backToDecades"),
        noData: tLists("noData"),
        mostSeasonsShow: tLists("mostSeasonsShow"),
        mostSeasonsByYear: tLists("mostSeasonsByYear"),
        longestShow: t("longestMovie"),
        longestShowByYear: t("longestMovieByYear"),
        seasonsByYearTitle: t("longestMovieByYearTitle"),
        noSeasonData: tLists("noSeasonData"),
        genreDistribution: tLists("genreDistribution"),
        noGenres: tLists("noGenres"),
      }}
    />
  );
}
