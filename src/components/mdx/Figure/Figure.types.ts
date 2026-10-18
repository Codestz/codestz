export interface FigureProps {
  /** Image path under /public (e.g. /images/blog/guildhall/studio-home.png). */
  src: string;
  /** What the image shows, for screen readers. */
  alt: string;
  /** Optional caption shown under the image. */
  caption?: string;
  /** Optional small label in the header bar (e.g. "Before", "Studio"). */
  label?: string;
  className?: string;
}
