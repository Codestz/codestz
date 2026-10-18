import { cn } from '@/lib/utils';
import type { VideoProps } from './Video.types';

/**
 * Video Component - Framed Looping Clip with Caption
 * Neo-Brutalist frame matching Figure; plays muted, inline and looped like a GIF,
 * with controls on request. preload="metadata" keeps the page light until it plays.
 */
export function Video({
  src,
  poster,
  title,
  caption,
  label,
  controls = false,
  className,
}: VideoProps) {
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
      <video
        src={src}
        poster={poster}
        title={title}
        aria-label={title}
        autoPlay
        muted
        loop
        playsInline
        controls={controls}
        preload="metadata"
        className="block h-auto w-full bg-black"
      />
      {caption && (
        <figcaption className="border-t-[4px] border-foreground px-4 py-3 font-mono text-xs leading-relaxed text-muted sm:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
