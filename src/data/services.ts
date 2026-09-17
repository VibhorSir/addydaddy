/**
 * Services content model. `seoTitle` / `seoDescription` are first-class
 * fields on every entry so per-entry SEO is satisfied by the data itself;
 * `buildMetadata()` reads straight from these, nothing is hand-written
 * per page. Placeholder copy below, swap in real service detail before
 * launch, the shape stays the same.
 */

export interface Faq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  shortDescription: string;
  icon: string;
  heroImage: { src: string; alt: string };
  overview: string;
  deliverables: string[];
  faqs: Faq[];
}

export const services: Service[] = [
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    seoTitle: "Performance Marketing Agency: Meta & Google Ads",
    seoDescription:
      "ROAS-driven paid media across Meta, Google, and YouTube. AdyDaddy plans, builds, and optimizes campaigns that scale profitably.",
    shortDescription:
      "Paid media across Meta, Google, and YouTube, built around ROAS and payback period, not vanity clicks.",
    icon: "target",
    heroImage: {
      src: "/images/services/performance-marketing.jpg",
      alt: "Media buyer reviewing a paid campaign dashboard with rising ROAS charts",
    },
    overview:
      "We run performance marketing as a revenue function, not a media-buying checklist. Every campaign is scoped against a payback target before a single rupee is spent, structured for fast, statistically sound testing, and reviewed weekly against the number that actually matters: profitable revenue.",
    deliverables: [
      "Full-funnel Meta & Google Ads management",
      "Creative testing pipeline and hook iteration",
      "Landing page and offer experimentation",
      "Server-side tracking and attribution setup",
      "Weekly performance reporting with clear next actions",
    ],
    faqs: [
      {
        question: "What budget do you require to start?",
        answer:
          "We typically onboard brands spending upward of ₹1,50,000/month in ad spend, which gives us enough signal to test and optimize quickly.",
      },
      {
        question: "How soon will we see results?",
        answer:
          "Expect a structured testing phase in the first 2 to 3 weeks, with performance trends becoming clear by week 6 as winning creatives and audiences compound.",
      },
    ],
  },
  {
    slug: "seo",
    name: "Search Engine Optimization",
    seoTitle: "SEO Services: Organic Growth That Compounds",
    seoDescription:
      "Technical SEO, content, and authority building from AdyDaddy: organic search programs designed to compound traffic and revenue over time.",
    shortDescription:
      "Technical fixes, content, and authority building aimed at compounding organic traffic, not one-off audits.",
    icon: "search",
    heroImage: {
      src: "/images/services/seo.jpg",
      alt: "SEO strategist mapping a site's keyword clusters on a whiteboard",
    },
    overview:
      "SEO only works as a compounding asset if it's treated as one. We start with a technical foundation audit, build a content architecture around real search demand and AI-answer-engine visibility, and back it with a link and authority plan that survives algorithm updates.",
    deliverables: [
      "Technical SEO audit and fix roadmap",
      "Keyword and topic cluster strategy",
      "On-page and content optimization",
      "AI Overviews / GEO visibility optimization",
      "Authority and digital PR link building",
    ],
    faqs: [
      {
        question: "How long until SEO shows results?",
        answer:
          "Most clients see meaningful ranking movement within 3 to 4 months and compounding traffic gains from month 6 onward, depending on domain authority and competitiveness.",
      },
      {
        question: "Do you write the content yourselves?",
        answer:
          "Yes, our in-house content team writes and our strategists brief, edit, and optimize every piece against the target cluster.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    seoTitle: "Social Media Marketing Agency: Content & Community",
    seoDescription:
      "Organic social strategy, content production, and community management from AdyDaddy, focused on creating brand demand, not just post frequency.",
    shortDescription:
      "Organic content, community, and creator partnerships built to create demand, not just a posting calendar.",
    icon: "share",
    heroImage: {
      src: "/images/services/social-media.jpg",
      alt: "Content creator filming a short-form video for a brand's social channels",
    },
    overview:
      "Organic social is where brand demand gets created before paid media ever captures it. We build content systems, not one-off posts, across the platforms your audience actually spends time on, and pair them with creator and community strategy so growth doesn't rely on any single channel.",
    deliverables: [
      "Platform strategy and content pillars",
      "Short-form video production",
      "Community management",
      "Creator and influencer partnerships",
      "Monthly content performance reporting",
    ],
    faqs: [
      {
        question: "Which platforms do you manage?",
        answer:
          "Instagram, YouTube Shorts, LinkedIn, and Pinterest most often. We recommend platforms based on where your specific audience is active, not a fixed package.",
      },
    ],
  },
  {
    slug: "content-and-creative",
    name: "Content & Creative",
    seoTitle: "Content & Creative Studio: Ads, Video, Design",
    seoDescription:
      "In-house creative studio producing ad creative, video, and design for AdyDaddy clients, built for performance, not just aesthetics.",
    shortDescription:
      "Ad creative, video, and design production built to perform in-feed, not just look good in a deck.",
    icon: "palette",
    heroImage: {
      src: "/images/services/content-creative.jpg",
      alt: "Designer reviewing ad creative variations on a monitor",
    },
    overview:
      "Creative is the biggest lever in paid media performance, so we run it in-house and iterate on it like a testing program: hooks, formats, and angles are ranked by actual click-through and conversion data, not internal opinion.",
    deliverables: [
      "Static and video ad creative",
      "UGC-style content direction",
      "Brand identity and design systems",
      "Landing page design",
      "Creative performance tracking",
    ],
    faqs: [
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Yes, we can either work fully within existing brand guidelines or help evolve them where they're holding creative performance back.",
      },
    ],
  },
  {
    slug: "marketing-automation-crm",
    name: "Marketing Automation & CRM",
    seoTitle: "Marketing Automation & CRM Services",
    seoDescription:
      "Lifecycle email, SMS, and CRM automation from AdyDaddy, designed to lift repeat revenue without added ad spend.",
    shortDescription:
      "Lifecycle email, SMS, and CRM flows designed to lift repeat revenue without adding ad spend.",
    icon: "workflow",
    heroImage: {
      src: "/images/services/marketing-automation.jpg",
      alt: "Marketing automation flow diagram shown on a laptop screen",
    },
    overview:
      "The highest-margin revenue in most businesses comes from customers who already trust you. We build lifecycle email, SMS, and CRM automation that turns first purchases into repeat ones: segmented, tested, and reported against retained revenue, not open rates alone.",
    deliverables: [
      "Lifecycle email & SMS flow builds",
      "CRM segmentation and scoring",
      "Campaign calendar and execution",
      "Retention and LTV reporting",
    ],
    faqs: [
      {
        question: "Which platforms do you work with?",
        answer:
          "Klaviyo, HubSpot, and WebEngage most commonly. We can also work within a platform you've already invested in.",
      },
    ],
  },
  {
    slug: "conversion-rate-optimization",
    name: "Conversion Rate Optimization",
    seoTitle: "Conversion Rate Optimization (CRO) Services",
    seoDescription:
      "Landing page and funnel CRO from AdyDaddy: structured experimentation that lifts conversion rate without increasing spend.",
    shortDescription:
      "Structured landing page and funnel experimentation that lifts conversion rate without more spend.",
    icon: "trending-up",
    heroImage: {
      src: "/images/services/cro.jpg",
      alt: "Analyst reviewing a website conversion funnel with A/B test results",
    },
    overview:
      "The fastest way to grow profitably is often to fix the funnel you already have. We run structured CRO: heuristic audits, session recordings, and prioritized A/B tests, so every extra visitor your marketing sends converts at a higher rate.",
    deliverables: [
      "Funnel and heuristic audits",
      "A/B and multivariate testing",
      "Landing page rebuilds",
      "Checkout and form optimization",
    ],
    faqs: [
      {
        question: "How do you prioritize what to test?",
        answer:
          "We use a PIE (Potential, Importance, Ease) framework backed by session recordings and funnel drop-off data, so every test is aimed at the biggest leak first.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
