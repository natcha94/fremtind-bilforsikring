package no.fremtind.bilforsikring.model

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import java.time.LocalDate

data class KjopRequest(
    @field:NotBlank(message = "Registreringsnummer er påkrevd")
    @field:Pattern(regexp = "^[A-Za-z]{2}\\s?\\d{5}$", message = "Ugyldig format (E.g. AB 12345)")
    val registreringsnummer: String,

    @field:NotBlank(message = "Bonus er påkrevd")
    @field:Pattern(regexp = "^(0|10|20|30|40|50|60|70|75)$", message = "Ugyldig bonusverdi")
    val bonus: String,

    @field:NotNull(message = "Dekningstype er påkrevd")
    val dekningstype: Dekningstype,

    @field:NotNull(message = "Startdato er påkrevd")
    val startdato: LocalDate,

    @field:NotBlank(message = "Fødselsnummer er påkrevd")
    @field:Pattern(regexp = "^\\d{11}$", message = "Fødselsnummer må være 11 siffer")
    val fodselsnummer: String,

    @field:NotBlank(message = "Fornavn er påkrevd")
    val fornavn: String,

    @field:NotBlank(message = "Etternavn er påkrevd")
    val etternavn: String,

    @field:NotBlank(message = "E-post er påkrevd")
    @field:Email(message = "Ugyldig e-postadresse")
    val epost: String,

    @field:NotBlank(message = "Telefonnummer er påkrevd")
    @field:Pattern(regexp = "^\\d{8}$", message = "Telefonnummer må være 8 siffer")
    val telefonnummer: String
)
