import { metadataFor, renderSeoPage, staticParamsFor } from "@/components/seo/seoRoutes";

export const generateStaticParams = staticParamsFor("for");

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return metadataFor("for", params);
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return renderSeoPage("for", params);
}
