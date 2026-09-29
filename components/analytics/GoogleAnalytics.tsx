import Script from "next/script";

// Renders nothing unless this is a production build AND NEXT_PUBLIC_GA_ID is
// set, so local dev never sends data. There is no cookie-consent banner yet: if
// you serve EU/UK visitors, gate this on consent.
export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (process.env.NODE_ENV !== "production" || !id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
