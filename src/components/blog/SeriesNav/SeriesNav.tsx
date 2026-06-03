import Link from 'next/link';
import { Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SeriesNavProps } from './SeriesNav.types';

/**
 * SeriesNav Component
 * Renders the full table of contents for a multi-part series,
 * highlighting the part currently being read.
 */
export function SeriesNav({ series, posts, currentSlug, className }: SeriesNavProps) {
  if (posts.length < 2) {
    return null;
  }

  const currentIndex = posts.findIndex((p) => p.slug === currentSlug);

  return (
    <nav
      aria-label={`${series} series`}
      className={cn(
        'not-prose border-[3px] border-foreground bg-bg-elevated shadow-[6px_6px_0px_0px] shadow-foreground p-5 sm:p-6',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <Layers className="h-4 w-4 text-primary" />
        <span className="font-mono text-xs uppercase tracking-wider text-foreground/60">
          Series
        </span>
      </div>

      <h2 className="mb-4 font-mono text-lg font-bold uppercase tracking-wide text-foreground">
        {series}
      </h2>

      <ol className="flex flex-col gap-1">
        {posts.map((post, index) => {
          const isCurrent = post.slug === currentSlug;
          const part = post.seriesOrder ?? index + 1;

          return (
            <li key={post.slug}>
              {isCurrent ? (
                <div
                  aria-current="step"
                  className="flex items-start gap-3 border-l-[3px] border-primary bg-primary/10 px-3 py-2"
                >
                  <span className="font-mono text-sm font-bold text-primary">
                    {String(part).padStart(2, '0')}
                  </span>
                  <span className="text-sm font-bold text-foreground">{post.title}</span>
                </div>
              ) : (
                <Link
                  href={`/experiments/${post.slug}`}
                  className="group flex items-start gap-3 border-l-[3px] border-transparent px-3 py-2 transition-colors hover:border-foreground hover:bg-foreground/5"
                >
                  <span className="font-mono text-sm text-foreground/50 group-hover:text-foreground">
                    {String(part).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-foreground/70 group-hover:text-foreground">
                    {post.title}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {currentIndex >= 0 && (
        <p className="mt-4 font-mono text-xs text-foreground/50">
          Part {currentIndex + 1} of {posts.length}
        </p>
      )}
    </nav>
  );
}
