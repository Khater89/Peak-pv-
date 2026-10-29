import Image from "next/image";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { company, heroImage, primaryCta, whatsappHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { HeroArt } from "@/components/art/hero-art";

const highlights = ["Supply, design & installation", "On-grid, hybrid & off-grid", `Serving ${company.serviceArea ?? "your area"}`];

/** Full-bleed photo hero with a soft light wash on the text side, so the page stays light. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20">
        {heroImage ? (
          <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className="object-cover object-[center_65%]" />
        ) : (
          <HeroArt bleed className="h-full w-full" />
        )}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#fdfcf9]/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#fdfcf9] lg:via-[#fdfcf9]/85 lg:to-[#fdfcf9]/0 rtl:lg:bg-gradient-to-l" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#fdfcf9] to-transparent" />

      <div className="container-x pb-40 pt-16 sm:pt-24 lg:pb-48 lg:pt-28">
        <div className="max-w-2xl">
          <p className="eyebrow">{company.brandName} · Solar PV</p>
          <h1 id="hero-title" className="mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.5rem]">
            Clean solar power, engineered for your property.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75 sm:text-xl">
            Supply, design and installation of photovoltaic systems for homes, businesses, farms and off-grid sites —
            one team from first survey to switch-on.
          </p>
          <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2 font-semibold text-ink">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-success text-white">
                  <Check aria-hidden className="size-3" strokeWidth={3.5} />
                </span>
                {h}
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
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white/90 px-8 font-semibold text-ink ring-1 ring-line backdrop-blur transition-shadow hover:shadow-card"
            >
              <MessageCircle aria-hidden className="size-5 text-[#1fa855]" /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
