"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth/AuthContext";
import { useTeam } from "@/lib/studio/TeamContext";
import { getTeamGenerations } from "@/lib/api/teams";
import { onGenerationsChanged } from "@/lib/studio/generation-events";
import { readCache, writeCache } from "@/lib/studio/session-cache";
import { dedupeByJobId } from "@/lib/tools/dedupe-generations";
import { downloadUrl } from "@/lib/tools/download";
import { relativeTime } from "@/lib/studio/relative-time";
import { useToast } from "@/lib/studio/ToastContext";
import { DetailPanel } from "@/components/studio/library/DetailPanel";
import type { Generation } from "@/lib/types/generation";

const RECENT_LIMIT = 8;

function recentCacheKey(teamId: string, userId: string) {
  return `recent:${teamId}:${userId}`;
}

function titleCaseSlug(slug: string) {
  return slug
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export function RecentWork() {
  const { activeTeamId, loading: teamsLoading } = useTeam();
  const { firebaseUser, profile } = useAuth();
  const userId = profile?.id ?? null;
  const { say } = useToast();
  const [detailId, setDetailId] = useState<string | null>(null);
  // Hydrate from last session's cache so a reload shows the previous
  // thumbnails immediately instead of a loading state.
  const [items, setItems] = useState<Generation[]>(() =>
    dedupeByJobId((activeTeamId && userId && readCache<Generation[]>(recentCacheKey(activeTeamId, userId))) || []),
  );
  const [itemsLoading, setItemsLoading] = useState(
    () => !(activeTeamId && userId && readCache<Generation[]>(recentCacheKey(activeTeamId, userId))),
  );

  function load() {
    if (!activeTeamId || !userId) {
      // Teams or the profile may still be loading — not "no projects".
      // Folded into `loading` below.
      setItems([]);
      setItemsLoading(false);
      return;
    }
    const cacheKey = recentCacheKey(activeTeamId, userId);
    const cached = readCache<Generation[]>(cacheKey);
    if (cached) setItems(dedupeByJobId(cached));
    else setItemsLoading(true);
    // The user's own finished outputs only; internal tools are excluded server-side.
    getTeamGenerations(activeTeamId, { limit: RECENT_LIMIT, userId, status: "completed" })
      .then((r) => {
        setItems(dedupeByJobId(r.generations));
        writeCache(cacheKey, r.generations);
      })
      .catch(() => {
        // Keep whatever we already have rather than blanking the grid out.
      })
      .finally(() => setItemsLoading(false));
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching recent generations when the active team changes
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTeamId, userId]);

  // Keep the strip current while Home stays open: refresh when a generation
  // finishes anywhere in the app, when the tab regains focus (e.g. a shoot
  // finished while you were elsewhere), and on a slow timer for jobs that end
  // in the background.
  useEffect(() => {
    if (!activeTeamId || !userId) return;
    const refresh = () => {
      if (document.visibilityState === "visible") load();
    };
    const unsubscribe = onGenerationsChanged(refresh);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("focus", refresh);
    const timer = setInterval(refresh, 30_000);
    return () => {
      unsubscribe();
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("focus", refresh);
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load() closes over activeTeamId/userId, which this effect is keyed on
  }, [activeTeamId, userId]);

  const viewable = items.filter((g) => g.status === "completed" && g.outputUrl);
  const detail = viewable.find((g) => g.jobId === detailId) ?? null;

  function stepDetail(dir: -1 | 1) {
    const i = viewable.findIndex((g) => g.jobId === detailId);
    if (i === -1) return;
    setDetailId(viewable[(i + dir + viewable.length) % viewable.length].jobId);
  }

  async function saveOne(g: Generation) {
    if (!g.outputUrl) return;
    const ok = await downloadUrl(g.outputUrl, `shootpx-${g.featureType}-${g.jobId.slice(0, 8)}.png`);
    if (!ok) say("Couldn't download the image — please try again");
  }

  const loading = teamsLoading || itemsLoading || (!userId && !!firebaseUser);

  return (
    <div className="flex flex-col gap-2.5 px-11 py-7">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[11px] tracking-widest text-dim">RECENT WORK</span>
        <Link href="/studio/library" className="text-[13px] text-muted hover:text-accent">
          View all →
        </Link>
      </div>

      {loading ? (
        <div className="flex min-h-20 items-center justify-center text-sm text-dim">Loading…</div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-border py-14 text-center text-dim">
          <span className="text-3xl opacity-50">▢</span>
          <span className="text-[15px] font-semibold text-muted">No work yet</span>
          <span className="max-w-xs text-[13px]">
            Your finished shoots will show up here. Pick a tool above to create your first one.
          </span>
          <Link href="/studio/tools" className="mt-1 rounded-full bg-accent px-[18px] py-2 text-[13px] font-semibold text-accent-ink hover:bg-accent-hover">
            Browse tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {items.map((g) => {
            const ready = g.status === "completed" && !!g.outputUrl;
            const open = () => ready && setDetailId(g.jobId);
            return (
              <div
                key={g.jobId}
                role={ready ? "button" : undefined}
                tabIndex={ready ? 0 : undefined}
                aria-label={ready ? `Open ${titleCaseSlug(g.featureType)}` : undefined}
                onClick={open}
                onKeyDown={(e) => {
                  if (e.target !== e.currentTarget || (e.key !== "Enter" && e.key !== " ")) return;
                  e.preventDefault();
                  open();
                }}
                className={`group relative aspect-square overflow-hidden border border-border bg-surface outline-none transition-colors focus-visible:border-accent ${
                  ready ? "cursor-pointer hover:border-border-strong" : ""
                }`}
              >
                {ready ? (
                  <Image
                    src={g.outputUrl!}
                    alt={g.title}
                    fill
                    sizes="12vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-2 text-center text-[11px] text-dim">
                    {g.status === "failed" ? "Failed" : "Processing"}
                  </div>
                )}

                {ready && (
                  <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
                    {[
                      { label: "Open", Icon: ExternalLink, run: open },
                      { label: "Download", Icon: Download, run: () => saveOne(g) },
                    ].map(({ label, Icon, run }) => (
                      <button
                        key={label}
                        title={label}
                        aria-label={`${label} ${titleCaseSlug(g.featureType)}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          run();
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-white backdrop-blur hover:bg-accent hover:text-accent-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Icon size={14} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-2.5 pb-2 pt-8">
                  <div className="truncate text-[13px] font-semibold leading-tight text-white">
                    {titleCaseSlug(g.featureType)}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/70">{relativeTime(g.createdAt)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {detail && (
        <DetailPanel
          item={detail}
          toolLabel={titleCaseSlug(detail.featureType)}
          memberName={null}
          onClose={() => setDetailId(null)}
          onStep={stepDetail}
          canStep={viewable.length > 1}
          onDownload={() => saveOne(detail)}
        />
      )}
    </div>
  );
}
