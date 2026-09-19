"use client";

import { toneOptions } from "@/lib/data/linkedinTemplates";

interface ToneSelectorProps {
  tone: string;
  onToneChange: (tone: string) => void;
}

export default function ToneSelector({
  tone,
  onToneChange,
}: ToneSelectorProps) {
  return (
    <div className="space-y-3 font-mono">
      <label className="block text-xs uppercase tracking-wider text-[#8a8a86]">Select Tone</label>

      <div className="grid grid-cols-2 gap-2">
        {toneOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onToneChange(option.value)}
            className={`p-3 text-left transition-colors border ${
              tone === option.value
                ? "bg-[#FFB100] border-[#FFB100] text-black font-semibold"
                : "bg-[#0e0e0d] border-white/10 text-[#8a8a86] hover:border-[#FFB100]/40 hover:text-white"
            }`}
          >
            <div className="font-semibold text-xs uppercase">{option.label}</div>
            <div className={`text-[10px] mt-0.5 ${tone === option.value ? "text-black/80" : "text-[#8a8a86]"}`}>
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
