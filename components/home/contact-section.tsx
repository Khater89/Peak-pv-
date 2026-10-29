import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, email, phones, whatsappHref } from "@/content/site";
import { InquiryForm } from "@/components/inquiry-form";

/** Split contact block: details on the left, the real quote form on the right. */
export function ContactSection() {
  return (
    <section aria-labelledby="contact-title" className="on-dark relative isolate overflow-hidden bg-navy-950 py-20 text-white lg:py-24">
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow">Request a quote</p>
          <h2 id="contact-title" className="mt-4 text-3xl sm:text-5xl">Tell Us About Your Project</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            Share your property type, location and what you need. Our engineers review every request and get back to
            you to arrange a consultation.
          </p>
          <ul className="mt-8 space-y-4">
            {phones.map((p) => (
              <li key={p.intl}>
                <a href={`tel:${p.intl}`} className="inline-flex items-center gap-3 text-lg font-semibold hover:text-sun-300">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10"><Phone aria-hidden className="size-5 text-sun-400" /></span>
                  <span dir="ltr">{p.display}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-semibold hover:text-sun-300">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10"><MessageCircle aria-hidden className="size-5 text-[#3ddc84]" /></span>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-3 break-all font-semibold hover:text-sun-300">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10"><Mail aria-hidden className="size-5 text-sun-400" /></span>
                {email}
              </a>
            </li>
            {company.serviceArea && (
              <li className="inline-flex items-center gap-3 text-white/70">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/10"><MapPin aria-hidden className="size-5 text-sun-400" /></span>
                Serving {company.serviceArea}
              </li>
            )}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 text-ink shadow-lift sm:p-9">
          <InquiryForm sourcePage="/" />
        </div>
      </div>
    </section>
  );
}
