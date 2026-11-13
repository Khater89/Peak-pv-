import { cn } from "@/lib/utils";

/** The hump (سنام, "sanam" — the high point): one smooth crest on a flat base. */
export const HUMP = "M4 52C14 52 16 30 29 28C42 26 47 52 60 52Z";

/**
 * Sanam PV mark: a single hump with the sun rising behind its crest. Deliberately simple so it
 * reads at favicon size. tone="dark" for light backgrounds, tone="light" for dark ones.
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-11 sm:size-12", className)}>
      <circle cx="30" cy="22" r="10" fill="#ffb81c" />
      <path d={HUMP} fill={tone === "light" ? "#ffffff" : "#1f3a1c"} />
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
