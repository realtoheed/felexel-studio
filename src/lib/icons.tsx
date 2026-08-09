import {
  BadgeCheck,
  BookOpen,
  Brush,
  Camera,
  Cast,
  Clapperboard,
  Clock3,
  Code2,
  CreditCard,
  FileSearch,
  Landmark,
  Layers,
  LifeBuoy,
  Mail,
  MessageCircle,
  Palette,
  PenTool,
  PlayCircle,
  Radio,
  Shapes,
  ShieldCheck,
  Sliders,
  Smile,
  Sparkles,
  Star,
  Tv,
  Video,
  Wallet,
  Wand2,
} from "lucide-react";
import type { ComponentType } from "react";

type IconProps = { size?: number; strokeWidth?: number; className?: string };

/** Icon names exposed to editors in the CMS. Keep in sync with public/admin/config.yml. */
export const ICON_MAP: Record<string, ComponentType<IconProps>> = {
  "badge-check": BadgeCheck,
  "book-open": BookOpen,
  brush: Brush,
  camera: Camera,
  cast: Cast,
  clapperboard: Clapperboard,
  clock: Clock3,
  code: Code2,
  "credit-card": CreditCard,
  "file-search": FileSearch,
  landmark: Landmark,
  layers: Layers,
  "life-buoy": LifeBuoy,
  mail: Mail,
  "message-circle": MessageCircle,
  palette: Palette,
  "pen-tool": PenTool,
  "play-circle": PlayCircle,
  radio: Radio,
  shapes: Shapes,
  "shield-check": ShieldCheck,
  sliders: Sliders,
  smile: Smile,
  sparkles: Sparkles,
  star: Star,
  tv: Tv,
  video: Video,
  wallet: Wallet,
  wand: Wand2,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.8,
  className,
}: { name: string } & IconProps) {
  const Cmp = ICON_MAP[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} />;
}
