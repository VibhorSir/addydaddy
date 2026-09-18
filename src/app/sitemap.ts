import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { services } from "@/data/services";
import { portfolioItems } from "@/data/portfolio";
import { getAllPosts } from "@/lib/blog";

/**
 * Static path list plus dynamically mapped entries looped in from each
 * data-driven content collection; never manually maintained per entry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${SITE_URL}/services`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE_URL}/portfolio`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${SITE_URL}/blog`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${SITE_URL}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE_URL}/contact`, priority: 0.7, changeFrequency: "monthly" },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioItems.map((item) => ({
    url: `${SITE_URL}/portfolio/${item.slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
}
