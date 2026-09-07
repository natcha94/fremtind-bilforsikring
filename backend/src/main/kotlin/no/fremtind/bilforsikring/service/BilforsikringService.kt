package no.fremtind.bilforsikring.service

import no.fremtind.bilforsikring.model.AvtaleStatus
import no.fremtind.bilforsikring.model.KjopRequest
import no.fremtind.bilforsikring.model.KjopResponse
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class BilforsikringService(
) {

    private val log = LoggerFactory.getLogger(BilforsikringService::class.java)

    fun kjopForsikring(request: KjopRequest): KjopResponse {
        log.info("Starter kjøp av bilforsikring for kjøretøy {}", request.registreringsnummer)

        log.info("Kjøp fullført")

        return KjopResponse(
            avtalenummer = "123456",
            status = AvtaleStatus.AVTALE_SENDT
        )
    }
}
