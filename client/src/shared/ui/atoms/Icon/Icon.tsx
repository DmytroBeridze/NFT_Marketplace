import type { FC } from 'react';
import { iconsMap } from '../../../lib/icons';
import type { IconProps } from './types';

export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  height,
  className,
  style,
  fill = 'currentColor',
  onClick,
}) => {
  const IconComponent = iconsMap[name];

  return (
    <IconComponent
      fill={fill}
      width={size}
      height={height || size}
      className={className}
      style={{ display: 'block', ...style }}
      onClick={onClick}
    />
  );
};
