import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import {
  getPosterUrl,
  computeListSimilarity,
  scoreRecommendations,
} from "@tvranker/shared";
import type { ListEntry, UserList } from "@tvranker/shared";

const ACCENT = "#00d4aa";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 10;
const CARD_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - CARD_PADDING * 2 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

// Shape returned by /api/tmdb/search
type SearchShow = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
};

type UserResult = {
  id: string;
  username: string;
  show_count: number;
  similarity: number | null;
};

type SuggestedShow = {
  id: string;
  tmdb_id: number | null;
  title: string;
  poster_path: string | null;
  score: number;
  recommendedBy: number;
};

type Tab = "shows" | "users";

const SITE_URL =
  process.env.EXPO_PUBLIC_SITE_URL ?? "https://tvranker.vercel.app";

export default function ExploreScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [tab, setTab] = useState<Tab>("shows");
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState<SearchShow[]>([]);
  const [users, setUsers] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Add-to-list state
  const [myListId, setMyListId] = useState<string | null>(null);
  const [myTmdbIds, setMyTmdbIds] = useState<Set<number>>(new Set());
  const [addingTmdbId, setAddingTmdbId] = useState<number | null>(null);
  const [addedTmdbIds, setAddedTmdbIds] = useState<Set<number>>(new Set());

  // Recommendation scores (tmdb_id → 0–100)
  const [recScoreMap, setRecScoreMap] = useState<Map<number, number>>(
    new Map(),
  );

  // Suggested users & follow
  const [suggestedUsers, setSuggestedUsers] = useState<UserResult[]>([]);
  const [suggestedShows, setSuggestedShows] = useState<SuggestedShow[]>([]);
  const [suggestedLoading, setSuggestedLoading] = useState(false);

  // Card interaction
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [addingCardId, setAddingCardId] = useState<string | null>(null);
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [followLoadingId, setFollowLoadingId] = useState<string | null>(null);

  // ── Init: fetch viewer's list, recommendations, suggested users ──
  useEffect(() => {
    if (!currentUser) return;

    const init = async () => {
      // 1. Fetch viewer's list
      const { data: myList } = await supabase
        .from("lists")
        .select("id")
        .eq("user_id", currentUser.id)
        .single();

      if (!myList) return;
      setMyListId(myList.id);

      // 2. Fetch viewer's list items
      const { data: myItems } = await supabase
        .from("list_items")
        .select("show_id, rating, position")
        .eq("list_id", myList.id)
        .order("position");

      // 3. Get tmdb_ids for viewer's shows
      const showIds = (myItems ?? []).map((i) => i.show_id);
      if (showIds.length > 0) {
        const { data: showsData } = await supabase
          .from("shows")
          .select("id, tmdb_id")
          .in("id", showIds);
        setMyTmdbIds(
          new Set(
            (showsData ?? []).filter((s) => s.tmdb_id).map((s) => s.tmdb_id!),
          ),
        );
      }

      const viewerList: ListEntry[] = (myItems ?? []).map((i, idx) => ({
        showId: i.show_id,
        rating: i.rating,
        position: i.position ?? idx,
      }));

      // 4. Fetch follows
      const { data: followsData } = await supabase
        .from("follows")
        .select("following_id")
        .eq("follower_id", currentUser.id);

      const followedIds = (followsData ?? []).map((f) => f.following_id);
      setFollowingIds(new Set(followedIds));

      // 5. Compute recommendations from ALL public lists
      const { data: publicLists } = await supabase
        .from("lists")
        .select("id, user_id")
        .eq("is_public", true)
        .neq("user_id", currentUser.id);

      if (publicLists?.length && viewerList.length > 0) {
        const publicListIds = publicLists.map((l) => l.id);
        const { data: allListItems } = await supabase
          .from("list_items")
          .select("list_id, show_id, rating, position")
          .in("list_id", publicListIds);

        if (allListItems?.length) {
          const listToUser = new Map(publicLists.map((l) => [l.id, l.user_id]));
          const userItemsMap = new Map<string, ListEntry[]>();

          for (const item of allListItems) {
            const userId = listToUser.get(item.list_id);
            if (!userId) continue;
            const arr = userItemsMap.get(userId) ?? [];
            arr.push({
              showId: item.show_id,
              rating: item.rating,
              position: item.position ?? arr.length,
            });
            userItemsMap.set(userId, arr);
          }

          const otherLists: UserList[] = Array.from(userItemsMap.entries()).map(
            ([userId, items]) => ({ userId, items }),
          );

          if (otherLists.length > 0) {
            const scored = scoreRecommendations(viewerList, otherLists, 20, 12);
            if (scored.length > 0) {
              const scoredShowIds = scored.map((s) => s.showId);
              const { data: scoredShowsData } = await supabase
                .from("shows")
                .select("id, tmdb_id, title, poster_path")
                .in("id", scoredShowIds);

              const newMap = new Map<number, number>();
              const suggestions: SuggestedShow[] = [];

              for (const s of scored) {
                const show = scoredShowsData?.find((sh) => sh.id === s.showId);
                if (!show?.tmdb_id) continue;
                const scoreVal = Math.min(99, s.score);
                newMap.set(show.tmdb_id, scoreVal);
                suggestions.push({
                  id: show.id,
                  tmdb_id: show.tmdb_id,
                  title: show.title,
                  poster_path: show.poster_path,
                  score: scoreVal,
                  recommendedBy: s.recommendedBy,
                });
              }

              setRecScoreMap(newMap);
              setSuggestedShows(suggestions);
            }
          }
        }
      }

      // 6. Suggested users (users with common shows, not followed yet)
      setSuggestedLoading(true);
      if (showIds.length > 0) {
        const { data: commonItems } = await supabase
          .from("list_items")
          .select("list_id")
          .in("show_id", showIds.slice(0, 50));

        const otherListIds = [
          ...new Set(
            (commonItems ?? [])
              .map((i) => i.list_id)
              .filter((id) => id !== myList.id),
          ),
        ];

        if (otherListIds.length > 0) {
          const { data: otherListsData } = await supabase
            .from("lists")
            .select("id, user_id")
            .in("id", otherListIds.slice(0, 30));

          const candidateUserIds = [
            ...new Set(
              (otherListsData ?? [])
                .map((l) => l.user_id)
                .filter(
                  (uid) => uid !== currentUser.id && !followedIds.includes(uid),
                ),
            ),
          ].slice(0, 15);

          if (candidateUserIds.length > 0) {
            const { data: profiles } = await supabase
              .from("profiles")
              .select("id, username")
              .in("id", candidateUserIds);

            const suggestions: UserResult[] = [];
            for (const p of profiles ?? []) {
              const { data: userList } = await supabase
                .from("lists")
                .select("id")
                .eq("user_id", p.id)
                .single();

              if (!userList) continue;

              const { data: items, count } = await supabase
                .from("list_items")
                .select("show_id, rating, position", { count: "exact" })
                .eq("list_id", userList.id)
                .order("position");

              let similarity: number | null = null;
              if (viewerList.length > 0 && items?.length) {
                const otherData: ListEntry[] = items.map((i, idx) => ({
                  showId: i.show_id,
                  rating: i.rating,
                  position: i.position ?? idx,
                }));
                similarity = computeListSimilarity(viewerList, otherData);
              }

              suggestions.push({ ...p, show_count: count ?? 0, similarity });
            }

            suggestions.sort(
              (a, b) => (b.similarity ?? 0) - (a.similarity ?? 0),
            );
            setSuggestedUsers(
              suggestions.filter((s) => (s.similarity ?? 0) > 0),
            );
          }
        }
      }
      setSuggestedLoading(false);
    };

    init();
  }, [currentUser?.id]);

  const searchShows = async (q: string) => {
    if (!q.trim()) {
      setShows([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${SITE_URL}/api/tmdb/search?q=${encodeURIComponent(q)}`,
      );
      const data = await res.json();
      setShows(data.results ?? []);
    } catch {
      setShows([]);
    }
    setLoading(false);
  };

  const searchUsers = async (q: string) => {
    if (!q.trim()) {
      setUsers([]);
      return;
    }
    setLoading(true);

    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username")
      .ilike("username", `%${q}%`)
      .limit(10);

    if (!profiles?.length) {
      setUsers([]);
      setLoading(false);
      return;
    }

    // Fetch viewer's list for similarity computation
    let viewerListData: ListEntry[] = [];
    if (currentUser) {
      const { data: viewerList } = await supabase
        .from("lists")
        .select("id")
        .eq("user_id", currentUser.id)
        .single();
      if (viewerList) {
        const { data: vi } = await supabase
          .from("list_items")
          .select("show_id, rating, position")
          .eq("list_id", viewerList.id)
          .order("position");
        viewerListData = (vi ?? []).map((i, idx) => ({
          showId: i.show_id,
          rating: i.rating,
          position: i.position ?? idx,
        }));
      }
    }

    const results: UserResult[] = [];
    for (const p of profiles) {
      if (currentUser && p.id === currentUser.id) continue;

      const { data: userList } = await supabase
        .from("lists")
        .select("id")
        .eq("user_id", p.id)
        .single();

      if (!userList) {
        results.push({ ...p, show_count: 0, similarity: null });
        continue;
      }

      const { data: listItems, count } = await supabase
        .from("list_items")
        .select("show_id, rating, position", { count: "exact" })
        .eq("list_id", userList.id)
        .order("position");

      let similarity: number | null = null;
      if (viewerListData.length > 0 && listItems?.length) {
        const otherData: ListEntry[] = listItems.map((i, idx) => ({
          showId: i.show_id,
          rating: i.rating,
          position: i.position ?? idx,
        }));
        similarity = computeListSimilarity(viewerListData, otherData);
      }

      results.push({ ...p, show_count: count ?? 0, similarity });
    }

    setUsers(results);
    setLoading(false);
  };

  // ── Add suggested show (already in DB) ──
  const addSuggestedShowById = useCallback(
    async (show: SuggestedShow) => {
      if (!currentUser || !show.tmdb_id) return;
      if (myTmdbIds.has(show.tmdb_id) || addedTmdbIds.has(show.tmdb_id)) return;
      setAddingCardId(show.id);
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
        setAddedTmdbIds((prev) => new Set([...prev, show.tmdb_id!]));
        setMyTmdbIds((prev) => new Set([...prev, show.tmdb_id!]));
      } catch {
        // silent fail
      }
      setAddingCardId(null);
    },
    [currentUser, myListId, myTmdbIds, addedTmdbIds],
  );

  // ── Add show to list ──
  const addShowToList = useCallback(
    async (show: SearchShow) => {
      if (
        !currentUser ||
        myTmdbIds.has(show.tmdb_id) ||
        addedTmdbIds.has(show.tmdb_id)
      )
        return;
      setAddingTmdbId(show.tmdb_id);

      try {
        // Find or create show in DB
        let showId: string;
        const { data: existing } = await supabase
          .from("shows")
          .select("id")
          .eq("tmdb_id", show.tmdb_id)
          .maybeSingle();

        if (existing) {
          showId = existing.id;
        } else {
          const { data: inserted } = await supabase
            .from("shows")
            .insert({
              tmdb_id: show.tmdb_id,
              title: show.title,
              poster_path: show.poster_path,
              first_air_date: show.first_air_date || null,
              tmdb_fetched: false,
            })
            .select("id")
            .single();

          if (!inserted) throw new Error("Failed to insert show");
          showId = inserted.id;
        }

        // Get or create list
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

        // Get next position
        const { data: maxPosData } = await supabase
          .from("list_items")
          .select("position")
          .eq("list_id", listId)
          .order("position", { ascending: false })
          .limit(1);

        const nextPos = (maxPosData?.[0]?.position ?? 0) + 1;

        // Insert list item
        await supabase
          .from("list_items")
          .insert({ list_id: listId, show_id: showId, position: nextPos });

        setAddedTmdbIds((prev) => new Set([...prev, show.tmdb_id]));
        setMyTmdbIds((prev) => new Set([...prev, show.tmdb_id]));
      } catch {
        // silent fail
      }

      setAddingTmdbId(null);
    },
    [currentUser, myListId, myTmdbIds, addedTmdbIds],
  );

  // ── Toggle follow ──
  const toggleFollow = useCallback(
    async (userId: string) => {
      if (!currentUser) return;
      setFollowLoadingId(userId);

      if (followingIds.has(userId)) {
        await supabase
          .from("follows")
          .delete()
          .eq("follower_id", currentUser.id)
          .eq("following_id", userId);
        setFollowingIds((prev) => {
          const next = new Set(prev);
          next.delete(userId);
          return next;
        });
      } else {
        await supabase
          .from("follows")
          .insert({ follower_id: currentUser.id, following_id: userId });
        setFollowingIds((prev) => new Set([...prev, userId]));
      }

      setFollowLoadingId(null);
    },
    [currentUser, followingIds],
  );

  const handleSearch = (text: string) => {
    setQuery(text);
    if (tab === "shows") searchShows(text);
    else searchUsers(text);
  };

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    setQuery("");
    setShows([]);
    setUsers([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, tab === "shows" && styles.tabActive]}
          onPress={() => handleTabChange("shows")}
        >
          <Text
            style={[styles.tabText, tab === "shows" && styles.tabTextActive]}
          >
            {t("explore.shows")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === "users" && styles.tabActive]}
          onPress={() => handleTabChange("users")}
        >
          <Text
            style={[styles.tabText, tab === "users" && styles.tabTextActive]}
          >
            {t("explore.users")}
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder={
          tab === "shows" ? t("explore.searchShows") : t("explore.searchUsers")
        }
        placeholderTextColor="#6b6b74"
        value={query}
        onChangeText={handleSearch}
        autoCapitalize="none"
        returnKeyType="search"
      />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={ACCENT} />
        </View>
      ) : tab === "shows" ? (
        <FlatList
          data={shows}
          keyExtractor={(item) => String(item.tmdb_id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            query ? (
              <Text style={styles.empty}>{t("explore.noShows")}</Text>
            ) : suggestedShows.length > 0 ? (
              <View
                style={{
                  paddingHorizontal: CARD_PADDING,
                  paddingTop: 12,
                  paddingBottom: 20,
                }}
              >
                <Text style={styles.suggestedTitle}>
                  {t("explore.suggestedShows")}
                </Text>
                <View style={styles.cardGrid}>
                  {suggestedShows.map((item) => {
                    const isInList =
                      myTmdbIds.has(item.tmdb_id ?? -1) ||
                      addedTmdbIds.has(item.tmdb_id ?? -1);
                    const isAdding = addingCardId === item.id;
                    const isSelected = selectedCardId === item.id;
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        activeOpacity={0.9}
                        onPress={() =>
                          setSelectedCardId(isSelected ? null : item.id)
                        }
                      >
                        {item.poster_path ? (
                          <Image
                            source={{
                              uri:
                                getPosterUrl(item.poster_path, "w342") ??
                                undefined,
                            }}
                            style={StyleSheet.absoluteFill}
                            resizeMode="cover"
                          />
                        ) : (
                          <View
                            style={[
                              StyleSheet.absoluteFill,
                              { backgroundColor: "#1e1e22" },
                            ]}
                          />
                        )}
                        {!isSelected && (
                          <View style={styles.cardScoreBadge}>
                            <Text style={styles.cardScoreText}>
                              {item.score}%
                            </Text>
                          </View>
                        )}
                        {!isSelected && (
                          <View style={styles.cardOverlay}>
                            <Text style={styles.cardTitle} numberOfLines={2}>
                              {item.title}
                            </Text>
                            <Text style={styles.cardMeta}>
                              {item.recommendedBy === 1
                                ? t("explore.similarUser", { count: 1 })
                                : t("explore.similarUsers", {
                                    count: item.recommendedBy,
                                  })}
                            </Text>
                          </View>
                        )}
                        {isSelected && (
                          <View style={styles.cardActionOverlay}>
                            <TouchableOpacity
                              style={[
                                styles.cardActionBtn,
                                isInList && styles.cardActionBtnDisabled,
                              ]}
                              onPress={() => addSuggestedShowById(item)}
                              disabled={isInList || isAdding}
                            >
                              {isAdding ? (
                                <ActivityIndicator color="#000" size="small" />
                              ) : (
                                <Text style={styles.cardActionBtnText}>
                                  {isInList
                                    ? "✓ Aggiunto"
                                    : `+ ${t("explore.addToList")}`}
                                </Text>
                              )}
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.cardActionBtnSecondary}
                              onPress={() => {
                                setSelectedCardId(null);
                                item.tmdb_id &&
                                  router.push(`/show/${item.tmdb_id}?tmdb=1`);
                              }}
                            >
                              <Text style={styles.cardActionBtnSecondaryText}>
                                → {t("explore.details")}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ) : null
          }
          renderItem={({ item }) => {
            const posterUrl = getPosterUrl(item.poster_path, "w185");
            const isInList =
              myTmdbIds.has(item.tmdb_id) || addedTmdbIds.has(item.tmdb_id);
            const isAdding = addingTmdbId === item.tmdb_id;
            const recScore = recScoreMap.get(item.tmdb_id);

            return (
              <TouchableOpacity
                style={styles.row}
                onPress={() => router.push(`/show/${item.tmdb_id}?tmdb=1`)}
              >
                {posterUrl ? (
                  <Image source={{ uri: posterUrl }} style={styles.poster} />
                ) : (
                  <View style={[styles.poster, styles.posterPlaceholder]} />
                )}
                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.subtitle}>
                    {item.first_air_date?.slice(0, 4) ?? ""}
                    {item.vote_average
                      ? ` · ★ ${item.vote_average.toFixed(1)}`
                      : ""}
                  </Text>
                  {recScore != null && recScore > 0 && (
                    <View style={styles.recBadge}>
                      <Text style={styles.recText}>{recScore}% match</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => addShowToList(item)}
                  disabled={isInList || isAdding}
                  style={styles.addShowBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  {isAdding ? (
                    <ActivityIndicator color={ACCENT} size="small" />
                  ) : isInList ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#6b6b74"
                    />
                  ) : (
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color={ACCENT}
                    />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            query ? (
              <Text style={styles.empty}>{t("explore.noUsers")}</Text>
            ) : suggestedLoading ? (
              <ActivityIndicator color={ACCENT} style={{ marginTop: 40 }} />
            ) : suggestedUsers.length > 0 ? (
              <View>
                <Text style={styles.suggestedTitle}>
                  {t("explore.suggestedUsers")}
                </Text>
                {suggestedUsers.map((item) => {
                  const isSugFollowing = followingIds.has(item.id);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.row}
                      onPress={() => router.push(`/user/${item.username}`)}
                    >
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {item.username[0]?.toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.info}>
                        <Text style={styles.title}>@{item.username}</Text>
                        <Text style={styles.subtitle}>
                          {t("profile.showsCount", {
                            count: item.show_count,
                          })}
                        </Text>
                      </View>
                      {item.similarity !== null && (
                        <View style={styles.similarityBadge}>
                          <Text style={styles.similarityText}>
                            {item.similarity}%
                          </Text>
                        </View>
                      )}
                      {currentUser && (
                        <TouchableOpacity
                          onPress={() => toggleFollow(item.id)}
                          disabled={followLoadingId === item.id}
                          style={[
                            styles.followBtn,
                            isSugFollowing && styles.followBtnActive,
                          ]}
                        >
                          {followLoadingId === item.id ? (
                            <ActivityIndicator
                              color={isSugFollowing ? "#000" : ACCENT}
                              size="small"
                            />
                          ) : (
                            <Text
                              style={[
                                styles.followBtnText,
                                isSugFollowing && styles.followBtnTextActive,
                              ]}
                            >
                              {isSugFollowing
                                ? t("profile.unfollow")
                                : t("profile.follow")}
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null
          }
          renderItem={({ item }) => {
            const isFollowing = followingIds.has(item.id);
            const isLoadingFollow = followLoadingId === item.id;

            return (
              <TouchableOpacity
                style={styles.row}
                onPress={() => router.push(`/user/${item.username}`)}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.username[0]?.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.title}>@{item.username}</Text>
                  <Text style={styles.subtitle}>
                    {t("profile.showsCount", { count: item.show_count })}
                  </Text>
                </View>
                {item.similarity !== null && (
                  <View style={styles.similarityBadge}>
                    <Text style={styles.similarityText}>
                      {item.similarity}%
                    </Text>
                  </View>
                )}
                {currentUser && item.id !== currentUser.id && (
                  <TouchableOpacity
                    onPress={() => toggleFollow(item.id)}
                    disabled={isLoadingFollow}
                    style={[
                      styles.followBtn,
                      isFollowing && styles.followBtnActive,
                    ]}
                  >
                    {isLoadingFollow ? (
                      <ActivityIndicator
                        color={isFollowing ? "#000" : ACCENT}
                        size="small"
                      />
                    ) : (
                      <Text
                        style={[
                          styles.followBtnText,
                          isFollowing && styles.followBtnTextActive,
                        ]}
                      >
                        {isFollowing
                          ? t("profile.unfollow")
                          : t("profile.follow")}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
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
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabActive: { borderBottomWidth: 2, borderBottomColor: ACCENT },
  tabText: { fontSize: 15, color: "#6b6b74", fontWeight: "500" },
  tabTextActive: { color: "#f0f0f0" },
  searchInput: {
    backgroundColor: "#141416",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#f0f0f0",
  },
  list: { paddingBottom: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  poster: {
    width: 44,
    height: 66,
    borderRadius: 6,
    backgroundColor: "#1e1e22",
    marginRight: 12,
  },
  posterPlaceholder: { backgroundColor: "#1e1e22" },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,212,170,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: { color: ACCENT, fontSize: 17, fontWeight: "700" },
  info: { flex: 1 },
  title: { fontSize: 15, fontWeight: "600", color: "#f0f0f0" },
  subtitle: { fontSize: 13, color: "#a0a0a8", marginTop: 2 },
  similarityBadge: {
    backgroundColor: "rgba(0,212,170,0.12)",
    borderWidth: 1,
    borderColor: "rgba(0,212,170,0.3)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  similarityText: { color: ACCENT, fontSize: 13, fontWeight: "700" },
  empty: { color: "#6b6b74", fontSize: 15, textAlign: "center", marginTop: 40 },

  // Add show button
  addShowBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },

  // Recommendation badge
  recBadge: {
    backgroundColor: "rgba(0,212,170,0.10)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 3,
  },
  recText: { color: ACCENT, fontSize: 11, fontWeight: "600" },

  // Suggested users
  suggestedTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#a0a0a8",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },

  // Follow button
  followBtn: {
    borderWidth: 1,
    borderColor: "rgba(0,212,170,0.4)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginLeft: 8,
  },
  followBtnActive: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  followBtnText: { color: ACCENT, fontSize: 12, fontWeight: "600" },
  followBtnTextActive: { color: "#000" },

  // Card grid
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1e1e22",
    marginBottom: CARD_GAP,
  },
  cardScoreBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: ACCENT,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  cardScoreText: { color: "#000", fontSize: 11, fontWeight: "800" },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.72)",
    padding: 8,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  cardMeta: { color: "rgba(255,255,255,0.65)", fontSize: 10 },

  // Card action overlay (shown on tap)
  cardActionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.72)",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  cardActionBtn: {
    width: "100%",
    backgroundColor: ACCENT,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  cardActionBtnDisabled: {
    backgroundColor: "rgba(0,212,170,0.4)",
  },
  cardActionBtnText: { color: "#000", fontSize: 13, fontWeight: "700" },
  cardActionBtnSecondary: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  cardActionBtnSecondaryText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});
