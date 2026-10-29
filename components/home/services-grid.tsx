import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { activeServices, systemTypes } from "@/content/services";
import { serviceIcons } from "@/components/icons";
import { Section, SectionHeading } from "@/components/section";

export function ServicesGrid() {
  return (
    <Section labelledBy="services-title">
      <SectionHeading
        id="services-title"
        eyebrow="What we do"
        title="Our Core Services"
        intro="Complete solar PV delivery by qualified engineers and installers — or just the part you need."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {activeServices.map((s) => {
          const Icon = serviceIcons[s.icon];
          return (
            <li key={s.slug}>
              <Link
                href={`/services#${s.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-navy-900/40 hover:shadow-card"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy-900 text-sun-400">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{s.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  Learn more <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/contact?service=full-project"
            className="on-dark group flex h-full flex-col rounded-[var(--radius-card)] bg-navy-900 p-6 text-white transition-colors hover:bg-navy-800"
          >
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-sun-300">Turnkey</span>
            <h3 className="mt-3 text-lg font-bold tracking-tight">Complete PV Project</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">
              Design, supply and installation under one contract — for {systemTypes.map((t) => t.title.toLowerCase()).slice(0, 3).join(", ")} systems.
            </p>
            <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-sun-400">
              Request a quote <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </span>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
