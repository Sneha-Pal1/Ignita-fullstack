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
    <div className="space-y-2">
      {/* Primary Button */}
      <button
        onClick={onGenerate}
        disabled={isLoading || isGenerated}
        className="w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            className="w-full px-4 py-2 bg-zinc-700/50 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-100 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Regenerate
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onCopy}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={onClear}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
              <RotateCw className="w-4 h-4" />
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
}
