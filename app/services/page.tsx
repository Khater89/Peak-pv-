import type { Metadata } from "next";
import { pageImages } from "@/content/site";
import { Check, CircuitBoard } from "lucide-react";
import { activeServices, capabilities, comparison, systemTypes } from "@/content/services";
import { serviceIcons } from "@/components/icons";
import { PageHero, Section, SectionHeading } from "@/components/section";
import { SolutionBlocks } from "@/components/solution-blocks";
import { CtaBand } from "@/components/cta-band";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Solar PV Services — Supply, Design & Installation",
  description:
    "Solar PV equipment supply, system design and professional installation for residential and commercial properties from Peak PV.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero image={pageImages.services}
        eyebrow="Services"
        title="Solar PV, handled end to end"
        intro="Supply, design and installation — choose the full project or just the part you need."
      >
        <nav aria-label="Services on this page" className="mt-8 flex flex-wrap gap-2">
          {activeServices.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="inline-flex h-11 items-center rounded-[2px] border border-line bg-white px-5 text-sm font-semibold hover:border-navy-900/40">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <Section labelledBy="service-detail-title">
        <h2 id="service-detail-title" className="sr-only">Service details</h2>
        <div className="space-y-6">
          {activeServices.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <article
                key={s.slug}
                id={s.slug}
                aria-labelledby={`${s.slug}-title`}
                className="grid scroll-mt-28 gap-8 rounded-[2px] border border-line bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[1.2fr_1fr]"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-14 items-center justify-center rounded-[2px] border border-sun-400/60 text-sun-500">
                      <Icon aria-hidden className="size-7" />
                    </span>
                    <span className="font-display text-sm font-bold text-sun-700">0{i + 1}</span>
                  </div>
                  <h3 id={`${s.slug}-title`} className="mt-5 text-3xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-lg text-muted">{s.description}</p>
                  <p className="mt-4 text-[0.9375rem]">
                    <span className="font-semibold">Who it&apos;s for: </span>
                    <span className="text-muted">{s.audience}</span>
                  </p>
                </div>
                <div className="rounded-[2px] bg-surface p-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">What you get</h4>
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
                  <ButtonLink href="/contact" variant="dark" size="sm" className="mt-6">
                    Request {s.title.toLowerCase()}
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="surface" labelledBy="types-title">
        <SectionHeading id="types-title" eyebrow="System types" title="The right system for the site" intro="The main types of PV system, and when each one fits." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {systemTypes.map((t) => (
            <li key={t.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-card">
              <span className="inline-flex size-10 items-center justify-center rounded-[2px] border border-sun-400/60 text-sun-500">
                <CircuitBoard aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{t.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{t.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-start text-[0.9375rem]">
              <caption className="border-b border-line px-6 py-4 text-start text-lg font-bold">Comparing system types</caption>
              <thead className="bg-surface">
                <tr>
                  <th scope="col" className="px-6 py-3 text-start font-semibold text-muted">Feature</th>
                  {comparison.columns.map((c) => (
                    <th key={c} scope="col" className="px-6 py-3 text-start font-semibold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {comparison.rows.map((r) => (
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
        <SectionHeading id="segments-title" eyebrow="Solutions" title="Residential and commercial" />
        <div className="mt-12">
          <SolutionBlocks />
        </div>
      </Section>

      <Section tone="surface" labelledBy="capabilities-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            id="capabilities-title"
            eyebrow="Technical capabilities"
            title="Engineering behind every system"
            intro="The design and installation work that goes into a dependable PV system."
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {capabilities.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-[2px] bg-white p-4 shadow-card ring-1 ring-line">
                <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-success" strokeWidth={2.5} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand title="Not sure which service you need?" body="Describe your property and goals — we'll recommend the right approach during a consultation." />
    </>
  );
}
