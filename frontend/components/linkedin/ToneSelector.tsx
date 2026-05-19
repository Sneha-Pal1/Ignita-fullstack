"use client";

import { toneOptions } from "@/lib/data/linkedinTemplates";

interface ToneSelectorProps {
  tone: string;
  onToneChange: (tone: string) => void;
}

export default function ToneSelector({ tone, onToneChange }: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-zinc-200">
        Tone
      </label>

      <div className="grid grid-cols-2 gap-2">
        {toneOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onToneChange(option.value)}
            className={`p-3 rounded-lg text-left transition-colors border ${ 
              tone === option.value
                ? "bg-emerald-500/10 border-emerald-500 text-emerald-100"
                : "bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800"
            }`}
          >
            <div className="font-medium text-sm">{option.label}</div>
            <div className="text-xs text-zinc-500 mt-0.5">
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
