export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: "package" | "ruler" | "wrench" | "life-buoy";
  audience: string;
  benefits: string[];
  /** VERIFY: set to true only once the offering is confirmed by Peak PV. */
  enabled: boolean;
};

export const services: Service[] = [
  {
    slug: "supply",
    title: "Supply",
    summary: "PV panels, inverters, mounting structures, batteries and balance-of-system components.",
    description:
      "We source the equipment your system needs and match components so they work together — panels, inverters, mounting, protection, cabling and storage.",
    icon: "package",
    audience: "Homeowners, businesses and installers who need equipment sourced for a project.",
    benefits: [
      "Components selected to be compatible with each other",
      "Specifications documented before purchase",
      "Delivery coordinated with the installation schedule",
    ],
    enabled: true,
  },
  {
    slug: "design",
    title: "Design",
    summary: "System engineering based on your site, consumption profile and goals.",
    description:
      "Our design work turns a site survey into a buildable system: array layout, string configuration, inverter selection, protection and single-line diagrams.",
    icon: "ruler",
    audience: "Property owners and project teams who need an engineered system design.",
    benefits: [
      "Layout based on real roof or ground measurements",
      "Shading and orientation considered from the start",
      "Drawings and equipment list you can review",
    ],
    enabled: true,
  },
  {
    slug: "installation",
    title: "Installation",
    summary: "Mounting, panel installation, wiring, testing and commissioning.",
    description:
      "Our installation team builds the system to the approved design, tests it and commissions it — then walks you through operation at handover.",
    icon: "wrench",
    audience: "Anyone ready to put a designed system on their roof or land.",
    benefits: [
      "Installed to the approved design",
      "Tested and commissioned before handover",
      "Tidy, safe work on site",
    ],
    enabled: true,
  },
  {
    slug: "maintenance",
    title: "Maintenance & support",
    summary: "Inspections, cleaning and troubleshooting after installation.",
    description:
      "Periodic inspection and support to keep the system performing as designed.",
    icon: "life-buoy",
    audience: "Owners of existing PV systems.",
    benefits: ["Scheduled inspections", "Fault diagnosis", "Panel cleaning"],
    // Open decision: not stated in the brief. Flip to true once confirmed.
    enabled: false,
  },
];

export const activeServices = services.filter((s) => s.enabled);

export const solutions = [
  {
    segment: "residential" as const,
    title: "Residential solar",
    body: "Rooftop systems for villas, houses and apartment buildings — designed around your household's consumption and roof.",
    points: ["Rooftop PV arrays", "On-grid or hybrid with battery storage", "Neat, low-profile installation"],
  },
  {
    segment: "commercial" as const,
    title: "Commercial & industrial",
    body: "Larger systems for offices, factories, warehouses, farms and facilities — engineered around operating hours and load.",
    points: ["Flat-roof, carport and ground-mount arrays", "Designed around daytime operating load", "Staged delivery for live sites"],
  },
];

/** Generic PV system categories. VERIFY which ones Peak PV offers. */
export const systemTypes = [
  {
    title: "On-grid",
    body: "Connected to the utility grid. Solar power is used first; the grid covers the rest.",
  },
  {
    title: "Hybrid",
    body: "Grid-connected with battery storage, so solar energy can be used later or during outages.",
  },
  {
    title: "Off-grid",
    body: "Standalone system with batteries for sites without a reliable grid connection.",
  },
  {
    title: "Solar water pumping",
    body: "PV-powered pumps for agriculture and water supply in remote locations.",
  },
];

/** Standard PV engineering scope. VERIFY against Peak PV's actual capabilities. */
export const capabilities = [
  "Site survey and roof / ground assessment",
  "Shading and orientation analysis",
  "Array layout and string configuration",
  "Inverter and battery selection",
  "Mounting structure selection",
  "Electrical protection and single-line diagrams",
  "Installation and cable management",
  "Testing, commissioning and handover",
];

export const comparison = {
  columns: ["On-grid", "Hybrid", "Off-grid"],
  rows: [
    { label: "Grid connection", values: ["Yes", "Yes", "No"] },
    { label: "Battery storage", values: ["No", "Yes", "Yes"] },
    { label: "Power during outages", values: ["No", "Yes, from batteries", "Yes"] },
    { label: "Typical use", values: ["Reduce grid consumption", "Savings plus backup", "Remote or unreliable grid"] },
  ],
};
