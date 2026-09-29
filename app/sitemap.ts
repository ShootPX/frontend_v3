import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { STATIC_PAGES_UPDATED, blogPosts, publishedPages, seoUrl } from "@/lib/seo/pages";

// Only public, indexable pages. SEO pages appear only while `published: true`.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = publishedPages();
  const posts = blogPosts();
  // The blog index changes whenever a post does.
  const blogIndexModified = posts.map((p) => p.updatedAt).sort().at(-1);

  return [
    { url: `${siteConfig.url}/`, lastModified: STATIC_PAGES_UPDATED, changeFrequency: "weekly", priority: 1 },
    ...(posts.length > 0
      ? [
          {
            url: `${siteConfig.url}/blog`,
            lastModified: blogIndexModified,
            changeFrequency: "weekly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...pages.map((p) => ({
      url: seoUrl(p),
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: p.group === "pillar" ? 0.9 : p.group === "blog" ? 0.6 : 0.7,
    })),
    { url: `${siteConfig.url}/privacy`, lastModified: STATIC_PAGES_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms`, lastModified: STATIC_PAGES_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/refund`, lastModified: STATIC_PAGES_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/contact`, lastModified: STATIC_PAGES_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  ];
}
