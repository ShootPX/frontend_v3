"use client";

import Image from "next/image";
import { useState } from "react";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type AvatarProps = {
  src?: string | null;
  name: string;
  /** Size, border, background and text-size classes for the box. */
  className?: string;
  sizes: string;
};

/** Profile photo, falling back to initials when there is no URL or it fails to load. */
export function Avatar({ src, name, className = "", sizes }: AvatarProps) {
  // Track which URL failed, so a new src gets a fresh attempt.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = !!src && src !== failedSrc;

  return (
    <span className={`relative flex flex-none items-center justify-center overflow-hidden ${className}`}>
      {showImage ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          // Provider photo URLs (e.g. Google) are already sized and can reject
          // requests that carry a referrer, so skip the optimizer and referrer.
          unoptimized
          referrerPolicy="no-referrer"
          onError={() => setFailedSrc(src)}
          className="object-cover"
        />
      ) : (
        initials(name)
      )}
    </span>
  );
}
