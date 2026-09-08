# Bilforsikring – Backend

Spring Boot REST API skrevet i Kotlin. Fungerer som integrasjonslag mellom frontend og fagsystemene (fagsystem og brevtjeneste er stubbet med enkle implementasjoner).

## Kom i gang

Krever Java 21.

```bash
mvn spring-boot:run
```

API kjører på `http://localhost:8080`.

## Endepunkt

```
POST /api/bilforsikring/kjop
```

Tar imot kjøpsdata, oppretter kunde og avtale i fagsystemet, sender bekreftelse via brevtjenesten og returnerer avtalenummer med prisinformasjon.

## Tester

```bash
mvn test
```

Testene bruker `@WebMvcTest` for controller-laget og rene enhetstester for service-laget med Mockito.
