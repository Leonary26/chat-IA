import { Router } from "express";
import { z } from "zod";
import { complete } from "../lib/openai.js";

const router = Router();

const summarizeSchema = z.object({
  emails: z.array(
    z.object({
      from: z.string().optional(),
      subject: z.string().optional(),
      body: z.string()
    })
  )
});

router.post("/summarize", async (request, response, next) => {
  try {
    const { emails } = summarizeSchema.parse(request.body);
    const reply = await complete(
      [{ role: "user", content: JSON.stringify(emails) }],
      "Resume les emails en francais. Donne les priorites, les actions a faire et une proposition de reponse si utile."
    );
    response.json({ summary: reply });
  } catch (error) {
    next(error);
  }
});

export default router;

