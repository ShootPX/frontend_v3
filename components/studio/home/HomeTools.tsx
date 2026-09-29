"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Tool } from "@/lib/types/tool";
import { iconForTool } from "@/lib/tools/icon-map";
import { categoryRank, isLive } from "@/lib/types/tool";
import { titleCase } from "@/lib/tools/group-by-category";
import { categoryBlurbs } from "@/content/tools-grid";

export function HomeTools({ tools }: { tools: Tool[] }) {
  const categories = useMemo(() => {
    // Only categories that have a live tool get a tab — SOON categories are
    // not shown on Home for now.
    const seen: string[] = [];
    for (const t of tools) if (isLive(t) && !seen.includes(t.category)) seen.push(t.category);
    return seen.sort((a, b) => categoryRank(a) - categoryRank(b));
  }, [tools]);

  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? tools : tools.filter((t) => t.category === filter);
  const live = filtered.filter(isLive).sort((a, b) => a.cardSortOrder - b.cardSortOrder);

  return (
    <div className="flex flex-col gap-3 border-b border-border px-11 py-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setFilter("All")}
          className={`border-b-2 px-3.5 py-2 text-[13px] outline-none focus-visible:ring-1 focus-visible:ring-accent ${
            filter === "All" ? "border-accent text-text" : "border-transparent text-dim"
          }`}
        >
          Live tools
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`border-b-2 px-3.5 py-2 text-[13px] outline-none focus-visible:ring-1 focus-visible:ring-accent ${
              filter === c ? "border-accent text-text" : "border-transparent text-dim"
            }`}
          >
            {titleCase(c)}
          </button>
        ))}
        <Link href="/studio/tools" className="ml-auto text-[13px] text-muted hover:text-accent">
          See all →
        </Link>
      </div>

      {filter !== "All" && categoryBlurbs[titleCase(filter)] && (
        <p className="-mt-1 text-[12.5px] text-dim">{categoryBlurbs[titleCase(filter)]}</p>
      )}

      {tools.length === 0 && filter === "All" ? (
        <p className="text-center text-sm text-dim">Couldn&apos;t load live tool data right now.</p>
      ) : live.length === 0 ? (
        <div className="flex min-h-20 items-center justify-center border border-border text-[13.5px] text-dim">
          This section is currently being built.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {live.map((t) => {
            const Icon = iconForTool(t);
            return (
              <Link
                key={t.featureType}
                href={`/studio/tools/${t.featureType}`}
                className="group flex flex-col gap-1.5 bg-bg px-4 py-3.5 transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-accent"
              >
                <Icon size={18} className="text-text/85 transition-colors group-hover:text-accent" />
                <span className="text-[13.5px] font-semibold transition-colors group-hover:text-accent">{t.displayName}</span>
                <span className="text-[11.5px] leading-snug text-muted">{t.description}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
