package no.fremtind.bilforsikring.model

data class SendAvtaleRequest(
    val avtalenummer: String,
    val mottakerEpost: String,
    val mottakerNavn: String,
    val registreringsnummer: String
)

data class SendAvtaleResponse(
    val utsendingStatus: String,
    val levert: Boolean
)
