"use client";

import { useState } from "react";
import { projects, segments } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

type Segment = (typeof segments)[number]["value"];

export function ProjectsGallery() {
  const [segment, setSegment] = useState<Segment>("all");
  const visible = segment === "all" ? projects : projects.filter((p) => p.segment === segment);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter projects by segment" className="flex flex-wrap gap-2">
          {segments.map((s) => {
            const count = s.value === "all" ? projects.length : projects.filter((p) => p.segment === s.value).length;
            const active = segment === s.value;
            return (
              <button
                key={s.value}
                type="button"
                aria-pressed={active}
                onClick={() => setSegment(s.value)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-[2px] border-[1.5px] px-5 text-sm font-semibold transition-colors duration-150",
                  active ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-ink hover:border-navy-900/40",
                )}
              >
                {s.label}
                <span className={cn("rounded-full px-2 py-0.5 text-xs", active ? "bg-white/15" : "bg-surface")}>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted" role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 rounded-[2px] border border-dashed border-line p-10 text-center text-muted">
          No projects in this category yet.
        </p>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
