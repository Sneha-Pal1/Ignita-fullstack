"use client";

import { Sparkles } from "lucide-react";

type ProductivityInsight = {
  id: string;
  title: string;
  value: string;
  icon?: any;
};

export function ProductivityInsights({
  insights,
}: {
  insights?: ProductivityInsight[];
}) {
  const items = insights ?? [];

  return (
    <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
      <h3 className="text-sm font-semibold text-zinc-200">Productivity</h3>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((card) => (
          <div
            key={card.id}
            className="p-4 rounded-xl border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all duration-200"
          >
            <div className="text-2xl mb-3">
              {card.icon ? (
                <card.icon className="h-5 w-5 text-emerald-400" />
              ) : (
                <Sparkles className="h-5 w-5 text-emerald-400" />
              )}
            </div>
            <p className="text-xs font-medium text-zinc-400 mb-1">
              {card.title}
            </p>
            <h3 className="text-lg font-bold text-white">{card.value}</h3>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-xs text-zinc-400">
            No productivity insights available.
          </div>
        )}
      </div>
    </div>
  );
}
