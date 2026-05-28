import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";

export default function AiOrb({ listening }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: listening ? 900 : 1900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: listening ? 900 : 1900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [listening, pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.08] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.95] });

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.aura, { transform: [{ scale }], opacity }]} />
      <LinearGradient
        colors={[colors.accent, colors.violet, colors.green]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.orb}
      >
        <View style={styles.core} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 188,
    height: 188,
    alignItems: "center",
    justifyContent: "center"
  },
  aura: {
    position: "absolute",
    width: 188,
    height: 188,
    borderRadius: 94,
    backgroundColor: "rgba(110, 231, 249, 0.2)"
  },
  orb: {
    width: 138,
    height: 138,
    borderRadius: 69,
    padding: 2,
    shadowColor: colors.accent,
    shadowOpacity: 0.5,
    shadowRadius: 34,
    shadowOffset: { width: 0, height: 16 }
  },
  core: {
    flex: 1,
    borderRadius: 67,
    backgroundColor: "rgba(5, 6, 10, 0.34)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)"
  }
});

