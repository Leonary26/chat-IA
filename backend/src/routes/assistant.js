import { Router } from "express";
import { z } from "zod";
import { complete, normalizeMessages } from "../lib/openai.js";

const router = Router();

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]).default("user"),
      content: z.string()
    })
  )
});

router.post("/chat", async (request, response, next) => {
  try {
    const { messages } = chatSchema.parse(request.body);
    const normalizedMessages = normalizeMessages(messages);
    const reply = await complete(
      normalizedMessages,
      "Tu es Venary, un assistant IA vocal Android francophone. Reponds de facon naturelle, concise, utile et professionnelle. Demande validation avant toute action sensible."
    );
    response.json({ reply, history: [...normalizedMessages, { role: "assistant", content: reply }] });
  } catch (error) {
    next(error);
  }
});

export default router;
