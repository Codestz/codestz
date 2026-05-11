export type DecisionVerdict = 'rejected' | 'accepted' | 'deferred';

export interface Decision {
  proposal: string;
  verdict: DecisionVerdict;
  reasoning: string;
}

export interface DecisionLogProps {
  title?: string;
  decisions: Decision[];
  className?: string;
}
