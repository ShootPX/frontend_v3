import { metadataFor, renderSeoPage, staticParamsFor } from "@/components/seo/seoRoutes";

export const generateStaticParams = staticParamsFor("blog");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return metadataFor("blog", params);
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return renderSeoPage("blog", params);
}
