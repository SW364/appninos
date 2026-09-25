import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/src/theme";

const WELCOME_IMAGE = require("../assets/images/tita-welcome.png");
const SPLASH_DURATION = 1800;

export default function Welcome() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/home");
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [opacity, scale, router]);

  return (
    <LinearGradient colors={[colors.bgTop, colors.bgBottom]} style={styles.flex} testID="welcome-screen">
      <StatusBar style="dark" />
      <View style={styles.center}>
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
          <Image
            testID="welcome-image"
            source={WELCOME_IMAGE}
            style={styles.image}
            contentFit="contain"
            transition={200}
          />
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  image: { width: 300, height: 300 },
});
