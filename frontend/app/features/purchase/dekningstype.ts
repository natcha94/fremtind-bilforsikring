export const DEKNINGSTYPER = ["ANSVAR", "DELKASKO", "KASKO"] as const;

export type Dekningstype = (typeof DEKNINGSTYPER)[number];

export const DEKNINGSTYPE_LABELS: Record<Dekningstype, string> = {
  ANSVAR: "Ansvarsforsikring",
  DELKASKO: "Delkasko",
  KASKO: "Kasko",
};

export const DEKNINGSTYPE_OPTIONS = DEKNINGSTYPER.map((value) => ({
  value,
  label: DEKNINGSTYPE_LABELS[value],
}));
