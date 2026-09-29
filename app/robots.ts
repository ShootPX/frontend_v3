import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The signed-in app and auth flows are private — nothing to index.
      disallow: ["/studio", "/auth", "/invite", "/api"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
