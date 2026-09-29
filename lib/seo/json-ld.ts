import { siteConfig } from "@/lib/config/site";
import { faqs } from "@/content/faq";
import type { BillingResponse } from "@/lib/types/billing";

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
        logo: `${siteConfig.url}/icon.png`,
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
export function buildHomeJsonLd(billing?: BillingResponse) {
  // Real prices from the plans API (paise -> rupees); omitted if the API returned none.
  const plans = [...(billing?.subscriptions ?? []), ...(billing?.credits ?? [])];
  const offers = plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    price: (p.price / 100).toFixed(2),
    priceCurrency: "INR",
    url: `${siteConfig.url}/#pricing`,
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: siteConfig.name,
        applicationCategory: "DesignApplication",
        operatingSystem: "Web browser",
        ...(offers.length > 0 ? { offers } : {}),
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
