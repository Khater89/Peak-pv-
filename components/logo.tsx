import { cn } from "@/lib/utils";

const GOLD = "#b8955a";
/** Five-point star crowning the centre peak, at (40, 6.5). */
const STAR = "M40.00 1.10L41.33 4.67L45.14 4.83L42.16 7.20L43.17 10.87L40.00 8.77L36.83 10.87L37.84 7.20L34.86 4.83L38.67 4.67Z";

/**
 * Peak PV mark — "بيك" in both senses: a crown (the Bey's rank) whose points are the crests of an
 * electrical waveform; the centre crest is the highest (the peak value) and carries a star.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones, "badge" adds a tile (favicon, avatars).
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const fg = tone === "light" || tone === "badge" ? "#faf8f4" : "#14171c";
  const mark = (
    <g fill="none">
      <path
        d="M8 48 Q12 48 18 26 Q22 42 28 42 Q33 42 40 13 Q47 42 52 42 Q58 42 62 26 Q68 48 72 48"
        stroke={fg}
        strokeWidth="2.6"
        strokeLinejoin="miter"
      />
      <circle cx="18" cy="21" r="2.2" fill={GOLD} />
      <circle cx="62" cy="21" r="2.2" fill={GOLD} />
      <path d={STAR} fill={GOLD} />
      <path d="M8 53h64" stroke={GOLD} strokeWidth="2" />
      <path d="M8 58h64" stroke={fg} strokeWidth="1" />
    </g>
  );
  if (tone === "badge") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-10", className)}>
        <rect width="64" height="64" fill="#14171c" />
        <g transform="translate(6 6) scale(0.65)">{mark}</g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 64" aria-hidden="true" className={cn("h-11 w-auto lg:h-12", className)}>
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
        <span className="mt-1.5 flex items-center gap-2 text-[0.5625rem] font-semibold tracking-[0.45em] text-sun-400">
          SOLAR · PV
          <span lang="ar" className="font-arabic-display text-[0.9375rem] font-bold leading-none tracking-normal">
            بيك
          </span>
        </span>
      </span>
    </span>
  );
}
