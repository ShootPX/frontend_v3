"use client";

import { useState } from "react";
import { ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { ImageDropzone } from "./ImageDropzone";
import { ParamFieldInput } from "./ParamFieldInput";
import { OutputCountField } from "./OutputCountField";
import { EnhancePromptButton } from "./EnhancePromptButton";
import { ScrollFade } from "@/components/ui/ScrollFade";
import { CreditCostBadge } from "./CreditCostBadge";
import type { ToolSchema } from "@/lib/types/generate";
import { optionLabel, optionValue } from "@/lib/types/generate";
import { estimateCreditsPerImage, hasNoCostVaryingFields } from "@/lib/tools/credit-estimate";

const BRAND_COLOR = "#C8FF00"; // --color-accent

export function ToolForm({
  schema,
  onSubmit,
  submitting,
  running = false,
  initialImages = [],
}: {
  schema: ToolSchema;
  /** `expectedCount` is how many results to draw boxes for while waiting. */
  onSubmit: (formData: FormData, expectedCount: number) => void;
  submitting: boolean;
  /** A generation is in flight — Generate stays off until it completes or fails. */
  running?: boolean;
  /** Images handed over from another tool via "Send to…". */
  initialImages?: File[];
}) {
  // output_count is always sent as its own dedicated form field — when the
  // schema declares it (as a "number" field, e.g. listing_photoshoot), its
  // min/max/default drive the stepper; otherwise fall back to a sensible default.
  const outputCountField = schema.paramSchema.find((f) => f.name === "output_count");
  // Selects/color/number settle first, free-text prompt fields last — matches
  // the reference layout (Quality/Size rows above, Prompt textarea at the
  // bottom), rather than whatever order the schema happens to declare fields in.
  const otherFields = schema.paramSchema
    .filter((f) => f.name !== "output_count")
    .slice()
    .sort((a, b) => (a.type === "text" ? 1 : 0) - (b.type === "text" ? 1 : 0));
  const outputMax = outputCountField?.max ?? 8;

  // Creative reads top to bottom as: Idea, then Settings (aspect ratio,
  // resolution, quality), then Prompt. Other tools have no Idea, so they get
  // Settings then Prompt.
  const SETTINGS_ORDER = [/aspect|size/i, /resolution/i, /quality/i];
  const rank = (name: string) => {
    const i = SETTINGS_ORDER.findIndex((re) => re.test(name));
    return i === -1 ? SETTINGS_ORDER.length : i;
  };
  const leadFields = otherFields.filter((f) => f.name === "idea");
  const promptFields = otherFields.filter((f) => f.type === "text");
  const settingsFields = otherFields
    .filter((f) => f.name !== "idea" && f.type !== "text")
    .sort((a, b) => (schema.featureType === "creative_photoshoot" ? rank(a.name) - rank(b.name) : 0));

  const [images, setImages] = useState<File[]>(() => initialImages.slice(0, schema.maxInputImages));
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const f of otherFields) {
      initial[f.name] = f.default != null ? String(f.default) : "";
      // Recolor starts on the site's accent lime unless the schema says otherwise, so
      // leaving the colour untouched still sends a real colour.
      if (f.type === "color" && !initial[f.name]) initial[f.name] = BRAND_COLOR;
      // The Idea dropdown starts on its first option rather than "Select…".
      if (f.name === "idea" && !initial[f.name] && f.options?.length) initial[f.name] = optionValue(f.options[0]);
    }
    return initial;
  });
  const [outputCount, setOutputCount] = useState(() =>
    outputCountField?.default != null ? Number(outputCountField.default) : 1,
  );
  const [error, setError] = useState("");
  // Phones: selects/counts live in a bottom sheet behind one summary bar.
  const [sheetOpen, setSheetOpen] = useState(false);
  // The backend allows one active job per user; an enhance counts as one.
  const [enhancing, setEnhancing] = useState(false);
  const uploadTitle = schema.featureType === "recolor" ? "Upload your design" : "Upload product photos";
  const hasEnhance = schema.featureType === "creative_photoshoot" || schema.featureType === "listing_photoshoot";

  const perImageCost = estimateCreditsPerImage(schema.featureType, schema, values);
  const fixedCost = hasNoCostVaryingFields(schema.featureType, schema);
  const needsImages = schema.maxInputImages > 0;
  const missingImage = needsImages && images.length === 0;

  // Phones keep only the photos and the prompt on the page; every other option
  // (idea, colour, size, quality, count) collapses into the summary bar + sheet.
  const sheetFields = [...leadFields, ...settingsFields];
  const hasSheet = sheetFields.length > 0 || !!outputCountField;
  const summary = [
    outputCountField ? `${outputCount} ${outputCount === 1 ? "result" : "results"}` : null,
    ...sheetFields.map((f) => {
      const v = values[f.name];
      if (!v) return null;
      const opt = f.options?.find((o) => optionValue(o) === v);
      const text = opt ? optionLabel(opt) : v;
      return /^\d+k$/i.test(text.trim()) ? text.trim().toUpperCase() : text;
    }),
  ]
    .filter(Boolean)
    .join(" · ");

  function setValue(name: string, v: string) {
    setValues((prev) => ({ ...prev, [name]: v }));
    setError("");
  }

  function handleSubmit() {
    if (needsImages && images.length === 0) {
      setError("Add at least one image.");
      return;
    }
    for (const field of otherFields) {
      if (field.required && !values[field.name]) {
        setError(`${field.label} is required.`);
        return;
      }
    }
    // Backend-enforced rule that's worth catching client-side too.
    if (schema.featureType === "creative_photoshoot" && !values.idea && !values.prompt) {
      setError("Describe your scene or pick an idea.");
      return;
    }

    const fd = new FormData();
    fd.append("feature_type", schema.featureType);
    for (const f of images) fd.append("images", f);
    for (const [key, val] of Object.entries(values)) {
      if (val) fd.append(key, val);
    }
    // No output_count field (e.g. recolor) means one result per uploaded image, so
    // send that number rather than the stepper default of 1.
    const count = outputCountField
      ? Math.min(outputCount, outputMax)
      : Math.max(images.length, 1);
    fd.append("output_count", String(count));
    onSubmit(fd, count);
  }

  const renderField = (field: (typeof otherFields)[number]) => (
    <div key={field.name} className="flex flex-col gap-2">
      <ParamFieldInput
        field={field}
        featureType={schema.featureType}
        values={values}
        value={values[field.name] ?? ""}
        onChange={(v) => setValue(field.name, v)}
      />
      {field.name === "prompt" && hasEnhance && (
        <EnhancePromptButton
          value={values.prompt ?? ""}
          featureType={schema.featureType}
          onApply={(p) => setValue("prompt", p)}
          onBusyChange={setEnhancing}
        />
      )}
    </div>
  );

  return (
    <div className="flex w-full flex-none flex-col border-t border-border bg-bg md:h-full md:w-[380px] md:border-r md:border-t-0">
      <ScrollFade
        className="flex-1"
        scrollClassName="max-md:h-auto max-md:max-h-[34dvh]"
        contentClassName="px-4 pb-2 pt-3 md:px-[26px] md:pb-5 md:pt-[26px]"
      >
        {needsImages && (
          <div className="mb-3 mt-0 md:mb-6">
            <h2 className="font-heading text-[19px] font-semibold tracking-tight max-md:hidden">{uploadTitle}</h2>
            <div className="md:mt-3">
              <ImageDropzone
                files={images}
                onChange={setImages}
                maxFiles={schema.maxInputImages}
                hint={schema.maxInputImages > 1 ? "Upload as many as you need — each one generates its own result" : undefined}
              />
            </div>
          </div>
        )}

        {leadFields.length > 0 && <div className="mb-6 hidden flex-col gap-2.5 md:flex">{leadFields.map(renderField)}</div>}

        {(outputCountField || settingsFields.length > 0) && (
          <div className="mb-6 hidden flex-col gap-2.5 md:flex">
            <span className="text-[13px] font-medium text-muted">Settings</span>
            {outputCountField && (
              <OutputCountField value={outputCount} onChange={setOutputCount} max={outputMax} />
            )}
            {settingsFields.map(renderField)}
          </div>
        )}

        {promptFields.length > 0 && <div className="flex flex-col gap-2.5">{promptFields.map(renderField)}</div>}
      </ScrollFade>

      <div className="z-10 flex flex-none flex-col gap-2 border-t border-border bg-bg px-4 pb-3 pt-2.5 md:static md:px-[26px] md:py-4">
        {error && <p className="text-sm text-[#ff8a6b]">{error}</p>}
        {hasSheet && (
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-2.5 text-left md:hidden"
          >
            <span className="flex min-w-0 items-center gap-2 text-[13.5px] font-medium">
              <SlidersHorizontal size={15} className="flex-none text-muted" />
              <span className="truncate">{summary || "Settings"}</span>
            </span>
            <ChevronUp size={16} className="flex-none text-muted" />
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={submitting || running || enhancing || missingImage}
          className="rounded-full bg-accent py-3.5 text-[15px] font-semibold md:py-3 md:text-sm text-accent-ink hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-accent"
        >
          {submitting ? "Starting…" : running ? "Generating…" : enhancing ? "Enhancing prompt…" : "Generate"}
        </button>
        {missingImage && <p className="text-center text-[12px] text-dim">Upload a photo to start</p>}
        <CreditCostBadge perImage={perImageCost} count={outputCountField ? outputCount : Math.max(images.length, 1)} fixedCost={fixedCost} />
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col justify-end md:hidden">
          <button aria-label="Close settings" onClick={() => setSheetOpen(false)} className="absolute inset-0 bg-black/60" />
          <div className="relative flex max-h-[80vh] flex-col rounded-t-3xl border-t border-border-strong bg-bg">
            <div className="flex flex-none items-center justify-between px-5 pb-2 pt-4">
              <span className="font-heading text-[17px] font-semibold">Settings</span>
              <button
                onClick={() => setSheetOpen(false)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-5 pb-4 pt-2">
              {outputCountField && <OutputCountField value={outputCount} onChange={setOutputCount} max={outputMax} />}
              {sheetFields.map(renderField)}
            </div>
            <div className="flex-none px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2">
              <button
                onClick={() => setSheetOpen(false)}
                className="h-12 w-full rounded-full bg-accent text-[15px] font-semibold text-accent-ink"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
