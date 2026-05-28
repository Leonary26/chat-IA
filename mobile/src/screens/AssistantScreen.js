import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import * as Haptics from "expo-haptics";
import Voice from "@react-native-voice/voice";
import { Mic, Send, Sparkles, Trash2 } from "lucide-react-native";
import AiOrb from "../components/AiOrb";
import GlassPanel from "../components/GlassPanel";
import Screen from "../components/Screen";
import { colors } from "../theme/colors";
import { api } from "../api/client";

const historyKey = "venary.chat.history";

const welcome = {
  role: "assistant",
  content: "Bonjour, je suis Venary. Je peux t'aider a parler, resumer, repondre et organiser ton telephone."
};

export default function AssistantScreen() {
  const [messages, setMessages] = useState([welcome]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [voiceReady, setVoiceReady] = useState(true);
  const lastTranscript = useRef("");
  const scrollRef = useRef(null);

  useEffect(() => {
    async function loadHistory() {
      const saved = await AsyncStorage.getItem(historyKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages([welcome, ...parsed]);
        }
      }
    }

    loadHistory().catch(() => undefined);
  }, []);

  useEffect(() => {
    const conversation = messages.filter((message) => message !== welcome);
    AsyncStorage.setItem(historyKey, JSON.stringify(conversation.slice(-40))).catch(() => undefined);
  }, [messages]);

  useEffect(() => {
    Voice.onSpeechStart = () => setListening(true);
    Voice.onSpeechEnd = () => setListening(false);
    Voice.onSpeechError = () => {
      setListening(false);
      setVoiceReady(false);
    };
    Voice.onSpeechResults = (event) => {
      const spoken = event.value?.[0]?.trim();
      if (!spoken || spoken === lastTranscript.current) return;
      lastTranscript.current = spoken;
      setInput(spoken);
      sendMessage(spoken);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners).catch(() => undefined);
    };
  }, [messages, thinking]);

  const subtitle = useMemo(() => {
    if (thinking) return "Analyse en cours";
    if (listening) return "J'ecoute";
    if (!voiceReady) return "Texte actif, micro indisponible ici";
    return "Assistant vocal pret";
  }, [thinking, listening, voiceReady]);

  async function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setThinking(true);

    try {
      const conversationHistory = messages
        .filter((message) => message !== welcome)
        .map((message) => ({ role: message.role, content: message.content }));
      const result = await api.chat({
        message: trimmed,
        history: conversationHistory,
        userId: "local-user"
      });
      const reply = result.reply ?? "Je n'ai pas encore de reponse.";
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
      Speech.speak(reply, { language: "fr-FR", rate: 0.96 });
    } catch (error) {
      const reply = "Je n'arrive pas a joindre le serveur IA. Verifie que le backend est lance et que l'URL API correspond a ton appareil.";
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } finally {
      setThinking(false);
      requestAnimationFrame(() => scrollRef.current?.scrollToEnd?.({ animated: true }));
    }
  }

  async function toggleListening() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      if (listening) {
        await Voice.stop();
        setListening(false);
        return;
      }

      lastTranscript.current = "";
      setVoiceReady(true);
      await Voice.start("fr-FR");
    } catch (error) {
      setVoiceReady(false);
      setListening(false);
      Alert.alert(
        "Micro indisponible",
        "La reconnaissance vocale demande un build Android natif. Elle peut ne pas fonctionner dans Expo Go."
      );
    }
  }

  async function clearHistory() {
    await AsyncStorage.removeItem(historyKey);
    setMessages([welcome]);
    Speech.stop();
  }

  return (
    <Screen>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <AiOrb listening={listening || thinking} />
          <Text style={styles.brand}>Venary</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <GlassPanel>
          <View style={styles.statusRow}>
            <Sparkles color={colors.accent} size={20} />
            <Text style={styles.statusText}>Chat IA connecte au backend, historique local, voix et lecture audio.</Text>
            <Pressable accessibilityLabel="Effacer l'historique" onPress={clearHistory} style={styles.smallButton}>
              <Trash2 color={colors.muted} size={17} />
            </Pressable>
          </View>
        </GlassPanel>

        <View style={styles.chat}>
          {messages.map((message, index) => (
            <View
              key={`${message.role}-${index}`}
              style={[styles.bubble, message.role === "user" ? styles.userBubble : styles.aiBubble]}
            >
              <Text style={styles.bubbleText}>{message.content}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.composer}>
        <Pressable accessibilityLabel="Activer le micro" onPress={toggleListening} style={[styles.iconButton, listening && styles.activeMic]}>
          <Mic color={listening ? colors.green : colors.text} size={22} />
        </Pressable>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Demander a Venary..."
          placeholderTextColor={colors.muted}
          style={styles.input}
          onSubmitEditing={() => sendMessage()}
        />
        <Pressable accessibilityLabel="Envoyer" onPress={() => sendMessage()} style={styles.sendButton}>
          <Send color={colors.background} size={20} />
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 18 },
  hero: { alignItems: "center", paddingTop: 18, paddingBottom: 22 },
  brand: { color: colors.text, fontSize: 42, fontWeight: "900", letterSpacing: 0, marginTop: 8 },
  subtitle: { color: colors.soft, fontSize: 15, fontWeight: "600", marginTop: 4 },
  statusRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  statusText: { color: colors.soft, fontSize: 14, lineHeight: 20, flex: 1 },
  smallButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.elevated
  },
  chat: { gap: 10, marginTop: 18 },
  bubble: { maxWidth: "86%", borderRadius: 20, paddingHorizontal: 14, paddingVertical: 12 },
  aiBubble: { alignSelf: "flex-start", backgroundColor: colors.elevated },
  userBubble: { alignSelf: "flex-end", backgroundColor: "rgba(110, 231, 249, 0.18)" },
  bubbleText: { color: colors.text, fontSize: 15, lineHeight: 21 },
  composer: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 100,
    minHeight: 58,
    borderRadius: 24,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(12, 15, 25, 0.96)",
    borderWidth: 1,
    borderColor: colors.border
  },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.elevated
  },
  activeMic: { backgroundColor: "rgba(110, 231, 183, 0.18)" },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent
  },
  input: { flex: 1, color: colors.text, fontSize: 15, minHeight: 42 }
});
