import { Building2, Check, Home } from "lucide-react";
import { solutions } from "@/content/services";
import Image from "next/image";

const meta: Record<(typeof solutions)[number]["segment"], { icon: typeof Home; img: string; alt: string }> = {
  residential: { icon: Home, img: "/images/sector-homes.jpg", alt: "Installer placing a solar panel on a house roof" },
  commercial: { icon: Building2, img: "/images/sector-industrial.jpg", alt: "Large rooftop solar installation at sunset" },
};

export function SolutionBlocks() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {solutions.map((s) => {
        const m = meta[s.segment];
        const Icon = m.icon;
        return (
          <article key={s.segment} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-card">
            <div className="relative aspect-[16/9]">
              <Image src={m.img} alt={m.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-[2px] border border-sun-400/60 text-sun-500">
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
