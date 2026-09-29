import Link from "next/link";
import { SIGNUP_CREDITS, SIGNUP_CREDITS_NOTE } from "@/lib/config/site";

/** End-of-page call to action. Links to /auth and carries the free-credits line with its footnote. */
export function SeoCta() {
  return (
    <section
      aria-label="Get started"
      className="relative overflow-hidden rounded-3xl border border-border-strong bg-surface px-6 py-12 text-center sm:px-12"
    >
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(200,255,0,0.14),transparent)]" />
      <div className="relative flex flex-col items-center gap-4">
        <h2 className="max-w-[22ch] font-heading text-[clamp(26px,3.4vw,38px)] font-bold leading-[1.08] tracking-tight">
          Start with one product photo.
        </h2>
        <p className="max-w-[46ch] text-[15px] leading-relaxed text-muted">
          Upload a photo, pick a tool and review what it generates before you download anything.
        </p>
        <Link
          href="/auth"
          className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-ink hover:bg-accent-hover"
        >
          Try ShootPX
        </Link>
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[12px] tracking-wide text-muted">
            {SIGNUP_CREDITS} FREE CREDITS ON SIGNUP*
          </span>
          <span className="text-[11px] text-dim">*{SIGNUP_CREDITS_NOTE}</span>
        </div>
      </div>
    </section>
  );
}
