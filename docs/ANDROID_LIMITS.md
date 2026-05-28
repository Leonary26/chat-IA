# Permissions Android et limites importantes

Venary peut evoluer vers un vrai assistant Android, mais certaines fonctions demandent plus qu'une app Expo standard.

## Gmail

- Lecture Gmail via OAuth Google et Gmail API.
- L'utilisateur doit autoriser explicitement l'acces.
- L'envoi automatique doit rester valide par l'utilisateur.

## SMS

- Lecture/envoi SMS possibles avec permissions Android natives.
- Google Play limite fortement les apps qui demandent `READ_SMS` et `SEND_SMS`.
- Pour une publication officielle, il faut justifier que la messagerie est une fonction centrale.

## WhatsApp, Messenger et notifications

- Lecture indirecte via Notification Listener natif.
- Reponse possible seulement via actions de notification quand l'app expose une action compatible.
- Cette partie necessite un module natif Android, donc un dev client Expo ou React Native bare.

## Appels

- Detection d'appel entrant via permissions telephone.
- Resume d'appel fiable seulement si l'audio ou la transcription est disponible legalement.
- Assistant vocal pendant appel est tres limite par Android et les politiques de confidentialite.

## Recommandation technique

Commencer avec Expo pour l'interface, le chat IA, la voix et Firebase. Passer ensuite a un module natif Android pour SMS, notifications, WhatsApp/Messenger et appels.

