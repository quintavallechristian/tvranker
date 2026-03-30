import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getAnimeListAnalytics } from "../../../../anime/analytics/actions";

export default async function UserAnimeAnalyticsPage({
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

  const { data: animeList } = await supabase
    .from("anime_lists")
    .select("id, is_public")
    .eq("user_id", profile.id)
    .single();

  if (!animeList) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user?.id === profile.id;
  if (!animeList.is_public && !isOwner) notFound();

  const [data, t, tLists] = await Promise.all([
    getAnimeListAnalytics(animeList.id),
    getTranslations("anime"),
    getTranslations("lists"),
  ]);

  return (
    <ListAnalyticsPage
      data={data}
      itemType="anime"
      ratingLabels={profile.rating_labels as string[] | null}
      backHref={`/users/${username}/anime`}
      labels={{
        title: t("analytics"),
        backToList: `@${username}`,
        totalShows: t("totalAnime"),
        ratedShows: t("ratedAnime"),
        avgRating: tLists("avgRating"),
        tagDistribution: tLists("tagDistribution"),
        ratingDistribution: tLists("ratingDistribution"),
        noTags: tLists("noTags"),
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
