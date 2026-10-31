import { Mail, MessageCircle, Phone } from "lucide-react";
import { email, phones, whatsappHref } from "@/content/shared";
import { getContent } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Phone numbers, WhatsApp and email from content/shared. */
export async function ContactChannels({ tone = "light" }: { tone?: "light" | "dark" }) {
  const c = await getContent();
  const labels = c.footer.contactLabels;
  const iconClass = cn("mt-0.5 size-4 shrink-0", tone === "dark" ? "text-sun-400" : "text-leaf-600");
  const items = [
    ...phones.map((p) => ({ key: p.intl, href: `tel:${p.intl}`, icon: Phone, label: labels.phone, value: p.display, ltr: true, external: false })),
    { key: "wa", href: whatsappHref(c.whatsappMessage), icon: MessageCircle, label: labels.whatsapp, value: phones[0].display, ltr: true, external: true },
    { key: "email", href: `mailto:${email}`, icon: Mail, label: labels.email, value: email, ltr: false, external: false },
  ];
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i.key}>
          <a
            href={i.href}
            target={i.external ? "_blank" : undefined}
            rel={i.external ? "noopener noreferrer" : undefined}
            className="flex gap-2 py-1 hover:underline"
          >
            <i.icon aria-hidden className={iconClass} />
            <span className="min-w-0 break-all">
              <span className="sr-only">{i.label}: </span>
              <span dir={i.ltr ? "ltr" : undefined}>{i.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
