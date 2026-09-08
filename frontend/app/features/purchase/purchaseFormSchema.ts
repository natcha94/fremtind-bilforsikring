import { z } from "zod";
import { DEKNINGSTYPER } from "./dekningstype";

export const purchaseFormSchema = z.object({
  registreringsnummer: z
    .string()
    .min(1, "Registreringsnummer er påkrevd")
    .regex(/^[A-Za-z]{2}\s?\d{5}$/, "Ugyldig format (E.g. AB 12345)"),
  dekningstype: z.enum(DEKNINGSTYPER, {
    error: "Velg dekningstype",
  }),
  bonus: z.string().min(1, "Velg bonus"),
  startdato: z.string().min(1, "Startdato er påkrevd"),
  fodselsnummer: z
    .string()
    .regex(/^\d{11}$/, "Fødselsnummer må være 11 siffer"),
  fornavn: z.string().min(1, "Fornavn er påkrevd"),
  etternavn: z.string().min(1, "Etternavn er påkrevd"),
  epost: z.email("Ugyldig e-postadresse"),
  telefonnummer: z
    .string()
    .regex(/^\d{8}$/, "Telefonnummer må være 8 siffer"),
});

export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;
