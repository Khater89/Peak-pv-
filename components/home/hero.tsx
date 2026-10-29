import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { company, heroImage, primaryCta, whatsappHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroArt } from "@/components/art/hero-art";

const tags = ["Supply", "Design", "Installation", "On-grid", "Hybrid", "Off-grid"];

/** Full-bleed corporate hero: image (or illustration) under a navy overlay, large left-aligned headline. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 -z-20">
        {heroImage ? (
          <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <HeroArt bleed className="h-full w-full" />
        )}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-navy-950/60" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/50 to-transparent rtl:bg-gradient-to-l" />

      <div className="container-x pb-36 pt-20 sm:pt-24 lg:pb-44 lg:pt-32">
        <p className="eyebrow !text-white/80">{company.brandName} · Solar PV</p>
        <h1 id="hero-title" className="mt-5 max-w-5xl text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5.25rem] lg:leading-[0.98]">
          Solar Power Systems That Keep Your Property Running.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
          Supply, engineering design and installation of photovoltaic systems for homes, businesses, farms and
          off-grid sites across {company.serviceArea ?? "the region"}. One team, from first survey to switch-on.
        </p>
        <ul className="mt-7 flex flex-wrap gap-2" aria-label="What we cover">
          {tags.map((t) => (
            <li key={t} className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
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
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-[1.5px] border-white/30 px-8 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
          >
            <MessageCircle aria-hidden className="size-5 text-[#3ddc84]" /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
