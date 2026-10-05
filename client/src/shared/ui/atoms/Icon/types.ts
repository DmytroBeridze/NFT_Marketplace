import type { IconName } from '../../../lib/icons';

export interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  fill?: string | undefined;
  onClick?: () => void;
  height?: number;
}
