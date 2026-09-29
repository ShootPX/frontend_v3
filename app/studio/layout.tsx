import type { Metadata } from "next";
import { StudioShell } from "@/components/studio/StudioShell";

// Private, signed-in area: keep it out of search results. (next.config.ts also
// sends an X-Robots-Tag header; this makes the page's own meta tag agree.)
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <StudioShell>{children}</StudioShell>;
}
