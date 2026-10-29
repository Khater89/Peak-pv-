import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { company, heroImage, primaryCta, whatsappHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroArt } from "@/components/art/hero-art";

const tags = ["Supply", "Design", "Installation", "On-grid", "Hybrid", "Off-grid"];

/** Light, soft hero: text on a warm-to-sky gradient, rounded daylight illustration (or photo) beside it. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-[#fdfaf3] to-[#fdfcf9]">
      <div aria-hidden className="absolute -top-40 end-[-8rem] -z-10 size-[36rem] rounded-full bg-sun-300/30 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 start-[-10rem] -z-10 size-[32rem] rounded-full bg-sky-300/25 blur-3xl" />

      <div className="container-x grid items-center gap-12 pb-36 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-40 lg:pt-24">
        <div>
          <p className="eyebrow">{company.brandName} · Solar PV</p>
          <h1 id="hero-title" className="mt-5 text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-[4.25rem]">
            Clean solar power, <span className="relative whitespace-nowrap text-navy-800">
              <span aria-hidden className="absolute inset-x-0 bottom-1 -z-10 h-3 rounded-full bg-sun-300/70 sm:h-4" />
              engineered
            </span>{" "}
            for your property.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Supply, design and installation of photovoltaic systems for homes, businesses, farms and off-grid sites
            across {company.serviceArea ?? "the region"} — one friendly team from first survey to switch-on.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="What we cover">
            {tags.map((t) => (
              <li key={t} className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink shadow-[0_1px_2px_rgb(31_43_61/0.06)] ring-1 ring-line">
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 min-[460px]:flex-row">
            <ButtonLink href={primaryCta.href} size="lg">
              Request a Quote <ArrowRight aria-hidden className="rtl:-scale-x-100" />
            </ButtonLink>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-semibold text-ink ring-1 ring-line transition-shadow hover:shadow-card"
            >
              <MessageCircle aria-hidden className="size-5 text-[#1fa855]" /> WhatsApp us
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[620/520] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white">
            {heroImage ? (
              <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            ) : (
              <HeroArt bleed className="h-full w-full" />
            )}
          </div>
          <div className="absolute -bottom-6 start-6 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pe-5 shadow-lift ring-1 ring-line backdrop-blur">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-sun-100 text-sm font-extrabold text-sun-700">PV</span>
            <span className="text-sm leading-tight">
              <span className="block font-bold">Supply · Design · Install</span>
              <span className="text-muted">Homes, business & off-grid</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
