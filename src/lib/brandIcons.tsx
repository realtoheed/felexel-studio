import {
  SiTwitch,
  SiStreamlabs,
  SiDiscord,
  SiFacebookgaming,
  SiYoutube,
  SiObsstudio,
} from "react-icons/si";
import type { IconType } from "react-icons";

/**
 * Real brand marks for the platforms we have one for, keyed by the exact
 * label an editor types in the CMS (case-insensitive). Platforms without an
 * official icon in the Simple Icons set (Wirecast, vMix, VidBlaster X) fall
 * back to the generic lucide icon picked in the CMS instead — see
 * PlatformsGrid.tsx.
 */
export const BRAND_ICONS: Record<string, { icon: IconType; color: string }> = {
  twitch: { icon: SiTwitch, color: "#9146FF" },
  streamlabs: { icon: SiStreamlabs, color: "#80F5D2" },
  discord: { icon: SiDiscord, color: "#5865F2" },
  "facebook gaming": { icon: SiFacebookgaming, color: "#1877F2" },
  youtube: { icon: SiYoutube, color: "#FF0000" },
  "obs studio": { icon: SiObsstudio, color: "#302E31" },
};

export function getBrandIcon(label: string) {
  return BRAND_ICONS[label.trim().toLowerCase()];
}
