import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getBoardgameListAnalytics } from "./actions";

export default async function BoardgameAnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [data, { data: profile }, { data: boardgameList }, t, tLists] =
    await Promise.all([
      getBoardgameListAnalytics(),
      supabase
        .from("profiles")
        .select("rating_labels")
        .eq("id", user.id)
        .single(),
      supabase
        .from("boardgame_lists")
        .select("rating_labels")
        .eq("user_id", user.id)
        .single(),
      getTranslations("boardgames"),
      getTranslations("lists"),
    ]);

  const listRatingLabels = boardgameList?.rating_labels as string[] | null;
  const profileRatingLabels = profile?.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <ListAnalyticsPage
      data={data}
      itemType="boardgame"
      ratingLabels={effectiveRatingLabels}
      backHref="/boardgames"
      labels={{
        title: t("analytics"),
        backToList: t("title"),
        totalShows: t("totalBoardgames"),
        ratedShows: t("ratedBoardgames"),
        avgRating: tLists("avgRating"),
        tagDistribution: tLists("tagDistribution"),
        genreDistribution: tLists("genreDistribution"),
        ratingDistribution: tLists("ratingDistribution"),
        noTags: tLists("noTags"),
        noGenres: tLists("noGenres"),
        noRatings: tLists("noRatings"),
        shows: t("boardgamesCount"),
        emptyHint: t("analyticsEmptyHint"),
        avgRatingPerTag: tLists("avgRatingPerTag"),
        addedOverTime: tLists("addedOverTime"),
        releaseDecades: tLists("releaseDecades"),
        avgRatingByDecade: tLists("avgRatingByDecade"),
        backToDecades: tLists("backToDecades"),
        noData: tLists("noData"),
        mostSeasonsShow: tLists("mostSeasonsShow"),
        mostSeasonsByYear: tLists("mostSeasonsByYear"),
        longestShow: t("longestBoardgame"),
        longestShowByYear: t("longestBoardgameByYear"),
        seasonsByYearTitle: t("longestBoardgameByYearTitle"),
        noSeasonData: tLists("noSeasonData"),
      }}
    />
  );
}
