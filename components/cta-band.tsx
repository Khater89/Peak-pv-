import { ArrowRight } from "lucide-react";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { ButtonLink } from "@/components/ui/button";

export async function CtaBand({ title, body }: { title?: string; body?: string }) {
  const c = await getContent();
  const lang = await getLang();
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <div className="container-x">
        <div className="on-dark relative isolate overflow-hidden bg-navy-900 px-6 py-14 text-[#ffffff] sm:px-14 sm:py-20">
                    <div aria-hidden className="absolute -end-24 -top-24 -z-10 size-80 rounded-full bg-sun-400/15 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 start-1/4 -z-10 size-72 rounded-full bg-sun-400/5 blur-3xl" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-3xl font-bold sm:text-4xl">{title ?? c.cta.title}</h2>
              <p className="mt-4 text-lg text-[#c9dccd]">{body ?? c.cta.body}</p>
            </div>
            <ButtonLink href={lp(lang, "/contact")} size="lg" variant="gold" className="self-start lg:self-center">
              {c.cta.button}
              <ArrowRight aria-hidden className="rtl:-scale-x-100" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
