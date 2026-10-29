import type { Metadata } from "next";
import { Clock, FileText, MapPin, PhoneCall } from "lucide-react";
import { projectTypes, serviceInterests } from "@/lib/inquiry-schema";
import { AgentCard } from "@/components/agent-card";
import { company, pageImages } from "@/content/site";
import { PageHero, Section } from "@/components/section";
import { InquiryForm, type InquiryPrefill } from "@/components/inquiry-form";

export const metadata: Metadata = {
  title: "Request a Solar PV Quote",
  description: "Request a quote or consultation for a residential or commercial solar PV system from Peak PV.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  { icon: FileText, title: "We review your details", body: "Our team looks at your property type, location and what you need." },
  { icon: PhoneCall, title: "We contact you", body: "We get in touch to discuss your goals and arrange a consultation." },
  { icon: Clock, title: "Site survey & proposal", body: "After the survey, you receive a design and scope to review." },
];

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** Values arriving from the home-page quote bar; only known options are accepted. */
function prefill(sp: Record<string, string | string[] | undefined>): InquiryPrefill {
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const type = one("type");
  const service = one("service");
  return {
    projectType: projectTypes.some((p) => p.value === type) ? type : "",
    serviceInterest: serviceInterests.some((s) => s.value === service) ? service : "",
    location: one("location").slice(0, 160),
  };
}

export default async function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const initial = prefill(await searchParams);
  return (
    <>
      <PageHero image={pageImages.contact}
        eyebrow="Contact"
        title="Request a quote"
        intro="Tell us about your property and what you're looking for. It takes about two minutes."
      />
      <Section className="pt-12 sm:pt-16 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="rounded-[1.25rem] border border-line bg-white p-6 shadow-card sm:p-10">
            <h2 className="text-2xl font-bold">Project details</h2>
            <p className="mt-1 text-muted">The more you tell us, the better we can prepare.</p>
            <div className="mt-8">
              <InquiryForm sourcePage="/contact" initial={initial} />
            </div>
          </div>

          <aside aria-labelledby="next-title" className="space-y-6">
            <div className="rounded-[1.25rem] bg-surface p-6 sm:p-8">
              <h2 id="next-title" className="text-xl font-bold">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-sun-700 shadow-sm ring-1 ring-line">
                      <s.icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
                      <p className="mt-0.5 text-[0.9375rem] text-muted">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <AgentCard />

            {company.serviceArea && (
              <div className="rounded-[1.5rem] bg-sky-50 p-6 ring-1 ring-sky-100 sm:p-8">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <MapPin aria-hidden className="size-5 text-sun-700" /> Service area
                </h2>
                <p className="mt-3 text-muted">{company.serviceArea}</p>
              </div>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
