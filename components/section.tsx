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
        "py-16 sm:py-20 lg:py-24",
        tone === "surface" && "bg-surface",
        tone === "dark" && "on-dark bg-navy-950 text-white",
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
          Tag === "h1" ? "text-4xl sm:text-6xl" : "text-3xl sm:text-[2.75rem]",
        )}
      >
        {title}
      </Tag>
      {intro && <p className="mt-4 text-lg text-muted [.on-dark_&]:text-white/70">{intro}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: React.ReactNode }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]" />
      <div aria-hidden className="absolute -top-40 end-[-10rem] -z-10 size-[30rem] rounded-full bg-sun-400/20 blur-3xl" />
      <div className="container-x py-16 sm:py-20 lg:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{intro}</p>
        {children}
      </div>
    </section>
  );
}
