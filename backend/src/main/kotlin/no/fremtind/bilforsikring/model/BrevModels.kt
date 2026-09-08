package no.fremtind.bilforsikring.model

import java.time.LocalDate

data class SendAvtaleRequest(
    val avtalenummer: String,
    val mottakerEpost: String,
    val mottakerNavn: String,
    val registreringsnummer: String,
    val dekningstype: Dekningstype,
    val startdato: LocalDate
)

data class SendAvtaleResponse(
    val utsendingStatus: String,
    val levert: Boolean
)
