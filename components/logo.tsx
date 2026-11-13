import Image from "next/image";
import { cn } from "@/lib/utils";

/** The Sanam PV mark supplied by the company: a camel whose hump is a solar array, under the sun. */
const MARK = { src: "/images/sanam-pv-mark.png", width: 640, height: 335 };

/**
 * tone="dark" sits on light backgrounds; tone="light" puts the mark on a white tile so its greens
 * stay readable on dark backgrounds. "badge" is kept for callers.
 */
export function LogoMark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" | "badge" }) {
  const img = (
    <Image
      src={MARK.src}
      width={MARK.width}
      height={MARK.height}
      alt=""
      aria-hidden
      className={cn("h-10 w-auto object-contain sm:h-12", tone !== "light" && className)}
    />
  );
  if (tone !== "light") return img;
  return <span className={cn("inline-flex rounded-[3px] bg-white px-2 py-1.5", className)}>{img}</span>;
}

export function Logo({ tone = "dark", tagline = "Solar Energy" }: { tone?: "dark" | "light"; tagline?: string }) {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-3">
      <LogoMark tone={tone} />
      {/* The wordmark is always Latin, so it keeps its own typography inside Arabic pages. */}
      <span lang="en" dir="ltr" className="flex flex-col items-start leading-none">
        <span className={cn("font-serif text-[1.65rem] font-bold uppercase tracking-[0.06em] sm:text-[1.9rem]", tone === "light" ? "text-white" : "text-[#0f4d1a]")}>
          Sanam <span className={tone === "light" ? "text-[#9ccc5a]" : "text-[#5a7a26]"}>PV</span>
        </span>
        <span className={cn("mt-1 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.28em]", tone === "light" ? "text-white/70" : "text-muted")}>
          {tagline}
        </span>
      </span>
    </span>
  );
}
