import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { colors } from "../theme/colors";

export default function GlassPanel({ children, style }) {
  return (
    <BlurView intensity={24} tint="dark" style={[styles.panel, style]}>
      <View style={styles.inner}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  panel: {
    overflow: "hidden",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(255, 255, 255, 0.055)"
  },
  inner: { padding: 16 }
});

