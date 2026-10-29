import { Building2, Check, Home } from "lucide-react";
import { solutions } from "@/content/services";
import { ArtVariant, ProjectArt } from "@/components/art/project-art";

const meta: Record<(typeof solutions)[number]["segment"], { icon: typeof Home; art: ArtVariant; artLabel: string }> = {
  residential: { icon: Home, art: "roof", artLabel: "Illustration of a house with rooftop solar panels" },
  commercial: { icon: Building2, art: "flat", artLabel: "Illustration of a commercial building with a flat-roof solar array" },
};

export function SolutionBlocks() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {solutions.map((s) => {
        const m = meta[s.segment];
        const Icon = m.icon;
        return (
          <article key={s.segment} className="overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-card">
            <div className="aspect-[16/9] border-b border-line">
              <ProjectArt variant={m.art} label={m.artLabel} />
            </div>
            <div className="p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-sun-100 text-sun-700">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="text-2xl font-bold">{s.title}</h3>
              </div>
              <p className="mt-4 text-muted">{s.body}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-success" strokeWidth={3} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
