import { ArrowRight, BatteryCharging, Grid3x3, MapPin, Zap } from "lucide-react";
import { statusLabel, type Project } from "@/content/projects";
import { ProjectMedia } from "@/components/project-media";
import { ButtonLink } from "@/components/ui/button";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="grid overflow-hidden rounded-[1.5rem] bg-white shadow-lift ring-1 ring-line lg:grid-cols-[1.25fr_1fr]">
      <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]">
        <ProjectMedia project={project} sizes="(min-width: 1024px) 55vw, 100vw" />
        <span className="absolute start-4 top-4 rounded-full bg-sun-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
          Featured project
        </span>
      </div>
      <div className="flex flex-col p-7 sm:p-10">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-surface px-3 py-1">{project.systemType}</span>
          <span className="rounded-full bg-surface px-3 py-1 capitalize">{project.segment}</span>
          <span className="rounded-full bg-surface px-3 py-1">{statusLabel[project.status]}</span>
        </div>
        <p className="mt-6 font-display text-5xl font-bold">
          {project.capacityKwp}
          <span className="ms-2 font-sans text-xl font-semibold text-muted">kWp</span>
        </p>
        <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-muted">
          <MapPin aria-hidden className="size-4 shrink-0 text-sun-700" /> {project.location}
        </p>
        <p className="mt-5 text-muted">{project.summary}</p>
        <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-5">
          {[
            { icon: Grid3x3, label: "Panels", value: project.keyFacts.panels },
            { icon: Zap, label: "Inverter", value: project.keyFacts.inverter },
            ...(project.keyFacts.storage ? [{ icon: BatteryCharging, label: "Storage", value: project.keyFacts.storage }] : []),
          ].map((f) => (
            <div key={f.label}>
              <dt className="flex items-center gap-1 text-xs text-muted">
                <f.icon aria-hidden className="size-3.5" /> {f.label}
              </dt>
              <dd className="mt-1 font-semibold">{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
          <ButtonLink href={`/projects/${project.slug}`} variant="dark">
            View project <ArrowRight aria-hidden className="rtl:-scale-x-100" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Get a similar system
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
