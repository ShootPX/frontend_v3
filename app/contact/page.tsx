import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config/site";
import { contactContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact ShootPX support by email, and what to include so we can help quickly.",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-32">
        <span className="font-mono text-[11px] tracking-widest text-accent-dim">SUPPORT</span>
        <h1 className="mt-3 font-heading text-[clamp(32px,4vw,44px)] font-bold tracking-tight">Contact</h1>
        <div className="mt-10 flex flex-col gap-8">
          <section>
            <p className="text-[15px] leading-relaxed text-muted">{contactContent.intro}</p>
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="mt-2 inline-block text-[15px] text-accent hover:text-accent-hover"
            >
              {siteConfig.supportEmail}
            </a>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{contactContent.replyTime}</p>
          </section>
          <section>
            <h2 className="font-heading text-lg font-semibold tracking-tight">What to include</h2>
            <ul className="mt-2 list-disc pl-5 text-[15px] leading-relaxed text-muted">
              {contactContent.include.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
