const form = document.querySelector("#chatForm");
const input = document.querySelector("#messageInput");
const messages = document.querySelector("#messages");
const voiceButton = document.querySelector("#voiceButton");

const history = [];
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = "fr-FR";
  recognition.interimResults = false;
  recognition.onstart = () => voiceButton.classList.add("listening");
  recognition.onend = () => voiceButton.classList.remove("listening");
  recognition.onresult = (event) => {
    const transcript = event.results[0]?.[0]?.transcript?.trim();
    if (transcript) {
      input.value = transcript;
      form.requestSubmit();
    }
  };
}

function addMessage(role, content) {
  const item = document.createElement("article");
  item.className = `message ${role}`;
  item.textContent = content;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.96;
  window.speechSynthesis.speak(utterance);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  input.value = "";
  addMessage("user", message);
  addMessage("ai", "Je reflechis...");

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history, userId: "browser-user" })
    });

    if (!response.ok) throw new Error("Erreur serveur");

    const data = await response.json();
    messages.lastElementChild.textContent = data.reply;
    history.push({ role: "user", content: message }, { role: "assistant", content: data.reply });
    speak(data.reply);
  } catch (error) {
    messages.lastElementChild.textContent = "Impossible de joindre l'IA. Verifie que le backend tourne et que OPENAI_API_KEY est configure.";
  }
});

voiceButton.addEventListener("click", () => {
  if (!recognition) {
    alert("La dictee vocale navigateur n'est pas disponible ici. Tu peux tester le micro dans l'app Android.");
    return;
  }

  recognition.start();
});
