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
      {/* The picture fills the hero: panels bottom-left, the peak in the middle, the rider on the right.
          A deep-green wash sits behind the text and thins out towards the bottom so the panels show. */}
      <div className="absolute inset-x-0 top-0 bottom-28 -z-20 hidden lg:block">
        <Image
          src={images.hero}
          alt={t.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_bottom] saturate-[1.1] rtl:-scale-x-100"
        />
        {/* the picture ends above the feature cards; fade its bottom edge into the hero's green */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-navy-950 from-15% via-navy-950/70 via-38% to-transparent to-58% [mask-image:linear-gradient(to_bottom,black_40%,transparent_80%)] rtl:bg-gradient-to-l lg:block"
      />

      <div className="container-x pb-40 pt-16 sm:pt-24 lg:pb-48 lg:pt-28">
        <div className="hero-in max-w-2xl [text-shadow:0_1px_12px_rgb(10_22_8/0.85)]">
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
        <div className="relative -mx-4 mt-10 aspect-[996/761] overflow-hidden sm:-mx-6 lg:hidden">
          {/* right of the banner's diagonal edge: panels, peak, caravan and rider, nothing painted */}
          <Image src={images.hero} alt="" aria-hidden fill sizes="100vw" className="object-cover object-right saturate-[1.1] rtl:-scale-x-100" />
        </div>
      </div>
    </section>
  );
}
