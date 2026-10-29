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
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-sky-100 text-navy-800">
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
            className="group flex h-full flex-col rounded-[var(--radius-card)] bg-gradient-to-br from-sun-100 to-sun-50 p-6 ring-1 ring-sun-300/60 transition-shadow hover:shadow-card"
          >
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-sun-700">Turnkey</span>
            <h3 className="mt-3 text-lg font-bold tracking-tight">Complete PV Project</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              Design, supply and installation under one contract — for {systemTypes.map((t) => t.title.toLowerCase()).slice(0, 3).join(", ")} systems.
            </p>
            <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-ink">
              Request a quote <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </span>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
