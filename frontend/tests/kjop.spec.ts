import { test, expect } from "@playwright/test";

async function fyllUtSkjema(page: any, overstyr: Record<string, string> = {}) {
  const felter = {
    registreringsnummer: "AB 12345",
    dekningstype: "KASKO",
    bonus: "75",
    startdato: "2026-10-01",
    fodselsnummer: "12345678901",
    fornavn: "Ola",
    etternavn: "Nordmann",
    epost: "ola@nordmann.no",
    telefonnummer: "12345678",
    ...overstyr,
  };

  await page.selectOption("#dekningstype", felter.dekningstype);
  await page.selectOption("#bonus", felter.bonus);
  await page.fill("#startdato", felter.startdato);
  await page.fill("#fodselsnummer", felter.fodselsnummer);
  await page.fill("#fornavn", felter.fornavn);
  await page.fill("#etternavn", felter.etternavn);
  await page.fill("#epost", felter.epost);
  await page.fill("#telefonnummer", felter.telefonnummer);
  await page.fill("#reg-number", felter.registreringsnummer);
}

test.describe("Kjøpsskjema", () => {
  test("viser skjema når siden lastes", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Kjøp Bilforsikring" }),
    ).toBeVisible();
    await expect(page.locator("#reg-number")).toBeVisible();
    await expect(page.locator("#fodselsnummer")).toBeVisible();
    await expect(page.locator("#dekningstype")).toBeVisible();
  });

  test("viser feilmelding ved ugyldig fødselsnummer", async ({ page }) => {
    await page.goto("/");

    await page.fill("#fodselsnummer", "123");
    await page.getByRole("button", { name: "Kjøp" }).click();

    await expect(
      page.getByText("Fødselsnummer må være 11 siffer"),
    ).toBeVisible();
  });

  test("viser feilmelding ved ugyldig telefonnummer", async ({ page }) => {
    await page.goto("/");

    await page.fill("#telefonnummer", "123");
    await page.getByRole("button", { name: "Kjøp" }).click();

    await expect(
      page.getByText("Telefonnummer må være 8 siffer"),
    ).toBeVisible();
  });

  test("viser feilmelding ved ugyldig e-post", async ({ page }) => {
    await page.goto("/");

    await page.fill("#epost", "ikke-en-epost");
    await page.getByRole("button", { name: "Kjøp" }).click();

    await expect(page.getByText("Ugyldig e-postadresse")).toBeVisible();
  });

  test("fullfører kjøp og viser bekreftelsesside", async ({ page }) => {
    await page.goto("/");
    await fyllUtSkjema(page);
    await page.getByRole("button", { name: "Kjøp" }).click();

    await expect(
      page.getByRole("heading", { name: "Forsikring kjøpt!" }),
    ).toBeVisible();
    await expect(page.getByText("AVT-TEST123")).toBeVisible();
    await expect(page.getByText("Kasko")).toBeVisible();
    await expect(page.getByText("5 000 kr")).toBeVisible();
  });

  test("viser feilmelding når API feiler", async ({ page }) => {
    await page.goto("/");
    await fyllUtSkjema(page, { registreringsnummer: "EF 99999" });
    await page.getByRole("button", { name: "Kjøp" }).click();

    await expect(page.getByRole("alert")).toBeVisible();
  });
});

test.describe("Bekreftelsesside", () => {
  test("redirecter til forsiden om man går direkte til /bekreftelse", async ({
    page,
  }) => {
    await page.goto("/bekreftelse");

    await expect(page).toHaveURL("/");
  });
});

test.describe("ErrorBoundary", () => {
  test("viser 404-side for ukjente ruter", async ({ page }) => {
    await page.goto("/denne-siden-finnes-ikke");

    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
    await expect(
      page.getByText("The requested page could not be found."),
    ).toBeVisible();
  });
});
