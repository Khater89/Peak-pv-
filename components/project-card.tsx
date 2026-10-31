import Link from "next/link";
import { BatteryCharging, Grid3x3, MapPin, Zap } from "lucide-react";
import type { Project, ProjectStatus } from "@/content/shared";
import { ProjectMedia, type MediaLabels } from "@/components/project-media";
import { lp, type Locale } from "@/lib/locales";

export type CardLabels = MediaLabels & {
  panels: string;
  inverter: string;
  storage: string;
  status: Record<ProjectStatus, string>;
};

/** Listing-style card: big image, headline figure, location, icon spec row. */
export function ProjectCard({ project, labels, lang }: { project: Project; labels: CardLabels; lang: Locale }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2px] bg-white shadow-card ring-1 ring-line transition-[box-shadow,transform] duration-200 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3]">
        <ProjectMedia
          project={project}
          labels={labels}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute start-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-[2px] bg-sun-400 px-3 py-1 text-xs font-bold text-ink shadow-sm">{project.systemType}</span>
          <span className="rounded-[2px] bg-white/95 px-3 py-1 text-xs font-semibold text-ink shadow-sm">{labels.status[project.status]}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p dir="ltr" className="self-start font-display text-3xl font-bold text-ink">
          {project.capacityKwp}
          <span className="ms-1 font-sans text-base font-semibold text-muted">kWp</span>
        </p>
        <h3 className="mt-1 text-lg font-bold">
          <Link href={lp(lang, `/projects/${project.slug}`)} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <MapPin aria-hidden className="size-4 shrink-0 text-sun-700" />
          {project.location}
        </p>
        <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-sm">
          <Fact icon={Grid3x3} label={labels.panels} value={project.keyFacts.panels} />
          <Fact icon={Zap} label={labels.inverter} value={project.keyFacts.inverter} />
          {project.keyFacts.storage && <Fact icon={BatteryCharging} label={labels.storage} value={project.keyFacts.storage} />}
        </dl>
      </div>
    </article>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof Zap; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-1 text-xs text-muted">
        <Icon aria-hidden className="size-3.5 shrink-0" />
        {label}
      </dt>
      <dd dir="ltr" className="mt-0.5 truncate text-start font-semibold">{value}</dd>
    </div>
  );
}
