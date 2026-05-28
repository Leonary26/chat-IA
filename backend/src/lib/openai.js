import OpenAI from "openai";

export const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function complete(messages, systemPrompt) {
  if (!openai) {
    return "Mode demo actif. Ajoute OPENAI_API_KEY dans backend/.env pour connecter Venary a l'IA.";
  }

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((message) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: String(message.content ?? "")
      }))
    ]
  });

  return completion.choices[0]?.message?.content?.trim() ?? "";
}

export function normalizeMessages(history = [], message = "") {
  const safeHistory = Array.isArray(history)
    ? history
        .filter((item) => item && typeof item.content === "string")
        .map((item) => ({
          role: item.role === "assistant" ? "assistant" : "user",
          content: item.content
        }))
    : [];

  if (message.trim()) {
    safeHistory.push({ role: "user", content: message.trim() });
  }

  return safeHistory.slice(-20);
}
