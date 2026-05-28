import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Brain, Cloud, Lock, Volume2 } from "lucide-react-native";
import GlassPanel from "../components/GlassPanel";
import Screen from "../components/Screen";
import SectionHeader from "../components/SectionHeader";
import { colors } from "../theme/colors";

const settings = [
  { icon: Brain, label: "Memoire utilisateur", enabled: true },
  { icon: Volume2, label: "Reponses vocales", enabled: true },
  { icon: Cloud, label: "Synchronisation Firebase", enabled: false },
  { icon: Lock, label: "Validation avant envoi", enabled: true }
];

export default function SettingsScreen() {
  return (
    <Screen>
      <SectionHeader eyebrow="Controle" title="Reglages Venary" />
      <View style={styles.stack}>
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <GlassPanel key={item.label}>
              <View style={styles.row}>
                <Icon color={colors.accent} size={22} />
                <Text style={styles.label}>{item.label}</Text>
                <Switch value={item.enabled} trackColor={{ true: colors.green, false: colors.elevated }} thumbColor={colors.text} />
              </View>
            </GlassPanel>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 12 },
  row: { minHeight: 42, flexDirection: "row", alignItems: "center", gap: 12 },
  label: { color: colors.text, fontSize: 16, fontWeight: "800", flex: 1 }
});

