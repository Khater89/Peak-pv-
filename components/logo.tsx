import { cn } from "@/lib/utils";

const GOLD = "#b8955a";
/** Five-point star (the general's star) centred on the peak, at (48, 8.5). */
const STAR = "M48.00 2.30L49.53 6.39L53.90 6.58L50.48 9.30L51.64 13.52L48.00 11.10L44.36 13.52L45.52 9.30L42.10 6.58L46.47 6.39Z";

/**
 * Peak PV mark — "بيك" in both senses:
 *  • the Bey / commander: the wave's crest is a rank chevron, crowned by a general's star;
 *  • the electrical peak: a waveform whose crest touches a dotted line marking the maximum value.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones, "badge" adds a tile (favicon, avatars).
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const fg = tone === "light" || tone === "badge" ? "#faf8f4" : "#14171c";
  const mark = (
    <g fill="none">
      <path d="M8 17h80" stroke={GOLD} strokeWidth="0.9" strokeDasharray="2 3" />
      <path d={STAR} fill={GOLD} />
      <path d="M4 42 Q13 56 22 51 L48 17 L74 51 Q83 56 92 42" stroke={fg} strokeWidth="2.6" strokeLinejoin="miter" />
      <path d="M31 51 L48 29 L65 51" stroke={GOLD} strokeWidth="1.8" />
      <path d="M4 59.5h88" stroke={fg} strokeWidth="1" />
    </g>
  );
  if (tone === "badge") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-10", className)}>
        <rect width="64" height="64" fill="#14171c" />
        <g transform="translate(4 8) scale(0.583)">{mark}</g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 96 64" aria-hidden="true" className={cn("h-10 w-auto lg:h-11", className)}>
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
