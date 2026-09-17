/**
 * Portfolio / case-study content model. Like `services.ts`, every entry
 * carries its own `seoTitle` / `seoDescription`, and every image its own
 * alt text, set once here, consumed everywhere. Client names, numbers,
 * and reviews below are placeholder sample data; replace with real case
 * studies before launch, the shape stays the same.
 */

import type { ReviewInput } from "@/lib/seo";

export interface ResultStat {
  label: string;
  value: string;
}

export interface PortfolioItem {
  slug: string;
  clientName: string;
  industry: string;
  seoTitle: string;
  seoDescription: string;
  servicesUsed: string[];
  summary: string;
  challenge: string;
  approach: string;
  results: ResultStat[];
  heroImage: { src: string; alt: string };
  reviews: ReviewInput[];
}

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "lumen-skincare",
    clientName: "Lumen Skincare",
    industry: "D2C Beauty & Personal Care",
    seoTitle: "Lumen Skincare Case Study: 3.4x ROAS Scale-Up",
    seoDescription:
      "How AdyDaddy scaled Lumen Skincare's paid media from ₹8L to ₹42L monthly spend while lifting blended ROAS from 1.9x to 3.4x.",
    servicesUsed: ["Performance Marketing", "Content & Creative", "Conversion Rate Optimization"],
    summary:
      "Scaled a D2C skincare brand's paid media spend 5x while improving blended ROAS, by rebuilding the creative testing pipeline and fixing a leaky checkout funnel.",
    challenge:
      "Lumen Skincare had a profitable but small paid media engine that stalled every time spend increased past ₹10L/month, with ROAS falling sharply as new creative ran out.",
    approach:
      "We rebuilt the creative pipeline around weekly hook testing, restructured campaigns for cleaner signal, and ran a CRO sprint on the checkout flow that was quietly leaking 22% of add-to-carts.",
    results: [
      { label: "Monthly ad spend", value: "₹8L → ₹42L" },
      { label: "Blended ROAS", value: "1.9x → 3.4x" },
      { label: "Checkout conversion rate", value: "+31%" },
    ],
    heroImage: {
      src: "/images/portfolio/lumen-skincare.jpg",
      alt: "Lumen Skincare product lineup styled for an ad creative shoot",
    },
    reviews: [
      {
        authorName: "Client Marketing Lead, Lumen Skincare",
        reviewBody:
          "AdyDaddy is the first agency that treated our checkout funnel as seriously as our ad accounts. The ROAS improvement followed once they fixed both.",
        ratingValue: 5,
        datePublished: "2025-11-12",
      },
    ],
  },
  {
    slug: "northpeak-outdoors",
    clientName: "Northpeak Outdoors",
    industry: "D2C Outdoor & Apparel",
    seoTitle: "Northpeak Outdoors Case Study: SEO Traffic Growth",
    seoDescription:
      "How AdyDaddy grew Northpeak Outdoors' organic traffic 4.1x in 8 months through technical SEO and a topic cluster content strategy.",
    servicesUsed: ["SEO", "Content & Creative"],
    summary:
      "Grew organic traffic 4.1x in 8 months for an outdoor apparel brand by fixing crawl and indexation issues and building topic clusters around buying-intent search terms.",
    challenge:
      "Northpeak Outdoors had strong products and reviews but almost no organic visibility. A Next.js migration had left large sections of the catalog unindexed.",
    approach:
      "We ran a full technical audit to resolve indexation and canonicalization issues, then built topic clusters around high buying-intent terms with new category and guide content mapped to search demand.",
    results: [
      { label: "Organic traffic (8 months)", value: "4.1x" },
      { label: "Indexed product pages", value: "38% → 96%" },
      { label: "Organic revenue share", value: "+18 pts" },
    ],
    heroImage: {
      src: "/images/portfolio/northpeak-outdoors.jpg",
      alt: "Northpeak Outdoors hiking apparel displayed on a mountain trail backdrop",
    },
    reviews: [
      {
        authorName: "Founder, Northpeak Outdoors",
        reviewBody:
          "We didn't realize how much revenue we were leaving on the table until AdyDaddy showed us the indexation numbers. The traffic growth has been steady, not a spike that faded.",
        ratingValue: 5,
        datePublished: "2025-08-03",
      },
    ],
  },
  {
    slug: "kavali-foods",
    clientName: "Kavali Foods",
    industry: "D2C Food & Beverage",
    seoTitle: "Kavali Foods Case Study: Retention & Lifecycle Revenue",
    seoDescription:
      "How AdyDaddy lifted Kavali Foods' repeat purchase rate by 26% through lifecycle email, SMS, and CRM segmentation.",
    servicesUsed: ["Marketing Automation & CRM", "Social Media Marketing"],
    summary:
      "Lifted repeat purchase rate 26% for a D2C food brand by rebuilding lifecycle email and SMS flows around real purchase behavior instead of generic drip sequences.",
    challenge:
      "Kavali Foods relied almost entirely on paid acquisition, with a generic welcome and abandonment flow doing little to bring first-time buyers back.",
    approach:
      "We segmented the customer base by purchase behavior and built lifecycle flows (replenishment reminders, cross-sell sequences, and a win-back flow for lapsed customers), layered on top of a tightened social content calendar to support retention.",
    results: [
      { label: "Repeat purchase rate", value: "+26%" },
      { label: "Email & SMS attributed revenue", value: "+₹6.2L/mo" },
      { label: "Customer LTV", value: "+19%" },
    ],
    heroImage: {
      src: "/images/portfolio/kavali-foods.jpg",
      alt: "Kavali Foods snack packaging arranged in a flat-lay product photo",
    },
    reviews: [
      {
        authorName: "CEO, Kavali Foods",
        reviewBody:
          "Retention was the piece we kept deprioritizing. AdyDaddy built the flows in weeks and the repeat revenue is now a real part of our forecast, not an afterthought.",
        ratingValue: 4.5,
        datePublished: "2025-06-20",
      },
    ],
  },
];

export function getPortfolioItemBySlug(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}
