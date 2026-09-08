package no.fremtind.bilforsikring.model

import java.time.LocalDate

data class KjopResponse(
    val avtalenummer: String,
    val status: AvtaleStatus,
    val dekningstype: Dekningstype,
    val startdato: LocalDate,
    val arspremie: String
)

enum class AvtaleStatus {
    OPPRETTET,
    AVTALE_SENDT,
    FEIL
}
