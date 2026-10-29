import type { Metadata } from "next";
import { pageImages } from "@/content/site";
import { PageHero, Section } from "@/components/section";
import { ProjectsGallery } from "@/components/projects-gallery";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Solar Projects — Residential & Commercial PV",
  description: "Residential and commercial solar PV projects supplied, designed and installed by Peak PV.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero image={pageImages.projects}
        eyebrow="Projects"
        title="Solar installations"
        intro="Real systems designed and delivered by Peak PV — with specifications, renders and site photos."
      />
      <Section>
        <ProjectsGallery />
      </Section>
      <CtaBand title="Have a similar project in mind?" body="Share a few details about your site and we'll take it from there." />
    </>
  );
}
