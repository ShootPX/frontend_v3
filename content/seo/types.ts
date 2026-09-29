/** URL group a page lives in. "pillar" is the single /ai-product-photography page. */
export type SeoGroup = "pillar" | "features" | "use-cases" | "for" | "blog";

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string; title?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type SeoSection = { h2: string; blocks: Block[] };

export type SeoFaq = { q: string; a: string };

export type SeoPage = {
  /** Unique across ALL groups — `related` resolves slugs globally. */
  slug: string;
  group: SeoGroup;
  /** <title>, under 60 characters. Rendered as-is (no site suffix). */
  title: string;
  /** Under 155 characters. */
  metaDescription: string;
  primaryKeyword: string;
  /** What the searcher is trying to do — used in the content audit, not rendered. */
  intent: string;
  h1: string;
  /** First paragraph answers the searcher's question directly. */
  intro: string;
  sections: SeoSection[];
  /** Only genuine questions a reader would ask. Empty array = no FAQ block and no FAQPage schema. */
  faq: SeoFaq[];
  /** Slugs of other SEO pages. Each page needs one feature page and at least two related pages. */
  related: string[];
  /** ISO dates, YYYY-MM-DD. */
  publishedAt: string;
  updatedAt: string;
  /** false = not routable, not in the sitemap, not listed anywhere. */
  published: boolean;
};
