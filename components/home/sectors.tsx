import Link from "next/link";
import type { ArtVariant } from "@/components/art/project-art";
import { ProjectArt } from "@/components/art/project-art";
import { Section, SectionHeading } from "@/components/section";

const sectors: { title: string; type: string; art: ArtVariant }[] = [
  { title: "Homes & Villas", type: "residential", art: "roof" },
  { title: "Commercial Buildings", type: "commercial", art: "flat" },
  { title: "Factories & Warehouses", type: "industrial", art: "flat" },
  { title: "Farms & Water Pumping", type: "agricultural", art: "ground" },
  { title: "Car Parks & Carports", type: "commercial", art: "carport" },
  { title: "Off-grid Sites", type: "other", art: "ground" },
];

export function Sectors() {
  return (
    <Section tone="surface" labelledBy="sectors-title">
      <SectionHeading
        id="sectors-title"
        eyebrow="Who we work with"
        title="Sectors We Serve"
        intro="Solar PV solutions designed for a wide range of property types."
      />
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {sectors.map((s) => (
          <li key={s.title}>
            <Link href={`/contact?type=${s.type}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                <ProjectArt variant={s.art} label="" />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-bold text-white sm:p-5 sm:text-lg">{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
