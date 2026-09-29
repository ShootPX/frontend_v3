import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import { allSeoPages } from "@/content/seo";
import type { SeoGroup, SeoPage } from "@/content/seo/types";

export const AUTHOR_NAME = "ShootPX Team";

export function seoPath(page: Pick<SeoPage, "group" | "slug">): string {
  return page.group === "pillar" ? `/${page.slug}` : `/${page.group}/${page.slug}`;
}

export const seoUrl = (page: Pick<SeoPage, "group" | "slug">) => `${siteConfig.url}${seoPath(page)}`;

export const publishedPages = (): SeoPage[] => allSeoPages.filter((p) => p.published);

export function publishedInGroup(group: SeoGroup): SeoPage[] {
  return publishedPages().filter((p) => p.group === group);
}

/** Published page for a slug in a group, or undefined (callers turn that into notFound()). */
export function findPublished(group: SeoGroup, slug: string): SeoPage | undefined {
  return allSeoPages.find((p) => p.published && p.group === group && p.slug === slug);
}

/** Published pages this one links to. Unpublished slugs are dropped so no link ever 404s. */
export function relatedPages(page: SeoPage): SeoPage[] {
  return page.related
    .map((slug) => allSeoPages.find((p) => p.slug === slug))
    .filter((p): p is SeoPage => !!p && p.published && p.slug !== page.slug);
}

/** Newest first. */
export function blogPosts(): SeoPage[] {
  return publishedInGroup("blog").sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function buildSeoMetadata(page: SeoPage): Metadata {
  const url = seoUrl(page);
  const image = { url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: siteConfig.name };
  return {
    // `absolute` skips the "· ShootPX" template so the length limit applies to what we wrote.
    title: { absolute: page.title },
    description: page.metaDescription,
    alternates: { canonical: url },
    robots: "index, follow, max-image-preview:large",
    openGraph: {
      type: page.group === "blog" ? "article" : "website",
      siteName: siteConfig.name,
      locale: "en_IN",
      title: page.title,
      description: page.metaDescription,
      url,
      images: [image],
      ...(page.group === "blog"
        ? { publishedTime: page.publishedAt, modifiedTime: page.updatedAt, authors: [AUTHOR_NAME] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: [image.url],
    },
  };
}

export type Crumb = { name: string; href: string };

/**
 * Breadcrumb trail for a page. Groups with no index page of their own
 * (features, use-cases, for) point at the pillar page instead of a URL that 404s.
 */
export function breadcrumbsFor(page: SeoPage): Crumb[] {
  const crumbs: Crumb[] = [{ name: "Home", href: "/" }];
  if (page.group === "pillar") return [...crumbs, { name: page.h1, href: seoPath(page) }];
  crumbs.push({ name: "AI product photography", href: "/ai-product-photography" });
  if (page.group === "blog") crumbs.push({ name: "Blog", href: "/blog" });
  crumbs.push({ name: page.h1, href: seoPath(page) });
  return crumbs;
}

const abs = (href: string) => `${siteConfig.url}${href === "/" ? "/" : href}`;

export function buildSeoJsonLd(page: SeoPage) {
  const url = seoUrl(page);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbsFor(page).map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: abs(c.href),
      })),
    },
  ];

  if (page.group === "blog") {
    graph.push({
      "@type": "Article",
      headline: page.h1,
      description: page.metaDescription,
      mainEntityOfPage: url,
      datePublished: page.publishedAt,
      dateModified: page.updatedAt,
      inLanguage: "en-IN",
      author: { "@type": "Organization", name: AUTHOR_NAME, url: `${siteConfig.url}/` },
      publisher: { "@id": `${siteConfig.url}/#org` },
    });
  }

  if (page.group === "pillar" || page.group === "features") {
    // No offers, no rating: neither is something we can back up here.
    graph.push({
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web browser",
      url,
      description: page.metaDescription,
    });
  }

  if (page.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
