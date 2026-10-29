import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/content/site";
import { projects } from "@/content/projects";
import { Hero } from "@/components/home/hero";
import { FeatureStrip } from "@/components/home/feature-strip";
import { ServicesGrid } from "@/components/home/services-grid";
import { FactsBand } from "@/components/home/facts-band";
import { Sectors } from "@/components/home/sectors";
import { FeaturedProject } from "@/components/home/featured-project";
import { ContactSection } from "@/components/home/contact-section";
import { ProcessTimeline } from "@/components/process-timeline";
import { Ticker } from "@/components/ticker";
import { Faq } from "@/components/faq";
import { Section, SectionHeading } from "@/components/section";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: `${company.brandName} — Solar PV Supply, Design & Installation` },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.brandName,
  url: siteUrl(),
  description: company.about,
  areaServed: company.serviceArea ?? undefined,
  knowsAbout: ["Photovoltaic systems", "Solar PV design", "Solar PV installation", "Solar equipment supply"],
};

export default function HomePage() {
  const featured = projects[0];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <FeatureStrip />
      <ServicesGrid />
      <FactsBand />

      <Section labelledBy="process-title">
        <SectionHeading
          id="process-title"
          eyebrow="How it works"
          title="From First Call to Switch-on"
          intro="A clear, accountable process from your request to a commissioned system."
          align="center"
        />
        <div className="mt-12">
          <ProcessTimeline />
        </div>
      </Section>

      <Sectors />

      <Section labelledBy="projects-title">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="projects-title" eyebrow="Projects" title="Featured Work" intro="Real systems engineered by Open Energy, with full specifications." />
          <Link href="/projects" className="inline-flex items-center gap-1 py-2 font-semibold underline-offset-4 hover:underline">
            View all projects <ArrowUpRight aria-hidden className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>
        <div className="mt-12">
          <FeaturedProject project={featured} />
        </div>
      </Section>

      <Ticker />

      <Section tone="surface" labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, Answered" intro="The things people usually ask before going solar." />
          <Faq limit={5} />
        </div>
      </Section>

      <ContactSection />
    </>
  );
}
