import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { supabase } from "../../lib/supabase";
import { getPosterUrl } from "@tvranker/shared";
import type { Show } from "@tvranker/shared";

export default function ShowDetailScreen() {
  const { id, tmdb } = useLocalSearchParams<{ id: string; tmdb?: string }>();
  const { t } = useTranslation();
  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const isTmdb = tmdb === "1";
    const query = isTmdb
      ? supabase.from("shows").select("*").eq("tmdb_id", Number(id)).single()
      : supabase.from("shows").select("*").eq("id", id).single();

    query.then(({ data }) => {
      setShow(data);
      setLoading(false);
    });
  }, [id, tmdb]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#00d4aa" size="large" />
      </View>
    );
  }

  if (!show) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>{t("shows.notFound")}</Text>
      </View>
    );
  }

  const poster = getPosterUrl(show.poster_path ?? null, "w500");
  const year = show.first_air_date
    ? new Date(show.first_air_date).getFullYear()
    : null;

  return (
    <ScrollView style={styles.container}>
      {poster && <Image source={{ uri: poster }} style={styles.poster} />}

      <View style={styles.body}>
        <Text style={styles.title}>{show.title}</Text>

        {year && <Text style={styles.meta}>{year}</Text>}

        {show.overview ? (
          <Text style={styles.overview}>{show.overview}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#09090b" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#09090b",
  },
  poster: { width: "100%", height: 450, resizeMode: "cover" },
  body: { padding: 16 },
  title: { fontSize: 24, fontWeight: "700", color: "#fafafa" },
  meta: { fontSize: 14, color: "#71717a", marginTop: 4 },
  overview: {
    fontSize: 15,
    color: "#a1a1aa",
    marginTop: 16,
    lineHeight: 22,
  },
  muted: { color: "#71717a", fontSize: 15 },
});
