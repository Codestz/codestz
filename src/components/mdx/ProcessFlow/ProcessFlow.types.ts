export interface ProcessStep {
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessFlowProps {
  title?: string;
  steps: ProcessStep[];
  className?: string;
}
