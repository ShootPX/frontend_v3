"use client";

import { createElement, useState } from "react";
import Image from "next/image";
import type { Tool } from "@/lib/types/tool";
import { iconForTool } from "@/lib/tools/icon-map";

/**
 * Fills its (relatively positioned) parent with the tool's thumbUrl from the
 * API. When the URL is missing or fails to load, shows a plain neutral tile with the
 * tool's icon instead, so the card never collapses or shows a broken image.
 */
export function ToolThumb({ tool, sizes }: { tool: Tool; sizes: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = tool.thumbUrl?.trim() || null;

  if (src && src !== failedSrc) {
    return (
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        onError={() => setFailedSrc(src)}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-surface">
      {createElement(iconForTool(tool), { size: 28, strokeWidth: 1.25, className: "text-dim" })}
    </div>
  );
}
