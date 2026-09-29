import type { Metadata } from "next";

// Sign-in / invite flows have nothing to index. (next.config.ts also sends an
// X-Robots-Tag header; this makes the page's own meta tag agree.)
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
