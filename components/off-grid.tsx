import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BatteryCharging, Check, Fuel, SunMedium, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/section";
import { images } from "@/content/shared";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";

const componentIcons = [SunMedium, Zap, BatteryCharging, Fuel];

/**
 * Off-grid systems: what the system is made of, how it is sized, and where it fits.
 * variant="full" is the home-page section (photo + heading); "details" sits under the service on /services.
 */
export async function OffGrid({ variant = "full" }: { variant?: "full" | "details" }) {
  const c = await getContent();
  const lang = await getLang();
  const t = c.offGrid;
  const madama = c.projects.find((p) => p.slug === "madama");

  const details = (
    <>
      <h3 className="font-serif text-2xl font-semibold uppercase">{t.componentsTitle}</h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {t.components.map((item, i) => {
          const Icon = componentIcons[i % componentIcons.length];
          return (
            <li key={item.title} data-reveal style={{ "--d": i } as React.CSSProperties} className="corner-brackets sun-glow card-sun flex gap-4 border border-line bg-white p-5 hover:border-sun-400">
              <span className="inline-flex size-11 shrink-0 items-center justify-center bg-leaf-100 text-leaf-700">
                <Icon aria-hidden className="size-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="font-serif text-2xl font-semibold uppercase">{t.sizingTitle}</h3>
          <ol className="mt-5 space-y-3">
            {t.sizing.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span aria-hidden className="w-7 shrink-0 pt-0.5 font-mono text-sm text-sun-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink/85">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="font-serif text-2xl font-semibold uppercase">{t.useCasesTitle}</h3>
          <ul className="mt-5 space-y-2.5">
            {t.useCases.map((u) => (
              <li key={u} className="flex items-center gap-2.5">
                <Check aria-hidden className="size-4 shrink-0 text-leaf-600" strokeWidth={2.5} />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <ButtonLink href={lp(lang, "/contact?service=off-grid")} variant="dark" className="h-auto min-h-12 whitespace-normal py-3 text-center">
          {t.cta} <ArrowRight aria-hidden className="rtl:-scale-x-100" />
        </ButtonLink>
        {madama && (
          <Link
            href={lp(lang, `/projects/${madama.slug}`)}
            className="inline-flex items-center gap-2 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink hover:text-leaf-600"
          >
            {t.projectLink} <ArrowRight aria-hidden className="size-4 rtl:-scale-x-100" />
          </Link>
        )}
      </div>
    </>
  );

  if (variant === "details") {
    return <div className="border border-line bg-surface/60 p-7 sm:p-10">{details}</div>;
  }

  return (
    <section aria-labelledby="offgrid-title" className="py-20 sm:py-24 lg:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="relative min-h-[22rem] overflow-hidden lg:min-h-full">
          <Image src={images.offGrid} alt={t.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
          <p className="absolute bottom-0 start-0 m-5 bg-navy-900/90 px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-sun-300 backdrop-blur">
            {t.eyebrow}
          </p>
        </div>
        <div>
          <SectionHeading id="offgrid-title" eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
          <div className="mt-10">{details}</div>
        </div>
      </div>
    </section>
  );
}
