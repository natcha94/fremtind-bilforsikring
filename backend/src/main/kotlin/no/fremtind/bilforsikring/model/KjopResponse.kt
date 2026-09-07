package no.fremtind.bilforsikring.model

data class KjopResponse(
    val avtalenummer: String,
    val status: AvtaleStatus
)

enum class AvtaleStatus {
    OPPRETTET,
    AVTALE_SENDT,
    FEIL
}
