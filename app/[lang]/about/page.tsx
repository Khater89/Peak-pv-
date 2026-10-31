import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Handshake, ShieldCheck, Target } from "lucide-react";
import { images } from "@/content/shared";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { PageHero, Section, SectionHeading } from "@/components/section";
import { ProcessTimeline } from "@/components/process-timeline";
import { CtaBand } from "@/components/cta-band";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const lang = await getLang();
  return {
    title: c.meta.about.title,
    description: c.meta.about.description,
    alternates: { canonical: lp(lang, "/about"), languages: { en: "/en/about", ar: "/ar/about" } },
  };
}

const valueIcons = [Compass, Target, ShieldCheck, Handshake];

export default async function AboutPage() {
  const c = await getContent();
  const t = c.aboutPage;
  const company = c.company;
  const values = t.values.map((v, i) => ({ ...v, icon: valueIcons[i % valueIcons.length] }));
  return (
    <>
      <PageHero image={{ src: images.pageAbout, alt: t.imageAlt }} eyebrow={t.eyebrow} title={t.title} intro={company.about} />

      <Section labelledBy="story-title">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading id="story-title" eyebrow={t.storyEyebrow} title={t.storyTitle} />
            <div className="mt-6 space-y-4 text-lg text-muted">
              <p>{t.storyP1}</p>
              <p>{t.storyP2}</p>
            </div>
            <div className="mt-8 rounded-[2px] border-s-4 border-sun-400 bg-surface p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">{t.mission}</h3>
              <p className="mt-2 text-xl font-semibold leading-snug">{company.mission}</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] shadow-lift">
            <Image src={images.homes} alt={t.storyImageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section tone="surface" labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow={t.valuesEyebrow} title={t.valuesTitle} align="center" />
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
          <SectionHeading id="trust-title" eyebrow={t.trustEyebrow} title={t.trustTitle} />
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
                        {t.viewCertificate}
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
        <SectionHeading id="about-process-title" eyebrow={t.processEyebrow} title={t.processTitle} />
        <div className="mt-12">
          <ProcessTimeline />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
