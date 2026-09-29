import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SeoBlocks } from "@/components/seo/SeoBlocks";
import { SeoCta } from "@/components/seo/SeoCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { AUTHOR_NAME, breadcrumbsFor, buildSeoJsonLd, relatedPages, seoPath } from "@/lib/seo/pages";
import type { SeoPage } from "@/content/seo/types";

const GROUP_LABEL: Record<SeoPage["group"], string> = {
  pillar: "GUIDE",
  features: "FEATURE",
  "use-cases": "USE CASE",
  for: "FOR SELLERS",
  blog: "BLOG",
};

const TOC_MIN_SECTIONS = 4;

const sectionId = (h2: string) =>
  h2
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export function SeoPageLayout({ page }: { page: SeoPage }) {
  const crumbs = breadcrumbsFor(page);
  const related = relatedPages(page);
  const showToc = page.sections.length >= TOC_MIN_SECTIONS;
  const isBlog = page.group === "blog";

  return (
    <>
      <JsonLd data={buildSeoJsonLd(page)} />
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-5 sm:pt-32">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-dim">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className="max-w-[40ch] truncate text-muted">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-text">
                      {c.name}
                    </Link>
                  )}
                  {!last && <span aria-hidden="true">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>

        <article>
          <header>
            <span className="font-mono text-[11px] tracking-widest text-accent-dim">{GROUP_LABEL[page.group]}</span>
            <h1 className="mt-3 font-heading text-[clamp(30px,4.6vw,46px)] font-bold leading-[1.08] tracking-tight">
              {page.h1}
            </h1>
            <p className="mt-5 text-[17.5px] leading-[1.7] text-text">{page.intro}</p>
            <p className="mt-5 text-[13px] text-dim">
              By {AUTHOR_NAME}
              {isBlog && (
                <>
                  {" · "}
                  <time dateTime={page.publishedAt}>{formatDate(page.publishedAt)}</time>
                </>
              )}
              {" · Updated "}
              <time dateTime={page.updatedAt}>{formatDate(page.updatedAt)}</time>
            </p>
          </header>

          {showToc && (
            <nav aria-label="On this page" className="mt-8 rounded-2xl border border-border bg-surface p-5">
              <span className="font-mono text-[10.5px] tracking-widest text-dim">ON THIS PAGE</span>
              <ol className="mt-3 flex flex-col gap-1.5 text-[14px]">
                {page.sections.map((s) => (
                  <li key={s.h2}>
                    <a href={`#${sectionId(s.h2)}`} className="text-muted hover:text-accent">
                      {s.h2}
                    </a>
                  </li>
                ))}
                {page.faq.length > 0 && (
                  <li>
                    <a href="#faq" className="text-muted hover:text-accent">
                      Frequently asked questions
                    </a>
                  </li>
                )}
              </ol>
            </nav>
          )}

          <div className="mt-12 flex flex-col gap-12">
            {page.sections.map((s) => (
              <section key={s.h2} id={sectionId(s.h2)} className="scroll-mt-24">
                <h2 className="mb-4 font-heading text-[clamp(22px,2.8vw,28px)] font-semibold leading-tight tracking-tight">
                  {s.h2}
                </h2>
                <SeoBlocks blocks={s.blocks} />
              </section>
            ))}

            {page.faq.length > 0 && (
              <section id="faq" className="scroll-mt-24">
                <h2 className="mb-4 font-heading text-[clamp(22px,2.8vw,28px)] font-semibold leading-tight tracking-tight">
                  Frequently asked questions
                </h2>
                <div className="flex flex-col divide-y divide-border rounded-2xl border border-border">
                  {page.faq.map((f) => (
                    <div key={f.q} className="p-5">
                      <h3 className="font-heading text-[16.5px] font-semibold tracking-tight">{f.q}</h3>
                      <p className="mt-2 text-[15px] leading-[1.7] text-muted">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <aside aria-label="Related pages" className="mt-16">
            <span className="font-mono text-[10.5px] tracking-widest text-dim">KEEP READING</span>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={seoPath(r)}
                    className="flex h-full flex-col gap-1.5 rounded-2xl border border-border bg-surface p-4 hover:border-accent"
                  >
                    <span className="font-mono text-[10px] tracking-widest text-accent-dim">{GROUP_LABEL[r.group]}</span>
                    <span className="font-heading text-[15.5px] font-semibold leading-snug tracking-tight">{r.h1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="mt-16">
          <SeoCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
