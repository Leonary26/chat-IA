import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "node:path";
import { fileURLToPath } from "node:url";
import assistantRouter from "./routes/assistant.js";
import callsRouter from "./routes/calls.js";
import chatRouter from "./routes/chat.js";
import emailRouter from "./routes/email.js";
import memoryRouter from "./routes/memory.js";
import messagesRouter from "./routes/messages.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../public");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json({ limit: "4mb" }));
app.use(express.static(publicDir));

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "venary-ai-assistant" });
});

app.use("/chat", chatRouter);
app.use("/api/assistant", assistantRouter);
app.use("/api/email", emailRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/calls", callsRouter);
app.use("/api/memory", memoryRouter);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ error: "Erreur interne Venary" });
});

export default app;
