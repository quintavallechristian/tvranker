import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  SectionList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import {
  getPosterUrl,
  getRatingLabel,
  computeListSimilarity,
} from "@tvranker/shared";
import type { ListEntry } from "@tvranker/shared";
import type { Profile, ListItem, Show } from "@tvranker/shared";

const ACCENT = "#00d4aa";

type ListItemWithShow = ListItem & { shows: Show };

type Section = {
  rating: number | null;
  title: string;
  data: ListItemWithShow[];
};

function buildSections(
  items: ListItemWithShow[],
  ratingLabels: Record<string, string> | null | undefined,
  t: (key: string) => string,
): Section[] {
  const groups = new Map<number | null, ListItemWithShow[]>();
  for (const item of items) {
    const key = item.rating ?? null;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  const sorted = [...groups.entries()].sort(([a], [b]) => {
    if (a === null && b === null) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    return b - a;
  });
  return sorted.map(([rating, data]) => ({
    rating,
    title:
      rating !== null
        ? `${rating}/10 · ${getRatingLabel(rating, ratingLabels)}`
        : t("lists.unrated"),
    data,
  }));
}

export default function UserProfileScreen() {
  const { username } = useLocalSearchParams<{ username: string }>();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (!username) return;

    const load = async () => {
      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (!prof) {
        setLoading(false);
        return;
      }

      setProfile(prof);
      navigation.setOptions({ title: `@${prof.username}` });

      const { data: lists } = await supabase
        .from("lists")
        .select("id")
        .eq("user_id", prof.id)
        .limit(1);

      let rawItems: ListItemWithShow[] = [];
      if (lists?.[0]) {
        const { data } = await supabase
          .from("list_items")
          .select("*, shows(*)")
          .eq("list_id", lists[0].id)
          .order("rating", { ascending: false })
          .order("position");
        rawItems = (data as ListItemWithShow[]) ?? [];
      }

      setTotalCount(rawItems.length);
      setSections(buildSections(rawItems, prof.rating_labels, t));

      if (currentUser && currentUser.id !== prof.id) {
        const [viewerListRes, followRes] = await Promise.all([
          supabase
            .from("lists")
            .select("id")
            .eq("user_id", currentUser.id)
            .single(),
          supabase
            .from("follows")
            .select("follower_id")
            .eq("follower_id", currentUser.id)
            .eq("following_id", prof.id)
            .maybeSingle(),
        ]);

        setIsFollowing(!!followRes.data);

        if (viewerListRes.data && rawItems.length > 0) {
          const { data: vi } = await supabase
            .from("list_items")
            .select("show_id, rating, position")
            .eq("list_id", viewerListRes.data.id);

          if (vi?.length) {
            const viewerData: ListEntry[] = vi.map((i, idx) => ({
              showId: i.show_id,
              rating: i.rating,
              position: i.position ?? idx,
            }));
            const profileData: ListEntry[] = rawItems.map((i, idx) => ({
              showId: i.show_id,
              rating: i.rating,
              position: i.position ?? idx,
            }));
            setSimilarity(computeListSimilarity(viewerData, profileData));
          }
        }
      }

      setLoading(false);
    };

    load();
  }, [username, currentUser?.id]);

  const handleToggleFollow = useCallback(async () => {
    if (!currentUser || !profile) return;
    setFollowLoading(true);
    if (isFollowing) {
      await supabase
        .from("follows")
        .delete()
        .eq("follower_id", currentUser.id)
        .eq("following_id", profile.id);
      setIsFollowing(false);
    } else {
      await supabase
        .from("follows")
        .insert({ follower_id: currentUser.id, following_id: profile.id });
      setIsFollowing(true);
    }
    setFollowLoading(false);
  }, [currentUser, profile, isFollowing]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={ACCENT} size="large" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>{t("profile.notFound")}</Text>
      </View>
    );
  }

  const showControls = currentUser && currentUser.id !== profile.id;

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile.username?.[0]?.toUpperCase() ?? "?"}
              </Text>
            </View>
            <Text style={styles.username}>{profile.username}</Text>
            <Text style={styles.statsText}>
              {t("profile.showsCount", { count: totalCount })}
            </Text>
            {showControls && (
              <View style={styles.badgeRow}>
                {similarity !== null && (
                  <View style={styles.similarityBadge}>
                    <Text style={styles.similarityText}>
                      {similarity}% {t("explore.compatible")}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={[
                    styles.followBtn,
                    isFollowing && styles.followBtnActive,
                  ]}
                  onPress={handleToggleFollow}
                  disabled={followLoading}
                >
                  <Text
                    style={[
                      styles.followBtnText,
                      isFollowing && styles.followBtnTextActive,
                    ]}
                  >
                    {isFollowing ? t("profile.unfollow") : t("profile.follow")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item, index }) => {
          const show = item.shows;
          const poster = getPosterUrl(show?.poster_path ?? null, "w92");
          return (
            <View style={styles.row}>
              <Text style={styles.rank}>{index + 1}</Text>
              {poster ? (
                <Image source={{ uri: poster }} style={styles.poster} />
              ) : (
                <View style={[styles.poster, styles.noPoster]} />
              )}
              <View style={styles.info}>
                <Text style={styles.showTitle} numberOfLines={2}>
                  {show?.title ?? "—"}
                </Text>
              </View>
              {item.rating != null && (
                <Text style={styles.ratingBadge}>{item.rating}/10</Text>
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>{t("lists.emptyState")}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0b" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0b",
  },
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0,212,170,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { color: ACCENT, fontSize: 26, fontWeight: "700" },
  username: { fontSize: 20, fontWeight: "700", color: "#f0f0f0" },
  statsText: { fontSize: 13, color: "#a0a0a8", marginTop: 4 },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  similarityBadge: {
    backgroundColor: "rgba(0,212,170,0.12)",
    borderWidth: 1,
    borderColor: "rgba(0,212,170,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  similarityText: { color: ACCENT, fontSize: 13, fontWeight: "700" },
  followBtn: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  followBtnActive: { backgroundColor: ACCENT, borderColor: ACCENT },
  followBtnText: { color: "#f0f0f0", fontSize: 14, fontWeight: "600" },
  followBtnTextActive: { color: "#000" },
  sectionHeader: {
    backgroundColor: "#141416",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  sectionHeaderText: { fontSize: 13, fontWeight: "600", color: ACCENT },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  rank: {
    width: 28,
    fontSize: 14,
    fontWeight: "600",
    color: "#6b6b74",
    textAlign: "center",
  },
  poster: { width: 40, height: 60, borderRadius: 4, marginRight: 12 },
  noPoster: { backgroundColor: "#1e1e22" },
  info: { flex: 1 },
  showTitle: { fontSize: 15, fontWeight: "500", color: "#f0f0f0" },
  ratingBadge: { fontSize: 14, fontWeight: "700", color: ACCENT },
  empty: {
    color: "#6b6b74",
    textAlign: "center",
    marginTop: 40,
    fontSize: 14,
  },
  muted: { color: "#6b6b74", fontSize: 15 },
});
