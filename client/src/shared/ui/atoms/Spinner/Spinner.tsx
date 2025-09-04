import type { IconName } from '../../../lib/icons';
import { Icon } from '../Icon';
import type { IconProps } from '../Icon/types';

type SpinnerProps = Omit<IconProps, 'style' | 'onClick' | 'name'> & {
  wrapperClassName?: string;
  name?: IconName;
};

export const Spinner = ({
  className,
  wrapperClassName,
  name = 'spinner',
  size,
  height,
  fill,
}: SpinnerProps) => {
  return (
    <div className={wrapperClassName}>
      <Icon
        className={className}
        name={name}
        size={size}
        fill={fill}
        height={height}
      />
    </div>
  );
};
