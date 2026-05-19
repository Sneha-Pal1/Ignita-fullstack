import { ArrowUpRight, Download } from 'lucide-react';

interface TimeframeOption {
  label: string;
  value: 'week' | 'month' | 'quarter' | 'year';
}

interface AnalyticsHeaderProps {
  timeframe?: 'week' | 'month' | 'quarter' | 'year';
  onTimeframeChange?: (timeframe: 'week' | 'month' | 'quarter' | 'year') => void;
}

export function AnalyticsHeader({
  timeframe = 'month',
  onTimeframeChange,
}: AnalyticsHeaderProps) {
  const timeframeOptions: TimeframeOption[] = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' },
  ];

  return (
    <div className="space-y-6">
      {/* Title and Subtitle */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold text-white">Analytics</h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">+24% this month</span>
          </div>
        </div>
        <p className="text-zinc-400 text-lg">
          Track your activity, engagement, and growth over time.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Timeframe Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">View:</span>
          <div className="flex gap-2 bg-zinc-800/50 p-1 rounded-lg border border-zinc-700/50">
            {timeframeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onTimeframeChange?.(option.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  timeframe === option.value
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-700/80 hover:border-zinc-600 transition-all duration-200 group">
          <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  );
}
