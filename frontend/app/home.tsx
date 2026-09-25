import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors, fonts, spacing, radius } from "@/src/theme";
import { useLanguage } from "@/src/context/LanguageContext";
import { STRINGS, uiLangOf, MODULE_TITLES } from "@/src/i18n";

type Module = {
  code: string;
  icon: keyof typeof Ionicons.glyphMap;
  emoji?: string;
  color: string;
  bg: string;
  route?: string;
  badge?: string;
  tenses: number;
};

const MODULES: Module[] = [
  { code: "M1.A", icon: "eye", emoji: "👀", color: "#4A7DF0", bg: "#E8F1FC", route: "/m1a", tenses: 5 },
  { code: "M1.B", icon: "flower", emoji: "🐝", color: "#1FB6A6", bg: "#E4F6F3", route: "/m1b", tenses: 5 },
  { code: "Tita I", icon: "cube", emoji: "🎁", color: "#EC4899", bg: "#FCE7F1", route: "/tita1", badge: "Nuevo", tenses: 2 },
  { code: "Tita II", icon: "time", emoji: "⏰", color: "#3B82F6", bg: "#E7F0FD", route: "/tita2", badge: "Nuevo", tenses: 2 },
];

export default function Modules() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lang } = useLanguage();
  const t = STRINGS[uiLangOf(lang)];
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Pressable style={styles.roundBtn} testID="menu-button" onPress={() => setMenuOpen(true)}>
            <Ionicons name="menu" size={22} color={colors.ink} />
          </Pressable>
          <View style={{ flex: 1 }} />
        </View>

        <Text style={styles.mascot}>🦉</Text>
        <Text style={styles.title}>{t.homeTitle}</Text>
        <Text style={styles.subtitle}>{t.homeSubtitle}</Text>

        <View style={styles.grid}>
          {MODULES.map((m) => (
            <Pressable
              key={m.code}
              testID={`module-${m.code}`}
              onPress={() => m.route && router.push(m.route as any)}
              style={({ pressed }) => [styles.cardModule, { backgroundColor: m.bg }, pressed && { transform: [{ scale: 0.96 }] }]}
            >
              {m.badge ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{m.badge}</Text>
                </View>
              ) : null}
              <View style={[styles.iconCircle, { backgroundColor: m.color }]}>
                {m.emoji ? (
                  <Text style={styles.moduleEmoji}>{m.emoji}</Text>
                ) : (
                  <Ionicons name={m.icon} size={24} color="#fff" />
                )}
              </View>
              <Text style={[styles.moduleCode, { color: m.color }]}>{m.code}</Text>
              <Text style={styles.moduleTitle} numberOfLines={2}>
                {MODULE_TITLES[lang][m.code]}
              </Text>
              <View style={styles.footerRow}>
                <View style={styles.hPill}>
                  <Text style={[styles.hPillText, { color: m.color }]} numberOfLines={1}>
                    {`${m.tenses} ${t.tenses}`}
                  </Text>
                </View>
                <View style={{ flex: 1 }} />
                <View style={[styles.goCircle, { backgroundColor: m.color }]}>
                  <Ionicons name="chevron-forward" size={15} color="#fff" />
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Language dropdown */}
      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <Pressable style={styles.menuBackdrop} onPress={() => setMenuOpen(false)}>
          <View style={[styles.menuCard, { top: insets.top + 58 }]}>
            <Text style={styles.menuTitle}>{t.languageMenu}</Text>
            <View style={styles.menuItem} testID="lang-english">
              <View style={styles.codeBadge}><Text style={styles.codeBadgeText}>EN</Text></View>
              <Text style={styles.menuItemText}>{t.langEnglish}</Text>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            </View>
            <View style={styles.menuDivider} />
            <Pressable
              testID="menu-videos"
              style={styles.menuItem}
              onPress={() => {
                setMenuOpen(false);
                router.push("/videos");
              }}
            >
              <View style={[styles.codeBadge, { backgroundColor: colors.negativeBg }]}>
                <Ionicons name="play" size={14} color={colors.negative} />
              </View>
              <Text style={styles.menuItemText}>Videos</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.inkSoft} />
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm },
  roundBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.card,
    alignItems: "center", justifyContent: "center",
    shadowColor: "#8A90A6", shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  title: { fontFamily: fonts.extrabold, fontSize: 34, color: colors.ink, textAlign: "center" },
  mascot: { fontSize: 52, textAlign: "center", marginTop: spacing.xs },
  subtitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.inkSoft, textAlign: "center", marginTop: 2, marginBottom: spacing.lg },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  cardModule: { width: "48%", borderRadius: radius.xl, padding: spacing.md, marginBottom: spacing.md, minHeight: 190 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, alignItems: "center", justifyContent: "center", marginBottom: spacing.sm },
  moduleEmoji: { fontSize: 32 },
  moduleCode: { fontFamily: fonts.extrabold, fontSize: 24 },
  moduleTitle: { fontFamily: fonts.bold, fontSize: 14, color: colors.inkSoft, marginTop: 2 },
  footerRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: "auto", paddingTop: spacing.sm },
  goCircle: { width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  hPill: {
    backgroundColor: "rgba(255,255,255,0.75)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    minWidth: 30,
    alignItems: "center",
  },
  hPillText: { fontFamily: fonts.extrabold, fontSize: 12 },
  badge: { position: "absolute", top: 10, right: 10, backgroundColor: "#EC4899", paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill },
  badgeText: { fontFamily: fonts.bold, fontSize: 11, color: "#fff" },
  menuBackdrop: { flex: 1, backgroundColor: "rgba(20,22,40,0.25)" },
  menuCard: {
    position: "absolute", left: spacing.md, width: 264,
    backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.sm,
    shadowColor: "#2A2E45", shadowOpacity: 0.2, shadowRadius: 16, shadowOffset: { width: 0, height: 8 }, elevation: 8,
  },
  menuTitle: { fontFamily: fonts.extrabold, fontSize: 13, color: colors.inkSoft, paddingHorizontal: 10, paddingTop: 6, paddingBottom: 8 },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 12, paddingHorizontal: 10, borderRadius: radius.md },
  codeBadge: {
    minWidth: 30, paddingHorizontal: 6, height: 24, borderRadius: 7,
    backgroundColor: "#EEF2FE", alignItems: "center", justifyContent: "center",
  },
  codeBadgeText: { fontFamily: fonts.extrabold, fontSize: 11, letterSpacing: 0.5, color: colors.primary },
  menuItemText: { flex: 1, fontFamily: fonts.bold, fontSize: 15, color: colors.ink },
  menuDivider: { height: 1, backgroundColor: colors.border, marginHorizontal: 10 },
});
