package no.fremtind.bilforsikring.controller

import jakarta.validation.Valid
import no.fremtind.bilforsikring.model.KjopRequest
import no.fremtind.bilforsikring.model.KjopResponse
import no.fremtind.bilforsikring.service.BilforsikringService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/bilforsikring")
class BilforsikringController(
    private val bilforsikringService: BilforsikringService
) {

    @PostMapping("/kjop")
    fun kjopForsikring(@Valid @RequestBody request: KjopRequest): ResponseEntity<KjopResponse> {
        val response = bilforsikringService.kjopForsikring(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(response)
    }
}
