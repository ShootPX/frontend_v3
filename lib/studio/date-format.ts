const monthShort = (d: Date) => d.toLocaleDateString("en-US", { month: "short" });

/** "25 Sep 2026"; null for a missing or unparseable date. */
export function formatDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `${d.getDate()} ${monthShort(d)} ${d.getFullYear()}`;
}

/** "3:58 PM" today, otherwise "25 Sep 2026, 3:58 PM". */
export function formatExpiry(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return d.toDateString() === new Date().toDateString() ? time : `${formatDate(iso)}, ${time}`;
}
