import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SeoPageLayout } from "@/components/seo/SeoPageLayout";
import { buildSeoMetadata, findPublished, publishedInGroup } from "@/lib/seo/pages";
import type { SeoGroup } from "@/content/seo/types";

/**
 * Shared bodies for the [slug] routes, so each route file is a few lines and
 * an unknown or unpublished slug always ends in notFound().
 */
export const staticParamsFor = (group: SeoGroup) => () =>
  publishedInGroup(group).map((p) => ({ slug: p.slug }));

export async function metadataFor(group: SeoGroup, params: Promise<{ slug: string }>): Promise<Metadata> {
  const { slug } = await params;
  const page = findPublished(group, slug);
  return page ? buildSeoMetadata(page) : {};
}

export async function renderSeoPage(group: SeoGroup, params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const page = findPublished(group, slug);
  if (!page) notFound();
  return <SeoPageLayout page={page} />;
}
