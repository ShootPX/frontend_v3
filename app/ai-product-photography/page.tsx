import { notFound } from "next/navigation";
import { SeoPageLayout } from "@/components/seo/SeoPageLayout";
import { buildSeoMetadata, findPublished } from "@/lib/seo/pages";

const SLUG = "ai-product-photography";

export function generateMetadata() {
  const page = findPublished("pillar", SLUG);
  return page ? buildSeoMetadata(page) : {};
}

export default function Page() {
  const page = findPublished("pillar", SLUG);
  if (!page) notFound();
  return <SeoPageLayout page={page} />;
}
