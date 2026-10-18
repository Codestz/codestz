import { cn } from '@/lib/utils';
import type { FigureProps } from './Figure.types';

/**
 * Figure Component - Framed Image with Caption
 * Neo-Brutalist frame matching Callout and StatBlock
 * Uses a plain img so any public/ path or remote URL works in MDX
 */
export function Figure({ src, alt, caption, label, className }: FigureProps) {
  return (
    <figure
      className={cn(
        'my-8 overflow-hidden rounded-none border-[4px] border-foreground bg-bg-elevated shadow-[8px_8px_0px_0px] shadow-black',
        className
      )}
    >
      {label && (
        <div className="border-b-[4px] border-foreground bg-secondary px-4 py-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-text">
            {label}
          </span>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" className="block h-auto w-full" />
      {caption && (
        <figcaption className="border-t-[4px] border-foreground px-4 py-3 font-mono text-xs leading-relaxed text-muted sm:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
