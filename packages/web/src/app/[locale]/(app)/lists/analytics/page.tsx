import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getListAnalytics } from "../actions";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [data, { data: profile }, { data: userList }, t] = await Promise.all([
    getListAnalytics(),
    supabase
      .from("profiles")
      .select("rating_labels")
      .eq("id", user.id)
      .single(),
    supabase
      .from("lists")
      .select("rating_labels")
      .eq("user_id", user.id)
      .single(),
    getTranslations("lists"),
  ]);

  const listRatingLabels = userList?.rating_labels as string[] | null;
  const profileRatingLabels = profile?.rating_labels as string[] | null;
  const effectiveRatingLabels = listRatingLabels ?? profileRatingLabels;

  return (
    <ListAnalyticsPage
      data={data}
      ratingLabels={effectiveRatingLabels}
      backHref="/lists"
      labels={{
        title: t("analytics"),
        backToList: t("title"),
        totalShows: t("totalShows"),
        ratedShows: t("ratedShows"),
        avgRating: t("avgRating"),
        tagDistribution: t("tagDistribution"),
        ratingDistribution: t("ratingDistribution"),
        noTags: t("noTags"),
        noRatings: t("noRatings"),
        shows: t("shows"),
        emptyHint: t("analyticsEmptyHint"),
        avgRatingPerTag: t("avgRatingPerTag"),
        addedOverTime: t("addedOverTime"),
        releaseDecades: t("releaseDecades"),
        avgRatingByDecade: t("avgRatingByDecade"),
        backToDecades: t("backToDecades"),
        noData: t("noData"),
        mostSeasonsShow: t("mostSeasonsShow"),
        mostSeasonsByYear: t("mostSeasonsByYear"),
        longestShow: t("longestShow"),
        longestShowByYear: t("longestShowByYear"),
        seasonsByYearTitle: t("seasonsByYearTitle"),
        noSeasonData: t("noSeasonData"),
      }}
    />
  );
}
