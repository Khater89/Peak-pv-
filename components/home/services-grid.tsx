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
                className="group flex h-full flex-col border border-line bg-white p-8 transition-[border-color,box-shadow] duration-300 hover:border-sun-400 hover:shadow-lift"
              >
                <span className="inline-flex size-12 items-center justify-center border border-sun-400/60 text-sun-500">
                  <Icon aria-hidden className="size-6" strokeWidth={1.4} />
                </span>
                <h3 className="mt-7 font-serif text-[1.75rem] font-medium leading-none">{s.title}</h3>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">{s.summary}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink">
                  Learn more <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
                </span>
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/contact?service=full-project"
            className="on-dark group flex h-full flex-col bg-ink p-8 text-[#faf8f4] transition-colors duration-300 hover:bg-navy-800"
          >
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.3em] text-sun-300">Turnkey</span>
            <h3 className="mt-5 font-serif text-[1.75rem] font-medium leading-none">Complete PV Project</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#cfc8bb]">
              Design, supply and installation under one contract — for {systemTypes.map((t) => t.title.toLowerCase()).slice(0, 3).join(", ")} systems.
            </p>
            <span className="mt-auto inline-flex items-center gap-1 pt-7 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-sun-300">
              Request a quote <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </span>
          </Link>
        </li>
      </ul>
    </Section>
  );
}
