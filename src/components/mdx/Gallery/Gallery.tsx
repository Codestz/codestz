'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GalleryProps } from './Gallery.types';

const COLS = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' } as const;

/**
 * Gallery Component - Screenshot Grid with Lightbox
 * Neo-Brutalist frame matching Figure; a thumbnail opens the full image over the page,
 * with arrow keys / buttons to step through and Esc or a click outside to close.
 */
export function Gallery({ images, title, columns = 3, className }: GalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (by: number) => setOpen((i) => (i === null ? i : (i + by + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  const current = open === null ? null : images[open];

  return (
    <div
      className={cn(
        'my-8 overflow-hidden rounded-none border-[4px] border-foreground bg-bg-elevated shadow-[8px_8px_0px_0px] shadow-black',
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between border-b-[4px] border-foreground bg-secondary px-4 py-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-text">
            {title}
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary-text">
            {images.length} shots
          </span>
        </div>
      )}
      <div className={cn('grid grid-cols-2 gap-[3px] bg-foreground p-[3px]', COLS[columns])}>
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block bg-bg-elevated text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
            aria-label={`Open: ${image.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="block aspect-[16/10] h-auto w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
            {image.caption && (
              <span className="block px-2 py-1.5 font-mono text-[10px] leading-snug text-muted sm:text-xs">
                {image.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <figure className="relative max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.alt}
              className="block max-h-[82vh] w-auto border-[4px] border-foreground bg-bg-elevated"
            />
            <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-xs text-white sm:text-sm">
              <span>{current.caption ?? current.alt}</span>
              <span className="shrink-0 opacity-70">
                {(open ?? 0) + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 border-[3px] border-white bg-black p-2 text-white"
          >
            <X size={18} />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 border-[3px] border-white bg-black p-2 text-white sm:left-4"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 border-[3px] border-white bg-black p-2 text-white sm:right-4"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
