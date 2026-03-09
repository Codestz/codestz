export interface CalloutProps {
  children: string;
  author?: string;
  role?: string;
  type?: 'quote' | 'info' | 'warning' | 'tip';
  className?: string;
}
