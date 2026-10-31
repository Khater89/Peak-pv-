import { cn } from "@/lib/utils";

/** Lightning bolt (electric charge); three of them radiate from the sun like rays. */
const ZAP = "M13 2 3 14h9l-1 8 10-12h-9l1-8z";
/** PV cell lines inside each panel. */
const CELLS = "M28.5 23V31M32.0 23V31M35.5 23V31M25 27.0H39M20.5 33V41M24.0 33V41M27.5 33V41M17 37.0H31M36.5 33V41M40.0 33V41M43.5 33V41M33 37.0H47M12.5 43V51M16.0 43V51M19.5 43V51M9 47.0H23M28.5 43V51M32.0 43V51M35.5 43V51M25 47.0H39M44.5 43V51M48.0 43V51M51.5 43V51M41 47.0H55";

/**
 * Peak PV mark: solar panels stacked in steps to form a summit (no triangles), with sun rays rising
 * from the top panel as lightning bolts (electric charges), with a sun arc behind it.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones; "badge" is kept for callers.
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const panel = tone === "light" ? "#ffffff" : "#2f3d24";
  const cell = tone === "light" ? "#2f3d24" : "#ffffff";
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-12 sm:size-14", className)}>
      <path d="M26.5 23a5.5 5.5 0 0 1 11 0" fill="#f0b429" />
      <g fill="#f0b429">
        <path transform="translate(32.00 10.00) rotate(0) scale(0.52) translate(-12 -12)" d={ZAP} />
        <path transform="translate(43.92 16.66) rotate(24) scale(0.44) translate(-12 -12)" d={ZAP} />
        <path transform="translate(20.08 16.66) rotate(-24) scale(0.44) translate(-12 -12)" d={ZAP} />
      </g>
      <g fill={panel}><rect x="25" y="23" width="14" height="8" rx="0.6" /><rect x="17" y="33" width="14" height="8" rx="0.6" /><rect x="33" y="33" width="14" height="8" rx="0.6" /><rect x="9" y="43" width="14" height="8" rx="0.6" /><rect x="25" y="43" width="14" height="8" rx="0.6" /><rect x="41" y="43" width="14" height="8" rx="0.6" /></g>
      <path d={CELLS} stroke={cell} strokeOpacity="0.8" strokeWidth="0.7" fill="none" />
      <path d="M6 55h52" stroke="#f0b429" strokeWidth="1.6" />
    </svg>
  );
}

export function Logo({ tone = "dark", tagline = "Solar Energy" }: { tone?: "dark" | "light"; tagline?: string }) {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5">
      <LogoMark tone={tone} />
      {/* The wordmark is always Latin, so it keeps its own typography inside Arabic pages. */}
      <span lang="en" dir="ltr" className="flex flex-col items-start leading-none">
        <span className={cn("font-serif text-[1.65rem] font-bold uppercase tracking-[0.06em] sm:text-[1.9rem]", tone === "light" ? "text-white" : "text-navy-900")}>
          Peak <span className="text-sun-500">PV</span>
        </span>
        <span className={cn("mt-1 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.28em]", tone === "light" ? "text-white/70" : "text-muted")}>
          {tagline}
        </span>
      </span>
    </span>
  );
}
