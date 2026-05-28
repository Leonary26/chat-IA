import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { PhoneCall, ShieldCheck } from "lucide-react-native";
import GlassPanel from "../components/GlassPanel";
import Screen from "../components/Screen";
import SectionHeader from "../components/SectionHeader";
import { colors } from "../theme/colors";

export default function CallsScreen() {
  return (
    <Screen>
      <SectionHeader eyebrow="Appels" title="Assistant d'appel" />
      <GlassPanel>
        <View style={styles.row}>
          <PhoneCall color={colors.accent} size={24} />
          <View style={styles.textWrap}>
            <Text style={styles.title}>Detection des appels entrants</Text>
            <Text style={styles.description}>Preparation pour reponse automatique configurable et resume apres appel.</Text>
          </View>
          <Switch value trackColor={{ true: colors.green, false: colors.elevated }} thumbColor={colors.text} />
        </View>
      </GlassPanel>
      <GlassPanel style={styles.notice}>
        <View style={styles.row}>
          <ShieldCheck color={colors.warning} size={24} />
          <Text style={styles.description}>
            Android limite fortement l'assistance pendant un appel. Les fonctions avancees demandent un module natif et des autorisations speciales.
          </Text>
        </View>
      </GlassPanel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  textWrap: { flex: 1, gap: 5 },
  title: { color: colors.text, fontSize: 17, fontWeight: "800" },
  description: { color: colors.soft, fontSize: 14, lineHeight: 20, flex: 1 },
  notice: { marginTop: 14 }
});

