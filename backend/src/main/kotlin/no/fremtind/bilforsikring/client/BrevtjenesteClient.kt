package no.fremtind.bilforsikring.client

import no.fremtind.bilforsikring.model.SendAvtaleRequest
import no.fremtind.bilforsikring.model.SendAvtaleResponse
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Component

@Component
class BrevtjenesteClient {

    private val log = LoggerFactory.getLogger(BrevtjenesteClient::class.java)

    fun sendAvtale(request: SendAvtaleRequest): SendAvtaleResponse {
        log.info("Sender avtale {} til {}", request.avtalenummer, request.mottakerEpost)
        return SendAvtaleResponse(utsendingStatus = "SENDT", levert = true)
    }
}
