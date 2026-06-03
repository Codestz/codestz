export interface SeriesNavItem {
  slug: string;
  title: string;
  seriesOrder?: number;
}

export interface SeriesNavProps {
  /** Series name (frontmatter `series`) */
  series: string;
  /** All posts in the series, ordered by `seriesOrder` */
  posts: readonly SeriesNavItem[];
  /** Slug of the post currently being viewed */
  currentSlug: string;
  className?: string;
}
