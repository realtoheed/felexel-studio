import { MessageCircle } from "lucide-react";
import { getWhatsappLink } from "@/lib/content";

export default function WhatsAppFloat() {
  return (
    <a
      href={getWhatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.5)] transition-transform hover:scale-110"
    >
      <MessageCircle size={26} strokeWidth={2} className="text-white" />
    </a>
  );
}
