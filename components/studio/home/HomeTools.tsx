import Link from "next/link";
import type { Tool } from "@/lib/types/tool";
import { ToolCard } from "@/components/studio/tools/ToolCard";
import { isLive } from "@/lib/types/tool";

export function HomeTools({ tools }: { tools: Tool[] }) {
  const live = tools.filter(isLive).sort((a, b) => a.cardSortOrder - b.cardSortOrder);

  return (
    <div className="flex flex-col gap-4 border-b border-border px-4 py-6 md:gap-3 md:px-11 md:py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-medium text-text md:text-[13px] md:font-normal">Live tools</h2>
        <Link href="/studio/tools" className="text-[13px] text-muted hover:text-accent">
          See all →
        </Link>
      </div>

      {live.length === 0 ? (
        <p className="text-center text-sm text-dim">Couldn&apos;t load live tool data right now.</p>
      ) : (
        /* Phones: swipeable rail that scales to any number of tools. md+: grid. */
        <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-[repeat(auto-fill,minmax(140px,160px))] md:overflow-visible md:px-0 md:pb-0">
          {live.map((t) => (
            <div key={t.featureType} className="w-[42vw] max-w-[190px] flex-none snap-start md:w-auto md:max-w-none">
              <ToolCard tool={t} />
            </div>
          ))}
          {/* Some mobile browsers drop the scroll container's right padding; this keeps the last card off the edge. */}
          <div aria-hidden className="w-1 flex-none md:hidden" />
        </div>
      )}
    </div>
  );
}
