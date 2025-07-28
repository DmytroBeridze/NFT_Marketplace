import type { FC } from 'react';
import { iconsMap, type IconName } from '../../../lib/icons';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: FC<IconProps> = ({ name, size = 24, className, style }) => {
  const IconComponent = iconsMap[name];

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      style={style}
    />
  );
};
