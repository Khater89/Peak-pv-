import { cn } from "@/lib/utils";

/**
 * A camel standing to the right — long legs, S-shaped neck and one tall hump (سنام, "sanam",
 * the high point, which is what the name means).
 */
export const CAMEL =
  "M8 31C8 27 11 24.5 15 23.5C17 16 20 10.5 25.5 10.5C31 10.5 33 18 35 23.5C36 25.5 38 26.5 40 27" +
  "C43 27.6 45 31 47 30.6C49 30.2 49.2 22 51 17.6C51.8 15.6 53.6 14.6 56 14.8L59.4 15.6" +
  "C60.6 16 60.8 17.6 59.6 18.4L56.4 19.6C55 20.2 54.4 22 54.2 25C54 30 53.4 34 50 36.6" +
  "L50.4 56H48.4L47.4 39.4L45.6 39.6L45.6 56H43.6L43 39.4C36 40.4 26 40.4 20.6 39.4" +
  "L20.2 56H18.2L17.6 39L15.6 38.6L15 56H13L12.8 37.4C10 36.6 8 34.6 8 31Z";
/** Lightning bolt: the energy the hump stores. */
const ZAP = "M13 2 3 14h9l-1 8 10-12h-9l1-8z";

/**
 * Sanam PV mark: a camel with a lightning bolt in its hump and the sun overhead.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones; "badge" is kept for callers.
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const body = tone === "light" ? "#ffffff" : "#1f3a1c";
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-12 sm:size-14", className)}>
      <circle cx="38" cy="8" r="4.2" fill="#ffb81c" />
      <path d={CAMEL} fill={body} />
      <path d="M8.6 30.5C6.5 32 6 35 6.4 38.5" fill="none" stroke={body} strokeWidth="1.6" strokeLinecap="round" />
      <path transform="translate(25.2 21) scale(0.62) translate(-12 -12)" d={ZAP} fill="#ffb81c" />
      <path d="M4 58.5h56" stroke="#ffb81c" strokeWidth="1.8" />
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
