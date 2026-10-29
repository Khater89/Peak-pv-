import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, email, phones, whatsappHref } from "@/content/site";
import { InquiryForm } from "@/components/inquiry-form";

/** Split contact block: details on the left, the real quote form on the right. */
export function ContactSection() {
  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-surface py-24 lg:py-32">
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
                  <span className="inline-flex size-10 items-center justify-center border border-sun-400/50"><Phone aria-hidden className="size-5 text-sun-700" /></span>
                  <span dir="ltr">{p.display}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-semibold hover:text-sun-700">
                <span className="inline-flex size-10 items-center justify-center border border-sun-400/50"><MessageCircle aria-hidden className="size-5 text-sun-500" /></span>
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-3 break-all font-semibold hover:text-sun-700">
                <span className="inline-flex size-10 shrink-0 items-center justify-center border border-sun-400/50"><Mail aria-hidden className="size-5 text-sun-700" /></span>
                {email}
              </a>
            </li>
            {company.serviceArea && (
              <li className="inline-flex items-center gap-3 text-muted">
                <span className="inline-flex size-10 items-center justify-center border border-sun-400/50"><MapPin aria-hidden className="size-5 text-sun-700" /></span>
                Serving {company.serviceArea}
              </li>
            )}
          </ul>
        </div>
        <div className="border border-line bg-white p-6 shadow-lift sm:p-10">
          <InquiryForm sourcePage="/" />
        </div>
      </div>
    </section>
  );
}
