import { TriangleAlert } from "lucide-react";
import Marquee from "./Marquee";
import EmailText from "./EmailText";
import { getContact, getSite } from "@/lib/content";

export default function WarningTicker() {
  const site = getSite();
  const { supportEmail } = getContact();

  if (!site.warningEnabled || !site.warningText) return null;

  const message = (
    <span className="flex items-center gap-2">
      <TriangleAlert size={14} className="text-amber-400 shrink-0" />
      <EmailText
        template={site.warningText}
        email={supportEmail}
        linkClassName="underline underline-offset-2"
      />
    </span>
  );

  return (
    <div className="bg-amber-500/10 border-y border-amber-500/20 text-amber-200 text-[12.5px]">
      <Marquee items={[message, message, message]} speed={26} className="py-2" gap="gap-10" />
    </div>
  );
}
