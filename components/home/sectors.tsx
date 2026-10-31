import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/section";
import { images } from "@/content/shared";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";

export async function Sectors() {
  const c = await getContent();
  const lang = await getLang();
  const t = c.sectorsSection;
  return (
    <Section tone="surface" labelledBy="sectors-title">
      <SectionHeading
        id="sectors-title"
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {c.sectors.map((s) => (
          <li key={s.title}>
            <Link href={lp(lang, `/contact?type=${s.type}`)} className="group relative block aspect-[4/3] overflow-hidden">
              <Image
                src={images[s.img as keyof typeof images]}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 font-serif text-xl font-semibold uppercase tracking-[0.02em] text-white sm:p-6 sm:text-3xl">{s.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
