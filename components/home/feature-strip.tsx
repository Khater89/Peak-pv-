import { ClipboardCheck, Layers, Ruler, Users } from "lucide-react";
import { getContent } from "@/lib/i18n";

const icons = [Users, Ruler, Layers, ClipboardCheck];

/** Four feature cards overlapping the bottom of the hero. */
export async function FeatureStrip() {
  const c = await getContent();
  return (
    <section aria-label={c.pillarsAria} className="relative z-10 -mt-24 lg:-mt-28">
      <div className="container-x">
        <ul className="grid overflow-hidden border border-line bg-[#ffffff] shadow-lift sm:grid-cols-2 lg:grid-cols-4">
          {c.pillars.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={p.title} className="flex gap-4 border-line p-6 max-lg:[&:nth-child(-n+2)]:border-b sm:max-lg:odd:border-e lg:border-e lg:last:border-e-0">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[2px] bg-leaf-100 text-leaf-700">
                  <Icon aria-hidden className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold uppercase tracking-[0.03em]">{p.title}</h3>
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
