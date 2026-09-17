/**
 * Platform partnerships shown in the "Trusted partners" band. Reuses the
 * same self-hosted brand SVGs as the tech-stack section.
 */
export interface Partner {
  name: string;
  label: string;
  logo: string;
}

export const partners: Partner[] = [
  { name: "Google", label: "Google Partner", logo: "/images/stack/google.svg" },
  { name: "Meta", label: "Business Partner", logo: "/images/stack/meta.svg" },
  { name: "Shopify", label: "Shopify Partner", logo: "/images/stack/shopify.svg" },
];
