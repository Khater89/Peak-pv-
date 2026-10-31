import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/shared";
import { getContent } from "@/lib/i18n";

export async function WhatsAppFab() {
  const c = await getContent();
  return (
    <a
      href={whatsappHref(c.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={c.agent.chat}
      className="fixed bottom-5 end-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-navy-900 text-sun-300 shadow-lift ring-2 ring-sun-400 transition-colors duration-200 hover:bg-navy-800"
    >
      <MessageCircle aria-hidden className="size-6" strokeWidth={1.6} />
    </a>
  );
}
