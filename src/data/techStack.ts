/**
 * Technology stack shown in the homepage "Our tech stack" section.
 * `logo` points at a self-hosted brand SVG; brands without a usable SVG
 * fall back to a `monogram` letter rendered in `color`.
 */
export interface TechTool {
  name: string;
  role: string;
  logo?: string;
  monogram?: string;
  color?: string;
}

export const techStack: TechTool[] = [
  { name: "Shopify", role: "E-commerce", logo: "/images/stack/shopify.svg" },
  { name: "Google Ads", role: "Paid search & YouTube", logo: "/images/stack/googleads.svg" },
  { name: "Meta", role: "Paid social", logo: "/images/stack/meta.svg" },
  { name: "GoKwik", role: "Checkout & COD", monogram: "G", color: "#F59E0B" },
  { name: "Shiprocket", role: "Order fulfillment", monogram: "S", color: "#6C3BF4" },
  { name: "Mailchimp", role: "Email marketing", logo: "/images/stack/mailchimp.svg" },
  { name: "Netcore", role: "Retention & automation", monogram: "N", color: "#FF5C35" },
  { name: "Zoho", role: "CRM & analytics", logo: "/images/stack/zoho.svg" },
];
