import type { Metadata } from "next";
import { Fragment } from "react";
import { Check, CircuitBoard } from "lucide-react";
import { images } from "@/content/shared";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { serviceIcons } from "@/components/icons";
import { PageHero, Section, SectionHeading } from "@/components/section";
import { SolutionBlocks } from "@/components/solution-blocks";
import { CtaBand } from "@/components/cta-band";
import { EvChargingGrid } from "@/components/ev-charging";
import { ButtonLink } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const lang = await getLang();
  return {
    title: c.meta.services.title,
    description: c.meta.services.description,
    alternates: { canonical: lp(lang, "/services"), languages: { en: "/en/services", ar: "/ar/services" } },
  };
}

export default async function ServicesPage() {
  const c = await getContent();
  const lang = await getLang();
  const t = c.servicesPage;
  const activeServices = c.services.filter((s) => s.enabled);
  return (
    <>
      <PageHero image={{ src: images.pageServices, alt: t.imageAlt }} eyebrow={t.eyebrow} title={t.title} intro={t.intro}>
        <nav aria-label={t.onThisPage} className="mt-8 flex flex-wrap gap-2">
          {activeServices.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="inline-flex h-11 items-center rounded-[2px] border border-line bg-white px-5 text-sm font-semibold hover:border-navy-900/40">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <Section labelledBy="service-detail-title">
        <h2 id="service-detail-title" className="sr-only">{t.detailsSr}</h2>
        <div className="space-y-6">
          {activeServices.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Fragment key={s.slug}>
              <article
                id={s.slug}
                aria-labelledby={`${s.slug}-title`}
                className="grid scroll-mt-28 gap-8 rounded-[2px] border border-line bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[1.2fr_1fr]"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-14 items-center justify-center rounded-[2px] bg-leaf-100 text-leaf-700">
                      <Icon aria-hidden className="size-7" />
                    </span>
                    <span className="font-display text-sm font-bold text-sun-700">0{i + 1}</span>
                  </div>
                  <h3 id={`${s.slug}-title`} className="mt-5 font-serif text-4xl font-bold uppercase">{s.title}</h3>
                  <p className="mt-3 text-lg text-muted">{s.description}</p>
                  <p className="mt-4 text-[0.9375rem]">
                    <span className="font-semibold">{t.whoFor}</span>
                    <span className="text-muted">{s.audience}</span>
                  </p>
                </div>
                <div className="rounded-[2px] bg-surface p-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">{t.whatYouGet}</h4>
                  <ul className="mt-4 space-y-3">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-sun-400 text-ink">
                          <Check aria-hidden className="size-3.5" strokeWidth={3} />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={lp(lang, `/contact?service=${s.slug}`)} variant="dark" size="sm" className="mt-6 h-auto min-h-10 whitespace-normal py-2.5 text-center sm:whitespace-nowrap">
                    {t.request(s.title)}
                  </ButtonLink>
                </div>
              </article>
              {s.slug === "ev-charging" && (
                <div className="pt-2">
                  <EvChargingGrid />
                </div>
              )}
              </Fragment>
            );
          })}
        </div>
      </Section>

      <Section tone="surface" labelledBy="types-title">
        <SectionHeading id="types-title" eyebrow={t.typesEyebrow} title={t.typesTitle} intro={t.typesIntro} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.systemTypes.map((st) => (
            <li key={st.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-card">
              <span className="inline-flex size-10 items-center justify-center rounded-[2px] bg-leaf-100 text-leaf-700">
                <CircuitBoard aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{st.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{st.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-start text-[0.9375rem]">
              <caption className="border-b border-line px-6 py-4 text-start text-lg font-bold">{t.compareCaption}</caption>
              <thead className="bg-surface">
                <tr>
                  <th scope="col" className="px-6 py-3 text-start font-semibold text-muted">{t.feature}</th>
                  {c.comparison.columns.map((col) => (
                    <th key={col} scope="col" className="px-6 py-3 text-start font-semibold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {c.comparison.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="px-6 py-4 text-start font-semibold">{r.label}</th>
                    {r.values.map((v, i) => (
                      <td key={i} className="px-6 py-4 text-muted">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section labelledBy="segments-title">
        <SectionHeading id="segments-title" eyebrow={t.segmentsEyebrow} title={t.segmentsTitle} />
        <div className="mt-12">
          <SolutionBlocks />
        </div>
      </Section>

      <Section tone="surface" labelledBy="capabilities-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="capabilities-title"
            eyebrow={t.capabilitiesEyebrow}
            title={t.capabilitiesTitle}
            intro={t.capabilitiesIntro}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {c.capabilities.map((cap) => (
              <li key={cap} className="flex items-start gap-3 rounded-[2px] bg-white p-4 shadow-card ring-1 ring-line">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-success" strokeWidth={2.5} />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand title={t.ctaTitle} body={t.ctaBody} />
    </>
  );
}
