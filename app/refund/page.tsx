import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/config/site";
import { refundSections } from "@/content/legal";

export const metadata: Metadata = {
  title: "Refund and Cancellation Policy",
  description: "ShootPX refund and cancellation policy: final purchases, failed generations, billing errors and cancelling a subscription.",
  alternates: { canonical: `${siteConfig.url}/refund` },
};

export default function RefundPage() {
  return <LegalPage title="Refund and Cancellation Policy" sections={refundSections} />;
}
