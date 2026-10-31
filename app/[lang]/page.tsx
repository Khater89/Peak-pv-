import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { FeatureStrip } from "@/components/home/feature-strip";
import { ServicesGrid } from "@/components/home/services-grid";
import { FactsBand } from "@/components/home/facts-band";
import { Sectors } from "@/components/home/sectors";
import { FeaturedProject } from "@/components/home/featured-project";
import { ContactSection } from "@/components/home/contact-section";
import { ProcessTimeline } from "@/components/process-timeline";
import { Faq } from "@/components/faq";
import { EvChargingGrid } from "@/components/ev-charging";
import { Section, SectionHeading } from "@/components/section";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { siteUrl } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const lang = await getLang();
  return {
    title: { absolute: c.meta.siteTitle },
    alternates: { canonical: lp(lang, "/"), languages: { en: "/en", ar: "/ar" } },
  };
}

export default async function HomePage() {
  const c = await getContent();
  const lang = await getLang();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: c.company.brandName,
    url: `${siteUrl()}${lp(lang, "/")}`,
    description: c.company.about,
    areaServed: c.company.serviceArea ?? undefined,
    knowsAbout: ["Photovoltaic systems", "Solar PV design", "Solar PV installation", "EV charging points"],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <FeatureStrip />
      <ServicesGrid />

      <Section tone="surface" labelledBy="ev-title">
        <SectionHeading id="ev-title" eyebrow={c.evSection.eyebrow} title={c.evSection.title} intro={c.evSection.intro} />
        <div className="mt-12">
          <EvChargingGrid />
        </div>
      </Section>
      <FactsBand />

      <Section labelledBy="process-title">
        <SectionHeading
          id="process-title"
          eyebrow={c.processSection.eyebrow}
          title={c.processSection.title}
          intro={c.processSection.intro}
          align="center"
        />
        <div className="mt-12">
          <ProcessTimeline />
        </div>
      </Section>

      <Sectors />

      <Section labelledBy="projects-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="projects-title" eyebrow={c.projectsSection.eyebrow} title={c.projectsSection.title} intro={c.projectsSection.intro} />
          <Link href={lp(lang, "/projects")} className="inline-flex items-center gap-1 py-2 font-semibold underline-offset-4 hover:underline">
            {c.projectsSection.viewAll} <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-12">
          <FeaturedProject project={c.projects[0]} />
        </div>
      </Section>

      <Section tone="surface" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <SectionHeading id="faq-title" eyebrow={c.faqSection.eyebrow} title={c.faqSection.title} intro={c.faqSection.intro} />
          <Faq limit={5} />
        </div>
      </Section>

      <ContactSection />
    </>
  );
}
