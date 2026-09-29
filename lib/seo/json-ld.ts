import { siteConfig } from "@/lib/config/site";
import { faqs } from "@/content/faq";

/** Site-wide entities. Safe on every page (the SEO pages reference the "#org" id). */
export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#org`,
        name: siteConfig.name,
        url: `${siteConfig.url}/`,
        description:
          "AI product photography platform for e-commerce sellers.",
        sameAs: Object.values(siteConfig.social),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: `${siteConfig.url}/`,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#org` },
      },
    ],
  };
}

/** Landing-page-only entities: its FAQ and the product summary. Other pages carry their own. */
export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "DesignApplication",
        operatingSystem: "Web browser",
        description:
          "Turn one product photo into studio-style images: listing photoshoots, creative scenes, recolor and model shoots for e-commerce sellers.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
