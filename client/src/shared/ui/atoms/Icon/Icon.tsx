import type { FC } from 'react';
import { iconsMap, type IconName } from '../../../lib/icons';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
}

export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  className,
  style,
  fill,
}) => {
  const IconComponent = iconsMap[name];

  return (
    <IconComponent
      fill={fill}
      width={size}
      height={size}
      className={className}
      style={{ display: 'block', ...style }}
    />
  );
};
