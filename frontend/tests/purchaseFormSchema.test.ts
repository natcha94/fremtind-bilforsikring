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
  it("godtar et gyldig skjema", () => {
    const result = purchaseFormSchema.safeParse(gyldigSkjema);
    expect(result.success).toBe(true);
  });

  describe("registreringsnummer", () => {
    it.each(["AB 12345", "ab 12345", "AB12345"])(
      "godtar gyldig format: %s",
      (verdi) => {
        const result = purchaseFormSchema.safeParse({
          ...gyldigSkjema,
          registreringsnummer: verdi,
        });
        expect(result.success).toBe(true);
      }
    );

    it.each(["UGYLDIG", "123 AB", "A 12345", ""])(
      "avviser ugyldig format: %s",
      (verdi) => {
        const result = purchaseFormSchema.safeParse({
          ...gyldigSkjema,
          registreringsnummer: verdi,
        });
        expect(result.success).toBe(false);
      }
    );
  });

  describe("fodselsnummer", () => {
    it("godtar 11 siffer", () => {
      const result = purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        fodselsnummer: "12345678901",
      });
      expect(result.success).toBe(true);
    });

    it("avviser 10 siffer", () => {
      const result = purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        fodselsnummer: "1234567890",
      });
      expect(result.success).toBe(false);
    });

    it("avviser bokstaver", () => {
      const result = purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        fodselsnummer: "1234567890a",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("telefonnummer", () => {
    it("godtar 8 siffer", () => {
      const result = purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        telefonnummer: "12345678",
      });
      expect(result.success).toBe(true);
    });

    it("avviser 7 siffer", () => {
      const result = purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        telefonnummer: "1234567",
      });
      expect(result.success).toBe(false);
    });

    it("avviser 9 siffer", () => {
      const result = purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        telefonnummer: "123456789",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("epost", () => {
    it("godtar gyldig e-post", () => {
      const result = purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        epost: "test@example.com",
      });
      expect(result.success).toBe(true);
    });

    it("avviser e-post uten @", () => {
      const result = purchaseFormSchema.safeParse({
        ...gyldigSkjema,
        epost: "ikke-en-epost",
      });
      expect(result.success).toBe(false);
    });
  });
});
