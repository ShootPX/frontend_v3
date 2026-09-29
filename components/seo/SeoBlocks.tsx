import Image from "next/image";
import type { Block } from "@/content/seo/types";

/** Renders content blocks. Server component — no client state involved. */
export function SeoBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="text-[16px] leading-[1.75] text-muted">
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex list-disc flex-col gap-2 pl-5 text-[16px] leading-[1.7] text-muted marker:text-accent-dim">
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="flex list-decimal flex-col gap-2 pl-5 text-[16px] leading-[1.7] text-muted marker:font-mono marker:text-accent-dim">
                {b.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ol>
            );
          case "tip":
            return (
              <aside key={i} className="rounded-2xl border border-border-strong bg-surface p-5">
                <span className="font-mono text-[10.5px] tracking-widest text-accent-dim">
                  {(b.title ?? "TIP").toUpperCase()}
                </span>
                <p className="mt-2 text-[15px] leading-[1.7] text-text">{b.text}</p>
              </aside>
            );
          case "image":
            return (
              <figure key={i} className="my-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover"
                  />
                </div>
                {b.caption && <figcaption className="mt-2 text-[13px] text-dim">{b.caption}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
