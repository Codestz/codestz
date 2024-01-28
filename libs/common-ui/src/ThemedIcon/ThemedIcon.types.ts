import { CSSProperties } from 'react';
import { IconBaseProps, IconType } from 'react-icons';

export interface ThemedIconProps {
  icon: IconType;
  iconProps?: IconBaseProps;
  animatedOnHover?: boolean;
  link?: string;
  target?: HTMLAnchorElement['target'];
  action?: () => void;
  className?: CSSProperties;
}
