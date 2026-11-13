import { useId } from "react";
import { cn } from "@/lib/utils";

/** Lightning bolt (electric charge); three of them radiate from the sun like rays. */
const ZAP = "M13 2 3 14h9l-1 8 10-12h-9l1-8z";

/**
 * A camel standing to the right: long legs, curved neck and one tall hump (سنام, "sanam" —
 * the high point, which is what the name means). The hump is drawn as a solar array.
 */
export const CAMEL =
  "M6 31C6 28 8 26.5 11 26.5C13 26.5 15 15 24 12.5C30 11 33 17 35 22C36.5 25.5 39 26.5 42 27" +
  "C46 27.5 48 30 50.5 27.5C53 25 53.5 19 55 16.5C56 15 58 14.6 59.5 15.4L61.2 16.6" +
  "C61.6 17.4 61 18.2 60 18.2L57.6 18.4C56.6 21 56 26 54 30C52.6 32.8 50 35 47 35.6" +
  "L47.4 54H45.6L44.8 37L42.4 37L42.4 54H40.6L40.2 36.6C34 37.6 22 37.6 16.6 36.4" +
  "L16.4 54H14.6L14 36.4L11.8 36L11 54H9.2L9.2 35C7 34.6 6 33.4 6 31Z";
/** Panel gaps across the hump (rows, then columns), and the line where the array meets the back. */
const HUMP_ROWS = [17.6, 22.2];
const HUMP_COLS = [16.5, 21.5, 26.5, 31.5];

/**
 * Sanam PV mark: a camel whose hump is a solar array, with sun rays rising from the crest as
 * lightning bolts (electric charge) and the sun's arc behind it.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones; "badge" is kept for callers.
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const clip = `camel-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const body = tone === "light" ? "#ffffff" : "#2f3d24";
  const gap = tone === "light" ? "#2f3d24" : "#ffffff";
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-12 sm:size-14", className)}>
      <defs>
        <clipPath id={clip}>
          <path d={CAMEL} />
        </clipPath>
      </defs>
      <path d="M19.5 13.4a5.2 5.2 0 0 1 10.4 0" fill="#f0b429" />
      <g fill="#f0b429">
        <path transform="translate(24.7 4.4) scale(0.4) translate(-12 -12)" d={ZAP} />
        <path transform="translate(33.6 7.4) rotate(30) scale(0.33) translate(-12 -12)" d={ZAP} />
        <path transform="translate(15.8 7.4) rotate(-30) scale(0.33) translate(-12 -12)" d={ZAP} />
      </g>
      <path d={CAMEL} fill={body} />
      <g clipPath={`url(#${clip})`} stroke={gap}>
        <g strokeWidth="1.1">
          {HUMP_ROWS.map((y) => <line key={`r${y}`} x1="8" x2="42" y1={y} y2={y} />)}
          {HUMP_COLS.map((x) => <line key={`c${x}`} y1="8" y2="27" x1={x} x2={x} />)}
        </g>
        <line x1="8" x2="42" y1="26.6" y2="26.6" strokeWidth="1.2" />
      </g>
      <path d="M3 54.5h58" stroke="#f0b429" strokeWidth="1.6" />
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
          Sanam <span className="text-sun-500">PV</span>
        </span>
        <span className={cn("mt-1 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.28em]", tone === "light" ? "text-white/70" : "text-muted")}>
          {tagline}
        </span>
      </span>
    </span>
  );
}
