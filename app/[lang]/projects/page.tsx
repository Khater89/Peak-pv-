import type { Metadata } from "next";
import { images } from "@/content/shared";
import { PageHero, Section } from "@/components/section";
import { ProjectsGallery } from "@/components/projects-gallery";
import { CtaBand } from "@/components/cta-band";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const lang = await getLang();
  return {
    title: c.meta.projects.title,
    description: c.meta.projects.description,
    alternates: { canonical: lp(lang, "/projects"), languages: { en: "/en/projects", ar: "/ar/projects" } },
  };
}

export default async function ProjectsPage() {
  const c = await getContent();
  const lang = await getLang();
  const t = c.projectsPage;
  const p = c.project;
  return (
    <>
      <PageHero image={{ src: images.pageProjects, alt: t.imageAlt }} eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      <Section>
        <ProjectsGallery
          lang={lang}
          projects={c.projects}
          labels={{
            rendersSoon: p.rendersSoon,
            render: p.render,
            photo: p.photo,
            panels: p.panels,
            inverter: p.inverter,
            storage: p.storage,
            status: p.status,
          }}
          t={{
            filterAria: c.gallery.filterAria,
            all: c.gallery.all,
            empty: c.gallery.empty,
            segments: p.segments,
            countLabels: Array.from({ length: c.projects.length + 1 }, (_, n) => c.gallery.count(n)),
          }}
        />
      </Section>
      <CtaBand title={t.ctaTitle} body={t.ctaBody} />
    </>
  );
}
