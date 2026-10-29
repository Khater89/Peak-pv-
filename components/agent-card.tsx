import { Mail, MessageCircle, Phone } from "lucide-react";
import { email, phones, whatsappHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

/** Real-estate "contact the agent" style card with direct call / WhatsApp / email actions. */
export function AgentCard({ context }: { context?: string }) {
  const message = context
    ? `Hello Peak PV, I saw the "${context}" project and would like a similar system.`
    : undefined;
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lift ring-1 ring-line">
      <div className="flex items-center gap-3">
        <LogoMark tone="badge" className="size-12" />
        <div>
          <p className="font-bold">Peak PV engineering team</p>
          <p className="text-sm text-muted">Solar PV supply · design · installation</p>
        </div>
      </div>
      <div className="mt-6 space-y-2.5">
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#1fa855] px-5 font-semibold text-white transition-colors hover:bg-[#178a45]"
        >
          <MessageCircle aria-hidden className="size-5" /> Chat on WhatsApp
        </a>
        {phones.map((p) => (
          <a
            key={p.intl}
            href={`tel:${p.intl}`}
            className="flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-navy-900/20 font-semibold hover:border-navy-900/50 hover:bg-surface"
          >
            <Phone aria-hidden className="size-4" /> <span dir="ltr">{p.display}</span>
          </a>
        ))}
        <ButtonLink href="/contact" variant="primary" className="w-full">
          Request a quote
        </ButtonLink>
      </div>
      <a href={`mailto:${email}`} className="mt-4 flex items-center justify-center gap-2 break-all text-sm text-muted hover:text-ink">
        <Mail aria-hidden className="size-4 shrink-0" /> {email}
      </a>
    </div>
  );
}
