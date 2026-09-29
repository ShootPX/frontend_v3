"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Vertical scroll area with a slim dark scrollbar and a soft fade at the
 * bottom edge that goes away once scrolled to the end (or when nothing scrolls).
 */
export function ScrollFade({
  children,
  className = "",
  contentClassName = "",
}: {
  children: ReactNode;
  /** Sizing of the outer box, e.g. "flex-1". */
  className?: string;
  /** Padding etc. for the scrolling content. */
  contentClassName?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    const content = contentRef.current;
    if (!el || !content) return;
    const update = () => setMore(el.scrollHeight - el.scrollTop - el.clientHeight > 4);
    update();
    el.addEventListener("scroll", update, { passive: true });
    // Content grows/shrinks (uploads, textarea) and the panel can resize.
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(content);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`relative min-h-0 ${className}`}>
      <div ref={scrollRef} className="scroll-slim h-full overflow-y-auto overflow-x-hidden">
        <div ref={contentRef} className={contentClassName}>
          {children}
        </div>
      </div>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg to-transparent transition-opacity duration-200 ${
          more ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
