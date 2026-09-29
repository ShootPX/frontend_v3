import { metadataFor, renderSeoPage, staticParamsFor } from "@/components/seo/seoRoutes";

export const generateStaticParams = staticParamsFor("use-cases");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return metadataFor("use-cases", params);
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return renderSeoPage("use-cases", params);
}
