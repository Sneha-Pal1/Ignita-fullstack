'use client';

import { categoryData } from '@/lib/data/analytics';

const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; text: string; bar: string }> = {
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      bar: 'bg-emerald-500',
    },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', bar: 'bg-blue-500' },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      bar: 'bg-purple-500',
    },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', bar: 'bg-cyan-500' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', bar: 'bg-amber-500' },
    rose: { bg: 'bg-rose-500/10', text: 'text-rose-400', bar: 'bg-rose-500' },
  };
  return colorMap[color] || colorMap.emerald;
};

export function CategoryInsights() {
  const topCategory = categoryData[0];
  const colors = getColorClasses(topCategory.color);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Category List */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Event Categories</h2>
          <p className="text-sm text-zinc-400">
            Breakdown of your saved events by category.
          </p>
        </div>

        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-5">
          {categoryData.map((category) => {
            const colors = getColorClasses(category.color);
            return (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">
                    {category.name}
                  </span>
                  <span className={`text-sm font-semibold ${colors.text}`}>
                    {category.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {category.count} events
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Category Card */}
      <div className={`p-6 rounded-xl border ${colors.bg} border-${topCategory.color}-500/30 flex flex-col justify-center items-start`}>
        <div className="text-4xl mb-3">🎯</div>
        <p className="text-xs font-medium text-zinc-400 mb-1">Top Interest</p>
        <h3 className={`text-2xl font-bold mb-2 ${colors.text}`}>
          {topCategory.name}
        </h3>
        <p className="text-sm text-zinc-400">
          <span className={`font-semibold ${colors.text}`}>{topCategory.percentage}%</span> of
          your saved events
        </p>
      </div>
    </div>
  );
}
