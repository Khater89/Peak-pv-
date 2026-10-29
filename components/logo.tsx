import { cn } from "@/lib/utils";

/**
 * Peak PV mark: a mountain peak whose face is a solar panel (grid lines), a softer second peak
 * behind it, and the sun rising at the summit.
 * tone="dark" draws for light backgrounds, tone="light" for dark ones, "badge" adds a soft tile (favicon, avatars).
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const peak = tone === "light" ? "#ffffff" : "#24405f";
  const grid = tone === "light" ? "#24405f" : "#ffffff";
  const mark = (
    <>
      <circle cx="44" cy="15" r="8" fill="#f5b942" />
      <path d="M33 52 46 28 61 52Z" fill="#9cc3e6" />
      <path d="M3 52 25 13 47 52Z" fill={peak} strokeLinejoin="round" />
      <g stroke={grid} strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round">
        <path d="M25 13 18 52M25 13 32 52" />
        <path d="M14.3 33h21.4M8.6 43h32.8" />
      </g>
      <rect x="3" y="51" width="58" height="3" rx="1.5" fill="#f5b942" />
    </>
  );
  if (tone === "badge") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-10", className)}>
        <rect width="64" height="64" rx="18" fill="#fff4dc" />
        <g transform="translate(6 6) scale(0.81)">{mark}</g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-10 lg:size-11", className)}>
      {mark}
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark tone={tone} />
      <span className={cn("font-brand text-[1.45rem] font-extrabold leading-none tracking-[-0.02em]", tone === "light" ? "text-white" : "text-ink")}>
        Peak
        <span className="ms-1 rounded-md bg-sun-400 px-1.5 py-0.5 text-[0.95rem] font-extrabold tracking-normal text-ink align-[0.18em]">
          PV
        </span>
      </span>
    </span>
  );
}
