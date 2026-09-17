import type { Metadata } from "next";

/**
 * Central SEO module.
 *
 * Every route builds its metadata through `buildMetadata()` and, where
 * relevant, one of the JSON-LD builder functions below. Nothing hand-rolls
 * <meta> tags or inline structured data; this file is the single source of
 * truth so every page is correct by construction.
 */

// TODO: replace with the real production domain before launch.
export const SITE_URL = "https://www.addydaddy.in";

export const SITE_NAME = "AdyDaddy";

export const SITE_DESCRIPTION =
  "AdyDaddy is a performance marketing agency that plans, builds, and scales paid media, SEO, and content programs that turn ad spend into revenue.";

// TODO: replace with real business details before launch.
export const BUSINESS_INFO = {
  legalName: "AdyDaddy Marketing Pvt. Ltd.",
  logo: `${SITE_URL}/logo-mark.png`,
  foundingDate: "2020",
  founders: [{ name: "[Founder Name]" }],
  address: {
    streetAddress: "[Street Address]",
    addressLocality: "[City]",
    addressRegion: "[State]",
    postalCode: "[Postal Code]",
    addressCountry: "IN",
  },
  contactPoint: {
    telephone: "[+91-00000-00000]",
    contactType: "customer service",
    email: "hello@addydaddy.in",
  },
  sameAs: [
    "https://www.instagram.com/addydaddy",
    "https://www.linkedin.com/company/addydaddy",
    "https://twitter.com/addydaddy",
    "https://www.facebook.com/addydaddy",
  ],
};

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Builds a complete Next.js Metadata object: absolute title, description,
 * canonical URL, robots directives, Open Graph, and Twitter card.
 * This is the only place page-level metadata should be assembled.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = "/og-image.jpg",
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const absoluteOgImage = new URL(ogImage, SITE_URL).toString();
  // Don't append the site name if the title already carries it (e.g. the
  // homepage's own "AdyDaddy: ..." title).
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    // `absolute` opts this page out of the root layout's title template,
    // so the site name is never appended twice.
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: absoluteOgImage, width: 1200, height: 630, alt: fullTitle }],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteOgImage],
    },
  };
}

/** Sitewide Organization JSON-LD, rendered once in the root layout. */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: BUSINESS_INFO.legalName,
    url: SITE_URL,
    logo: BUSINESS_INFO.logo,
    foundingDate: BUSINESS_INFO.foundingDate,
    founders: BUSINESS_INFO.founders,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_INFO.address,
    },
    contactPoint: {
      "@type": "ContactPoint",
      ...BUSINESS_INFO.contactPoint,
    },
    sameAs: BUSINESS_INFO.sameAs,
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  image?: string;
  areaServed?: string;
}

/** Service JSON-LD for individual service pages. */
export function buildServiceSchema({
  name,
  description,
  path,
  image,
  areaServed = "IN",
}: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: new URL(path, SITE_URL).toString(),
    image: image ? new URL(image, SITE_URL).toString() : undefined,
    areaServed,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export interface ReviewInput {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
}

export interface ServiceReviewSchemaInput extends ServiceSchemaInput {
  reviews: ReviewInput[];
}

/**
 * Combined Service + Review JSON-LD for case-study / portfolio pages:
 * the service that was delivered, plus the client review of the outcome.
 */
export function buildServiceReviewSchema({
  reviews,
  ...service
}: ServiceReviewSchemaInput) {
  const serviceSchema = buildServiceSchema(service);
  const ratings = reviews.map((r) => r.ratingValue);
  const averageRating =
    ratings.reduce((sum, r) => sum + r, 0) / Math.max(ratings.length, 1);

  return {
    ...serviceSchema,
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.authorName },
      reviewBody: r.reviewBody,
      datePublished: r.datePublished,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.ratingValue,
        bestRating: 5,
      },
    })),
    aggregateRating:
      reviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: Number(averageRating.toFixed(1)),
            reviewCount: reviews.length,
            bestRating: 5,
          }
        : undefined,
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Generic FAQPage JSON-LD builder; feed it any page's FAQ list. */
export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * BreadcrumbList JSON-LD generated from the same {name, path}[] trail that
 * drives the visible <Breadcrumbs /> UI: one source of truth for both.
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}
