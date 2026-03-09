'use client';

import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProcessFlowProps } from './ProcessFlow.types';

/**
 * ProcessFlow Component - Visual Step-by-Step Phases
 * Neo-Brutalist numbered flow for showing methodologies and workflows
 * Uses card pattern with secondary-colored header, thick borders, offset shadow
 */
export function ProcessFlow({ title, steps, className }: ProcessFlowProps) {
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

      {/* Steps */}
      <div className="p-4 sm:p-6 space-y-0">
        {steps.map((step, index) => (
          <div key={index}>
            <div className="flex items-start gap-4">
              {/* Step number badge */}
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-[3px] border-foreground bg-secondary font-mono text-base font-black text-secondary-text">
                {index + 1}
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0 pt-1">
                <h4 className="font-mono text-sm sm:text-base font-bold uppercase tracking-wide text-foreground">
                  {step.icon && <span className="mr-2">{step.icon}</span>}
                  {step.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="flex items-center justify-start pl-[18px] py-2">
                <ArrowDown size={16} className="text-muted" strokeWidth={3} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
