export interface GalleryImage {
  /** Image path under /public. */
  src: string;
  /** What the image shows, for screen readers. */
  alt: string;
  /** Optional short caption under the thumbnail (and in the enlarged view). */
  caption?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
  /** Optional small label in the header bar. */
  title?: string;
  /** Columns on wide screens (2–4, default 3). Phones always show 1–2. */
  columns?: 2 | 3 | 4;
  className?: string;
}
