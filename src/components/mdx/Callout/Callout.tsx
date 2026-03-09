'use client';

import { Quote, Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CalloutProps } from './Callout.types';

const typeConfig = {
  quote: { icon: Quote, label: 'Quote' },
  info: { icon: Info, label: 'Info' },
  warning: { icon: AlertTriangle, label: 'Warning' },
  tip: { icon: Lightbulb, label: 'Tip' },
};

/**
 * Callout Component - Styled Quote/Info Box
 * Neo-Brutalist callout with secondary-colored header
 * Uses bg-elevated for content, secondary for accents
 * Supports author attribution for quote type
 */
export function Callout({ children, author, role, type = 'quote', className }: CalloutProps) {
  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-none border-[4px] border-foreground bg-bg-elevated shadow-[8px_8px_0px_0px] shadow-black',
        className
      )}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b-[4px] border-foreground bg-secondary">
        <IconComponent size={14} className="text-secondary-text" strokeWidth={3} />
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-text">
          {config.label}
        </span>
      </div>

      {/* Content */}
      <div className="border-l-[6px] border-l-secondary p-4 sm:p-6">
        <p className="text-sm sm:text-base leading-relaxed text-foreground italic">
          &ldquo;{children}&rdquo;
        </p>

        {author && (
          <div className="mt-4 flex items-center gap-3 border-t-[2px] border-foreground pt-3">
            <div className="h-8 w-8 flex items-center justify-center border-[2px] border-foreground bg-secondary font-mono text-xs font-black text-secondary-text">
              {author.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground block">
                {author}
              </span>
              {role && (
                <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  {role}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
