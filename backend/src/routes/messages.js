import { Router } from "express";
import { z } from "zod";
import { complete } from "../lib/openai.js";

const router = Router();

const replySchema = z.object({
  app: z.string().optional(),
  sender: z.string().optional(),
  conversation: z.string(),
  tone: z.string().default("professionnel")
});

router.post("/reply", async (request, response, next) => {
  try {
    const context = replySchema.parse(request.body);
    const reply = await complete(
      [{ role: "user", content: JSON.stringify(context) }],
      "Genere 3 reponses courtes et naturelles en francais. Ne promets pas d'envoyer le message sans validation utilisateur."
    );
    response.json({ suggestions: reply });
  } catch (error) {
    next(error);
  }
});

export default router;

