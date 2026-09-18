# Nexora AI

A full-stack AI chat workspace with a React client and Express API.

## Run locally

1. Copy `.env.example` to `.env` and set `JWT_SECRET` and `GEMINI_API_KEY`.
2. Install dependencies:

```bash
npm run install:all
```

3. Start the client and API together:

```bash
npm run dev
```

The client runs at `http://localhost:7800` and the API at `http://localhost:5000`.

MongoDB must be running and `MONGO_URI` must be set for registration and chat persistence. The Gemini API key is used by the server and is never exposed to the browser.
