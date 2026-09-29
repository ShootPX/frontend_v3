"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, LayoutGrid, List } from "lucide-react";
import { useTeam } from "@/lib/studio/TeamContext";
import { useToast } from "@/lib/studio/ToastContext";
import { DetailPanel } from "@/components/studio/library/DetailPanel";
import { Dropdown } from "@/components/ui/Dropdown";
import { getTeamGenerations, getTeamMembers } from "@/lib/api/teams";
import { getTools } from "@/lib/api/tools";
import { readCache, writeCache } from "@/lib/studio/session-cache";
import { dedupeByJobId } from "@/lib/tools/dedupe-generations";
import { titleCase } from "@/lib/tools/group-by-category";
import type { Generation, GenerationsPeriod } from "@/lib/types/generation";
import type { TeamMember } from "@/lib/types/team";
import type { Tool } from "@/lib/types/tool";

const PAGE_SIZE = 25;

type DateChoice = GenerationsPeriod | "custom";
const DATE_CHOICES: { value: DateChoice; label: string }[] = [
  { value: "all_time", label: "All time" },
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_30_days", label: "Last 30 days" },
  { value: "custom", label: "Custom" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function shortDay(ymd: string) {
  return new Date(`${ymd}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Local-day bounds, sent as ISO instants so the backend filters on the
// user's own calendar days.
const dayStart = (ymd: string) => new Date(`${ymd}T00:00:00`).toISOString();
const dayEnd = (ymd: string) => new Date(`${ymd}T23:59:59.999`).toISOString();

// First row of the grid is above the fold: those images load eagerly.
const PRIORITY_TILES = 5;
const GRID_SIZES = "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw";

/** Image that fades in over a skeleton so the tile never pops or collapses. */
function SkeletonImage({
  src,
  alt,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-2" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={`object-cover transition-[opacity,filter] duration-300 group-hover:brightness-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

// Fetch as a blob so the browser saves the file instead of navigating to it.
async function downloadImage(g: Generation): Promise<boolean> {
  if (!g.outputUrl) return false;
  try {
    const res = await fetch(g.outputUrl);
    if (!res.ok) return false;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(await res.blob());
    a.download = `shootpx-${g.featureType}-${g.jobId.slice(0, 8)}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
    return true;
  } catch {
    return false;
  }
}

export default function StudioLibrary() {
  const { activeTeamId, loading: teamsLoading } = useTeam();
  const { say } = useToast();
  const [detailId, setDetailId] = useState<string | null>(null);

  const [tools, setTools] = useState<Tool[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [toolFilter, setToolFilter] = useState("");
  const [memberFilter, setMemberFilter] = useState("");
  const [dateChoice, setDateChoice] = useState<DateChoice>("all_time");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [customApplied, setCustomApplied] = useState<{ start: string; end: string } | null>(null);

  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Only the unfiltered first page is cached — that's what a reload lands on.
  const unfiltered = !toolFilter && !memberFilter && dateChoice === "all_time";
  const cacheKey = activeTeamId ? `library:${activeTeamId}` : null;
  const [items, setItems] = useState<Generation[]>(() =>
    dedupeByJobId((activeTeamId && readCache<Generation[]>(`library:${activeTeamId}`)) || []),
  );
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  // The in-flight list request. A new one (filter change, load more) cancels
  // it, so a slow old response can never overwrite newer results.
  const abortRef = useRef<AbortController | null>(null);
  const [itemsLoading, setItemsLoading] = useState(
    () => !(activeTeamId && readCache<Generation[]>(`library:${activeTeamId}`)),
  );

  useEffect(() => {
    getTools()
      .then((r) =>
        setTools(r.tools.filter((t) => t.status === "live").sort((a, b) => a.cardSortOrder - b.cardSortOrder)),
      )
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!activeTeamId) return;
    getTeamMembers(activeTeamId)
      .then((r) => setMembers(r.members))
      .catch(() => setMembers([]));
  }, [activeTeamId]);

  const range = dateChoice === "custom" ? customApplied : null;

  function load(nextOffset: number, replace: boolean) {
    if (!activeTeamId) {
      setItems([]);
      setItemsLoading(false);
      return;
    }
    if (dateChoice === "custom" && !range) return; // waiting for Apply
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    if (replace) {
      // Old results stay on screen until the new ones arrive.
      const cached = unfiltered && cacheKey ? readCache<Generation[]>(cacheKey) : null;
      if (cached) setItems(dedupeByJobId(cached));
      else setItemsLoading(true);
      setLoadingMore(false);
    } else {
      setLoadingMore(true);
    }
    getTeamGenerations(
      activeTeamId,
      {
        view: "library",
        limit: PAGE_SIZE,
        offset: nextOffset,
        featureType: toolFilter || undefined,
        userId: memberFilter || undefined,
        period: dateChoice === "custom" ? undefined : dateChoice,
        fromDate: range ? dayStart(range.start) : undefined,
        toDate: range ? dayEnd(range.end) : undefined,
      },
      controller.signal,
    )
      .then((r) => {
        setItems((prev) => dedupeByJobId(replace ? r.generations : [...prev, ...r.generations]));
        setHasMore(r.generations.length === PAGE_SIZE);
        setOffset(nextOffset);
        if (replace && unfiltered && cacheKey) writeCache(cacheKey, r.generations);
        if (replace) setSelected(new Set());
      })
      .catch(() => {
        // Aborted by a newer request, or failed: keep what we already have
        // rather than blanking the grid out.
      })
      .finally(() => {
        if (abortRef.current !== controller) return; // superseded — the newer request owns the flags
        setItemsLoading(false);
        setLoadingMore(false);
      });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refetching from the top when a filter changes
    load(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTeamId, toolFilter, memberFilter, dateChoice, customApplied]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const loading = teamsLoading || itemsLoading;
  const memberById = new Map(members.map((m) => [m.userId, m.name || m.email]));

  const filtersActive = !!toolFilter || !!memberFilter || dateChoice !== "all_time";

  function clearFilters() {
    setToolFilter("");
    setMemberFilter("");
    setDateChoice("all_time");
    setCustomApplied(null);
    setCustomStart("");
    setCustomEnd("");
  }
  const toolName = useMemo(() => new Map(tools.map((t) => [t.featureType, t.displayName])), [tools]);
  const labelFor = (g: Generation) => toolName.get(g.featureType) ?? titleCase(g.featureType);

  const dateLabel =
    dateChoice === "custom" && customApplied
      ? `${shortDay(customApplied.start)} – ${shortDay(customApplied.end)}`
      : DATE_CHOICES.find((d) => d.value === dateChoice)!.label;

  function toggle(g: Generation) {
    if (g.status !== "completed" || !g.outputUrl) return; // failed jobs have no output
    setSelected((prev) => {
      const next = new Set(prev);
      if (!next.delete(g.jobId)) next.add(g.jobId);
      return next;
    });
  }

  function exitSelect() {
    setSelectMode(false);
    setSelected(new Set());
  }

  function downloadSelected() {
    const picked = items.filter((g) => selected.has(g.jobId));
    exitSelect();
    say(`Downloading ${picked.length} image${picked.length === 1 ? "" : "s"}…`);
    picked.forEach((g, i) =>
      setTimeout(async () => {
        if (!(await downloadImage(g))) say("Couldn't download an image — please try again");
      }, i * 250),
    );
  }

  function onItemClick(g: Generation) {
    if (selectMode) toggle(g);
    else if (g.status === "completed" && g.outputUrl) setDetailId(g.jobId);
  }

  const viewable = items.filter((g) => g.status === "completed" && g.outputUrl);
  const detail = viewable.find((g) => g.jobId === detailId) ?? null;
  function stepDetail(dir: -1 | 1) {
    const i = viewable.findIndex((g) => g.jobId === detailId);
    if (i === -1 || viewable.length < 2) return;
    setDetailId(viewable[(i + dir + viewable.length) % viewable.length].jobId);
  }

  const checkbox = (g: Generation) => {
    const on = selected.has(g.jobId);
    const disabled = g.status !== "completed" || !g.outputUrl;
    return (
      <span
        className={`flex h-5 w-5 flex-none items-center justify-center rounded border-[1.5px] text-accent-ink ${
          on ? "border-accent bg-accent" : "border-border-strong bg-surface"
        } ${disabled ? "opacity-30" : ""}`}
      >
        {on && <Check size={13} strokeWidth={3} />}
      </span>
    );
  };

  const thumb = (g: Generation, sizes: string, priority = false) =>
    g.status === "completed" && g.outputUrl ? (
      <SkeletonImage src={g.outputUrl} alt={g.title || labelFor(g)} sizes={sizes} priority={priority} />
    ) : (
      <div className="flex h-full items-center justify-center p-2 text-center text-[11px] text-dim">
        {g.status === "failed" ? "Failed" : "Processing"}
      </div>
    );

  return (
    <div className="flex flex-col gap-6 px-10 py-7">
      <div className="flex flex-wrap items-center gap-2.5">
        <Dropdown
          ariaLabel="Filter by tool"
          label={toolFilter ? (toolName.get(toolFilter) ?? titleCase(toolFilter)) : "All tools"}
          value={toolFilter}
          onChange={setToolFilter}
          options={[
            { value: "", label: "All tools" },
            ...tools.map((t) => ({ value: t.featureType, label: t.displayName })),
          ]}
        />

        <Dropdown
          ariaLabel="Filter by member"
          label={memberFilter ? (memberById.get(memberFilter) ?? "Member") : "All members"}
          value={memberFilter}
          onChange={setMemberFilter}
          options={[
            { value: "", label: "All members" },
            ...members.map((m) => ({ value: m.userId, label: m.name || m.email })),
          ]}
        />

        <Dropdown
          ariaLabel="Filter by date"
          label={dateLabel}
          value={dateChoice}
          onChange={(v) => setDateChoice(v as DateChoice)}
          closeOnSelect={(v) => v !== "custom"}
          options={DATE_CHOICES}
          footer={({ close }) =>
            dateChoice === "custom" && (
              <div className="flex flex-col gap-2 border-t border-border p-3">
                <div className="flex gap-2">
                  <input
                    type="date"
                    aria-label="Start date"
                    value={customStart}
                    max={customEnd || undefined}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="min-w-0 flex-1 border border-border bg-bg px-2 py-1.5 text-xs [color-scheme:dark]"
                  />
                  <input
                    type="date"
                    aria-label="End date"
                    value={customEnd}
                    min={customStart || undefined}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="min-w-0 flex-1 border border-border bg-bg px-2 py-1.5 text-xs [color-scheme:dark]"
                  />
                </div>
                <button
                  disabled={!customStart || !customEnd}
                  onClick={() => {
                    setCustomApplied({ start: customStart, end: customEnd });
                    close();
                  }}
                  className="rounded-full bg-accent py-2 text-[12.5px] font-semibold text-accent-ink hover:bg-accent-hover disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            )
          }
        />

        {filtersActive && (
          <button onClick={clearFilters} className="text-[12.5px] text-accent hover:text-accent-hover hover:underline">
            Clear filters
          </button>
        )}

        <div className="flex-1" />

        {selected.size > 0 && (
          <button
            onClick={downloadSelected}
            className="whitespace-nowrap rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-accent-ink hover:bg-accent-hover"
          >
            Download ({selected.size})
          </button>
        )}
        <button
          onClick={() => (selectMode ? exitSelect() : setSelectMode(true))}
          className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13px] hover:border-accent ${
            selectMode ? "border-accent text-accent" : "border-border-strong text-text"
          }`}
        >
          {selectMode ? "Cancel" : "Select"}
        </button>
        <div className="flex border border-border">
          <button
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className={`px-3 py-2.5 ${view === "grid" ? "bg-accent text-accent-ink" : "bg-bg text-dim"}`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView("list")}
            aria-label="List view"
            className={`border-l border-border px-3 py-2.5 ${view === "list" ? "bg-accent text-accent-ink" : "bg-bg text-dim"}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {loading && items.length === 0 ? (
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5" aria-busy="true" aria-label="Loading">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="aspect-square animate-pulse border border-border bg-surface" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3.5 text-center text-dim">
          <span className="text-4xl opacity-50">▢</span>
          <span className="text-[15px] font-semibold text-muted">
            {unfiltered ? "No projects yet" : "No results for these filters"}
          </span>
          <span className="text-[13px]">
            {unfiltered ? "Run a tool to generate your first shoot." : "Try changing or clearing a filter."}
          </span>
        </div>
      ) : (
        <>
          {view === "grid" ? (
            <div
              className={`grid grid-cols-2 gap-3.5 transition-opacity sm:grid-cols-3 lg:grid-cols-5 ${
                itemsLoading && !loadingMore ? "opacity-60" : ""
              }`}
            >
              {items.map((g, i) => (
                <button
                  key={g.jobId}
                  onClick={() => onItemClick(g)}
                  aria-current={g.jobId === detailId ? "true" : undefined}
                  className={`group relative aspect-square overflow-hidden border bg-surface text-left outline-none transition-colors focus-visible:border-accent ${
                    selected.has(g.jobId) || g.jobId === detailId
                      ? "border-accent"
                      : "border-border hover:border-border-strong"
                  } ${g.jobId === detailId ? "ring-1 ring-accent" : ""}`}
                >
                  {thumb(g, GRID_SIZES, i < PRIORITY_TILES)}
                  {selectMode && <span className="absolute left-2 top-2">{checkbox(g)}</span>}
                </button>
              ))}
            </div>
          ) : (
            <div className="border border-border">
              {items.map((g) => (
                <button
                  key={g.jobId}
                  onClick={() => onItemClick(g)}
                  className="grid w-full grid-cols-[1fr_100px] items-center gap-3 border-b border-border px-4 py-2.5 text-left last:border-b-0 hover:bg-surface"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {selectMode && checkbox(g)}
                    <div className="relative h-9 w-9 flex-none overflow-hidden bg-surface">{thumb(g, "40px")}</div>
                    <span className="truncate text-[13px] font-medium">{labelFor(g)}</span>
                  </div>
                  <span className="text-right font-mono text-[11px] text-dim">{formatDate(g.createdAt)}</span>
                </button>
              ))}
            </div>
          )}

          {hasMore && (
            <button
              onClick={() => load(offset + PAGE_SIZE, false)}
              disabled={loading || loadingMore}
              className="mx-auto flex items-center gap-2 rounded-full border border-border-strong px-6 py-2.5 text-[13px] font-medium hover:border-accent disabled:opacity-60"
            >
              {loadingMore && (
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-border-strong border-t-accent" />
              )}
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          )}
        </>
      )}

      {detail && (
        <DetailPanel
          item={detail}
          toolLabel={labelFor(detail)}
          memberName={detail.userId ? (memberById.get(detail.userId) ?? (members.length ? "Former member" : null)) : null}
          onClose={() => setDetailId(null)}
          onStep={stepDetail}
          canStep={viewable.length > 1}
          onDownload={async () => {
            if (!(await downloadImage(detail))) say("Couldn't download this image — please try again");
          }}
        />
      )}
    </div>
  );
}
