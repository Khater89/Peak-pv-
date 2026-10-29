import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Peak PV on WhatsApp"
      className="fixed bottom-5 end-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-[0_10px_30px_-8px_rgb(31_168_85/0.7)] ring-4 ring-white transition-transform duration-200 hover:scale-105"
    >
      <MessageCircle aria-hidden className="size-7" />
    </a>
  );
}
