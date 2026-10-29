import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, email, phones, whatsappHref } from "@/content/site";

export function TopBar() {
  return (
    <div className="border-b border-line bg-surface text-[0.8125rem] text-muted">
      <div className="container-x flex h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          {phones.map((p, i) => (
            <a key={p.intl} href={`tel:${p.intl}`} className={i > 0 ? "hidden items-center gap-1.5 hover:text-ink sm:inline-flex" : "inline-flex items-center gap-1.5 hover:text-ink"}>
              <Phone aria-hidden className="size-3.5 text-sun-700" />
              <span className="sr-only">Call </span>
              <span dir="ltr">{p.display}</span>
            </a>
          ))}
          <a href={`mailto:${email}`} className="hidden items-center gap-1.5 hover:text-ink lg:inline-flex">
            <Mail aria-hidden className="size-3.5 text-sun-700" /> {email}
          </a>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {company.serviceArea && (
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <MapPin aria-hidden className="size-3.5 text-sun-700" /> Serving {company.serviceArea}
            </span>
          )}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-ink hover:text-sun-700">
            <MessageCircle aria-hidden className="size-3.5 text-[#1fa855]" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
