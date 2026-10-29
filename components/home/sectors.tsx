import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/section";

const sectors = [
  { title: "Homes & Villas", type: "residential", img: "sector-homes", alt: "Installer placing a solar panel on a house roof" },
  { title: "Commercial Buildings", type: "commercial", img: "sector-commercial", alt: "Solar array in front of a commercial building at dusk" },
  { title: "Factories & Warehouses", type: "industrial", img: "sector-industrial", alt: "Large rooftop solar installation at sunset" },
  { title: "Farms & Agriculture", type: "agricultural", img: "sector-farms", alt: "Solar panels in a field surrounded by trees" },
  { title: "Solar Farms", type: "commercial", img: "sector-solar-farms", alt: "Aerial view of rows of solar panels" },
  { title: "Off-grid Sites", type: "other", img: "sector-off-grid", alt: "Ground-mounted solar panels on open grassland" },
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
            <Link href={`/contact?type=${s.type}`} className="group relative block aspect-[4/3] overflow-hidden">
              <Image
                src={`/images/${s.img}.jpg`}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 font-serif text-xl font-medium text-white sm:p-6 sm:text-3xl">{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
