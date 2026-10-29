import { company, pillars } from "@/content/site";

/**
 * Trust metrics band. Shows verified, sourced metrics from content/site.ts when provided;
 * otherwise shows scope statements (no numbers are invented).
 */
export function TrustBand() {
  const hasMetrics = company.metrics.length > 0;
  return (
    <section aria-label={hasMetrics ? "Open Energy in numbers" : "Why Open Energy"} className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-y-0 end-0 -z-10 w-1/2 bg-gradient-to-l from-sun-400/15 to-transparent" />
      <div className="container-x py-12 sm:py-14">
        {hasMetrics ? (
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {company.metrics.map((m) => (
              <div key={m.label} className="border-s-2 border-sun-400 ps-4">
                <dt className="text-sm text-navy-200">{m.label}</dt>
                <dd className="order-first font-display text-4xl font-bold text-white">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li key={p.title} className="border-s-2 border-sun-400 ps-4">
                <span aria-hidden className="font-display text-sm font-bold text-sun-300">0{i + 1}</span>
                <h3 className="mt-1 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-200">{p.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
