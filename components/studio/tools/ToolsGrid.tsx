import type { Tool } from "@/lib/types/tool";
import { ToolCard } from "./ToolCard";
import { groupToolsByCategory, titleCase } from "@/lib/tools/group-by-category";
import { categoryBlurbs } from "@/content/tools-grid";

export function ToolsGrid({ tools }: { tools: Tool[] }) {
  const groups = groupToolsByCategory(tools);

  if (groups.size === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-sm text-dim">
        Couldn&apos;t load tools right now.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 px-4 pb-10 pt-5 md:gap-10 md:px-10 md:pb-[60px] md:pt-8">
      {[...groups.entries()].map(([category, groupTools]) => (
        <section key={category} className="flex flex-col gap-4">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border pb-3">
            <h2 className="font-heading text-xl font-semibold tracking-tight">{titleCase(category)}</h2>
            {categoryBlurbs[titleCase(category)] && (
              <p className="text-[13px] text-dim">{categoryBlurbs[titleCase(category)]}</p>
            )}
          </div>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(140px,160px))]">
            {groupTools.map((t) => (
              <ToolCard key={t.featureType} tool={t} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
