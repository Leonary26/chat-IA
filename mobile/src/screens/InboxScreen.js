import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Mail, Wand2 } from "lucide-react-native";
import GlassPanel from "../components/GlassPanel";
import Screen from "../components/Screen";
import SectionHeader from "../components/SectionHeader";
import { colors } from "../theme/colors";

const emails = [
  { from: "Client", subject: "Proposition commerciale", summary: "Repondre avec un ton professionnel et proposer un creneau." },
  { from: "Equipe", subject: "Compte rendu", summary: "Extraire les decisions et les prochaines actions." }
];

export default function InboxScreen() {
  return (
    <Screen>
      <SectionHeader eyebrow="Gmail" title="Emails intelligents" />
      <View style={styles.stack}>
        {emails.map((email) => (
          <GlassPanel key={email.subject}>
            <View style={styles.row}>
              <Mail color={colors.accent} size={22} />
              <View style={styles.textWrap}>
                <Text style={styles.from}>{email.from}</Text>
                <Text style={styles.subject}>{email.subject}</Text>
                <Text style={styles.summary}>{email.summary}</Text>
              </View>
            </View>
            <Pressable style={styles.action}>
              <Wand2 color={colors.background} size={18} />
              <Text style={styles.actionText}>Generer une reponse</Text>
            </Pressable>
          </GlassPanel>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 14 },
  row: { flexDirection: "row", gap: 12 },
  textWrap: { flex: 1, gap: 4 },
  from: { color: colors.accent, fontWeight: "800", fontSize: 13 },
  subject: { color: colors.text, fontWeight: "800", fontSize: 18 },
  summary: { color: colors.soft, fontSize: 14, lineHeight: 20 },
  action: {
    marginTop: 16,
    minHeight: 44,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  actionText: { color: colors.background, fontWeight: "900" }
});

