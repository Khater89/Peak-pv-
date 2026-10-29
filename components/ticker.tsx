const items = [
  "PV Supply",
  "System Design",
  "Installation",
  "Battery Storage",
  "Off-grid Systems",
  "Hybrid Inverters",
  "Load Studies",
  "Testing & Commissioning",
];

/** Scrolling band of service keywords (static when reduced motion is preferred). */
export function Ticker() {
  const row = [...items, ...items];
  return (
    <div aria-hidden className="overflow-hidden border-y border-line bg-surface py-4">
      <div className="anim-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.18em] text-ink/70">
            {t}
            <span className="size-1.5 rounded-full bg-sun-400" />
          </span>
        ))}
      </div>
    </div>
  );
}
