import Constants from "expo-constants";

const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl ?? "http://localhost:4000";

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Erreur API ${response.status}`);
  }

  return response.json();
}

export const api = {
  chat: ({ message, history, userId = "local-user" }) =>
    request("/chat", {
      method: "POST",
      body: JSON.stringify({ message, history, userId })
    }),
  summarizeEmails: (emails) =>
    request("/api/email/summarize", {
      method: "POST",
      body: JSON.stringify({ emails })
    }),
  suggestReply: (context) =>
    request("/api/messages/reply", {
      method: "POST",
      body: JSON.stringify(context)
    }),
  summarizeCall: (transcript) =>
    request("/api/calls/summarize", {
      method: "POST",
      body: JSON.stringify({ transcript })
    }),
  saveMemory: (userId, key, value) =>
    request("/api/memory", {
      method: "POST",
      body: JSON.stringify({ userId, key, value })
    }),
  getMemory: (userId) => request(`/api/memory/${encodeURIComponent(userId)}`)
};
