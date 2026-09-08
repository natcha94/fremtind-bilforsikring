package no.fremtind.bilforsikring.service

import no.fremtind.bilforsikring.client.BrevtjenesteClient
import no.fremtind.bilforsikring.client.FagsystemClient
import no.fremtind.bilforsikring.model.AvtaleStatus
import no.fremtind.bilforsikring.model.KjopRequest
import no.fremtind.bilforsikring.model.KjopResponse
import no.fremtind.bilforsikring.model.OppdaterAvtaleStatusRequest
import no.fremtind.bilforsikring.model.OpprettAvtaleRequest
import no.fremtind.bilforsikring.model.OpprettKundeRequest
import no.fremtind.bilforsikring.model.SendAvtaleRequest
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class BilforsikringService(
    private val fagsystemClient: FagsystemClient,
    private val brevtjenesteClient: BrevtjenesteClient
) {

    private val log = LoggerFactory.getLogger(BilforsikringService::class.java)

    fun kjopForsikring(request: KjopRequest): KjopResponse {
        log.info("Starter kjøp av bilforsikring for kjøretøy {}", request.registreringsnummer)

        val kunde = fagsystemClient.opprettKunde(
            OpprettKundeRequest(
                fodselsnummer = request.fodselsnummer,
                fornavn = request.fornavn,
                etternavn = request.etternavn,
                epost = request.epost
            )
        )

        val avtale = fagsystemClient.opprettAvtale(
            OpprettAvtaleRequest(
                kundenummer = kunde.kundenummer,
                registreringsnummer = request.registreringsnummer,
                bonus = request.bonus
            )
        )

        brevtjenesteClient.sendAvtale(
            SendAvtaleRequest(
                avtalenummer = avtale.avtalenummer,
                mottakerEpost = request.epost,
                mottakerNavn = "${request.fornavn} ${request.etternavn}",
                registreringsnummer = request.registreringsnummer
            )
        )

        fagsystemClient.oppdaterAvtaleStatus(
            OppdaterAvtaleStatusRequest(
                avtalenummer = avtale.avtalenummer,
                status = AvtaleStatus.AVTALE_SENDT
            )
        )

        log.info("Kjøp fullført for avtale {}", avtale.avtalenummer)

        return KjopResponse(
            avtalenummer = avtale.avtalenummer,
            status = AvtaleStatus.AVTALE_SENDT
        )
    }
}
