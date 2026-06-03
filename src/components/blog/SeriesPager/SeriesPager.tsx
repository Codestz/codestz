import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { SeriesPagerItem, SeriesPagerProps } from './SeriesPager.types';

const partLabel = (item: SeriesPagerItem) =>
  item.seriesOrder ? `Part ${item.seriesOrder}` : 'In this series';

/**
 * SeriesPager Component
 * Previous / Next navigation between parts of a series,
 * shown at the end of a series post so the reader can keep going.
 */
export function SeriesPager({ previous, next, className }: SeriesPagerProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Series navigation"
      className={cn('not-prose grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
    >
      {/* Previous part */}
      {previous ? (
        <Link
          href={ROUTES.experiments.post(previous.slug)}
          className="group flex items-center gap-3 border-[3px] border-foreground bg-bg-elevated p-5 shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-150 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-primary"
        >
          <ArrowLeft className="h-5 w-5 shrink-0 text-foreground/50 transition-colors group-hover:text-primary" />
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary">
            Previous · {partLabel(previous)}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {/* Next part */}
      {next ? (
        <Link
          href={ROUTES.experiments.post(next.slug)}
          className="group flex items-center justify-end gap-3 border-[3px] border-foreground bg-bg-elevated p-5 shadow-[4px_4px_0px_0px] shadow-foreground transition-all duration-150 hover:translate-x-1 hover:shadow-[6px_6px_0px_0px] hover:shadow-primary"
        >
          <span className="font-mono text-sm font-bold uppercase tracking-wider text-foreground group-hover:text-primary">
            Next · {partLabel(next)}
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 text-foreground/50 transition-colors group-hover:text-primary" />
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
