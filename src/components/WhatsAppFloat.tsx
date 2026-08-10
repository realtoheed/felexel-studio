import { MessageCircle } from "lucide-react";
import { getWhatsappLink } from "@/lib/content";

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.5)] transition-transform hover:scale-110"
    >
      <span className="absolute bottom-full right-1/2 translate-x-1/2 mb-2.5 whitespace-nowrap rounded-full bg-surface border border-text-dim/12 px-3.5 py-1.5 text-[13px] font-semibold text-text shadow-lg animate-bounce">
        Let&apos;s chat
      </span>
      <MessageCircle size={26} strokeWidth={2} className="text-white" />
    </a>
  );
}
