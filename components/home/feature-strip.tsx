import { ClipboardCheck, Layers, Ruler, Users } from "lucide-react";
import { pillars } from "@/content/site";

const icons = [Users, Ruler, Layers, ClipboardCheck];

/** Four feature cards overlapping the bottom of the hero. */
export function FeatureStrip() {
  return (
    <section aria-label="Why Open Energy" className="relative z-10 -mt-24 lg:-mt-28">
      <div className="container-x">
        <ul className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={p.title} className="flex gap-4 border-line p-6 max-lg:[&:nth-child(-n+2)]:border-b sm:max-lg:odd:border-e lg:border-e lg:last:border-e-0">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-sun-400">
                  <Icon aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
