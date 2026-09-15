/**
 * Small rotating pastel palette for section badges/chips on light surfaces
 * (icon badges, eyebrow labels, result pills). Written as literal class
 * strings, not built via template interpolation, so Tailwind's build-time
 * scanner can find them.
 */
const PASTEL_BG_CLASSES = ["bg-pastel-blush", "bg-pastel-sky", "bg-pastel-mint", "bg-pastel-butter"];

export function getPastelBg(index: number): string {
  return PASTEL_BG_CLASSES[index % PASTEL_BG_CLASSES.length];
}
