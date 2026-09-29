"use client";

import { Minus, Plus } from "lucide-react";
import { EnhancePromptButton, PROMPT_MAX_LENGTH } from "../EnhancePromptButton";
import { AutoGrowTextarea } from "@/components/ui/AutoGrowTextarea";
import { CreditIcon } from "@/components/ui/CreditIcon";
import { modelShootCost } from "@/lib/tools/model-shoot";
import { parseRatio, ratioShape } from "@/lib/tools/ratio";
import { optionLabel, optionValue, type ParamField } from "@/lib/types/generate";


const RESOLUTION_LABEL: Record<string, string> = { "1k": "1K", "2k": "2K", "4k": "4K" };

export type OutputValues = {
  aspectRatio: string;
  resolution: string;
  outputCount: number;
  prompt: string;
};

export function OutputStep({
  fields,
  values,
  onChange,
  onEnhancingChange,
}: {
  onEnhancingChange?: (busy: boolean) => void;
  fields: ParamField[];
  values: OutputValues;
  onChange: (v: OutputValues) => void;
}) {
  const ratio = fields.find((f) => f.name === "aspect_ratio");
  const resolution = fields.find((f) => f.name === "resolution");
  const count = fields.find((f) => f.name === "output_count");
  const min = count?.min ?? 1;
  const max = count?.max ?? 8;
  const set = (patch: Partial<OutputValues>) => onChange({ ...values, ...patch });

  return (
    <>
      <div className="font-heading text-[19px] font-semibold">Output settings</div>
      <div className="flex flex-col gap-3">
        {ratio && (
          <div>
            <div className="mb-1.5 text-[11.5px] text-dim">{ratio.label || "Aspect ratio"}</div>
            <div className="grid grid-cols-5 gap-1.5">
              {(ratio.options ?? []).map((o) => {
                const v = optionValue(o);
                const { width, height } = ratioShape(parseRatio(v), 34);
                const on = values.aspectRatio === v;
                return (
                  <button key={v} onClick={() => set({ aspectRatio: v })} className="flex flex-col items-center gap-1.5">
                    <div className="flex h-10 w-full items-center justify-center">
                      <div
                        className={`rounded-[3px] border-2 ${on ? "border-accent bg-accent" : "border-border-strong bg-surface-2"}`}
                        style={{ width, height }}
                      />
                    </div>
                    <span className={`text-[10.5px] ${on ? "text-accent" : "text-muted"}`}>{optionLabel(o)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <span className="text-[12.5px]">Outputs</span>
          <div className="flex items-center gap-3.5 border border-border bg-surface px-3 py-1.5">
            <button
              onClick={() => set({ outputCount: Math.max(min, values.outputCount - 1) })}
              aria-label="Fewer outputs"
              className="text-muted hover:text-text"
            >
              <Minus size={15} />
            </button>
            <span className="min-w-5 text-center font-mono text-sm">{values.outputCount}</span>
            <button
              onClick={() => set({ outputCount: Math.min(max, values.outputCount + 1) })}
              aria-label="More outputs"
              className="text-muted hover:text-text"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        {resolution && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12.5px]">Resolution</span>
            <div className="flex gap-0.5 border border-border bg-border">
              {(resolution.options ?? []).map((o) => {
                const v = optionValue(o);
                const perOutput = modelShootCost(v, 1);
                return (
                  <button
                    key={v}
                    onClick={() => set({ resolution: v })}
                    className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 text-[12px] ${
                      values.resolution === v ? "bg-accent text-accent-ink" : "bg-surface text-muted"
                    }`}
                  >
                    {RESOLUTION_LABEL[v] ?? optionLabel(o)}
                    {perOutput != null && (
                      <span className="credit-amount text-[11px] opacity-80">
                        <CreditIcon size={10} />
                        {perOutput}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {resolution && <p className="-mt-1.5 text-right text-[11px] text-dim">Credits per output at each resolution</p>}

        <AutoGrowTextarea
          value={values.prompt}
          onChange={(e) => set({ prompt: e.target.value })}
          placeholder="Anything specific? e.g. soft window light, minimal studio"
          maxLength={PROMPT_MAX_LENGTH}
          maxHeight={200}
          className="w-full border border-border bg-surface p-3 text-[12.5px] text-text outline-none focus:border-accent"
        />
        <EnhancePromptButton
          value={values.prompt}
          featureType="model_shoot"
          onApply={(p) => set({ prompt: p })}
          onBusyChange={onEnhancingChange}
        />
      </div>
    </>
  );
}
