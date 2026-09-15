import { Target, Search, Share2, Palette, Workflow, TrendingUp, type LucideIcon } from "lucide-react";

/** Maps a service's `icon` data field to its Lucide component. */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  target: Target,
  search: Search,
  share: Share2,
  palette: Palette,
  workflow: Workflow,
  "trending-up": TrendingUp,
};

export function getServiceIcon(icon: string): LucideIcon {
  return SERVICE_ICONS[icon] ?? Target;
}
