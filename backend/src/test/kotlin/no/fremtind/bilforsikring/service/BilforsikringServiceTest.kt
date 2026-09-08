package no.fremtind.bilforsikring.service

import no.fremtind.bilforsikring.client.BrevtjenesteClient
import no.fremtind.bilforsikring.client.FagsystemClient
import no.fremtind.bilforsikring.model.AvtaleStatus
import no.fremtind.bilforsikring.model.Dekningstype
import no.fremtind.bilforsikring.model.KjopRequest
import no.fremtind.bilforsikring.model.OppdaterAvtaleStatusResponse
import no.fremtind.bilforsikring.model.OpprettAvtaleResponse
import no.fremtind.bilforsikring.model.OpprettKundeResponse
import no.fremtind.bilforsikring.model.SendAvtaleResponse
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.kotlin.any
import org.mockito.kotlin.argThat
import org.mockito.kotlin.mock
import org.mockito.kotlin.never
import org.mockito.kotlin.verify
import org.mockito.kotlin.whenever
import java.time.LocalDate

class BilforsikringServiceTest {

    private val fagsystemClient: FagsystemClient = mock()
    private val brevtjenesteClient: BrevtjenesteClient = mock()
    private val service = BilforsikringService(fagsystemClient, brevtjenesteClient)

    private val startdato = LocalDate.of(2026, 10, 1)

    private val gyldigRequest = KjopRequest(
        registreringsnummer = "AB 12345",
        bonus = "75",
        dekningstype = Dekningstype.KASKO,
        startdato = startdato,
        fodselsnummer = "12345678901",
        fornavn = "Ola",
        etternavn = "Nordmann",
        epost = "ola@nordmann.no",
        telefonnummer = "12345678"
    )

    private fun mockHappyPath(avtalenummer: String = "AVT-ABC123") {
        whenever(fagsystemClient.opprettKunde(any())).thenReturn(
            OpprettKundeResponse(kundenummer = "KND-001")
        )
        whenever(fagsystemClient.opprettAvtale(any())).thenReturn(
            OpprettAvtaleResponse(avtalenummer = avtalenummer, arspremie = "5000", startdato = startdato)
        )
        whenever(brevtjenesteClient.sendAvtale(any())).thenReturn(
            SendAvtaleResponse(utsendingStatus = "SENDT", levert = true)
        )
        whenever(fagsystemClient.oppdaterAvtaleStatus(any())).thenReturn(
            OppdaterAvtaleStatusResponse(avtalenummer = avtalenummer, avtalestatus = AvtaleStatus.AVTALE_SENDT)
        )
    }

    @Test
    fun `kjopForsikring returnerer avtalenummer og AVTALE_SENDT ved suksess`() {
        mockHappyPath("AVT-ABC123")

        val response = service.kjopForsikring(gyldigRequest)

        assertEquals("AVT-ABC123", response.avtalenummer)
        assertEquals(AvtaleStatus.AVTALE_SENDT, response.status)
        assertEquals("5000", response.arspremie)
    }

    @Test
    fun `kjopForsikring returnerer startdato og dekningstype fra foresporselen`() {
        mockHappyPath()

        val response = service.kjopForsikring(gyldigRequest)

        assertEquals(startdato, response.startdato)
        assertEquals(Dekningstype.KASKO, response.dekningstype)
    }

    @Test
    fun `kjopForsikring oppretter kunde med riktige persondata`() {
        mockHappyPath()

        service.kjopForsikring(gyldigRequest)

        verify(fagsystemClient).opprettKunde(argThat { req ->
            req.fodselsnummer == "12345678901" &&
            req.fornavn == "Ola" &&
            req.etternavn == "Nordmann" &&
            req.epost == "ola@nordmann.no" &&
            req.telefonnummer == "12345678"
        })
    }

    @Test
    fun `kjopForsikring oppretter avtale med kundenummer fra fagsystem`() {
        mockHappyPath()

        service.kjopForsikring(gyldigRequest)

        verify(fagsystemClient).opprettAvtale(argThat { req ->
            req.kundenummer == "KND-001" &&
            req.registreringsnummer == "AB 12345" &&
            req.bonus == "75" &&
            req.dekningstype == Dekningstype.KASKO &&
            req.startdato == startdato
        })
    }

    @Test
    fun `kjopForsikring sender avtale til korrekt epost med riktig avtalenummer`() {
        mockHappyPath("AVT-ABC123")

        service.kjopForsikring(gyldigRequest)

        verify(brevtjenesteClient).sendAvtale(argThat { req ->
            req.avtalenummer == "AVT-ABC123" &&
            req.mottakerEpost == "ola@nordmann.no" &&
            req.mottakerNavn == "Ola Nordmann" &&
            req.dekningstype == Dekningstype.KASKO
        })
    }

    @Test
    fun `kjopForsikring oppdaterer avtalestatus til AVTALE_SENDT etter brevutsending`() {
        mockHappyPath("AVT-ABC123")

        service.kjopForsikring(gyldigRequest)

        verify(fagsystemClient).oppdaterAvtaleStatus(argThat { req ->
            req.avtalenummer == "AVT-ABC123" &&
            req.status == AvtaleStatus.AVTALE_SENDT
        })
    }

    @Test
    fun `kjopForsikring kaster exception nar fagsystemet feiler ved opprettKunde`() {
        whenever(fagsystemClient.opprettKunde(any())).thenThrow(RuntimeException("Fagsystem utilgjengelig"))

        assertThrows<RuntimeException> {
            service.kjopForsikring(gyldigRequest)
        }

        verify(fagsystemClient, never()).opprettAvtale(any())
        verify(brevtjenesteClient, never()).sendAvtale(any())
        verify(fagsystemClient, never()).oppdaterAvtaleStatus(any())
    }

    @Test
    fun `kjopForsikring kaster exception nar fagsystemet feiler ved opprettAvtale`() {
        whenever(fagsystemClient.opprettKunde(any())).thenReturn(OpprettKundeResponse(kundenummer = "KND-001"))
        whenever(fagsystemClient.opprettAvtale(any())).thenThrow(RuntimeException("Klarte ikke opprette avtale"))

        assertThrows<RuntimeException> {
            service.kjopForsikring(gyldigRequest)
        }

        verify(brevtjenesteClient, never()).sendAvtale(any())
        verify(fagsystemClient, never()).oppdaterAvtaleStatus(any())
    }

    @Test
    fun `kjopForsikring kaster exception nar brevtjenesten feiler og oppdaterer ikke avtalestatus`() {
        whenever(fagsystemClient.opprettKunde(any())).thenReturn(OpprettKundeResponse(kundenummer = "KND-001"))
        whenever(fagsystemClient.opprettAvtale(any())).thenReturn(OpprettAvtaleResponse(avtalenummer = "AVT-ABC123", arspremie = "5000", startdato = startdato))
        whenever(brevtjenesteClient.sendAvtale(any())).thenThrow(RuntimeException("Brevtjenesten er nede"))

        assertThrows<RuntimeException> {
            service.kjopForsikring(gyldigRequest)
        }

        verify(fagsystemClient, never()).oppdaterAvtaleStatus(any())
    }
}
