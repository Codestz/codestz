export interface Stat {
  value: string;
  label: string;
  icon?: string;
}

export interface StatBlockProps {
  stats: Stat[];
  title?: string;
  className?: string;
}
