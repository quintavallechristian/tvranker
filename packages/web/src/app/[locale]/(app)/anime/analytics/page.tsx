import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getAnimeListAnalytics } from "./actions";

export default async function AnimeAnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [data, { data: profile }, { data: animeList }, t, tLists] = await Promise.all([
    getAnimeListAnalytics(),
    supabase
      .from("profiles")
      .select("rating_labels")
      .eq("id", user.id)
      .single(),
    supabase
      .from("anime_lists")
      .select("rating_labels")
      .eq("user_id", user.id)
      .single(),
    getTranslations("anime"),
    getTranslations("lists"),
  ]);

  const listRatingLabels = animeList?.rating_labels as string[] | null;
  const profileRatingLabels = profile?.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <ListAnalyticsPage
      data={data}
      itemType="anime"
      ratingLabels={effectiveRatingLabels}
      backHref="/anime"
      labels={{
        title: t("analytics"),
        backToList: t("title"),
        totalShows: t("totalAnime"),
        ratedShows: t("ratedAnime"),
        avgRating: tLists("avgRating"),
        tagDistribution: tLists("tagDistribution"),
        genreDistribution: tLists("genreDistribution"),
        ratingDistribution: tLists("ratingDistribution"),
        noTags: tLists("noTags"),
        noGenres: tLists("noGenres"),
        noRatings: tLists("noRatings"),
        shows: t("animeCount"),
        emptyHint: t("analyticsEmptyHint"),
        avgRatingPerTag: tLists("avgRatingPerTag"),
        addedOverTime: tLists("addedOverTime"),
        releaseDecades: tLists("releaseDecades"),
        avgRatingByDecade: tLists("avgRatingByDecade"),
        backToDecades: tLists("backToDecades"),
        noData: tLists("noData"),
        mostSeasonsShow: tLists("mostSeasonsShow"),
        mostSeasonsByYear: tLists("mostSeasonsByYear"),
        longestShow: t("longestAnime"),
        longestShowByYear: t("longestAnimeByYear"),
        seasonsByYearTitle: t("longestAnimeByYearTitle"),
        noSeasonData: tLists("noSeasonData"),
      }}
    />
  );
}
