package no.fremtind.bilforsikring.model

data class OpprettKundeRequest(
    val fodselsnummer: String,
    val fornavn: String,
    val etternavn: String,
    val epost: String
)

data class OpprettKundeResponse(
    val kundenummer: String
)

data class OpprettAvtaleRequest(
    val kundenummer: String,
    val registreringsnummer: String,
    val bonus: String
)

data class OpprettAvtaleResponse(
    val avtalenummer: String
)

data class OppdaterAvtaleStatusRequest(
    val avtalenummer: String,
    val status: AvtaleStatus
)

data class OppdaterAvtaleStatusResponse(
    val avtalenummer: String,
    val avtalestatus: AvtaleStatus
)
