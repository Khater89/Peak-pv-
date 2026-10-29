import { ArrowRight } from "lucide-react";
import { primaryCta } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";

export function CtaBand({
  title = "Ready to see what solar can do for your property?",
  body = "Tell us about your site and what you need. Our team will review it and get back to you to arrange a consultation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <div className="container-x">
        <div className="on-dark relative isolate overflow-hidden rounded-[1.75rem] bg-navy-900 px-6 py-12 text-white sm:px-12 sm:py-16">
          <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />
          <div aria-hidden className="absolute -end-24 -top-24 -z-10 size-80 rounded-full bg-sun-400/40 blur-3xl" />
          <div aria-hidden className="absolute -bottom-32 start-1/4 -z-10 size-72 rounded-full bg-navy-700 blur-3xl" />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-3xl font-bold sm:text-4xl">{title}</h2>
              <p className="mt-4 text-lg text-navy-200">{body}</p>
            </div>
            <ButtonLink href={primaryCta.href} size="lg" className="self-start lg:self-center">
              {primaryCta.label}
              <ArrowRight aria-hidden className="rtl:-scale-x-100" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
