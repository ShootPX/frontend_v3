import type { Block } from "./types";

// Small constructors so page files read like copy, not object literals.
export const p = (text: string): Block => ({ type: "p", text });
export const ul = (...items: string[]): Block => ({ type: "ul", items });
export const ol = (...items: string[]): Block => ({ type: "ol", items });
export const tip = (text: string, title?: string): Block => ({ type: "tip", text, title });
export const img = (src: string, alt: string, caption?: string): Block => ({ type: "image", src, alt, caption });
