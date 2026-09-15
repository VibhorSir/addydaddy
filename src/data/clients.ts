/**
 * Client logos shown in the homepage marquee. Real brand logos, not
 * placeholder data. Add new entries here as more logos come in; the
 * marquee just maps over this list.
 */
export interface ClientLogo {
  name: string;
  src: string;
}

export const clientLogos: ClientLogo[] = [
  { name: "Aakriti by Nandita", src: "/images/logos/aakriti_logo.avif" },
  { name: "Prisho", src: "/images/logos/prisho_logo.avif" },
  { name: "Joules by Radhika", src: "/images/logos/radhika_logo.webp" },
  { name: "Sitarah by Misthi Vohra", src: "/images/logos/sitarah-logo-transparent.webp" },
  { name: "Varoin Marwah", src: "/images/logos/vm-logo.avif" },
];
