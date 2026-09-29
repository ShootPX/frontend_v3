export type SocialPlatform = "twitter" | "instagram" | "linkedin" | "youtube";

export const socialLabels: Record<SocialPlatform, string> = {
  twitter: "X (Twitter)",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

/**
 * Social profiles — edit the URLs here. A platform with a URL appears in the
 * footer and in the Organization JSON-LD `sameAs` list; leave it "" to hide it
 * everywhere. No other file needs to change.
 */
const socialUrls: Record<SocialPlatform, string> = {
  twitter: "",
  instagram: "https://www.instagram.com/shootpx_labs",
  linkedin: "",
  youtube: "",
};

const activeSocial = Object.fromEntries(
  Object.entries(socialUrls).filter(([, url]) => url.trim() !== ""),
) as Partial<Record<SocialPlatform, string>>;

/** New-account welcome credits. A temporary launch offer — change it here only. */
export const SIGNUP_CREDITS = 5;
export const SIGNUP_CREDITS_NOTE = "Launch offer. May change or end without notice.";

const DEFAULT_SITE_URL = "https://shootpx.com";

/**
 * The production origin, from NEXT_PUBLIC_SITE_URL. An unset, non-https,
 * localhost or *.vercel.app value falls back to the real domain, so a stray
 * dev/preview setting can never leak into the sitemap, canonicals or JSON-LD.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  try {
    const u = new URL(raw);
    const bad = u.protocol !== "https:" || /^(localhost|127\.0\.0\.1)$|\.vercel\.app$/.test(u.hostname);
    return bad ? DEFAULT_SITE_URL : u.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteConfig = {
  name: "ShootPX",
  url: resolveSiteUrl(),
  supportEmail: "shootpxlabs@gmail.com",
  social: activeSocial,
};
