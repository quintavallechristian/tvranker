import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getGameListAnalytics } from "./actions";

export default async function GameAnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [data, { data: profile }, { data: gameList }, t, tLists] =
    await Promise.all([
      getGameListAnalytics(),
      supabase
        .from("profiles")
        .select("rating_labels")
        .eq("id", user.id)
        .single(),
      supabase
        .from("game_lists")
        .select("rating_labels")
        .eq("user_id", user.id)
        .single(),
      getTranslations("games"),
      getTranslations("lists"),
    ]);

  const listRatingLabels = gameList?.rating_labels as string[] | null;
  const profileRatingLabels = profile?.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <ListAnalyticsPage
      data={data}
      itemType="game"
      ratingLabels={effectiveRatingLabels}
      backHref="/games"
      labels={{
        title: t("analytics"),
        backToList: t("title"),
        totalShows: t("totalGames"),
        ratedShows: t("ratedGames"),
        avgRating: tLists("avgRating"),
        tagDistribution: tLists("tagDistribution"),
        genreDistribution: tLists("genreDistribution"),
        ratingDistribution: tLists("ratingDistribution"),
        noTags: tLists("noTags"),
        noGenres: tLists("noGenres"),
        noRatings: tLists("noRatings"),
        shows: t("gamesCount"),
        emptyHint: t("analyticsEmptyHint"),
        avgRatingPerTag: tLists("avgRatingPerTag"),
        addedOverTime: tLists("addedOverTime"),
        releaseDecades: tLists("releaseDecades"),
        avgRatingByDecade: tLists("avgRatingByDecade"),
        backToDecades: tLists("backToDecades"),
        noData: tLists("noData"),
        mostSeasonsShow: tLists("mostSeasonsShow"),
        mostSeasonsByYear: tLists("mostSeasonsByYear"),
        longestShow: t("longestGame"),
        longestShowByYear: t("longestGameByYear"),
        seasonsByYearTitle: t("longestGameByYearTitle"),
        noSeasonData: tLists("noSeasonData"),
      }}
    />
  );
}
