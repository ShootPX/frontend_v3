import type { LucideIcon } from "lucide-react";

export type StepFlowStep = { icon: LucideIcon; label: string };

const LOOP_SECONDS = 4.5;

/**
 * Code-built "how it works" illustration: steps in a row joined by a dotted
 * line, with a lime dot travelling along it and each step pulsing as the dot
 * reaches it. Static under prefers-reduced-motion (see globals.css).
 */
export function StepFlow({ steps }: { steps: StepFlowStep[] }) {
  const n = steps.length;
  if (n === 0) return null;

  return (
    <div
      className="relative grid rounded-2xl border border-border bg-surface/40 px-6 py-7"
      style={{ gridTemplateColumns: `repeat(${n}, minmax(72px, 1fr))` }}
      role="img"
      aria-label={steps.map((s) => s.label).join(", then ")}
    >
      {n > 1 && (
        // Spans from the centre of the first step to the centre of the last.
        <div
          className="pointer-events-none absolute top-[55px] border-t-2 border-dotted border-border-strong"
          style={{ left: `calc(1.5rem + (100% - 3rem) / ${2 * n})`, right: `calc(1.5rem + (100% - 3rem) / ${2 * n})` }}
        >
          <span
            className="flow-dot absolute -top-[5px] h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]"
            style={{ animationDuration: `${LOOP_SECONDS}s` }}
          />
        </div>
      )}

      {steps.map(({ icon: Icon, label }, i) => {
        // The dot reaches step i this far into the loop; pulse just before it.
        const reach = n > 1 ? (i / (n - 1)) * 0.8 + 0.08 : 0;
        return (
          <div key={label} className="relative flex flex-col items-center gap-2.5">
            <span
              className="flow-step flex h-[54px] w-[54px] items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-muted"
              style={{
                animationDuration: `${LOOP_SECONDS}s`,
                animationDelay: `${(reach - 0.04) * LOOP_SECONDS}s`,
              }}
            >
              <Icon size={22} strokeWidth={1.75} />
            </span>
            <span className="text-[12px] font-medium text-muted">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
