import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
  PanResponder,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import { getPosterUrl, getRatingLabel, tagDotColor } from "@tvranker/shared";
import type { Show, ListItem, Tag, ShowTag } from "@tvranker/shared";

const ACCENT = "#00d4aa";
const ROW_HEIGHT = 76;
const DELETE_WIDTH = 80;
const ACTION_WIDTH = 140;

type ListItemWithShow = ListItem & { shows: Show };

type DragState = {
  startIndex: number;
  currentIndex: number;
  startY: number;
  items: ListItemWithShow[];
};

// ─── Swipeable Row ────────────────────────────────────────────────────────────
// Uses onMoveShouldSetPanResponder (not onStart) so the drag handle's
// onStartShouldSetPanResponder wins over it when touching the handle.
function SwipeableRow({
  onDelete,
  onNotes,
  children,
}: {
  onDelete: () => void;
  onNotes: () => void;
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
      <View style={styles.swipeActions}>
        <TouchableOpacity
          onPress={() => {
            close();
            onNotes();
          }}
          style={styles.noteActionBtn}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.actionBtnText}>Note</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            close();
            onDelete();
          }}
          style={styles.deleteActionBtn}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.actionBtnText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <Animated.View
        {...pr.panHandlers}
        style={[styles.swipeRow, { transform: [{ translateX }] }]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

// ─── List Screen ──────────────────────────────────────────────────────────────
export default function ListScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();

  const [items, setItems] = useState<ListItemWithShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [ratingLabels, setRatingLabels] = useState<string[] | null>(null);
  const [ratingTarget, setRatingTarget] = useState<ListItemWithShow | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showFilterPicker, setShowFilterPicker] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  // Live order during drag – avoids polluting canonical `items` mid-gesture
  const [liveOrder, setLiveOrder] = useState<ListItemWithShow[] | null>(null);

  // Tags
  const [allTags, setAllTags] = useState<
    { id: string; name: string; color: string }[]
  >([]);
  const [showTagsMap, setShowTagsMap] = useState<Map<string, string[]>>(
    new Map(),
  );
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Notes
  const [notesTarget, setNotesTarget] = useState<ListItemWithShow | null>(null);
  const [notesText, setNotesText] = useState("");

  const dndRef = useRef<ListItemWithShow[]>([]);
  const dragRef = useRef<DragState | null>(null);

  // Clear any nav header buttons set by previous code
  useEffect(() => {
    navigation.setOptions({ headerRight: undefined });
  }, [navigation]);

  // ── Data ──────────────────────────────────────────────────────────────────

  const fetchList = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data: profile } = await supabase
      .from("profiles")
      .select("rating_labels")
      .eq("id", user.id)
      .single();
    setRatingLabels(profile?.rating_labels ?? null);
    const { data: lists } = await supabase
      .from("lists")
      .select("id")
      .eq("user_id", user.id)
      .limit(1);
    const id = lists?.[0]?.id ?? null;
    if (!id) {
      setItems([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("list_items")
      .select("*, shows(*)")
      .eq("list_id", id)
      .order("position", { ascending: true });
    setItems((data as ListItemWithShow[]) ?? []);

    // Fetch tags & show_tags
    const { data: tagsData } = await supabase
      .from("tags")
      .select("id, name, color")
      .or(`user_id.eq.${user.id},is_default.eq.true`);
    setAllTags(tagsData ?? []);

    const { data: showTagsData } = await supabase
      .from("show_tags")
      .select("show_id, tag_id")
      .eq("user_id", user.id);
    const tagMap = new Map<string, string[]>();
    for (const st of showTagsData ?? []) {
      if (!tagMap.has(st.show_id)) tagMap.set(st.show_id, []);
      tagMap.get(st.show_id)!.push(st.tag_id);
    }
    setShowTagsMap(tagMap);

    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // ── Derived state ─────────────────────────────────────────────────────────

  const flatItems = useMemo(
    () => [...items].sort((a, b) => a.position - b.position),
    [items],
  );

  // During drag use live order, otherwise canonical flat list
  const activeItems = liveOrder ?? flatItems;

  // Keep DnD ref always fresh
  useEffect(() => {
    dndRef.current = activeItems;
  }, [activeItems]);

  const isFiltering =
    searchQuery.trim().length > 0 ||
    filterRating !== null ||
    filterTag !== null;

  const displayItems = useMemo(() => {
    let result = activeItems;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((i) => i.shows.title.toLowerCase().includes(q));
    }
    if (filterRating !== null) {
      result = result.filter((i) => i.rating === filterRating);
    }
    if (filterTag !== null) {
      result = result.filter((i) => {
        const tagIds = showTagsMap.get(i.show_id) ?? [];
        return tagIds.includes(filterTag);
      });
    }
    return result;
  }, [activeItems, searchQuery, filterRating, filterTag, showTagsMap]);

  // Sections – flatten without headers while dragging for clean DnD
  const sections = useMemo(() => {
    if (draggingId) {
      return [
        {
          rating: null as number | null,
          label: "",
          data: displayItems.map((i, gi) => ({ ...i, globalIndex: gi + 1 })),
        },
      ];
    }
    const map = new Map<number | null, ListItemWithShow[]>();
    for (const item of displayItems) {
      const k = item.rating ?? null;
      if (!map.has(k)) map.set(k, []);
      map.get(k)!.push(item);
    }
    const sorted = [...map.entries()].sort(([a], [b]) => {
      if (a === null && b === null) return 0;
      if (a === null) return 1;
      if (b === null) return -1;
      return b - a;
    });
    let gi = 0;
    return sorted.map(([rating, data]) => ({
      rating,
      label:
        rating != null
          ? `${rating} \xb7 ${getRatingLabel(rating, ratingLabels).toUpperCase()}`
          : t("lists.unrated", "UNRATED"),
      data: data.map((item) => ({ ...item, globalIndex: ++gi })),
    }));
  }, [displayItems, draggingId, ratingLabels, t]);

  // ── Drag & Drop ───────────────────────────────────────────────────────────

  // One PanResponder per position slot. Uses onStartShouldSetPanResponder so
  // the handle always claims the gesture before SwipeableRow's move handler.
  const panResponders = useMemo(
    () =>
      activeItems.map((_, index) =>
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: (e) => {
            const snapshot = [...dndRef.current];
            dragRef.current = {
              startIndex: index,
              currentIndex: index,
              startY: e.nativeEvent.pageY,
              items: snapshot,
            };
            setDraggingId(snapshot[index]?.id ?? null);
            setScrollEnabled(false);
            setLiveOrder([...snapshot]);
          },
          onPanResponderMove: (e) => {
            const d = dragRef.current;
            if (!d) return;
            const dy = e.nativeEvent.pageY - d.startY;
            const target = Math.max(
              0,
              Math.min(
                d.items.length - 1,
                d.startIndex + Math.round(dy / ROW_HEIGHT),
              ),
            );
            if (target !== d.currentIndex) {
              const next = [...d.items];
              const [moved] = next.splice(d.currentIndex, 1);
              next.splice(target, 0, moved);
              d.items = next;
              d.currentIndex = target;
              setLiveOrder([...next]);
            }
          },
          onPanResponderRelease: async () => {
            const d = dragRef.current;
            dragRef.current = null;
            setDraggingId(null);
            setScrollEnabled(true);
            if (!d) return;
            const final = d.items;
            const updated = final.map((it, idx) => ({
              ...it,
              position: idx + 1,
            }));
            setItems(updated);
            setLiveOrder(null);
            await Promise.all(
              updated.map((it) =>
                supabase
                  .from("list_items")
                  .update({ position: it.position })
                  .eq("id", it.id),
              ),
            );
          },
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeItems.length],
  );

  // ── Action handlers ───────────────────────────────────────────────────────

  const handleDelete = async (item: ListItemWithShow) => {
    await supabase.from("list_items").delete().eq("id", item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleChangeRating = async (
    item: ListItemWithShow,
    newRating: number,
  ) => {
    setRatingTarget(null);
    await supabase
      .from("list_items")
      .update({ rating: newRating })
      .eq("id", item.id);
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, rating: newRating } : i)),
    );
  };

  const availableRatings = useMemo(
    () =>
      [
        ...new Set(
          items.map((i) => i.rating).filter((r): r is number => r !== null),
        ),
      ].sort((a, b) => b - a),
    [items],
  );

  const handleOpenNotes = (item: ListItemWithShow) => {
    setNotesTarget(item);
    setNotesText(item.notes ?? "");
  };

  const handleSaveNote = async () => {
    if (!notesTarget) return;
    const trimmed = notesText.trim();
    await supabase
      .from("list_items")
      .update({ notes: trimmed || null })
      .eq("id", notesTarget.id);
    setItems((prev) =>
      prev.map((i) =>
        i.id === notesTarget.id ? { ...i, notes: trimmed || null } : i,
      ),
    );
    setNotesTarget(null);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={ACCENT} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ── Toolbar ── */}
      <View style={styles.toolbar}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.push("/(tabs)/explore")}
          >
            <Ionicons name="add" size={18} color="#000" />
            <Text style={styles.addBtnText}>
              {t("lists.addShow", "Add show")}
            </Text>
          </TouchableOpacity>
          {items.length > 0 && (
            <TouchableOpacity
              style={styles.analyticsBtn}
              onPress={() => router.push("/analytics")}
            >
              <Ionicons name="stats-chart" size={16} color={ACCENT} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.searchRow}>
          <View style={styles.searchWrap}>
            <Ionicons
              name="search-outline"
              size={15}
              color="#6b6b74"
              style={{ marginHorizontal: 10 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder={t("lists.searchPlaceholder")}
              placeholderTextColor="#6b6b74"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
            />
            {searchQuery ? (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                style={{ paddingRight: 10 }}
              >
                <Ionicons name="close-circle" size={16} color="#6b6b74" />
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              (filterRating !== null || filterTag !== null) &&
                styles.filterBtnActive,
            ]}
            onPress={() => setShowFilterPicker(true)}
          >
            <Ionicons
              name="options-outline"
              size={18}
              color={
                filterRating !== null || filterTag !== null ? ACCENT : "#a0a0a8"
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Empty state ── */}
      {displayItems.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            {isFiltering ? t("common.noResults") : t("lists.emptyState")}
          </Text>
          {!isFiltering && (
            <TouchableOpacity
              style={[styles.addBtn, { marginTop: 20 }]}
              onPress={() => router.push("/(tabs)/explore")}
            >
              <Ionicons name="add" size={18} color="#000" />
              <Text style={styles.addBtnText}>
                {t("lists.addShow", "Add show")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ScrollView scrollEnabled={scrollEnabled} bounces={false}>
          {sections.map((section) => (
            <View key={section.label || "__flat__"}>
              {section.label ? (
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{section.label}</Text>
                </View>
              ) : null}

              {section.data.map((item) => {
                const posterUrl = getPosterUrl(item.shows.poster_path, "w92");
                const isDragging = draggingId === item.id;
                const dndIndex = activeItems.findIndex((i) => i.id === item.id);
                // Disable drag when a filter is active (visual positions don't match full list)
                const ph =
                  !isFiltering && dndIndex >= 0
                    ? panResponders[dndIndex]
                    : null;

                return (
                  <SwipeableRow
                    key={item.id}
                    onDelete={() => handleDelete(item)}
                    onNotes={() => handleOpenNotes(item)}
                  >
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={[styles.row, isDragging && styles.rowDragging]}
                      onPress={() => router.push(`/show/${item.shows.id}`)}
                    >
                      <Text style={styles.rank}>{item.globalIndex}</Text>
                      {posterUrl ? (
                        <Image
                          source={{ uri: posterUrl }}
                          style={styles.poster}
                        />
                      ) : (
                        <View
                          style={[styles.poster, styles.posterPlaceholder]}
                        />
                      )}
                      <View style={styles.info}>
                        <Text style={styles.title} numberOfLines={2}>
                          {item.shows.title}
                        </Text>
                        {(() => {
                          const tagIds = showTagsMap.get(item.show_id) ?? [];
                          const tags = allTags.filter((t) =>
                            tagIds.includes(t.id),
                          );
                          return tags.length > 0 ? (
                            <View style={styles.tagDotsRow}>
                              {tags.map((tag) => (
                                <View
                                  key={tag.id}
                                  style={[
                                    styles.tagDot,
                                    {
                                      backgroundColor: tagDotColor(tag.color),
                                    },
                                  ]}
                                />
                              ))}
                            </View>
                          ) : null;
                        })()}
                        {item.notes && item.notes.trim() ? (
                          <Text style={styles.notePreview} numberOfLines={1}>
                            {item.notes}
                          </Text>
                        ) : null}
                      </View>

                      {/* Tap to change rating */}
                      <TouchableOpacity
                        onPress={() => setRatingTarget(item)}
                        hitSlop={{ top: 10, bottom: 10, left: 8, right: 4 }}
                      >
                        <Text style={styles.ratingBadge}>
                          {item.rating != null ? `${item.rating}/10` : "\u2014"}
                        </Text>
                      </TouchableOpacity>

                      {/* Drag handle – always visible */}
                      {ph ? (
                        <View {...ph.panHandlers} style={styles.dragHandle}>
                          <Ionicons
                            name="reorder-three"
                            size={24}
                            color={isDragging ? ACCENT : "#404048"}
                          />
                        </View>
                      ) : (
                        <View style={[styles.dragHandle, { opacity: 0.25 }]}>
                          <Ionicons
                            name="reorder-three"
                            size={24}
                            color="#404048"
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </SwipeableRow>
                );
              })}
            </View>
          ))}
        </ScrollView>
      )}

      {/* ── Rating modal ── */}
      <Modal
        visible={!!ratingTarget}
        transparent
        animationType="fade"
        onRequestClose={() => setRatingTarget(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setRatingTarget(null)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("lists.changeRating")}</Text>
            {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((n) => (
              <TouchableOpacity
                key={n}
                style={styles.ratingOption}
                onPress={() =>
                  ratingTarget && handleChangeRating(ratingTarget, n)
                }
              >
                <Text style={styles.ratingOptionNumber}>{n}</Text>
                <Text style={styles.ratingOptionLabel}>
                  {getRatingLabel(n, ratingLabels)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* ── Filter modal ── */}
      <Modal
        visible={showFilterPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFilterPicker(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowFilterPicker(false)}
        >
          <View
            style={styles.filterModalContent}
            onStartShouldSetResponder={() => true}
          >
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8 }}
            >
              <Text style={styles.modalTitle}>
                {t("lists.filterByRating", "Filter by rating")}
              </Text>
              <TouchableOpacity
                style={[
                  styles.ratingOption,
                  filterRating === null && styles.ratingOptionActive,
                ]}
                onPress={() => {
                  setFilterRating(null);
                  setShowFilterPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.ratingOptionLabel,
                    filterRating === null && { color: ACCENT },
                  ]}
                >
                  {t("lists.allRatings", "All ratings")}
                </Text>
              </TouchableOpacity>
              {availableRatings.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.ratingOption,
                    filterRating === r && styles.ratingOptionActive,
                  ]}
                  onPress={() => {
                    setFilterRating(r);
                    setShowFilterPicker(false);
                  }}
                >
                  <Text style={styles.ratingOptionNumber}>{r}</Text>
                  <Text
                    style={[
                      styles.ratingOptionLabel,
                      filterRating === r && { color: ACCENT },
                    ]}
                  >
                    {getRatingLabel(r, ratingLabels)}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Tag filter */}
              {allTags.length > 0 && (
                <>
                  <View style={styles.filterDivider} />
                  <Text style={styles.modalTitle}>
                    {t("lists.filterByTag", "Filter by tag")}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.ratingOption,
                      filterTag === null && styles.ratingOptionActive,
                    ]}
                    onPress={() => {
                      setFilterTag(null);
                      setShowFilterPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.ratingOptionLabel,
                        filterTag === null && { color: ACCENT },
                      ]}
                    >
                      {t("lists.allTags", "All tags")}
                    </Text>
                  </TouchableOpacity>
                  {allTags.map((tag) => (
                    <TouchableOpacity
                      key={tag.id}
                      style={[
                        styles.ratingOption,
                        filterTag === tag.id && styles.ratingOptionActive,
                      ]}
                      onPress={() => {
                        setFilterTag(tag.id);
                        setShowFilterPicker(false);
                      }}
                    >
                      <View
                        style={[
                          styles.tagDotFilter,
                          { backgroundColor: tagDotColor(tag.color) },
                        ]}
                      />
                      <Text
                        style={[
                          styles.ratingOptionLabel,
                          filterTag === tag.id && { color: ACCENT },
                        ]}
                      >
                        {tag.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      {/* ── Notes modal ── */}
      <Modal
        visible={!!notesTarget}
        transparent
        animationType="fade"
        onRequestClose={() => setNotesTarget(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setNotesTarget(null)}
        >
          <View
            style={styles.notesModalContent}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>{t("lists.addNote")}</Text>
            <TextInput
              style={styles.notesInput}
              value={notesText}
              onChangeText={setNotesText}
              placeholder={t("lists.notePlaceholder")}
              placeholderTextColor="#6b6b74"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              autoFocus
            />
            <TouchableOpacity
              style={styles.saveNoteBtn}
              onPress={handleSaveNote}
            >
              <Text style={styles.saveNoteBtnText}>{t("common.save")}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0b" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: { color: "#6b6b74", fontSize: 15, textAlign: "center" },

  // Toolbar
  toolbar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ACCENT,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 14,
    gap: 6,
    alignSelf: "flex-start",
  },
  addBtnText: { color: "#000", fontWeight: "700", fontSize: 14 },
  analyticsBtn: {
    width: 40,
    height: 38,
    borderRadius: 8,
    backgroundColor: "rgba(0,212,170,0.08)",
    borderWidth: 1,
    borderColor: "rgba(0,212,170,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  searchWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141416",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    height: 40,
  },
  searchInput: { flex: 1, color: "#f0f0f0", fontSize: 14 },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#141416",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  filterBtnActive: {
    borderColor: "rgba(0,212,170,0.4)",
    backgroundColor: "rgba(0,212,170,0.08)",
  },

  // Sections
  sectionHeader: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 6 },
  sectionHeaderText: {
    fontSize: 11,
    fontWeight: "700",
    color: ACCENT,
    letterSpacing: 1,
  },

  // Swipe actions
  swipeRow: { backgroundColor: "#0a0a0b" },
  swipeActions: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    flexDirection: "row",
  },
  noteActionBtn: {
    flex: 1,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteActionBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.06)",
    backgroundColor: "#0a0a0b",
    minHeight: ROW_HEIGHT,
  },
  rowDragging: {
    backgroundColor: "#1a1a20",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  rank: {
    width: 28,
    fontSize: 14,
    fontWeight: "600",
    color: "#6b6b74",
    textAlign: "center",
  },
  poster: {
    width: 44,
    height: 66,
    borderRadius: 6,
    backgroundColor: "#1e1e22",
    marginRight: 12,
  },
  posterPlaceholder: { backgroundColor: "#1e1e22" },
  info: { flex: 1, paddingRight: 8 },
  title: { fontSize: 15, fontWeight: "600", color: "#f0f0f0" },
  ratingLabel: { fontSize: 12, color: "#a0a0a8", marginTop: 2 },

  // Tag dots
  tagDotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },
  tagDot: { width: 8, height: 8, borderRadius: 4 },
  tagDotFilter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  filterDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 8,
    marginHorizontal: 16,
  },

  // Note preview
  notePreview: {
    fontSize: 11,
    color: "#6b6b74",
    marginTop: 2,
    fontStyle: "italic",
  },
  ratingBadge: {
    fontSize: 13,
    fontWeight: "700",
    color: ACCENT,
    minWidth: 40,
    textAlign: "right",
    marginRight: 4,
  },
  dragHandle: {
    width: 36,
    height: ROW_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#141416",
    borderRadius: 14,
    width: 280,
    paddingVertical: 8,
    paddingHorizontal: 4,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#f0f0f0",
    textAlign: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.1)",
    marginBottom: 4,
  },
  ratingOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  ratingOptionActive: { backgroundColor: "rgba(0,212,170,0.08)" },
  ratingOptionNumber: {
    fontSize: 15,
    fontWeight: "700",
    color: ACCENT,
    width: 28,
  },
  ratingOptionLabel: { fontSize: 15, color: "#f0f0f0" },

  // Filter modal (scrollable)
  filterModalContent: {
    backgroundColor: "#141416",
    borderRadius: 14,
    width: 300,
    maxHeight: "85%",
  },

  // Notes modal
  notesModalContent: {
    backgroundColor: "#141416",
    borderRadius: 14,
    width: 300,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  notesInput: {
    backgroundColor: "#1e1e22",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#f0f0f0",
    fontSize: 14,
    padding: 12,
    minHeight: 100,
    marginTop: 12,
  },
  saveNoteBtn: {
    backgroundColor: ACCENT,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 12,
  },
  saveNoteBtnText: { color: "#000", fontWeight: "700", fontSize: 14 },
});
