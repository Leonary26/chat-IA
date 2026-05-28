# Deploiement GitHub + Vercel

Ce deploiement publie la version web de test Venary et l'API `/chat`.

## 1. Publier sur GitHub

Depuis le dossier principal :

```bash
git init
git add .
git commit -m "Initial Venary AI Assistant"
git branch -M main
git remote add origin https://github.com/TON_COMPTE/venary-ai-assistant.git
git push -u origin main
```

## 2. Importer dans Vercel

1. Va sur https://vercel.com/new
2. Choisis le repo `venary-ai-assistant`
3. Dans "Root Directory", choisis `backend`
4. Framework Preset : `Other`
5. Build Command : laisser vide ou `npm run vercel-build`
6. Output Directory : laisser vide

## 3. Ajouter la cle OpenAI

Dans Vercel :

Project Settings -> Environment Variables

Ajoute :

```text
OPENAI_API_KEY=ta_cle_openai
OPENAI_CHAT_MODEL=gpt-4o-mini
CORS_ORIGIN=*
```

Puis clique sur "Redeploy".

## 4. Tester

Vercel donnera une URL comme :

```text
https://venary-ai-assistant.vercel.app
```

Ouvre cette URL sur ton telephone. Tu verras l'interface web Venary.

## Important

Vercel deploie la version web/backend. L'APK Android reste a construire avec Expo/EAS. Ensuite, tu peux mettre l'URL Vercel dans `mobile/app.json` :

```json
"apiBaseUrl": "https://ton-projet.vercel.app"
```
