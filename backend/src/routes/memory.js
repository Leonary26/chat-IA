import { Router } from "express";
import { z } from "zod";
import { getDb } from "../lib/firebase.js";

const router = Router();

const memorySchema = z.object({
  userId: z.string().min(1),
  key: z.string().min(1),
  value: z.string().min(1)
});

router.get("/:userId", async (request, response) => {
  const db = getDb();
  if (!db) {
    response.json({ memories: [], mode: "demo" });
    return;
  }

  const snapshot = await db.collection("users").doc(request.params.userId).collection("memory").get();
  const memories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  response.json({ memories });
});

router.post("/", async (request, response, next) => {
  try {
    const memory = memorySchema.parse(request.body);
    const db = getDb();

    if (!db) {
      response.json({ saved: false, mode: "demo" });
      return;
    }

    await db.collection("users").doc(memory.userId).collection("memory").doc(memory.key).set({
      value: memory.value,
      updatedAt: new Date().toISOString()
    });

    response.json({ saved: true });
  } catch (error) {
    next(error);
  }
});

export default router;
