import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ListAnalyticsPage } from "@/components/ListAnalytics";
import { getListAnalytics } from "../../actions";

export default async function ListIdAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Verify the list exists and is accessible
  const { data: list } = await supabase
    .from("lists")
    .select("id, user_id, is_public")
    .eq("id", id)
    .single();

  if (!list) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user?.id === list.user_id;
  if (!list.is_public && !isOwner) notFound();

  // Fetch rating labels from the list owner's profile
  const [data, { data: ownerProfile }, t] = await Promise.all([
    getListAnalytics(id),
    supabase
      .from("profiles")
      .select("rating_labels")
      .eq("id", list.user_id)
      .single(),
    getTranslations("lists"),
  ]);

  return (
    <ListAnalyticsPage
      data={data}
      ratingLabels={ownerProfile?.rating_labels as string[] | null}
      backHref={`/lists/${id}`}
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
        noData: t("noData"),
      }}
    />
  );
}
