package no.fremtind.bilforsikring.model

import java.time.LocalDate

data class OpprettKundeRequest(
    val fodselsnummer: String,
    val fornavn: String,
    val etternavn: String,
    val epost: String,
    val telefonnummer: String
)

data class OpprettKundeResponse(
    val kundenummer: String
)

data class OpprettAvtaleRequest(
    val kundenummer: String,
    val registreringsnummer: String,
    val bonus: String,
    val dekningstype: Dekningstype,
    val startdato: LocalDate
)

data class OpprettAvtaleResponse(
    val avtalenummer: String,
    val arspremie: String,
    val startdato: LocalDate
)

data class OppdaterAvtaleStatusRequest(
    val avtalenummer: String,
    val status: AvtaleStatus
)

data class OppdaterAvtaleStatusResponse(
    val avtalenummer: String,
    val avtalestatus: AvtaleStatus
)
