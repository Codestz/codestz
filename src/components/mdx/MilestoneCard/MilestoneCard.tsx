'use client';

import { ArrowRight, Award, Calendar, Mic, Rocket, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MilestoneCardProps, MilestoneKind } from './MilestoneCard.types';

const kindConfig: Record<MilestoneKind, { label: string; Icon: typeof TrendingUp }> = {
  promotion: { label: 'Promotion', Icon: TrendingUp },
  award: { label: 'Award', Icon: Award },
  launch: { label: 'Launch', Icon: Rocket },
  talk: { label: 'Talk', Icon: Mic },
  milestone: { label: 'Milestone', Icon: Sparkles },
};

/**
 * MilestoneCard Component - Career milestone callout
 * Neo-Brutalist visual for a single career event: promotion, award, launch, talk.
 * Optional FROM → TO transition row makes it especially fit for promotions.
 * Slim layout: header strip + title row + optional transition + optional highlights.
 */
export function MilestoneCard({
  title,
  subtitle,
  kind = 'milestone',
  date,
  from,
  to,
  highlights,
  className,
}: MilestoneCardProps) {
  const { label, Icon } = kindConfig[kind];

  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-none border-[4px] border-foreground bg-bg-elevated shadow-[8px_8px_0px_0px] shadow-black',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b-[4px] border-foreground bg-secondary px-4 py-2">
        <Icon size={14} className="text-secondary-text" strokeWidth={3} />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-text">
          {label}
        </span>
        {date && (
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-text">
            <Calendar size={11} strokeWidth={3} />
            {date}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">{subtitle}</p>
        )}

        {(from || to) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm">
            <span className="text-foreground/60 line-through decoration-[2px] decoration-red-500">
              {from ?? '—'}
            </span>
            <ArrowRight size={14} className="text-foreground" strokeWidth={3} />
            <span className="font-bold text-foreground">{to ?? '—'}</span>
          </div>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="mt-4 space-y-1 font-mono text-xs sm:text-sm">
            {highlights.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-foreground/90">
                <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 bg-secondary" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
