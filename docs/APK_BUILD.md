# Build APK Android

## Prerequis

- Node.js LTS.
- Un compte Expo.
- Android Studio si tu veux lancer l'app localement sur emulateur ou telephone USB.

## Lancer en developpement

```bash
cd mobile
npm install
npm run start
```

Scanne le QR code avec Expo Go pour tester l'interface. La reconnaissance vocale native demande plutot un build Android, car Expo Go ne charge pas toujours le module `@react-native-voice/voice`.

## Generer un APK

```bash
cd mobile
npm install
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

Le profil `preview` genere un APK. Le profil `production` genere un Android App Bundle pour Google Play.

## Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Ajoute `OPENAI_API_KEY` dans `.env` pour activer les reponses IA reelles.

## Tester le flux chat

```bash
curl -X POST http://localhost:4000/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"Bonjour Venary\"}"
```

Depuis un emulateur Android, l'app appelle `http://10.0.2.2:4000`. Depuis un vrai telephone, utilise l'IP locale du PC dans `mobile/app.json`.
