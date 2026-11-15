import Image from "next/image";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { images, whatsappHref } from "@/content/shared";
import { ButtonLink } from "@/components/ui/button";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { cn } from "@/lib/utils";

/**
 * Full-bleed hero on the Sanam artwork: a rider on a camel facing the peak at sunrise.
 * The text sits on a deep-green wash that fades into the picture; in Arabic the picture is
 * mirrored so the rider still faces the text.
 */
export async function Hero() {
  const c = await getContent();
  const lang = await getLang();
  const t = c.hero;
  return (
    <section aria-labelledby="hero-title" className="on-dark sun-glow hero-glow relative isolate overflow-hidden bg-navy-950 text-white">
      {/* Mobile: the picture fills the hero under a dark wash. Desktop: it fills the image side at its
          own proportions (so the peak and the rider both show) and fades into the text side. */}
      <div className="absolute inset-y-0 end-0 -z-20 w-full lg:w-[64%]">
        <Image
          src={images.hero}
          alt={t.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 64vw, 100vw"
          className="object-cover object-[72%_center] saturate-[1.1] rtl:-scale-x-100 lg:object-center"
        />
        <div aria-hidden className="absolute inset-y-0 start-0 hidden w-[38%] bg-gradient-to-r from-navy-950 to-transparent rtl:bg-gradient-to-l lg:block" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-950/70 lg:hidden" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-navy-950/70 to-transparent" />

      <div className="container-x pb-40 pt-16 sm:pt-24 lg:pb-48 lg:pt-28">
        <div className="hero-in max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="eyebrow">{t.eyebrow}</p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/60">
              {t.coords} · <span dir="ltr">31.95°N 35.91°E</span>
            </p>
          </div>
          <h1
            id="hero-title"
            className={cn(
              "mt-6",
              lang === "ar" ? "text-[2.75rem] leading-[1.2] sm:text-6xl lg:text-[4.75rem]" : "text-[3.25rem] leading-[0.95] sm:text-7xl lg:text-[6.5rem]",
            )}
          >
            {t.titleBefore} <em className="not-italic text-sun-400">{t.titleEm}</em> {t.titleAfter}
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/80">{t.lead}</p>
          <ul className="mt-8 flex flex-col gap-2.5 border-y border-white/15 py-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {t.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-white/85">
                <Check aria-hidden className="size-4 text-sun-400" strokeWidth={2} />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 min-[460px]:flex-row">
            <ButtonLink href={lp(lang, "/contact")} size="lg">
              {t.requestQuote} <ArrowRight aria-hidden className="rtl:-scale-x-100" />
            </ButtonLink>
            <a
              href={whatsappHref(c.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[2px] border border-white/40 bg-white/10 px-9 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <MessageCircle aria-hidden className="size-4" strokeWidth={1.75} /> {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
