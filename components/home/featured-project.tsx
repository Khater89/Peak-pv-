import { ArrowRight, BatteryCharging, Grid3x3, MapPin, Zap } from "lucide-react";
import type { Project } from "@/content/shared";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { ProjectMedia } from "@/components/project-media";
import { ButtonLink } from "@/components/ui/button";

export async function FeaturedProject({ project }: { project: Project }) {
  const c = await getContent();
  const lang = await getLang();
  const t = c.project;
  return (
    <article className="corner-brackets grid overflow-hidden border border-line bg-white lg:grid-cols-[1.25fr_1fr]">
      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]">
        <ProjectMedia project={project} labels={t} sizes="(min-width: 1024px) 55vw, 100vw" />
        <span className="absolute start-4 top-4 bg-ink px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.28em] text-sun-300">
          {t.featuredBadge}
        </span>
      </div>
      <div className="flex flex-col p-7 sm:p-10">
        <div className="flex flex-wrap gap-2">
          <span className="tag text-leaf-700">{project.systemType}</span>
          <span className="tag text-leaf-700">{t.segments[project.segment]}</span>
          <span className="tag text-leaf-700">{t.status[project.status]}</span>
        </div>
        <p dir="ltr" className="mt-7 self-start font-serif text-6xl font-semibold">
          {project.capacityKwp}
          <span className="ms-2 font-sans text-xl font-semibold text-muted">kWp</span>
        </p>
        <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-muted">
          <MapPin aria-hidden className="size-4 shrink-0 text-sun-700" /> {project.location}
        </p>
        <p className="mt-5 text-muted">{project.summary}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-5">
          {[
            { icon: Grid3x3, label: t.panels, value: project.keyFacts.panels },
            { icon: Zap, label: t.inverter, value: project.keyFacts.inverter },
            ...(project.keyFacts.storage ? [{ icon: BatteryCharging, label: t.storage, value: project.keyFacts.storage }] : []),
          ].map((f) => (
            <div key={f.label}>
              <dt className="flex items-center gap-1 text-xs text-muted">
                <f.icon aria-hidden className="size-3.5" /> {f.label}
              </dt>
              <dd dir="ltr" className="mt-1 text-start font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
          <ButtonLink href={lp(lang, `/projects/${project.slug}`)} variant="dark">
            {t.viewProject} <ArrowRight aria-hidden className="rtl:-scale-x-100" />
          </ButtonLink>
          <ButtonLink href={lp(lang, "/contact")} variant="outline">
            {t.similar}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
