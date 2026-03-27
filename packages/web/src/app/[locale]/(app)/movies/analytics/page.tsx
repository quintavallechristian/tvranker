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

  const [data, { data: profile }, t, tLists] = await Promise.all([
    getMovieListAnalytics(),
    supabase
      .from("profiles")
      .select("rating_labels")
      .eq("id", user.id)
      .single(),
    getTranslations("movies"),
    getTranslations("lists"),
  ]);

  return (
    <ListAnalyticsPage
      data={data}
      ratingLabels={profile?.rating_labels as string[] | null}
      backHref="/movies"
      labels={{
        title: t("analytics"),
        backToList: t("title"),
        totalShows: tLists("totalShows"),
        ratedShows: tLists("ratedShows"),
        avgRating: tLists("avgRating"),
        tagDistribution: tLists("tagDistribution"),
        ratingDistribution: tLists("ratingDistribution"),
        noTags: tLists("noTags"),
        noRatings: tLists("noRatings"),
        shows: tLists("shows"),
        emptyHint: t("analyticsEmptyHint"),
        avgRatingPerTag: tLists("avgRatingPerTag"),
        addedOverTime: tLists("addedOverTime"),
        releaseDecades: tLists("releaseDecades"),
        avgRatingByDecade: tLists("avgRatingByDecade"),
        backToDecades: tLists("backToDecades"),
        noData: tLists("noData"),
        mostSeasonsShow: tLists("mostSeasonsShow"),
        mostSeasonsByYear: tLists("mostSeasonsByYear"),
        longestShow: tLists("longestShow"),
        longestShowByYear: tLists("longestShowByYear"),
        seasonsByYearTitle: tLists("seasonsByYearTitle"),
        noSeasonData: tLists("noSeasonData"),
      }}
    />
  );
}
