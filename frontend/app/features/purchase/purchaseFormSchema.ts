import { z } from "zod";

export const purchaseFormSchema = z.object({
  registreringsnummer: z
    .string()
    .min(1, "Registreringsnummer er påkrevd")
    .regex(/^[A-Za-z]{2}\s?\d{5}$/, "Ugyldig format (E.g. AB 12345)"),
  bonus: z.string().min(1, "Velg bonus"),
  fodselsnummer: z
    .string()
    .regex(/^\d{11}$/, "Fødselsnummer må være 11 siffer"),
  fornavn: z.string().min(1, "Fornavn er påkrevd"),
  etternavn: z.string().min(1, "Etternavn er påkrevd"),
  epost: z.email("Ugyldig e-postadresse"),
});

export type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;
