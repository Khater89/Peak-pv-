import { cn } from "@/lib/utils";

/** Sunburst rays (alternating long/short) around the medallion. */
const RAYS = "M32.00 7.80L32.00 1.50M36.20 8.17L36.76 5.02M40.28 9.26L42.43 3.34M44.10 11.04L45.70 8.27M47.56 13.46L51.61 8.64M50.54 16.44L52.99 14.39M52.96 19.90L58.41 16.75M54.74 23.72L57.75 22.63M55.83 27.80L62.04 26.70M56.20 32.00L59.40 32.00M55.83 36.20L62.04 37.30M54.74 40.28L57.75 41.37M52.96 44.10L58.41 47.25M50.54 47.56L52.99 49.61M47.56 50.54L51.61 55.36M44.10 52.96L45.70 55.73M40.28 54.74L42.43 60.66M36.20 55.83L36.76 58.98M32.00 56.20L32.00 62.50M27.80 55.83L27.24 58.98M23.72 54.74L21.57 60.66M19.90 52.96L18.30 55.73M16.44 50.54L12.39 55.36M13.46 47.56L11.01 49.61M11.04 44.10L5.59 47.25M9.26 40.28L6.25 41.37M8.17 36.20L1.96 37.30M7.80 32.00L4.60 32.00M8.17 27.80L1.96 26.70M9.26 23.72L6.25 22.63M11.04 19.90L5.59 16.75M13.46 16.44L11.01 14.39M16.44 13.46L12.39 8.64M19.90 11.04L18.30 8.27M23.72 9.26L21.57 3.34M27.80 8.17L27.24 5.02";
/** The general's star above the peak. */
const STAR = "M32.00 13.80L32.74 15.78L34.85 15.87L33.20 17.19L33.76 19.23L32.00 18.06L30.24 19.23L30.80 17.19L29.15 15.87L31.26 15.78Z";

/**
 * Peak PV emblem — "بيك" in both senses:
 *  • a sunburst medallion, the classic form of rank insignia (the Bey) and of the sun (solar energy);
 *  • inside it a gold peak — the summit / the peak value — crowned by a star.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones; "badge" is the same emblem (kept for callers).
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const rays = tone === "light" ? "#f7cf6a" : "#dc9c0e";
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-10 sm:size-12 lg:size-14", className)}>
      <path d={RAYS} stroke={rays} strokeWidth="1.15" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="32" r="22.2" fill="none" stroke={rays} strokeWidth="1.2" />
      <circle cx="32" cy="32" r="20" fill="#173b27" />
      <circle cx="32" cy="32" r="18.4" fill="none" stroke="#f0b429" strokeOpacity="0.45" strokeWidth="0.6" />
      <path d={STAR} fill="#f0b429" />
      <path d="M17 41 32 21.5 47 41" fill="none" stroke="#f0b429" strokeWidth="2" strokeLinejoin="miter" />
      <path d="M25 41 32 31.8 39 41" fill="none" stroke="#ffffff" strokeWidth="1.2" />
      <path d="M14.8 41.2h34.4" stroke="#f0b429" strokeWidth="0.9" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-3">
      <LogoMark tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-brand text-[1.5rem] font-semibold tracking-[0.16em] sm:text-[1.9rem] sm:tracking-[0.22em]", tone === "light" ? "text-white" : "text-navy-900")}>
          PEAK
        </span>
        <span className={cn("mt-1.5 flex items-center gap-1.5 border-t pt-1.5 text-[0.5rem] font-semibold tracking-[0.3em] sm:gap-2 sm:text-[0.5625rem] sm:tracking-[0.42em]", tone === "light" ? "border-white/25 text-sun-300" : "border-navy-900/20 text-sun-700")}>
          SOLAR ENERGY
          <span lang="ar" className="font-arabic-display text-[0.9375rem] font-bold leading-none tracking-normal">
            بيك
          </span>
        </span>
      </span>
    </span>
  );
}
