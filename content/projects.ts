export type ProjectImage = {
  src: string;
  alt: string;
  /** "render" = 3D design visualisation, "photo" = photo of the real site. Shown as a label on the image. */
  kind: "render" | "photo";
};

export type Project = {
  slug: string;
  title: string;
  segment: "residential" | "commercial";
  systemType: string;
  location: string;
  status: "completed" | "in-progress" | "designed";
  year: number | null;
  summary: string;
  description: string[];
  /** Headline figure shown large on cards, like a listing price. */
  capacityKwp: number;
  keyFacts: { panels: string; inverter: string; storage?: string };
  specs: { label: string; value: string }[];
  scope: string[];
  /** Real renders / photos in public/projects/<slug>/. Empty = illustration placeholder. */
  images: ProjectImage[];
};

/**
 * Real projects only. Specs for Madama come from Open Energy's design report
 * "Madama_V21_Short_Report" (V21).
 */
export const projects: Project[] = [
  {
    slug: "madama",
    title: "Madama — 68.4 kWp off-grid system",
    segment: "commercial",
    systemType: "Off-grid",
    location: "Yajouz 2 – Rusaifa, Jordan",
    status: "designed",
    year: 2026,
    summary:
      "A fully off-grid PV and battery system sized to carry Madama's daytime and evening loads without a grid connection.",
    description: [
      "Open Energy carried out the full load study and system design for Madama: every appliance was listed with its rating, load factor and operating hours to build a month-by-month consumption profile.",
      "The design pairs a 68.4 kWp array with a 50 kW hybrid inverter and 184 kWh of battery storage, so evening loads are carried from solar energy stored during the day. The system was checked against a 30-year simulation that includes cloudy days.",
    ],
    capacityKwp: 68.4,
    keyFacts: {
      panels: "114 × 600 W",
      inverter: "50 kW",
      storage: "184.3 kWh",
    },
    specs: [
      { label: "System type", value: "Off-grid (standalone)" },
      { label: "PV array", value: "68.4 kWp — 114 × 600 W modules" },
      { label: "String layout", value: "2 strings × 15 + 6 strings × 14" },
      { label: "Inverter", value: "SOFAR HYD-50K-T1, 50 kW" },
      { label: "Battery storage", value: "3 × CBS5000-H12 — 184.3 kWh nominal / 165.9 kWh usable" },
      { label: "Average daily load", value: "191.9 kWh / day" },
      { label: "Peak simultaneous load", value: "16.8 kW" },
    ],
    scope: ["Load study", "System design", "Equipment selection", "3D rendering"],
    images: [],
  },
];

export const segments = [
  { value: "all", label: "All projects" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
] as const;

export const statusLabel: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In progress",
  designed: "Design complete",
};
