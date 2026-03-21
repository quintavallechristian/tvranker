import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  PanResponder,
} from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import { getPosterUrl } from "@tvranker/shared";

const ACCENT = "#00d4aa";
const ACTION_WIDTH = 90;

type TopRatedShow = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  first_air_date: string | null;
  avg_rating: number;
  vote_count: number;
};

// ─── Swipeable Row ────────────────────────────────────────────────────────────
function SwipeableRankRow({
  onAdd,
  isAdding,
  isAdded,
  children,
}: {
  onAdd: () => void;
  isAdding: boolean;
  isAdded: boolean;
  children: ReactNode;
}) {
  const translateX = useRef(new Animated.Value(0)).current;

  const pr = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy) * 1.8,
      onPanResponderMove: (_, gs) => {
        if (gs.dx < 0) translateX.setValue(Math.max(gs.dx, -ACTION_WIDTH));
        else translateX.setValue(Math.min(gs.dx, 0));
      },
      onPanResponderRelease: (_, gs) => {
        if (gs.dx < -(ACTION_WIDTH / 2)) {
          Animated.spring(translateX, {
            toValue: -ACTION_WIDTH,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const close = () => {
    Animated.timing(translateX, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  return (
    <View style={{ overflow: "hidden" }}>
      <View style={styles.swipeAction}>
        <TouchableOpacity
          onPress={() => {
            close();
            onAdd();
          }}
          style={styles.addActionBtn}
          disabled={isAdding || isAdded}
        >
          {isAdding ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : isAdded ? (
            <Ionicons name="checkmark" size={22} color="#fff" />
          ) : (
            <Ionicons name="add" size={22} color="#fff" />
          )}
          <Text style={styles.actionBtnText}>
            {isAdded ? "Aggiunto" : "Aggiungi"}
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        {...pr.panHandlers}
        style={{ transform: [{ translateX }] }}
      >
        {children}
      </Animated.View>
    </View>
  );
}

// ─── Rankings Screen ──────────────────────────────────────────────────────────
export default function RankingsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [shows, setShows] = useState<TopRatedShow[]>([]);
  const [loading, setLoading] = useState(true);

  // Add-to-list state
  const [myListId, setMyListId] = useState<string | null>(null);
  const [myShowIds, setMyShowIds] = useState<Set<string>>(new Set());
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchRankings();
    if (currentUser) fetchMyList();
  }, [currentUser?.id]);

  const fetchMyList = async () => {
    if (!currentUser) return;
    const { data: myList } = await supabase
      .from("lists")
      .select("id")
      .eq("user_id", currentUser.id)
      .single();
    if (!myList) return;
    setMyListId(myList.id);
    const { data: items } = await supabase
      .from("list_items")
      .select("show_id")
      .eq("list_id", myList.id);
    setMyShowIds(new Set((items ?? []).map((i) => i.show_id)));
  };

  const fetchRankings = async () => {
    setLoading(true);

    // Get all public list IDs
    const { data: publicLists } = await supabase
      .from("lists")
      .select("id")
      .eq("is_public", true);

    if (!publicLists?.length) {
      setLoading(false);
      return;
    }

    const publicListIds = publicLists.map((l) => l.id);

    // Get all rated items from public lists
    const { data: items } = await supabase
      .from("list_items")
      .select("show_id, rating")
      .in("list_id", publicListIds)
      .not("rating", "is", null);

    if (!items?.length) {
      setLoading(false);
      return;
    }

    // Aggregate ratings per show
    const aggregates = new Map<string, { sum: number; count: number }>();
    for (const item of items) {
      if (item.rating == null) continue;
      const existing = aggregates.get(item.show_id) ?? { sum: 0, count: 0 };
      aggregates.set(item.show_id, {
        sum: existing.sum + item.rating,
        count: existing.count + 1,
      });
    }

    // Require at least 2 votes
    const MIN_VOTES = 2;
    const ranked = Array.from(aggregates.entries())
      .filter(([, agg]) => agg.count >= MIN_VOTES)
      .map(([showId, agg]) => ({
        showId,
        avg: agg.sum / agg.count,
        count: agg.count,
      }))
      .sort((a, b) => b.avg - a.avg || b.count - a.count)
      .slice(0, 50);

    if (ranked.length === 0) {
      setLoading(false);
      return;
    }

    const showIds = ranked.map((r) => r.showId);
    const { data: showsData } = await supabase
      .from("shows")
      .select("id, tmdb_id, title, poster_path, first_air_date")
      .in("id", showIds);

    if (!showsData) {
      setLoading(false);
      return;
    }

    const showMap = new Map(showsData.map((s) => [s.id, s]));
    const results: TopRatedShow[] = ranked
      .map((r) => {
        const show = showMap.get(r.showId);
        if (!show) return null;
        return {
          id: show.id,
          tmdb_id: show.tmdb_id,
          title: show.title,
          poster_path: show.poster_path,
          first_air_date: show.first_air_date,
          avg_rating: Math.round(r.avg * 10) / 10,
          vote_count: r.count,
        };
      })
      .filter((r): r is TopRatedShow => r !== null);

    setShows(results);
    setLoading(false);
  };

  const addShow = useCallback(
    async (show: TopRatedShow) => {
      if (!currentUser || myShowIds.has(show.id) || addedIds.has(show.id))
        return;
      setAddingId(show.id);
      try {
        let listId = myListId;
        if (!listId) {
          const { data: newList } = await supabase
            .from("lists")
            .insert({ user_id: currentUser.id, name: "My List" })
            .select("id")
            .single();
          if (!newList) throw new Error("Failed to create list");
          listId = newList.id;
          setMyListId(listId);
        }
        const { data: maxPosData } = await supabase
          .from("list_items")
          .select("position")
          .eq("list_id", listId)
          .order("position", { ascending: false })
          .limit(1);
        const nextPos = (maxPosData?.[0]?.position ?? 0) + 1;
        await supabase
          .from("list_items")
          .insert({ list_id: listId, show_id: show.id, position: nextPos });
        setAddedIds((prev) => new Set([...prev, show.id]));
        setMyShowIds((prev) => new Set([...prev, show.id]));
      } catch {
        // silent fail
      }
      setAddingId(null);
    },
    [currentUser, myListId, myShowIds, addedIds],
  );

  const getRankColor = (rank: number) => {
    if (rank === 1) return "#FFD700";
    if (rank === 2) return "#C0C0C0";
    if (rank === 3) return "#CD7F32";
    return "#6b6b74";
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={ACCENT} size="large" />
        </View>
      ) : (
        <FlatList
          data={shows}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.headerRow}>
                <Ionicons name="trophy" size={20} color={ACCENT} />
                <Text style={styles.headerTitle}>{t("nav.rankings")}</Text>
              </View>
              <Text style={styles.headerSubtitle}>
                {t("rankings.subtitle")}
              </Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{t("rankings.empty")}</Text>
              <Text style={styles.emptyHint}>{t("rankings.minVotesHint")}</Text>
            </View>
          }
          renderItem={({ item, index }) => {
            const rank = index + 1;
            const rankColor = getRankColor(rank);
            const posterUrl = getPosterUrl(item.poster_path, "w92");
            const year = item.first_air_date?.slice(0, 4);
            const isAdded = addedIds.has(item.id) || myShowIds.has(item.id);
            const isAdding = addingId === item.id;

            return (
              <SwipeableRankRow
                onAdd={() => addShow(item)}
                isAdding={isAdding}
                isAdded={isAdded}
              >
                <TouchableOpacity
                  style={styles.row}
                  onPress={() =>
                    item.tmdb_id && router.push(`/show/${item.tmdb_id}?tmdb=1`)
                  }
                >
                  <Text style={[styles.rank, { color: rankColor }]}>
                    {rank}
                  </Text>
                  {posterUrl ? (
                    <Image source={{ uri: posterUrl }} style={styles.poster} />
                  ) : (
                    <View style={[styles.poster, styles.posterPlaceholder]} />
                  )}
                  <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>
                      {item.title}
                    </Text>
                    {year && <Text style={styles.year}>{year}</Text>}
                    <Text style={styles.votes}>
                      {t("rankings.votes", { count: item.vote_count })}
                    </Text>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingValue}>
                      {item.avg_rating.toFixed(1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </SwipeableRankRow>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0b" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { paddingBottom: 20 },

  // Header
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#f0f0f0" },
  headerSubtitle: { fontSize: 14, color: "#a0a0a8", lineHeight: 20 },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
    backgroundColor: "#0a0a0b",
  },
  rank: {
    width: 32,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginRight: 8,
  },
  poster: {
    width: 44,
    height: 66,
    borderRadius: 6,
    backgroundColor: "#1e1e22",
    marginRight: 12,
  },
  posterPlaceholder: { backgroundColor: "#1e1e22" },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: "600", color: "#f0f0f0" },
  year: { fontSize: 13, color: "#a0a0a8", marginTop: 2 },
  votes: { fontSize: 12, color: "#6b6b74", marginTop: 2 },
  ratingBadge: {
    alignItems: "center",
    marginLeft: 8,
    backgroundColor: "rgba(0,212,170,0.1)",
    borderWidth: 1,
    borderColor: "rgba(0,212,170,0.25)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 52,
  },
  ratingValue: { color: ACCENT, fontSize: 16, fontWeight: "700" },

  // Swipe action
  swipeAction: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  addActionBtn: {
    flex: 1,
    width: ACTION_WIDTH,
    backgroundColor: ACCENT,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  actionBtnText: { color: "#000", fontSize: 11, fontWeight: "700" },

  // Empty
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyText: {
    color: "#f0f0f0",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyHint: { color: "#6b6b74", fontSize: 14, textAlign: "center" },
});
