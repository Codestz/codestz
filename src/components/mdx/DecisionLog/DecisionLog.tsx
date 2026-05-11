'use client';

import { Check, X, Clock, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DecisionLogProps, DecisionVerdict } from './DecisionLog.types';

const verdictConfig: Record<
  DecisionVerdict,
  { label: string; Icon: typeof Check; chipClass: string; barClass: string }
> = {
  rejected: {
    label: 'Rejected',
    Icon: X,
    chipClass: 'bg-red-500 text-white border-red-700',
    barClass: 'border-l-red-500',
  },
  accepted: {
    label: 'Accepted',
    Icon: Check,
    chipClass: 'bg-green-500 text-white border-green-700',
    barClass: 'border-l-green-500',
  },
  deferred: {
    label: 'Deferred',
    Icon: Clock,
    chipClass: 'bg-amber-500 text-black border-amber-700',
    barClass: 'border-l-amber-500',
  },
};

/**
 * DecisionLog Component - AI Proposal / Verdict / Reasoning Log
 * Neo-Brutalist visual for capturing the "moments I said no/yes/later" pattern.
 * Reusable on any AI-workflow post.
 */
export function DecisionLog({ title = 'Decision Log', decisions, className }: DecisionLogProps) {
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

      <div className="divide-y-[3px] divide-foreground">
        {decisions.map((d, idx) => {
          const v = verdictConfig[d.verdict];
          const Icon = v.Icon;
          return (
            <div
              key={idx}
              className={cn(
                'flex flex-col gap-2 border-l-[6px] bg-bg-elevated px-4 py-3 sm:px-5 sm:py-4',
                v.barClass
              )}
            >
              <div className="flex items-start gap-3">
                <Sparkles size={14} className="mt-1 flex-shrink-0 text-muted" strokeWidth={3} />
                <span className="flex-1 font-mono text-xs sm:text-sm text-muted leading-relaxed">
                  <span className="font-bold uppercase tracking-wider text-foreground mr-2">
                    Model:
                  </span>
                  {d.proposal}
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 border-[2px] px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest',
                    v.chipClass
                  )}
                >
                  <Icon size={11} strokeWidth={3} />
                  {v.label}
                </span>
              </div>

              <div className="ml-7 font-mono text-xs sm:text-sm leading-relaxed text-foreground">
                <span className="font-bold uppercase tracking-wider text-foreground mr-2">
                  Why:
                </span>
                {d.reasoning}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
