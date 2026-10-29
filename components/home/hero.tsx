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
      <div aria-hidden className="absolute inset-0 -z-10 bg-[#ffffff]/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#ffffff] lg:via-[#ffffff]/85 lg:to-[#ffffff]/0 rtl:lg:bg-gradient-to-l" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#ffffff] to-transparent" />

      <div className="container-x pb-40 pt-16 sm:pt-24 lg:pb-48 lg:pt-28">
        <div className="max-w-2xl">
          <p className="eyebrow">{company.brandName} · Solar PV</p>
          <h1 id="hero-title" className="mt-6 text-[3rem] leading-[1] sm:text-7xl lg:text-[6rem]">
            Solar power, <em className="font-medium italic text-leaf-600">engineered</em> for your property.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/70">
            Supply, design and installation of photovoltaic systems for homes, businesses, farms and off-grid sites —
            one team from first survey to switch-on.
          </p>
          <ul className="mt-8 flex flex-col gap-2.5 border-y border-ink/10 py-4 sm:flex-row sm:flex-wrap sm:gap-x-8">
            {highlights.map((h) => (
              <li key={h} className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-ink/80">
                <Check aria-hidden className="size-4 text-leaf-600" strokeWidth={2} />
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
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-[2px] border border-ink/25 bg-[#ffffff]/70 px-9 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur transition-colors hover:border-ink hover:bg-ink hover:text-[#ffffff]"
            >
              <MessageCircle aria-hidden className="size-4" strokeWidth={1.75} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
