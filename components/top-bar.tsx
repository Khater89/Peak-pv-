import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, email, phones, whatsappHref } from "@/content/site";

export function TopBar() {
  return (
    <div className="on-dark bg-navy-950 text-[0.75rem] tracking-[0.04em] text-[#c9dccd]">
      <div className="container-x flex h-10 items-center justify-between gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          {phones.map((p, i) => (
            <a key={p.intl} href={`tel:${p.intl}`} className={i > 0 ? "hidden items-center gap-1.5 hover:text-white sm:inline-flex" : "inline-flex items-center gap-1.5 hover:text-white"}>
              <Phone aria-hidden className="size-3.5 text-sun-400" />
              <span className="sr-only">Call </span>
              <span dir="ltr">{p.display}</span>
            </a>
          ))}
          <a href={`mailto:${email}`} className="hidden items-center gap-1.5 hover:text-white lg:inline-flex">
            <Mail aria-hidden className="size-3.5 text-sun-400" /> {email}
          </a>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {company.serviceArea && (
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <MapPin aria-hidden className="size-3.5 text-sun-400" /> Serving {company.serviceArea}
            </span>
          )}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-sun-300">
            <MessageCircle aria-hidden className="size-3.5 text-sun-400" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
