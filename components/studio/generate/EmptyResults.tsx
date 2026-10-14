"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { TOOL_EMPTY_PREVIEWS } from "@/lib/tools/empty-previews";

export function EmptyResults({ featureType }: { featureType?: string }) {
  const preview = featureType ? TOOL_EMPTY_PREVIEWS[featureType] : undefined;
  // Falls back to the placeholder if the image file hasn't been added yet.
  const [failed, setFailed] = useState(false);

  if (preview && !failed) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="relative aspect-[16/10] w-full max-w-[560px]">
          <Image
            src={preview.src}
            alt={preview.alt}
            fill
            sizes="(min-width: 768px) 560px, 90vw"
            className="object-contain"
            onError={() => setFailed(true)}
            priority
          />
        </div>
        <p className="max-w-[44ch] text-[14px] leading-relaxed text-muted">{preview.caption}</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
      {/* A quiet stand-in for the result canvas — no motion, nothing to read as a loader. */}
      <div className="relative flex aspect-[4/5] w-full max-w-[260px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border-strong bg-surface/40">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgb(200_255_0/0.07),transparent_65%)]"
        />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-bg/60 text-dim">
          <ImageIcon size={24} strokeWidth={1.5} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading text-[17px] font-semibold text-text">Your results will appear here</h3>
        <p className="max-w-[34ch] text-[13px] leading-relaxed text-muted">
          Upload a photo, adjust your settings, then hit Generate.
        </p>
      </div>
    </div>
  );
}
