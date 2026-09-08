package no.fremtind.bilforsikring.client

import no.fremtind.bilforsikring.model.OpprettAvtaleRequest
import no.fremtind.bilforsikring.model.OpprettAvtaleResponse
import no.fremtind.bilforsikring.model.OpprettKundeRequest
import no.fremtind.bilforsikring.model.OpprettKundeResponse
import no.fremtind.bilforsikring.model.OppdaterAvtaleStatusRequest
import no.fremtind.bilforsikring.model.OppdaterAvtaleStatusResponse
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class FagsystemClient {

    private val log = LoggerFactory.getLogger(FagsystemClient::class.java)

    fun opprettKunde(request: OpprettKundeRequest): OpprettKundeResponse {
        val kundenummer = "KND-${UUID.randomUUID().toString().take(8).uppercase()}"
        log.info("Opprettet kunde {} (fnr: {})", kundenummer, request.fodselsnummer.take(6) + "*****")
        return OpprettKundeResponse(kundenummer = kundenummer)
    }

    fun opprettAvtale(request: OpprettAvtaleRequest): OpprettAvtaleResponse {
        val avtalenummer = "AVT-${UUID.randomUUID().toString().take(8).uppercase()}"
        log.info("Opprettet avtale {} for kunde {}", avtalenummer, request.kundenummer)
        return OpprettAvtaleResponse(avtalenummer = avtalenummer)
    }

    fun oppdaterAvtaleStatus(request: OppdaterAvtaleStatusRequest): OppdaterAvtaleStatusResponse {
        log.info("Oppdaterer avtalestatus for avtalenummer={} til status={}", request.avtalenummer, request.status)
        return OppdaterAvtaleStatusResponse(
            avtalenummer = request.avtalenummer,
            avtalestatus = request.status
        )
    }
}
