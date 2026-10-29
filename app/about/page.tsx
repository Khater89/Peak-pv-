import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Handshake, ShieldCheck, Target } from "lucide-react";
import { company, pageImages } from "@/content/site";
import { PageHero, Section, SectionHeading } from "@/components/section";
import { ProcessTimeline } from "@/components/process-timeline";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About Peak PV — Solar PV Specialists",
  description: "Peak PV is a solar photovoltaic company supplying, designing and installing PV systems for homes and businesses.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Compass, title: "Honest advice", body: "We recommend what fits your site and goals — and say so when solar isn't the right fit." },
  { icon: Target, title: "Engineered to fit", body: "Systems designed from real measurements, not a one-size-fits-all package." },
  { icon: ShieldCheck, title: "Safety and quality", body: "Careful installation practice and testing before every handover." },
  { icon: Handshake, title: "One accountable team", body: "The same team takes your project from consultation to commissioning." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero image={pageImages.about} eyebrow="About us" title="Solar specialists, start to finish" intro={company.about} />

      <Section labelledBy="story-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="story-title" eyebrow="Our story" title="Why Peak PV" />
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>
                Going solar involves many decisions — which equipment, what size, how it is mounted and connected. We set
                up Peak PV so property owners could get all of that from one specialist team.
              </p>
              <p>
                We focus on photovoltaic systems only: supplying the right components, designing around each site and
                installing to a high standard.
              </p>
            </div>
            <div className="mt-8 rounded-[2px] border-s-4 border-sun-400 bg-surface p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Our mission</h3>
              <p className="mt-2 text-xl font-semibold leading-snug">{company.mission}</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] shadow-lift">
            <Image src="/images/sector-homes.jpg" alt="Installer placing a solar panel on a house roof" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="What we stand for" title="Our values" align="center" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-card">
              <span className="inline-flex size-11 items-center justify-center rounded-[2px] bg-leaf-100 text-leaf-700">
                <v.icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {(company.certifications.length > 0 || company.partners.length > 0) && (
        <Section labelledBy="trust-title">
          <SectionHeading id="trust-title" eyebrow="Quality & partners" title="Certifications and partners" />
          {company.certifications.length > 0 && (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {company.certifications.map((c) => (
                <li key={c.name} className="flex items-start gap-3 rounded-[2px] border border-line p-5">
                  <ShieldCheck aria-hidden className="size-6 shrink-0 text-success" />
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-muted">{c.issuer}</p>
                    {c.evidenceUrl && (
                      <a href={c.evidenceUrl} className="text-sm font-medium underline" rel="noopener noreferrer" target="_blank">
                        View certificate
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {company.partners.length > 0 && (
            <ul className="mt-10 flex flex-wrap items-center gap-8">
              {company.partners.map((p) => (
                <li key={p.name} className="relative h-12 w-36">
                  <Image src={p.logo} alt={`${p.name} — ${p.role}`} fill sizes="144px" className="object-contain" />
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      <Section labelledBy="about-process-title">
        <SectionHeading id="about-process-title" eyebrow="How we work" title="A process built on clarity" />
        <div className="mt-12">
          <ProcessTimeline />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
