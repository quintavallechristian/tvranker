import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getListAnalytics } from "../../../lists/actions";

export default async function UserAnalyticsPage({
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

  const { data: list } = await supabase
    .from("lists")
    .select("id, is_public")
    .eq("user_id", profile.id)
    .single();

  if (!list) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user?.id === profile.id;
  if (!list.is_public && !isOwner) notFound();

  const [data, t] = await Promise.all([
    getListAnalytics(list.id),
    getTranslations("lists"),
  ]);

  return (
    <ListAnalyticsPage
      data={data}
      ratingLabels={profile.rating_labels as string[] | null}
      backHref={`/users/${username}`}
      labels={{
        title: t("analytics"),
        backToList: `@${username}`,
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
