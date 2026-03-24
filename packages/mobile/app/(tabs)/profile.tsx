import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../lib/auth";
import { DEFAULT_RATING_LABELS } from "@tvranker/shared";
import type { Profile } from "@tvranker/shared";

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showCount, setShowCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [listId, setListId] = useState<string | null>(null);

  // Rating labels
  const [labels, setLabels] = useState<string[]>([...DEFAULT_RATING_LABELS]);
  const [labelsSaved, setLabelsSaved] = useState(false);

  // Visibility
  const [isPublic, setIsPublic] = useState(true);
  const [visibleToFollowers, setVisibleToFollowers] = useState(false);
  const [visibleToFollowing, setVisibleToFollowing] = useState(false);

  const ACCENT = "#00d4aa";

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      const { data: lists } = await supabase
        .from("lists")
        .select("id, is_public, visible_to_followers, visible_to_following")
        .eq("user_id", user.id)
        .limit(1);

      if (lists?.[0]) {
        setListId(lists[0].id);
        setIsPublic(lists[0].is_public);
        setVisibleToFollowers(lists[0].visible_to_followers ?? false);
        setVisibleToFollowing(lists[0].visible_to_following ?? false);

        const { count } = await supabase
          .from("list_items")
          .select("id", { count: "exact", head: true })
          .eq("list_id", lists[0].id);
        setShowCount(count ?? 0);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  // Init labels from profile
  useEffect(() => {
    if (profile?.rating_labels?.length === 10) {
      setLabels([...profile.rating_labels]);
    } else {
      setLabels([...DEFAULT_RATING_LABELS]);
    }
  }, [profile]);

  const handleSaveLabels = async () => {
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ rating_labels: labels })
      .eq("id", user.id);
    setProfile((prev) => (prev ? { ...prev, rating_labels: labels } : null));
    setLabelsSaved(true);
    setTimeout(() => setLabelsSaved(false), 2000);
  };

  const handleResetLabels = () => {
    setLabels([...DEFAULT_RATING_LABELS]);
  };

  const handleVisibilityChange = async (
    field: "is_public" | "visible_to_followers" | "visible_to_following",
    value: boolean,
  ) => {
    if (!listId) return;
    if (field === "is_public") setIsPublic(value);
    if (field === "visible_to_followers") setVisibleToFollowers(value);
    if (field === "visible_to_following") setVisibleToFollowing(value);
    await supabase
      .from("lists")
      .update({ [field]: value })
      .eq("id", listId);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#00d4aa" size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {profile?.username?.[0]?.toUpperCase() ?? "?"}
          </Text>
        </View>
        <Text style={styles.username}>{profile?.username ?? "—"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.stats}>
          {t("profile.showsCount", { count: showCount })}
        </Text>
      </View>

      {/* Rating Labels Editor */}
      <View style={styles.labelsSection}>
        <Text style={styles.labelsSectionTitle}>
          {t("profile.ratingLabels")}
        </Text>
        <Text style={styles.labelsSectionDesc}>
          {t("profile.ratingLabelsDescription")}
        </Text>

        {labels.map((label, index) => (
          <View key={index} style={styles.labelRow}>
            <Text style={styles.labelNumber}>{index + 1}</Text>
            <TextInput
              style={styles.labelInput}
              value={label}
              onChangeText={(text) => {
                const newLabels = [...labels];
                newLabels[index] = text;
                setLabels(newLabels);
              }}
              placeholderTextColor="#6b6b74"
            />
          </View>
        ))}

        <View style={styles.labelActions}>
          <TouchableOpacity style={styles.resetBtn} onPress={handleResetLabels}>
            <Text style={styles.resetBtnText}>
              {t("profile.resetDefaults")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.saveLabelsBtn,
              labelsSaved && styles.saveLabelsBtnSaved,
            ]}
            onPress={handleSaveLabels}
          >
            <Text style={styles.saveLabelsBtnText}>
              {labelsSaved ? t("profile.labelsSaved") : t("profile.saveLabels")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* List Visibility */}
      {listId && (
        <View style={styles.visibilitySection}>
          <Text style={styles.sectionTitle}>
            {t("profile.visibilityTitle")}
          </Text>
          <Text style={styles.sectionDesc}>{t("profile.visibilityDesc")}</Text>

          {/* General visibility */}
          <View style={styles.visibilityRow}>
            <View style={styles.visibilityTextGroup}>
              <Text style={styles.visibilityLabel}>
                {t("profile.visibilityGeneral")}
              </Text>
              <Text style={styles.visibilityDesc2}>
                {t("profile.visibilityGeneralDesc")}
              </Text>
            </View>
            <Switch
              value={isPublic}
              onValueChange={(v) => handleVisibilityChange("is_public", v)}
              trackColor={{ false: "#27272a", true: ACCENT }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Visible to followers */}
          <View style={[styles.visibilityRow, isPublic && styles.dimmed]}>
            <View style={styles.visibilityTextGroup}>
              <Text style={styles.visibilityLabel}>
                {t("profile.visibilityFollowers")}
              </Text>
              <Text style={styles.visibilityDesc2}>
                {t("profile.visibilityFollowersDesc")}
              </Text>
            </View>
            <Switch
              value={visibleToFollowers}
              disabled={isPublic}
              onValueChange={(v) =>
                handleVisibilityChange("visible_to_followers", v)
              }
              trackColor={{ false: "#27272a", true: ACCENT }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Visible to following */}
          <View style={[styles.visibilityRow, isPublic && styles.dimmed]}>
            <View style={styles.visibilityTextGroup}>
              <Text style={styles.visibilityLabel}>
                {t("profile.visibilityFollowing")}
              </Text>
              <Text style={styles.visibilityDesc2}>
                {t("profile.visibilityFollowingDesc")}
              </Text>
            </View>
            <Switch
              value={visibleToFollowing}
              disabled={isPublic}
              onValueChange={(v) =>
                handleVisibilityChange("visible_to_following", v)
              }
              trackColor={{ false: "#27272a", true: ACCENT }}
              thumbColor="#ffffff"
            />
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutText}>{t("auth.logout")}</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", paddingTop: 40, paddingBottom: 32 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#27272a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { color: "#fafafa", fontSize: 28, fontWeight: "700" },
  username: { fontSize: 22, fontWeight: "700", color: "#fafafa" },
  email: { fontSize: 14, color: "#71717a", marginTop: 4 },
  stats: { fontSize: 14, color: "#a1a1aa", marginTop: 12 },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#27272a",
    alignItems: "center",
  },
  logoutText: { color: "#ef4444", fontSize: 15, fontWeight: "600" },

  // Rating labels
  labelsSection: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    backgroundColor: "#141416",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  labelsSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fafafa",
    marginBottom: 4,
  },
  labelsSectionDesc: {
    fontSize: 13,
    color: "#71717a",
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  labelNumber: {
    width: 24,
    fontSize: 14,
    fontWeight: "700",
    color: "#00d4aa",
    textAlign: "center",
  },
  labelInput: {
    flex: 1,
    backgroundColor: "#1e1e22",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#f0f0f0",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  labelActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 10,
  },
  resetBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  resetBtnText: { color: "#a1a1aa", fontSize: 13, fontWeight: "600" },
  saveLabelsBtn: {
    flex: 1,
    backgroundColor: "#00d4aa",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  saveLabelsBtnSaved: { backgroundColor: "#22C55E" },
  saveLabelsBtnText: { color: "#000", fontSize: 14, fontWeight: "700" },

  // Visibility
  visibilitySection: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: "#141416",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fafafa",
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 13,
    color: "#71717a",
    marginBottom: 16,
  },
  visibilityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
    gap: 12,
  },
  visibilityTextGroup: { flex: 1 },
  visibilityLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f0f0f0",
    marginBottom: 2,
  },
  visibilityDesc2: { fontSize: 12, color: "#71717a" },
  dimmed: { opacity: 0.4 },
});
