# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

When running in GitHub Codespaces, define `VITE_CODESPACE_NAME` in `.env.local`:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend uses Codespaces API URLs in this shape:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is not set, requests safely fall back to the local backend at `http://localhost:8000` to avoid `https://undefined-8000...` URLs.

## Commands

```bash
npm install
npm run dev
npm run build
```
