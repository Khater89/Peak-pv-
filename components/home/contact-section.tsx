import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { email, phones, whatsappHref } from "@/content/shared";
import { getContent, getLang } from "@/lib/i18n";
import { InquiryForm } from "@/components/inquiry-form";
import { formText } from "@/lib/form-text";

/** Split contact block: details on the left, the real quote form on the right. */
export async function ContactSection() {
  const c = await getContent();
  const lang = await getLang();
  const t = c.contactSection;
  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-surface py-24 lg:py-32">
      <div aria-hidden className="absolute -top-32 start-[-8rem] -z-10 size-[28rem] rounded-full bg-sky-300/20 blur-3xl" />
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="contact-title" className="mt-4 text-3xl sm:text-5xl">{t.title}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{t.body}</p>
          <ul className="mt-8 space-y-4">
            {phones.map((p) => (
              <li key={p.intl}>
                <a href={`tel:${p.intl}`} className="inline-flex items-center gap-3 text-lg font-semibold hover:text-leaf-700">
                  <span className="inline-flex size-10 items-center justify-center bg-leaf-100"><Phone aria-hidden className="size-5 text-leaf-700" /></span>
                  <span dir="ltr">{p.display}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappHref(c.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-lg font-semibold hover:text-leaf-700">
                <span className="inline-flex size-10 items-center justify-center bg-leaf-100"><MessageCircle aria-hidden className="size-5 text-leaf-700" /></span>
                {t.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-3 break-all font-semibold hover:text-leaf-700">
                <span className="inline-flex size-10 shrink-0 items-center justify-center bg-leaf-100"><Mail aria-hidden className="size-5 text-leaf-700" /></span>
                {email}
              </a>
            </li>
            {c.company.serviceArea && (
              <li className="inline-flex items-center gap-3 text-muted">
                <span className="inline-flex size-10 items-center justify-center bg-leaf-100"><MapPin aria-hidden className="size-5 text-leaf-700" /></span>
                {t.serving(c.company.serviceArea)}
              </li>
            )}
          </ul>
        </div>
        <div className="border border-line bg-white p-6 shadow-lift sm:p-10">
          <InquiryForm sourcePage={`/${lang}`} t={formText(c)} />
        </div>
      </div>
    </section>
  );
}
