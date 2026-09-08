package no.fremtind.bilforsikring.controller

import com.fasterxml.jackson.databind.ObjectMapper
import no.fremtind.bilforsikring.model.AvtaleStatus
import no.fremtind.bilforsikring.model.Dekningstype
import no.fremtind.bilforsikring.model.KjopRequest
import no.fremtind.bilforsikring.model.KjopResponse
import no.fremtind.bilforsikring.service.BilforsikringService
import org.junit.jupiter.api.Test
import org.mockito.kotlin.any
import org.mockito.kotlin.whenever
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.context.bean.override.mockito.MockitoBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.post
import java.time.LocalDate

@WebMvcTest(BilforsikringController::class)
class BilforsikringControllerTest {

    @Autowired
    lateinit var mockMvc: MockMvc

    @Autowired
    lateinit var objectMapper: ObjectMapper

    @MockitoBean
    lateinit var bilforsikringService: BilforsikringService

    private val gyldigRequest = KjopRequest(
        registreringsnummer = "AB 12345",
        bonus = "75",
        dekningstype = Dekningstype.KASKO,
        startdato = LocalDate.of(2026, 10, 1),
        fodselsnummer = "12345678901",
        fornavn = "Ola",
        etternavn = "Nordmann",
        epost = "ola@nordmann.no",
        telefonnummer = "12345678"
    )

    @Test
    fun `POST kjop returnerer 201 med avtalenummer og status AVTALE_SENDT`() {
        whenever(bilforsikringService.kjopForsikring(any())).thenReturn(
            KjopResponse(
                avtalenummer = "AVT-ABC123",
                status = AvtaleStatus.AVTALE_SENDT,
                dekningstype = Dekningstype.KASKO,
                startdato = LocalDate.of(2026, 10, 1),
                arspremie = "5000"
            )
        )

        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(gyldigRequest)
        }.andExpect {
            status { isCreated() }
            jsonPath("$.avtalenummer") { value("AVT-ABC123") }
            jsonPath("$.status") { value("AVTALE_SENDT") }
            jsonPath("$.arspremie") { value("5000") }
        }
    }

    @Test
    fun `POST kjop returnerer 400 med feltfeil ved ugyldig registreringsnummer`() {
        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(gyldigRequest.copy(registreringsnummer = "UGYLDIG"))
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.feil.registreringsnummer") { value("Ugyldig format (f.eks. AB 12345)") }
        }
    }

    @Test
    fun `POST kjop returnerer 400 med feltfeil ved ugyldig fodselsnummer`() {
        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(gyldigRequest.copy(fodselsnummer = "123"))
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.feil.fodselsnummer") { value("Fødselsnummer må være 11 siffer") }
        }
    }

    @Test
    fun `POST kjop returnerer 400 med feltfeil ved ugyldig epost`() {
        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(gyldigRequest.copy(epost = "ikke-en-epost"))
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.title") { value("Valideringsfeil") }
            jsonPath("$.feil.epost") { exists() }
        }
    }

    @Test
    fun `POST kjop returnerer 400 med feltfeil ved ugyldig bonus`() {
        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(gyldigRequest.copy(bonus = "99"))
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.title") { value("Valideringsfeil") }
            jsonPath("$.feil.bonus") { exists() }
        }
    }

    @Test
    fun `POST kjop returnerer 400 med feltfeil ved ugyldig telefonnummer`() {
        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(gyldigRequest.copy(telefonnummer = "123"))
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.title") { value("Valideringsfeil") }
            jsonPath("$.feil.telefonnummer") { exists() }
        }
    }

    @Test
    fun `POST kjop returnerer 400 nar fornavn er tomt`() {
        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(gyldigRequest.copy(fornavn = ""))
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.title") { value("Valideringsfeil") }
            jsonPath("$.feil.fornavn") { exists() }
        }
    }

    @Test
    fun `POST kjop returnerer 400 nar etternavn er tomt`() {
        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
            content = objectMapper.writeValueAsString(gyldigRequest.copy(etternavn = ""))
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.title") { value("Valideringsfeil") }
            jsonPath("$.feil.etternavn") { exists() }
        }
    }

    @Test
    fun `POST kjop returnerer 400 nar request body mangler`() {
        mockMvc.post("/api/bilforsikring/kjop") {
            contentType = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isBadRequest() }
            jsonPath("$.title") { value("Valideringsfeil") }
        }
    }
}
