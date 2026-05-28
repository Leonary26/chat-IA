# Venary AI Assistant

Application Android moderne pour assistant IA vocal, construite avec React Native/Expo, Node.js, OpenAI et Firebase.

## Structure

- `mobile/` : application Android React Native.
- `backend/` : API Node.js/Express qui centralise l'IA, la voix, la memoire et les integrations.
- `docs/` : notes produit, permissions Android et guide APK.

## Demarrage rapide

1. Installer les dependances mobile :

```bash
cd mobile
npm install
npm run start
```

2. Installer les dependances backend :

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

3. Renseigner les variables dans `backend/.env`, surtout `OPENAI_API_KEY`.

## Flux fonctionnel

1. L'utilisateur parle ou ecrit dans l'app.
2. Le mobile envoie le message au backend via `POST /chat`.
3. Le backend appelle OpenAI avec `OPENAI_API_KEY`.
4. Le backend renvoie la reponse.
5. Le mobile affiche la reponse, la lit avec Text To Speech et sauvegarde l'historique localement.

La cle OpenAI reste uniquement dans `backend/.env`. Elle n'est jamais placee dans le frontend.

## URL backend Android

Par defaut, l'app utilise `http://10.0.2.2:4000`, qui correspond au PC local depuis un emulateur Android.

Sur un vrai telephone, remplace `extra.apiBaseUrl` dans `mobile/app.json` par l'adresse IP locale du PC, par exemple :

```json
"apiBaseUrl": "http://192.168.1.20:4000"
```

## Generer un APK Android

Le projet mobile utilise Expo EAS.

```bash
cd mobile
npm install
npm run android
```

Pour un APK installable :

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

Voir `docs/APK_BUILD.md` pour le detail.

## Deploiement public pour telephone

Pour tester sans probleme de Wi-Fi ou pare-feu, deploie la version web/backend sur Vercel.

Guide : `docs/VERCEL_DEPLOY.md`
