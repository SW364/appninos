import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useVideoPlayer, VideoView } from "expo-video";

import { colors, fonts, spacing, radius } from "@/src/theme";

type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  bg: string;
  uri: string;
};

const LESSONS: Lesson[] = [
  {
    id: "v1",
    title: "Lección 1",
    subtitle: "Aprende inglés jugando",
    emoji: "🎬",
    color: "#4A7DF0",
    bg: "#E8F1FC",
    uri: "https://customer-assets-39nsmqrw.emergentagent.net/job_find-estasaqui/artifacts/wgh53vsl_WhatsApp%20Video%202026-09-10%20at%208.04.13%20AM.mp4",
  },
  {
    id: "v2",
    title: "Lección 2",
    subtitle: "Aprende inglés jugando",
    emoji: "🎥",
    color: "#1FB6A6",
    bg: "#E4F6F3",
    uri: "https://customer-assets-39nsmqrw.emergentagent.net/job_find-estasaqui/artifacts/ztuhpvrk_WhatsApp%20Video%202026-09-12%20at%208.40.45%20PM.mp4",
  },
];

function VideoCard({ lesson }: { lesson: Lesson }) {
  const player = useVideoPlayer(lesson.uri, (p) => {
    p.loop = false;
  });

  return (
    <View style={[styles.card, { backgroundColor: lesson.bg }]} testID={`video-card-${lesson.id}`}>
      <View style={styles.cardHeader}>
        <View style={[styles.emojiCircle, { backgroundColor: lesson.color }]}>
          <Text style={styles.emoji}>{lesson.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardTitle, { color: lesson.color }]}>{lesson.title}</Text>
          <Text style={styles.cardSubtitle}>{lesson.subtitle}</Text>
        </View>
      </View>
      <VideoView
        testID={`video-player-${lesson.id}`}
        player={player}
        style={styles.video}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls
      />
    </View>
  );
}

export default function Videos() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgBottom]} style={styles.flex}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + spacing.sm,
          paddingBottom: insets.bottom + spacing.xl,
          paddingHorizontal: spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.roundBtn} onPress={() => router.back()} testID="back-button">
            <Ionicons name="arrow-back" size={22} color={colors.ink} />
          </Pressable>
          <View style={{ flex: 1 }} />
        </View>

        <Text style={styles.mascot}>📺</Text>
        <Text style={styles.title}>Videos</Text>
        <Text style={styles.subtitle}>Mira y aprende inglés</Text>

        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          {LESSONS.map((l) => (
            <VideoCard key={l.id} lesson={l} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const shadow = {
  shadowColor: "#8A90A6",
  shadowOpacity: 0.15,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm },
  roundBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    ...shadow,
  },
  mascot: { fontSize: 48, textAlign: "center" },
  title: { fontFamily: fonts.extrabold, fontSize: 32, color: colors.ink, textAlign: "center" },
  subtitle: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.inkSoft,
    textAlign: "center",
    marginTop: 2,
  },
  card: { borderRadius: radius.xl, padding: spacing.md, ...shadow },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginBottom: spacing.md },
  emojiCircle: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 28 },
  cardTitle: { fontFamily: fonts.extrabold, fontSize: 20 },
  cardSubtitle: { fontFamily: fonts.bold, fontSize: 13, color: colors.inkSoft, marginTop: 1 },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: radius.lg,
    backgroundColor: "#000",
    overflow: "hidden",
  },
});
