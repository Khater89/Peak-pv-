import { Mail, MessageCircle, Phone } from "lucide-react";
import { email, phones, whatsappHref } from "@/content/shared";
import { getContent, getLang } from "@/lib/i18n";
import { lp } from "@/lib/locales";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

/** Real-estate "contact the agent" style card with direct call / WhatsApp / email actions. */
export async function AgentCard({ context }: { context?: string }) {
  const c = await getContent();
  const lang = await getLang();
  const message = context ? c.whatsappProjectMessage(context) : c.whatsappMessage;
  return (
    <div className="border border-line bg-white p-7 shadow-lift">
      <div className="flex items-center gap-3">
        <LogoMark tone="badge" className="size-12" />
        <div>
          <p className="font-bold">{c.agent.team}</p>
          <p className="text-sm text-muted">{c.agent.sub}</p>
        </div>
      </div>
      <div className="mt-6 space-y-2.5">
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-[2px] bg-navy-900 px-5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#ffffff] transition-colors hover:bg-navy-800"
        >
          <MessageCircle aria-hidden className="size-5" /> {c.agent.chat}
        </a>
        {phones.map((p) => (
          <a
            key={p.intl}
            href={`tel:${p.intl}`}
            className="flex h-12 items-center justify-center gap-2 rounded-[2px] border border-ink/20 text-sm font-medium tracking-[0.06em] hover:border-ink"
          >
            <Phone aria-hidden className="size-4" /> <span dir="ltr">{p.display}</span>
          </a>
        ))}
        <ButtonLink href={lp(lang, "/contact")} variant="gold" className="w-full">
          {c.agent.request}
        </ButtonLink>
      </div>
      <a href={`mailto:${email}`} className="mt-4 flex items-center justify-center gap-2 break-all text-sm text-muted hover:text-ink">
        <Mail aria-hidden className="size-4 shrink-0" /> {email}
      </a>
    </div>
  );
}
