'use client';

import { cn } from '@/lib/utils';
import type { StatBlockProps } from './StatBlock.types';

/**
 * StatBlock Component - Horizontal Stat Row
 * Neo-Brutalist stat display for surfacing key metrics
 * Uses thick borders, secondary accents, and monospace typography
 */
export function StatBlock({ stats, title, className }: StatBlockProps) {
  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-none border-[4px] border-foreground bg-bg-elevated shadow-[8px_8px_0px_0px] shadow-black',
        className
      )}
    >
      {/* Header */}
      {title && (
        <div className="border-b-[4px] border-foreground bg-secondary px-4 py-2">
          <span className="font-mono text-[10px] font-bold text-secondary-text uppercase tracking-widest">
            {title}
          </span>
        </div>
      )}

      {/* Stats Grid */}
      <div
        className={cn(
          'grid divide-y-[3px] sm:divide-y-0 sm:divide-x-[3px] divide-foreground',
          stats.length <= 2 && 'sm:grid-cols-2',
          stats.length === 3 && 'sm:grid-cols-3',
          stats.length >= 4 && 'grid-cols-2 sm:grid-cols-4'
        )}
      >
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center justify-center px-4 py-4 sm:py-6">
            {stat.icon && <span className="mb-1 text-lg">{stat.icon}</span>}
            <span className="font-mono text-2xl sm:text-3xl font-black text-foreground leading-none">
              {stat.value}
            </span>
            <span className="mt-1.5 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
