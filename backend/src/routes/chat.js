import { Router } from "express";
import { z } from "zod";
import { getDb } from "../lib/firebase.js";
import { complete, normalizeMessages } from "../lib/openai.js";

const router = Router();

const chatSchema = z.object({
  message: z.string().min(1),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string()
      })
    )
    .default([]),
  userId: z.string().default("local-user")
});

router.post("/", async (request, response, next) => {
  try {
    const { message, history, userId } = chatSchema.parse(request.body);
    const messages = normalizeMessages(history, message);
    const reply = await complete(
      messages,
      [
        "Tu es Venary AI Assistant, un assistant mobile Android francophone.",
        "Reponds comme un assistant vocal moderne: naturel, utile, concis et chaleureux.",
        "Tu peux aider pour organiser, rediger, resumer, preparer des messages et expliquer.",
        "Ne dis jamais que tu as effectue une action externe si elle n'a pas ete confirmee par l'utilisateur.",
        `Identifiant utilisateur: ${userId}`
      ].join(" ")
    );
    const updatedHistory = [...messages, { role: "assistant", content: reply }];
    const db = getDb();

    if (db) {
      await db.collection("users").doc(userId).collection("conversations").add({
        message,
        reply,
        history: updatedHistory,
        createdAt: new Date().toISOString()
      });
    }

    response.json({
      reply,
      history: updatedHistory
    });
  } catch (error) {
    next(error);
  }
});

export default router;
