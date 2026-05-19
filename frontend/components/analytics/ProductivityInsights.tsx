'use client';

import { insightCards } from '@/lib/data/analytics';

export function ProductivityInsights() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Smart Insights</h2>
        <p className="text-sm text-zinc-400">
          Key patterns and trends from your activity data.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card) => {
          const colorMap: Record<
            string,
            {
              bg: string;
              border: string;
              text: string;
            }
          > = {
            emerald: {
              bg: 'bg-emerald-500/10',
              border: 'border-emerald-500/30',
              text: 'text-emerald-400',
            },
            blue: {
              bg: 'bg-blue-500/10',
              border: 'border-blue-500/30',
              text: 'text-blue-400',
            },
            purple: {
              bg: 'bg-purple-500/10',
              border: 'border-purple-500/30',
              text: 'text-purple-400',
            },
            amber: {
              bg: 'bg-amber-500/10',
              border: 'border-amber-500/30',
              text: 'text-amber-400',
            },
          };

          const colors = colorMap[card.color] || colorMap.emerald;

          return (
            <div
              key={card.id}
              className={`p-5 rounded-xl border ${colors.bg} ${colors.border} hover:border-opacity-100 transition-all duration-200 group cursor-pointer hover:shadow-lg hover:shadow-${card.color}-500/10`}
            >
              {/* Icon */}
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>

              {/* Title */}
              <p className="text-xs font-medium text-zinc-400 mb-1">
                {card.title}
              </p>

              {/* Highlight Value */}
              <h3 className={`text-lg font-bold ${colors.text}`}>
                {card.highlight}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}
