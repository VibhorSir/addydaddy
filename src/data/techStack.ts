/**
 * Technology stack shown in the homepage "Our tech stack" section.
 * `logo` points at a self-hosted brand asset (SVG or raster) in
 * public/images/stack/.
 */
export interface TechTool {
  name: string;
  role: string;
  logo: string;
}

export const techStack: TechTool[] = [
  { name: "Shopify", role: "E-commerce", logo: "/images/stack/shopify.svg" },
  { name: "Google Ads", role: "Paid search & YouTube", logo: "/images/stack/googleads.svg" },
  { name: "Meta", role: "Paid social", logo: "/images/stack/meta.svg" },
  { name: "GoKwik", role: "Checkout & COD", logo: "/images/stack/gokwik.jpeg" },
  { name: "Shiprocket", role: "Order fulfillment", logo: "/images/stack/shiprocket.png" },
  { name: "Mailchimp", role: "Email marketing", logo: "/images/stack/mailchimp.svg" },
  { name: "Netcore", role: "Retention & automation", logo: "/images/stack/netcore.png" },
  { name: "Zoho", role: "CRM & analytics", logo: "/images/stack/zoho.svg" },
];
