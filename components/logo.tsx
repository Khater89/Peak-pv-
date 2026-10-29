import { cn } from "@/lib/utils";

/**
 * OE monogram: the "O" is the sun (amber ring), the "E" is three tilted rows of PV panels.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones, "badge" adds a navy tile (icons, avatars).
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const fg = tone === "dark" ? "#0b1b33" : "#ffffff";
  const mark = (
    <>
      <circle cx="22" cy="32" r="13" fill="none" stroke="#f5b942" strokeWidth="10" />
      <rect x="40" y="12" width="7" height="40" rx="1.5" fill={fg} />
      <path d="M44 12h28l-4 10H44z" fill={fg} />
      <path d="M44 27h24l-4 10H44z" fill={fg} />
      <path d="M44 42h28l-4 10H44z" fill={fg} />
    </>
  );
  if (tone === "badge") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-10", className)}>
        <rect width="64" height="64" rx="14" fill="#0b1b33" />
        <g transform="translate(7 12) scale(0.68)">{mark}</g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 74 64" aria-hidden="true" className={cn("h-10 w-auto lg:h-11", className)}>
      {mark}
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark tone={tone} />
      <span className="font-brand leading-none">
        <span className={cn("block text-[1.35rem] font-extrabold tracking-[0.04em]", tone === "light" ? "text-white" : "text-ink")}>
          OPEN
        </span>
        <span className={cn("mt-1 block text-[0.625rem] font-semibold tracking-[0.42em]", tone === "light" ? "text-sun-400" : "text-sun-700")}>
          ENERGY
        </span>
      </span>
    </span>
  );
}
