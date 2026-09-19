"use client";

import { Wand2, RotateCcw, Copy, RotateCw } from "lucide-react";

interface ActionButtonsProps {
  isLoading: boolean;
  isGenerated: boolean;
  onGenerate: () => void;
  onRegenerate: () => void;
  onCopy: () => void;
  onClear: () => void;
}

export default function ActionButtons({
  isLoading,
  isGenerated,
  onGenerate,
  onRegenerate,
  onCopy,
  onClear,
}: ActionButtonsProps) {
  return (
    <div className="space-y-2 font-mono">
      {/* Primary Button */}
      <button
        onClick={onGenerate}
        disabled={isLoading || isGenerated}
        className="w-full px-4 py-3 bg-[#FFB100] hover:bg-[#ffbe26] disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            Generate Post
          </>
        )}
      </button>

      {/* Secondary Actions */}
      {isGenerated && (
        <>
          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-[#0e0e0d] border border-white/10 hover:border-[#FFB100] hover:text-[#FFB100] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Regenerate
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onCopy}
              className="px-3 py-2 bg-[#0e0e0d] border border-white/10 hover:border-[#FFB100] hover:text-[#FFB100] text-white font-medium transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy
            </button>
            <button
              onClick={onClear}
              className="px-3 py-2 bg-[#0e0e0d] border border-white/10 hover:border-[#FFB100] hover:text-[#FFB100] text-white font-medium transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}
