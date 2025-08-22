import type { IconName } from '../../../lib/icons';

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
  onClick?: () => void;
  height?: number;
}
