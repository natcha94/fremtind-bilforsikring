import { describe, it, expect } from "vitest";
import {
  DEKNINGSTYPER,
  DEKNINGSTYPE_LABELS,
  DEKNINGSTYPE_OPTIONS,
} from "../app/features/purchase/dekningstype";

describe("dekningstype", () => {
  it("alle typer har en norsk label", () => {
    for (const type of DEKNINGSTYPER) {
      expect(DEKNINGSTYPE_LABELS[type]).toBeTruthy();
    }
  });

  it("ANSVAR har label Ansvarsforsikring", () => {
    expect(DEKNINGSTYPE_LABELS.ANSVAR).toBe("Ansvarsforsikring");
  });

  it("DELKASKO har label Delkasko", () => {
    expect(DEKNINGSTYPE_LABELS.DELKASKO).toBe("Delkasko");
  });

  it("KASKO har label Kasko", () => {
    expect(DEKNINGSTYPE_LABELS.KASKO).toBe("Kasko");
  });

  it("DEKNINGSTYPE_OPTIONS har ett element per dekningstype", () => {
    expect(DEKNINGSTYPE_OPTIONS).toHaveLength(DEKNINGSTYPER.length);
  });

  it("hvert alternativ har value og label", () => {
    for (const option of DEKNINGSTYPE_OPTIONS) {
      expect(DEKNINGSTYPER).toContain(option.value);
      expect(option.label).toBe(DEKNINGSTYPE_LABELS[option.value]);
    }
  });
});
