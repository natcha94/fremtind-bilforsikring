# Bilforsikring – Frontend

React Router v7 (SSR) app som lar kunden kjøpe bilforsikring. Skjemaet sender data til integrasjonslaget, og ved suksess vises en bekreftelsesside med avtalenummer og prisinformasjon.

## Kom i gang

```bash
npm install
```

Kopier `.env.example` til `.env` og sett riktig URL til backend:

```bash
cp .env.example .env
```

```
API_URL=http://localhost:8080
```

Start utviklingsserver:

```bash
npm run dev
```

Appen kjører på [http://localhost:5173](http://localhost:5173).

## Scripts

| Kommando | Beskrivelse |
|---|---|
| `npm run dev` | Start dev-server med HMR |
| `npm run build` | Bygg for produksjon |
| `npm run start` | Start produksjonsserver |
| `npm run typecheck` | Kjør TypeScript-sjekk |
| `npm run test:e2e` | Kjør Playwright-tester |

## Tester

E2E-testene bruker Playwright og starter en mock-backend automatisk på port 3001, så du trenger ikke ha den ekte backend kjørende.

```bash
npm run test:e2e
```

Merk: dev-serveren på port 5173 må ikke kjøre når du kjører testene, da Playwright starter sin egen instans på port 5174.

## Struktur

```
app/
  features/purchase/   # Kjøpsskjema og bekreftelsesside
  components/          # Gjenbrukbare UI-komponenter
  routes/              # React Router ruter (home, bekreftelse)
  sessions.server.ts   # Session-håndtering for bekreftelsesdata
tests/
  kjop.spec.ts         # E2E-tester for kjøpsflyt
  mock-api.js          # Mock-backend for tester
```
