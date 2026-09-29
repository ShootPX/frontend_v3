import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SeoCta } from "@/components/seo/SeoCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/config/site";
import { AUTHOR_NAME, blogPosts, seoPath } from "@/lib/seo/pages";

const TITLE = "Product photography guides for Indian sellers";
const DESCRIPTION =
  "Practical guides on product photos, lighting, listing images and AI product photography, written by the ShootPX Team for Indian online sellers.";
const URL = `${siteConfig.url}/blog`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: "index, follow, max-image-preview:large",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_IN",
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default function BlogIndex() {
  const posts = blogPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: URL },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-5 sm:pt-32">
        <span className="font-mono text-[11px] tracking-widest text-accent-dim">BLOG</span>
        <h1 className="mt-3 font-heading text-[clamp(30px,4.6vw,46px)] font-bold leading-[1.08] tracking-tight">
          Product photography guides
        </h1>
        <p className="mt-5 text-[17px] leading-[1.7] text-muted">
          Plain-English guides for Indian online sellers on shooting, editing and planning product images. New
          posts are added as we publish them.
        </p>

        <ul className="mt-12 flex flex-col gap-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={seoPath(p)}
                className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 hover:border-accent"
              >
                <span className="text-[12.5px] text-dim">
                  {AUTHOR_NAME} · <time dateTime={p.publishedAt}>{formatDate(p.publishedAt)}</time>
                </span>
                <h2 className="font-heading text-[20px] font-semibold leading-snug tracking-tight">{p.h1}</h2>
                <p className="text-[14.5px] leading-relaxed text-muted">{p.metaDescription}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <SeoCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
