package no.fremtind.bilforsikring.config

import com.fasterxml.jackson.databind.exc.MismatchedInputException
import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationErrors(ex: MethodArgumentNotValidException): ProblemDetail {
        val feil = ex.bindingResult.fieldErrors
            .associate { it.field to (it.defaultMessage ?: "Ugyldig verdi") }

        return ProblemDetail.forStatus(HttpStatus.BAD_REQUEST).apply {
            title = "Valideringsfeil"
            detail = "En eller flere felter er ugyldige"
            setProperty("feil", feil)
        }
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleNotReadable(ex: HttpMessageNotReadableException): ProblemDetail {
        val cause = ex.cause

        val feil: Map<String, String> = if (cause is MismatchedInputException) {
            val felt = cause.path.lastOrNull()?.fieldName ?: "ukjent"
            mapOf(felt to "Feltet er påkrevd")
        } else {
            mapOf("request" to "Ugyldig eller ikke-lesbar JSON")
        }

        return ProblemDetail.forStatus(HttpStatus.BAD_REQUEST).apply {
            title = "Valideringsfeil"
            detail = "En eller flere felter er ugyldige"
            setProperty("feil", feil)
        }
    }
}
