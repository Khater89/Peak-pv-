import Image from "next/image";
import { cn } from "@/lib/utils";

export function Section({
  id,
  tone = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: "white" | "surface" | "dark";
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-20 sm:py-24 lg:py-32",
        tone === "surface" && "bg-surface/60",
        tone === "dark" && "bg-sky-50",
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "start",
  as: Tag = "h2",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        id={id}
        className={cn(
          "mt-4",
          Tag === "h1" ? "text-5xl sm:text-7xl" : "text-4xl sm:text-[3.5rem]",
        )}
      >
        {title}
      </Tag>
      {intro && <p className="mt-4 text-lg text-muted [.on-dark_&]:text-white/70">{intro}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 to-[#faf8f4]">
      {image ? (
        <>
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[#faf8f4]/80 md:bg-transparent md:bg-gradient-to-r md:from-[#faf8f4] md:via-[#faf8f4]/85 md:to-[#faf8f4]/10 rtl:md:bg-gradient-to-l" />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute -top-40 end-[-10rem] -z-10 size-[30rem] rounded-full bg-sun-300/30 blur-3xl" />
          <div aria-hidden className="absolute -bottom-48 start-[-10rem] -z-10 size-[26rem] rounded-full bg-sky-300/25 blur-3xl" />
        </>
      )}
      <div className="container-x py-16 sm:py-20 lg:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-5xl sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">{intro}</p>
        {children}
      </div>
    </section>
  );
}
