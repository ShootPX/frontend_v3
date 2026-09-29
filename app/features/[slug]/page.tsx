import { metadataFor, renderSeoPage, staticParamsFor } from "@/components/seo/seoRoutes";

export const generateStaticParams = staticParamsFor("features");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return metadataFor("features", params);
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return renderSeoPage("features", params);
}
