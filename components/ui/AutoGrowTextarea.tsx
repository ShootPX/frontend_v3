"use client";

import { useLayoutEffect, useRef, type TextareaHTMLAttributes } from "react";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> & {
  /** Height (px) at which it stops growing and scrolls inside itself. */
  maxHeight?: number;
  /** Starting height, in lines. */
  minRows?: number;
};

/** Textarea that starts ~3 lines tall, grows with its text, then scrolls past maxHeight. */
export function AutoGrowTextarea({ maxHeight = 200, minRows = 3, className = "", style, value, ...rest }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.height = "auto";
      // scrollHeight excludes the border; add it back so no scrollbar appears early.
      const border = el.offsetHeight - el.clientHeight;
      const full = el.scrollHeight + border;
      el.style.height = `${Math.min(full, maxHeight)}px`;
      el.style.overflowY = full > maxHeight ? "auto" : "hidden";
    };
    fit();
    // Width changes re-wrap the text, which changes the height it needs.
    const ro = new ResizeObserver(() => fit());
    ro.observe(el);
    return () => ro.disconnect();
  }, [value, maxHeight]);

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      style={{ resize: "none", ...style }}
      className={`scroll-slim ${className}`}
      {...rest}
    />
  );
}
