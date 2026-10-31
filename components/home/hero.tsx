import Image from "next/image";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { images, whatsappHref } from "@/content/shared";
import { ButtonLink } from "@/components/ui/button";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { cn } from "@/lib/utils";

/** Full-bleed photo hero with a soft light wash on the text side, so the page stays light. */
export async function Hero() {
  const c = await getContent();
  const lang = await getLang();
  const t = c.hero;
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <Image src={images.hero} alt={t.imageAlt} fill priority sizes="100vw" className="object-cover object-[center_65%]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#ffffff]/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#ffffff] lg:via-[#ffffff]/85 lg:to-[#ffffff]/0 rtl:lg:bg-gradient-to-l" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#ffffff] to-transparent" />

      <div className="container-x pb-40 pt-16 sm:pt-24 lg:pb-48 lg:pt-28">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="eyebrow">{t.eyebrow}</p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
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
            {t.titleBefore} <em className="not-italic text-leaf-600">{t.titleEm}</em> {t.titleAfter}
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/70">{t.lead}</p>
          <ul className="mt-8 flex flex-col gap-2.5 border-y border-ink/10 py-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {t.highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-ink/80">
                <Check aria-hidden className="size-4 text-leaf-600" strokeWidth={2} />
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
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[2px] border border-ink/25 bg-[#ffffff]/70 px-9 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur transition-colors hover:border-ink hover:bg-ink hover:text-[#ffffff]"
            >
              <MessageCircle aria-hidden className="size-4" strokeWidth={1.75} /> {t.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
