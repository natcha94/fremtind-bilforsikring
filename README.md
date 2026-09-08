# Bilforsikring

Enkel kjøpsflyt for bilforsikring med en React-frontend og et Spring Boot-integrasjonslag i Kotlin.

## Struktur

```
backend/    Spring Boot REST API (Kotlin)
frontend/   React Router v7 app (TypeScript)
```

Se README i hver mappe for hvordan man starter dem opp.

## Kort om løsningen

Kunden fyller ut et skjema i frontend og sender det til integrasjonslaget. Integrasjonslaget gjør fire kall mot fagsystem og brevtjeneste (begge stubbet), og returnerer avtalenummer og prisinformasjon tilbake til frontend. Frontend viser en bekreftelsesside når alt går OK.
