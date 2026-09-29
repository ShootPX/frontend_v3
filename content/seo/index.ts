import type { SeoPage } from "./types";
import { pillarPages } from "./pillar";
import { featurePages } from "./features";
import { useCasePages } from "./use-cases";
import { platformPages } from "./platforms";
import { blogPagesA } from "./blog-a";
import { blogPagesB } from "./blog-b";
import { blogPagesC } from "./blog-c";

/**
 * Every SEO page, published or not. Release a page by flipping `published`
 * to true in its own file — routes, sitemap, footer and related links all read
 * that flag through lib/seo/pages.ts.
 */
export const allSeoPages: SeoPage[] = [
  ...pillarPages,
  ...featurePages,
  ...useCasePages,
  ...platformPages,
  ...blogPagesA,
  ...blogPagesB,
  ...blogPagesC,
];
