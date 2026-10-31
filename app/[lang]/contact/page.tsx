import type { Metadata } from "next";
import { Clock, FileText, MapPin, PhoneCall } from "lucide-react";
import { projectTypeValues, serviceValues } from "@/lib/inquiry-schema";
import { formText } from "@/lib/form-text";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { AgentCard } from "@/components/agent-card";
import { images } from "@/content/shared";
import { PageHero, Section } from "@/components/section";
import { InquiryForm, type InquiryPrefill } from "@/components/inquiry-form";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const lang = await getLang();
  return {
    title: c.meta.contact.title,
    description: c.meta.contact.description,
    alternates: { canonical: lp(lang, "/contact"), languages: { en: "/en/contact", ar: "/ar/contact" } },
  };
}

const stepIcons = [FileText, PhoneCall, Clock];

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** Values arriving from the home-page quote bar; only known options are accepted. */
function prefill(sp: Record<string, string | string[] | undefined>): InquiryPrefill {
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const type = one("type");
  const service = one("service");
  return {
    projectType: (projectTypeValues as readonly string[]).includes(type) ? type : "",
    serviceInterest: serviceValues.includes(service) ? service : "",
    location: one("location").slice(0, 160),
  };
}

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const initial = prefill(await searchParams);
  const c = await getContent();
  const lang = await getLang();
  const t = c.contactPage;
  return (
    <>
      <PageHero image={{ src: images.pageContact, alt: t.imageAlt }} eyebrow={t.eyebrow} title={t.title} intro={t.intro} />
      <Section className="pt-12 sm:pt-16 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="rounded-[2px] border border-line bg-white p-6 shadow-card sm:p-10">
            <h2 className="text-2xl font-bold">{t.detailsTitle}</h2>
            <p className="mt-1 text-muted">{t.detailsSub}</p>
            <div className="mt-8">
              <InquiryForm sourcePage={lp(lang, "/contact")} initial={initial} t={formText(c)} />
            </div>
          </div>

          <aside aria-labelledby="next-title" className="space-y-6">
            <div className="rounded-[2px] bg-surface p-6 sm:p-8">
              <h2 id="next-title" className="text-xl font-bold">{t.nextTitle}</h2>
              <ol className="mt-6 space-y-6">
                {t.nextSteps.map((s, i) => {
                  const Icon = stepIcons[i % stepIcons.length];
                  return (
                  <li key={s.title} className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-sun-700 shadow-sm ring-1 ring-line">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold"><span className="sr-only">{c.processSection.stepSr(i + 1)}</span>{s.title}</h3>
                      <p className="mt-0.5 text-[0.9375rem] text-muted">{s.body}</p>
                    </div>
                  </li>
                  );
                })}
              </ol>
            </div>

            <AgentCard />

            {c.company.serviceArea && (
              <div className="rounded-[2px] bg-sky-50 p-6 ring-1 ring-sky-100 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <MapPin aria-hidden className="size-5 text-sun-700" /> {t.serviceArea}
                </h2>
                <p className="mt-3 text-muted">{c.company.serviceArea}</p>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
