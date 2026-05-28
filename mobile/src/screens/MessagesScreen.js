import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MessageSquareReply, Send } from "lucide-react-native";
import GlassPanel from "../components/GlassPanel";
import Screen from "../components/Screen";
import SectionHeader from "../components/SectionHeader";
import { colors } from "../theme/colors";

const suggestions = [
  "Je regarde ca et je te confirme rapidement.",
  "Merci pour ton message, je reviens vers toi dans la journee.",
  "Oui, c'est bon pour moi."
];

export default function MessagesScreen() {
  return (
    <Screen>
      <SectionHeader eyebrow="SMS, WhatsApp, Messenger" title="Reponses assistees" />
      <GlassPanel>
        <View style={styles.header}>
          <MessageSquareReply color={colors.green} size={24} />
          <Text style={styles.title}>Suggestions instantanees</Text>
        </View>
        <View style={styles.stack}>
          {suggestions.map((suggestion) => (
            <Pressable key={suggestion} style={styles.suggestion}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
              <Send color={colors.accent} size={17} />
            </Pressable>
          ))}
        </View>
      </GlassPanel>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  title: { color: colors.text, fontSize: 18, fontWeight: "800" },
  stack: { gap: 10 },
  suggestion: {
    minHeight: 56,
    borderRadius: 18,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.elevated
  },
  suggestionText: { color: colors.soft, fontSize: 14, lineHeight: 19, flex: 1 }
});

