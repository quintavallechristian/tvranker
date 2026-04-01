import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getMovieListAnalytics } from "./actions";

export default async function MovieAnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [data, { data: profile }, { data: movieList }, t, tLists] = await Promise.all([
    getMovieListAnalytics(),
    supabase
      .from("profiles")
      .select("rating_labels")
      .eq("id", user.id)
      .single(),
    supabase
      .from("movie_lists")
      .select("rating_labels")
      .eq("user_id", user.id)
      .single(),
    getTranslations("movies"),
    getTranslations("lists"),
  ]);

  const listRatingLabels = movieList?.rating_labels as string[] | null;
  const profileRatingLabels = profile?.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <ListAnalyticsPage
      data={data}
      itemType="movie"
      ratingLabels={effectiveRatingLabels}
      backHref="/movies"
      labels={{
        title: t("analytics"),
        backToList: t("title"),
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
      }}
    />
  );
}
