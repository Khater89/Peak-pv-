import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, type ContactChannel } from "@/content/site";
import { cn } from "@/lib/utils";

const icons = { phone: Phone, email: Mail, whatsapp: MessageCircle, address: MapPin };

/** "079 061 9770" -> "962790619770" (Jordan); numbers already in +962 form are kept. */
const intl = (v: string) => v.replace(/\D/g, "").replace(/^0/, "962");

function href(c: ContactChannel) {
  if (c.kind === "phone") return `tel:+${intl(c.value)}`;
  if (c.kind === "email") return `mailto:${c.value}`;
  if (c.kind === "whatsapp") return `https://wa.me/${intl(c.value)}`;
  return undefined;
}

/** Renders only verified channels from content/site.ts; renders nothing when none are configured. */
export function ContactChannels({ tone = "light" }: { tone?: "light" | "dark" }) {
  if (company.contactChannels.length === 0) return null;
  return (
    <ul className="space-y-2">
      {company.contactChannels.map((c) => {
        const Icon = icons[c.kind];
        const link = href(c);
        const body = (
          <>
            <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", tone === "dark" ? "text-sun-400" : "text-sun-700")} />
            <span className="min-w-0 break-all">
              <span className="sr-only">{c.label}: </span>
              <span dir={c.kind === "email" ? undefined : "ltr"}>{c.value}</span>
            </span>
          </>
        );
        return (
          <li key={c.kind + c.value}>
            {link ? (
              <a href={link} target={c.kind === "whatsapp" ? "_blank" : undefined} rel={c.kind === "whatsapp" ? "noopener noreferrer" : undefined} className="flex gap-2 py-1 hover:underline">{body}</a>
            ) : (
              <span className="flex gap-2 py-1">{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
