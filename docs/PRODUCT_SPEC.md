# Venary AI Assistant - Spec produit

## Vision

Venary est un assistant IA mobile francophone qui aide l'utilisateur a parler avec son telephone, comprendre ses messages, repondre vite et garder une memoire utile.

## MVP

- Conversation texte avec OpenAI via `POST /chat`.
- Historique local des conversations.
- Reponse vocale Text To Speech.
- Speech To Text via module Android natif.
- Interface dark premium avec avatar anime.
- Resume d'emails via texte fourni ou Gmail API.
- Suggestions de reponses pour messages.
- Resume d'appels depuis transcription.
- Historique et memoire via Firebase.

## V2

- Speech To Text reel.
- OAuth Gmail complet.
- Notification Listener Android.
- Actions de reponse WhatsApp/Messenger.
- Detection d'appels entrants.
- Module natif Android pour permissions sensibles.

## Principes de securite

- Toujours demander validation avant d'envoyer un email, SMS ou message.
- Afficher clairement quand Venary lit une donnee personnelle.
- Garder un mode local partiel pour l'historique recent.
- Chiffrer les donnees sensibles cote serveur et cote mobile.
