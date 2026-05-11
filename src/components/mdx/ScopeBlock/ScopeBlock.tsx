'use client';

import { Check, X, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ScopeBlockProps } from './ScopeBlock.types';

const columns = [
  {
    key: 'building',
    label: 'Building',
    Icon: Check,
    tone: 'text-green-700 dark:text-green-400',
    barTone: 'border-l-green-500 bg-green-50/40 dark:bg-green-950/20',
  },
  {
    key: 'notBuilding',
    label: 'Not Building',
    Icon: X,
    tone: 'text-red-700 dark:text-red-400',
    barTone: 'border-l-red-500 bg-red-50/40 dark:bg-red-950/20',
  },
  {
    key: 'constraints',
    label: 'Constraints',
    Icon: Lock,
    tone: 'text-amber-700 dark:text-amber-400',
    barTone: 'border-l-amber-500 bg-amber-50/40 dark:bg-amber-950/20',
  },
] as const;

/**
 * ScopeBlock Component - Three-Column Scope Discipline Panel
 * Neo-Brutalist visual for declaring what's in, what's out, and the constraints.
 * Reusable on any planning/scoping post.
 */
export function ScopeBlock({
  title = 'Scope',
  building,
  notBuilding,
  constraints,
  className,
}: ScopeBlockProps) {
  const data = { building, notBuilding, constraints };

  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-none border-[4px] border-foreground bg-bg-elevated shadow-[8px_8px_0px_0px] shadow-black',
        className
      )}
    >
      <div className="border-b-[4px] border-foreground bg-secondary px-4 py-2">
        <span className="font-mono text-[10px] font-bold text-secondary-text uppercase tracking-widest">
          {title}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y-[3px] md:divide-y-0 md:divide-x-[3px] divide-foreground">
        {columns.map((col) => {
          const items = data[col.key];
          const Icon = col.Icon;
          return (
            <div key={col.key} className="flex flex-col">
              <div className="flex items-center gap-2 border-b-[3px] border-foreground bg-bg-elevated px-3 py-2">
                <Icon size={14} className={col.tone} strokeWidth={3} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">
                  {col.label}
                </span>
                <span className="ml-auto font-mono text-[10px] text-muted">{items.length}</span>
              </div>

              <ul className="flex-1 divide-y-[2px] divide-foreground/30 font-mono text-xs sm:text-sm">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className={cn('flex items-start gap-2 border-l-[4px] px-3 py-2', col.barTone)}
                  >
                    <Icon
                      size={12}
                      className={cn('mt-0.5 flex-shrink-0', col.tone)}
                      strokeWidth={3}
                    />
                    <span className="text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
