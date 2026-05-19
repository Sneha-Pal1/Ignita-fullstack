'use client';

import { useState } from 'react';
import { generateActivityHeatmap } from '@/lib/data/analytics';

interface HeatmapCell {
  date: string;
  count: number;
  intensity: 'none' | 'low' | 'medium' | 'high' | 'very-high';
}

const getIntensityColor = (
  intensity: 'none' | 'low' | 'medium' | 'high' | 'very-high',
): string => {
  const colorMap = {
    none: 'bg-zinc-800 hover:bg-zinc-700',
    low: 'bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-700/30',
    medium: 'bg-emerald-800/60 hover:bg-emerald-800/80 border border-emerald-600/40',
    high: 'bg-emerald-700/80 hover:bg-emerald-700 border border-emerald-600/50',
    'very-high':
      'bg-emerald-600 hover:bg-emerald-500 border border-emerald-500/60',
  };
  return colorMap[intensity];
};

export function ActivityHeatmap() {
  const activityData = generateActivityHeatmap();
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Group data by week
  const weeks: HeatmapCell[][] = [];
  let currentWeek: HeatmapCell[] = [];

  activityData.forEach((item) => {
    currentWeek.push(item);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getTooltipText = (cell: HeatmapCell): string => {
    const date = new Date(cell.date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
    return `${dayName}, ${monthName}: ${cell.count} activities`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Activity Heatmap</h2>
        <p className="text-sm text-zinc-400">
          Your contribution activity over the past year. Darker green means more engagement.
        </p>
      </div>

      {/* Heatmap Container */}
      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {/* Month labels (only for first week of month) */}
              {weekIndex % 4 === 0 && (
                <div className="h-6 flex items-center px-1">
                  <span className="text-xs font-medium text-zinc-500">
                    {weekIndex === 0
                      ? 'Past year'
                      : months[Math.floor(weekIndex / 4.3) % 12]}
                  </span>
                </div>
              )}

              {/* Week cells */}
              <div className="flex flex-col gap-1">
                {week.map((cell, dayIndex) => (
                  <div
                    key={cell.date}
                    className="relative group"
                    onMouseEnter={() => setHoveredCell(cell.date)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    <button
                      className={`w-4 h-4 rounded-sm transition-all duration-150 ${getIntensityColor(
                        cell.intensity,
                      )}`}
                      aria-label={getTooltipText(cell)}
                    />

                    {/* Tooltip */}
                    {hoveredCell === cell.date && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg shadow-lg whitespace-nowrap text-xs text-white pointer-events-none">
                        {getTooltipText(cell)}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-4 border-transparent border-t-zinc-950" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <span className="text-zinc-400">Less activity</span>
        <div className="flex gap-1">
          {(['none', 'low', 'medium', 'high', 'very-high'] as const).map(
            (intensity) => (
              <div
                key={intensity}
                className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
              />
            ),
          )}
        </div>
        <span className="text-zinc-400">More activity</span>
      </div>
    </div>
  );
}
