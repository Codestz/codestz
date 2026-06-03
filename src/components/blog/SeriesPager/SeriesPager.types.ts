export interface SeriesPagerItem {
  slug: string;
  title: string;
  seriesOrder?: number;
}

export interface SeriesPagerProps {
  /** Previous part in the series, if any */
  previous?: SeriesPagerItem | null;
  /** Next part in the series, if any */
  next?: SeriesPagerItem | null;
  className?: string;
}
