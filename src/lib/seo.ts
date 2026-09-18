import type { Metadata } from "next";

/**
 * Central SEO module.
 *
 * Every route builds its metadata through `buildMetadata()` and, where
 * relevant, one of the JSON-LD builder functions below. Nothing hand-rolls
 * <meta> tags or inline structured data; this file is the single source of
 * truth so every page is correct by construction.
 */

export const SITE_URL = "https://www.adydaddy.com";

export const SITE_NAME = "AdyDaddy";

export const SITE_DESCRIPTION =
  "AdyDaddy is a performance marketing agency that plans, builds, and scales paid media, SEO, and content programs that turn ad spend into revenue.";

export const BUSINESS_INFO = {
  legalName: "AdyDaddy",
  logo: `${SITE_URL}/logo-mark.png`,
  foundingDate: "2020",
  founders: [{ name: "Vibhor Sharma" }],
  // Address is optional: leave streetAddress empty to hide the office
  // detail on the contact page and omit it from structured data until a
  // physical location is registered.
  address: {
    streetAddress: "",
    addressLocality: "",
    addressRegion: "",
    postalCode: "",
    addressCountry: "IN",
  },
  contactPoint: {
    telephone: "+919760436442",
    contactType: "customer service",
    email: "adydaddy81@gmail.com",
  },
  sameAs: [
    "https://www.instagram.com/adydaddyofficial",
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
    ...(BUSINESS_INFO.address.streetAddress
      ? {
          address: {
            "@type": "PostalAddress",
            ...BUSINESS_INFO.address,
          },
        }
      : {}),
    contactPoint: {
      "@type": "ContactPoint",
      ...BUSINESS_INFO.contactPoint,
    },
    sameAs: BUSINESS_INFO.sameAs,
  };
}

/** WebSite JSON-LD for the root entity (name + URL + description). */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/** Founder Person JSON-LD — entity clarity for E-E-A-T / answer engines. */
export function buildFounderSchema() {
  const founder = BUSINESS_INFO.founders[0];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder?.name ?? "Vibhor Sharma",
    jobTitle: "Founder",
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export interface BlogPostSchemaInput {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
}

/** BlogPosting JSON-LD for individual blog posts. */
export function buildBlogPostSchema(post: BlogPostSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    mainEntityOfPage: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    author: {
      "@type": "Person",
      name: BUSINESS_INFO.founders[0]?.name ?? "Vibhor Sharma",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
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
