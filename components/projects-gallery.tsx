"use client";

import { useState } from "react";
import type { Project, Segment } from "@/content/shared";
import { ProjectCard, type CardLabels } from "@/components/project-card";
import type { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";

type Filter = "all" | Segment;

export function ProjectsGallery({
  lang,
  projects,
  labels,
  t,
}: {
  lang: Locale;
  projects: Project[];
  labels: CardLabels;
  /** countLabels[n] is the translated "n projects" text (precomputed on the server). */
  t: { filterAria: string; all: string; empty: string; segments: Record<Segment, string>; countLabels: string[] };
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.segment === filter);
  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t.all },
    { value: "residential", label: t.segments.residential },
    { value: "commercial", label: t.segments.commercial },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label={t.filterAria} className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f.value === "all" ? projects.length : projects.filter((p) => p.segment === f.value).length;
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-[2px] border-[1.5px] px-5 text-sm font-semibold transition-colors duration-150",
                  active ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-ink hover:border-navy-900/40",
                )}
              >
                {f.label}
                <span className={cn("rounded-full px-2 py-0.5 text-xs", active ? "bg-white/15" : "bg-surface")}>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted" role="status" aria-live="polite">
          {t.countLabels[visible.length]}
        </p>
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 rounded-[2px] border border-dashed border-line p-10 text-center text-muted">{t.empty}</p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} labels={labels} lang={lang} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
