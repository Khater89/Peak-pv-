/**
 * Locale-independent facts: contact details, image files, option values.
 * Translated text lives in content/en and content/ar.
 */

/** Jordanian mobile numbers in international form for tel: and wa.me links. */
export const phones = [
  { display: "079 061 9770", intl: "+962790619770" },
  { display: "079 093 1706", intl: "+962790931706" },
];
export const email = "abdelrahman.khater.elc@gmail.com";
export const whatsappIntl = "962790619770";
export const whatsappHref = (text: string) => `https://wa.me/${whatsappIntl}?text=${encodeURIComponent(text)}`;

/**
 * Photography: general solar / EV photos from Unsplash (Unsplash License: free for commercial use, no
 * attribution required). They illustrate the type of work only — they are NOT Peak PV projects.
 */
export const images = {
  hero: "/images/hero-solar-array.jpg",
  pageServices: "/images/page-services.jpg",
  pageProjects: "/images/page-projects.jpg",
  pageAbout: "/images/page-about.jpg",
  pageContact: "/images/page-contact.jpg",
  homes: "/images/sector-homes.jpg",
  commercial: "/images/sector-commercial.jpg",
  industrial: "/images/sector-industrial.jpg",
  farms: "/images/sector-farms.jpg",
  solarFarms: "/images/sector-solar-farms.jpg",
  offGrid: "/images/sector-off-grid.jpg",
  evHome: "/images/ev-home.jpg",
  evStation: "/images/ev-station.jpg",
  evParking: "/images/ev-parking.jpg",
};

/** Form option values (labels are translated). */
export const projectTypeValues = ["residential", "commercial", "industrial", "agricultural", "other"] as const;
export type ProjectTypeValue = (typeof projectTypeValues)[number];

export type ServiceIcon = "package" | "ruler" | "wrench" | "ev-charger" | "life-buoy";
export type Segment = "residential" | "commercial";
export type ProjectStatus = "completed" | "in-progress" | "designed";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: ServiceIcon;
  audience: string;
  benefits: string[];
  /** VERIFY: set to true only once the offering is confirmed by Peak PV. */
  enabled: boolean;
};

export type ProjectImage = {
  src: string;
  alt: string;
  /** "render" = 3D design visualisation, "photo" = photo of the real site. */
  kind: "render" | "photo";
};

export type Project = {
  slug: string;
  title: string;
  segment: Segment;
  systemType: string;
  location: string;
  status: ProjectStatus;
  year: number | null;
  summary: string;
  description: string[];
  capacityKwp: number;
  keyFacts: { panels: string; inverter: string; storage?: string };
  specs: { label: string; value: string }[];
  scope: string[];
  images: ProjectImage[];
};

export type Metric = { value: string; label: string; source: string };
export type Certification = { name: string; issuer: string; evidenceUrl?: string };
export type Partner = { name: string; logo: string; role: string };
