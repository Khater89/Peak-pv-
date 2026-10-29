import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { systemTypes } from "@/content/services";
import { projects } from "@/content/projects";

/**
 * Dark band with figures. The numbers are the real specs of the featured project
 * (no invented company-wide statistics).
 */
export function FactsBand() {
  const p = projects[0];
  const facts = [
    { value: `${p.capacityKwp} kWp`, label: "PV array designed" },
    { value: p.keyFacts.storage ?? "—", label: "Battery storage" },
    { value: p.keyFacts.inverter, label: "Hybrid inverter" },
    { value: "30 yrs", label: "Simulated performance" },
  ];
  return (
    <section aria-labelledby="facts-title" className="on-dark relative isolate overflow-hidden bg-navy-900 py-24 text-[#ffffff] lg:py-32">
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden className="absolute -end-40 top-0 -z-10 size-[30rem] rounded-full bg-sun-400/10 blur-3xl" />
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow">Engineered systems</p>
          <h2 id="facts-title" className="mt-4 text-3xl sm:text-5xl">On-grid, hybrid or fully off-grid.</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#c9dccd]">
            Every system starts with a load study — each appliance, its rating and its hours — so the array, inverter
            and batteries are sized to how the building actually runs.
          </p>
          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {systemTypes.map((t) => (
              <li key={t.title} className="flex items-center gap-2.5 text-[0.8125rem] uppercase tracking-[0.14em] text-[#e3eee5]">
                <Check aria-hidden className="size-4 shrink-0 text-sun-400" strokeWidth={1.75} /> {t.title}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-sun-300">{p.title}</p>
          <dl className="mt-4 grid grid-cols-2 border-s border-t border-white/10">
            {facts.map((f) => (
              <div key={f.label} className="border-b border-e border-white/10 p-7">
                <dd className="font-serif text-4xl font-medium text-sun-300 sm:text-5xl">{f.value}</dd>
                <dt className="mt-2 text-[0.75rem] uppercase tracking-[0.16em] text-[#c9dccd]">{f.label}</dt>
              </div>
            ))}
          </dl>
          <Link href={`/projects/${p.slug}`} className="mt-5 inline-flex items-center gap-1.5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-sun-300 hover:text-white">
            See the full project <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
