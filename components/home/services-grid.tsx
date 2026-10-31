import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { serviceIcons } from "@/components/icons";
import { Section, SectionHeading } from "@/components/section";

export async function ServicesGrid() {
  const c = await getContent();
  const lang = await getLang();
  const t = c.servicesSection;
  return (
    <Section labelledBy="services-title">
      <SectionHeading
        id="services-title"
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.services.filter((s) => s.enabled).map((s) => {
          const Icon = serviceIcons[s.icon];
          return (
            <li key={s.slug}>
              <Link
                href={lp(lang, `/services#${s.slug}`)}
                className="corner-brackets group flex h-full flex-col border border-line bg-white p-8 transition-[border-color,box-shadow] duration-300 hover:border-sun-400 hover:shadow-lift"
              >
                <span className="inline-flex size-12 items-center justify-center bg-leaf-100 text-leaf-700">
                  <Icon aria-hidden className="size-6" strokeWidth={1.4} />
                </span>
                <h3 className="mt-7 font-serif text-[1.75rem] font-semibold uppercase leading-none">{s.title}</h3>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">{s.summary}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink">
                  {t.learnMore} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
                </span>
              </Link>
            </li>
          );
        })}
        <li className="lg:col-span-2">
          <Link
            href={lp(lang, "/contact?service=full-project")}
            className="on-dark group flex h-full flex-col bg-navy-900 p-8 text-[#ffffff] transition-colors duration-300 hover:bg-navy-800"
          >
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-sun-300">{t.turnkeyEyebrow}</span>
            <h3 className="mt-5 font-serif text-[1.75rem] font-semibold uppercase leading-none">{t.turnkeyTitle}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#c9dccd]">
              {t.turnkeyBody}
            </p>
            <span className="mt-auto inline-flex items-center gap-1 pt-7 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-sun-300">
              {t.requestQuote} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </span>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
