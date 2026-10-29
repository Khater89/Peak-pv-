import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Peak PV on WhatsApp"
      className="fixed bottom-5 end-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-ink text-sun-300 shadow-lift ring-1 ring-sun-400 transition-colors duration-200 hover:bg-sun-500 hover:text-white"
    >
      <MessageCircle aria-hidden className="size-6" strokeWidth={1.6} />
    </a>
  );
}
