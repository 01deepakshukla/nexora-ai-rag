# Nexora AI

A full-stack AI chat workspace with a React client and Express API.

## Run locally

Install both workspaces and start the API plus Vite development server:

```bash
npm run install:all
npm run dev
```

Required environment variables are `MONGO_URI`, `JWT_SECRET`, and
`GEMINI_API_KEY`. Set `CLIENT_URL` to the frontend origin when using separate
frontend and backend hosts.

## Render deployment

Create a Render Web Service from the repository root with:

- Build Command: `npm run build`
- Start Command: `npm start`

Set `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, and `CLIENT_URL` in Render's
environment settings. `PORT` is supplied by Render automatically. The build
creates `client/dist`, and the Express server serves it from the same service.

