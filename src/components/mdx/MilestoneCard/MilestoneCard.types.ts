export type MilestoneKind = 'promotion' | 'award' | 'launch' | 'talk' | 'milestone';

export interface MilestoneCardProps {
  title: string;
  subtitle?: string;
  kind?: MilestoneKind;
  date?: string;
  from?: string;
  to?: string;
  highlights?: string[];
  className?: string;
}
