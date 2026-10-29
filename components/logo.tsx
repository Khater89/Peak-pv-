import { cn } from "@/lib/utils";

const GOLD = "#b8955a";

/**
 * Peak PV mark: a fine-line peak with a smaller gold peak inside (with two hairlines suggesting PV cells),
 * the sun as a gold point, on a horizon line.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones, "badge" adds an ivory tile (favicon, avatars).
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const fg = tone === "light" ? "#faf8f4" : "#14171c";
  const mark = (
    <g fill="none">
      <circle cx="45" cy="17" r="4.2" fill={GOLD} />
      <path d="M8 48 30 16 52 48" stroke={fg} strokeWidth="2.4" strokeLinejoin="miter" />
      <path d="M20 48 30 33.5 40 48" stroke={GOLD} strokeWidth="1.6" />
      <path d="M24.2 41.8h11.6M27.4 37.2h5.2" stroke={GOLD} strokeWidth="1" />
      <path d="M4 52.5h56" stroke={fg} strokeWidth="1.2" />
    </g>
  );
  if (tone === "badge") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-10", className)}>
        <rect width="64" height="64" fill="#faf8f4" />
        <rect x="2.5" y="2.5" width="59" height="59" fill="none" stroke={GOLD} strokeWidth="1" />
        <g transform="translate(8 6) scale(0.75)">{mark}</g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-11 lg:size-12", className)}>
      {mark}
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-brand text-[1.75rem] font-semibold tracking-[0.2em]", tone === "light" ? "text-[#faf8f4]" : "text-ink")}>
          PEAK
        </span>
        <span className="mt-1.5 text-[0.5625rem] font-semibold tracking-[0.5em] text-sun-400">SOLAR · PV</span>
      </span>
    </span>
  );
}
