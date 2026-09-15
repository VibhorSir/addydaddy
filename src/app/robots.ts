import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const AI_ANSWER_ENGINE_CRAWLERS = [
  "OAI-SearchBot",
  "PerplexityBot",
  "Applebot",
  "DuckAssistBot",
];

const AI_TRAINING_CRAWLERS = [
  "GPTBot",
  "Google-Extended",
  "ClaudeBot",
  "MistralAI-User",
  "meta-externalagent",
  "FacebookBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Core search crawlers: full access.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      // AI-answer-engine crawlers: allowed for AI-search / GEO visibility.
      ...AI_ANSWER_ENGINE_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      // AI-training crawlers: explicitly disallowed.
      ...AI_TRAINING_CRAWLERS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
      // Everything else: wildcard allow.
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
