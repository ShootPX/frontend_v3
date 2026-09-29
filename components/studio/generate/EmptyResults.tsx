import { Image as ImageIcon, Sparkles, Upload } from "lucide-react";
import { StepFlow, type StepFlowStep } from "@/components/ui/StepFlow";

const DEFAULT_STEPS: StepFlowStep[] = [
  { icon: Upload, label: "Upload" },
  { icon: Sparkles, label: "Generate" },
  { icon: ImageIcon, label: "Result" },
];

export function EmptyResults({ steps = DEFAULT_STEPS }: { steps?: StepFlowStep[] }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-dim">
      <div className="mb-3 w-full max-w-[380px]">
        <StepFlow steps={steps} />
      </div>
      <span className="text-sm text-muted">Nothing generated yet this session</span>
      <span className="text-[12.5px]">Set up your options on the left, then hit Generate.</span>
    </div>
  );
}
