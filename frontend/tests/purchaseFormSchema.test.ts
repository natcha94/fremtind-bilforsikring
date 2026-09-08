import { describe, it, expect } from "vitest";
import { purchaseFormSchema } from "../app/features/purchase/purchaseFormSchema";

const gyldigSkjema = {
  registreringsnummer: "AB 12345",
  dekningstype: "KASKO" as const,
  bonus: "75",
  startdato: "2026-10-01",
  fodselsnummer: "12345678901",
  fornavn: "Ola",
  etternavn: "Nordmann",
  epost: "ola@nordmann.no",
  telefonnummer: "12345678",
};

describe("purchaseFormSchema", () => {
  it("godtar komplett gyldig skjema", () => {
    expect(purchaseFormSchema.safeParse(gyldigSkjema).success).toBe(true);
  });

  it("registreringsnummer uten mellomrom er OK", () => {
    expect(
      purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        registreringsnummer: "AB12345",
      }).success,
    ).toBe(true);
  });

  it("registreringsnummer med feil format feiler", () => {
    expect(
      purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        registreringsnummer: "UGYLDIG",
      }).success,
    ).toBe(false);
  });

  it("fødselsnummer må ha nøyaktig 11 siffer", () => {
    expect(
      purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        fodselsnummer: "1234567890",
      }).success,
    ).toBe(false);
    expect(
      purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        fodselsnummer: "123456789012",
      }).success,
    ).toBe(false);
  });

  it("telefonnummer med feil lengde feiler", () => {
    expect(
      purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        telefonnummer: "1234567",
      }).success,
    ).toBe(false);
  });

  it("ugyldig e-post feiler", () => {
    expect(
      purchaseFormSchema.safeParse({ ...gyldigSkjema, epost: "ikke-en-epost" })
        .success,
    ).toBe(false);
  });
});
