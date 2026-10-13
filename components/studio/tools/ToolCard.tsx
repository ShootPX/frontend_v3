import Link from "next/link";
import type { Tool } from "@/lib/types/tool";
import { ToolThumb } from "./ToolThumb";

const TILE =
  "group relative block aspect-square overflow-hidden border border-border bg-surface outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function ToolCard({ tool }: { tool: Tool }) {
  const soon = tool.status !== "live";

  const body = (
    <>
      <ToolThumb tool={tool} sizes="(max-width: 640px) 50vw, 160px" />

      {/* Bottom scrim keeps the name readable on any image. */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {soon && (
        <span className="absolute right-1.5 top-1.5 rounded-sm bg-black/60 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-accent backdrop-blur">
          SOON
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-2.5 text-[13px] font-semibold leading-tight text-white transition-colors group-hover:text-accent">
        {tool.displayName}
      </span>
    </>
  );

  return soon ? (
    <div className={`${TILE} opacity-60`}>{body}</div>
  ) : (
    <Link href={`/studio/tools/${tool.featureType}`} className={TILE} aria-label={tool.displayName}>
      {body}
    </Link>
  );
}
