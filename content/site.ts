/**
 * Company profile and site-wide copy.
 *
 * All user-facing copy lives under content/ so an Arabic edition can be added
 * as a parallel set of files (e.g. content/ar/) without touching components.
 *
 * VERIFY: anything set to null / [] is intentionally empty until Peak PV
 * supplies verified facts. Components hide those blocks instead of inventing data.
 */

export const locale = { lang: "en", dir: "ltr" as "ltr" | "rtl" };

export type Metric = { value: string; label: string; source: string };
export type Certification = { name: string; issuer: string; evidenceUrl?: string };
export type Partner = { name: string; logo: string; role: string };
export type ContactChannel =
  | { kind: "phone"; label: string; value: string }
  | { kind: "email"; label: string; value: string }
  | { kind: "whatsapp"; label: string; value: string }
  | { kind: "address"; label: string; value: string };

export const company = {
  brandName: "Peak PV",
  tagline: "Solar PV systems — supplied, designed and installed.",
  about:
    "Peak PV is a solar photovoltaic company. We supply PV equipment, design systems around each site, and install them — so homeowners and businesses work with one team from first conversation to switch-on.",
  mission:
    "Make the move to solar clear and dependable: honest advice, engineering that fits the site, and installation done right the first time.",
  /** Inferred from the Jordanian phone numbers and projects — confirm exact cities. */
  serviceArea: "Jordan" as string | null,
  /** VERIFY: real, sourced figures only (e.g. "120+ systems installed"). Hidden while empty. */
  metrics: [] as Metric[],
  /** VERIFY: only certifications Peak PV can evidence. Hidden while empty. */
  certifications: [] as Certification[],
  /** VERIFY: only manufacturers/distributors with permission to show their logo. Hidden while empty. */
  partners: [] as Partner[],
  contactChannels: [
    { kind: "phone", label: "Phone", value: "079 061 9770" },
    { kind: "phone", label: "Phone", value: "079 093 1706" },
    { kind: "whatsapp", label: "WhatsApp", value: "079 061 9770" },
    { kind: "email", label: "Email", value: "abdelrahman.khater.elc@gmail.com" },
  ] as ContactChannel[],
};

/** Jordanian mobile numbers in international form for tel: and wa.me links. */
export const phones = [
  { display: "079 061 9770", intl: "+962790619770" },
  { display: "079 093 1706", intl: "+962790931706" },
];
export const email = "abdelrahman.khater.elc@gmail.com";
export const whatsapp = {
  intl: "962790619770",
  message: "Hello Peak PV, I'd like to ask about a solar PV system.",
};
export const whatsappHref = (text = whatsapp.message) =>
  `https://wa.me/${whatsapp.intl}?text=${encodeURIComponent(text)}`;

/**
 * Photography. These are general solar photos from Unsplash (Unsplash License: free for commercial use,
 * no attribution required). They illustrate the type of work only — they are NOT Peak PV projects.
 * Replace them with Peak PV's own photos when available (same paths in public/images/).
 */
export const heroImage = {
  src: "/images/hero-solar-array.jpg",
  alt: "Long row of solar panels under a blue sky with clouds",
} as null | { src: string; alt: string };

export const pageImages = {
  services: { src: "/images/page-services.jpg", alt: "Installer's gloved hands connecting a solar panel" },
  projects: { src: "/images/page-projects.jpg", alt: "Rows of ground-mounted solar panels" },
  about: { src: "/images/page-about.jpg", alt: "Solar array under a clear sky" },
  contact: { src: "/images/page-contact.jpg", alt: "Close-up of solar panels in a field" },
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const primaryCta = { href: "/contact", label: "Get a quote" };

/** Shown in the trust band when no verified metrics exist. Statements of scope, not performance claims. */
export const pillars = [
  { title: "One team, end to end", body: "Supply, design and installation handled together — one point of contact." },
  { title: "Designed per site", body: "Every system is sized around your roof, your consumption and your goals." },
  { title: "Homes and businesses", body: "Residential rooftops through to commercial and industrial installations." },
  { title: "Clear proposals", body: "Equipment, layout and scope set out in writing before any work starts." },
];

export const processSteps = [
  {
    title: "Consultation",
    body: "Tell us about your property, your electricity use and what you want solar to achieve.",
  },
  {
    title: "Site survey",
    body: "We assess roof or ground space, orientation, shading and the existing electrical setup.",
  },
  {
    title: "System design",
    body: "Our engineers select equipment and lay out the array, inverter and protection for your site.",
  },
  {
    title: "Proposal",
    body: "You receive the design, equipment list and scope of work to review before you commit.",
  },
  {
    title: "Supply & installation",
    body: "We deliver the equipment and install mounting, panels, inverter and cabling.",
  },
  {
    title: "Testing & handover",
    body: "The system is tested and commissioned, and we walk you through how it works.",
  },
];

export const faqs = [
  {
    q: "What does Peak PV do?",
    a: "We supply, design and install photovoltaic (PV) solar systems for homes and businesses. You can come to us for the full project or for a specific part of it.",
  },
  {
    q: "How is the size of my system decided?",
    a: "Sizing depends on your electricity consumption, the usable roof or ground area, orientation, shading and your goals. We work it out during the site survey and design stage rather than from a generic formula.",
  },
  {
    q: "Can a system include battery storage?",
    a: "Yes — hybrid systems combine panels with battery storage. Whether storage makes sense for you is something we discuss during design.",
  },
  {
    q: "What happens after I send a quote request?",
    a: "Our team reviews your details and contacts you to arrange a consultation. Your request is stored securely and only used to respond to you.",
  },
  {
    q: "Do you work on commercial projects?",
    a: "Yes. We handle commercial and industrial rooftops and facilities as well as residential properties.",
  },
];
