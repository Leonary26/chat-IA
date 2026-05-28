import { Router } from "express";
import { z } from "zod";
import { complete } from "../lib/openai.js";

const router = Router();

const callSchema = z.object({
  transcript: z.string()
});

router.post("/summarize", async (request, response, next) => {
  try {
    const { transcript } = callSchema.parse(request.body);
    const summary = await complete(
      [{ role: "user", content: transcript }],
      "Resume cet appel en francais. Extrais le sujet, les decisions, les engagements, les dates et les prochaines actions."
    );
    response.json({ summary });
  } catch (error) {
    next(error);
  }
});

export default router;

