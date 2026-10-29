import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, email, phones, whatsappHref } from "@/content/site";
import { InquiryForm } from "@/components/inquiry-form";

/** Split contact block: details on the left, the real quote form on the right. */
export function ContactSection() {
  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-gradient-to-b from-[#fdfcf9] to-sun-50 py-20 lg:py-24">
      <div aria-hidden className="absolute -top-32 start-[-8rem] -z-10 size-[28rem] rounded-full bg-sky-300/20 blur-3xl" />
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow">Request a quote</p>
          <h2 id="contact-title" className="mt-4 text-3xl sm:text-5xl">Tell Us About Your Project</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Share your property type, location and what you need. Our engineers review every request and get back to
            you to arrange a consultation.
          </p>
          <ul className="mt-8 space-y-4">
            {phones.map((p) => (
              <li key={p.intl}>
                <a href={`tel:${p.intl}`} className="inline-flex items-center gap-3 text-lg font-semibold hover:text-sun-700">
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-line"><Phone aria-hidden className="size-5 text-sun-700" /></span>
                  <span dir="ltr">{p.display}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-semibold hover:text-sun-700">
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-line"><MessageCircle aria-hidden className="size-5 text-[#1fa855]" /></span>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-3 break-all font-semibold hover:text-sun-700">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-line"><Mail aria-hidden className="size-5 text-sun-700" /></span>
                {email}
              </a>
            </li>
            {company.serviceArea && (
              <li className="inline-flex items-center gap-3 text-muted">
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-line"><MapPin aria-hidden className="size-5 text-sun-700" /></span>
                Serving {company.serviceArea}
              </li>
            )}
          </ul>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-line sm:p-9">
          <InquiryForm sourcePage="/" />
        </div>
      </div>
    </section>
  );
}
