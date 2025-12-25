import type { IconName } from '../../../lib/icons';
import { Button, Icon, Text } from '../../atoms';
import type { TextSecondaryProps } from '../../atoms/Text/Text.types';

interface ButtonWithIconProps extends TextSecondaryProps {
  className?: string;
  // children?: string;
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  variant?: 'primary' | 'outline' | 'secondary' | 'loading';
  textSize?: TextSecondaryProps['size'];
  textClassName?: string;
  iconClassName?: string;
  fill?: string;
  icon?: IconName;

  onClick?: () => void;
}

export const ButtonWithIcon = ({
  className,
  radius,
  children,
  onClick,
  variant,
  textClassName = 'static-text-white-color',
  iconClassName,
  textSize,
  color,
  fill,
  icon = 'rocket-icon',
  // textSize = 't-text-sm',
}: ButtonWithIconProps) => {
  return (
    <Button
      className={`flex ${className ?? ''} `}
      radius={radius}
      onClick={onClick}
      variant={variant}
    >
      <Icon
        name={icon}
        className={`mr-3 ${iconClassName ?? ''} `}
        size={20}
        fill={fill}
      />
      <Text
        Element="span"
        size={textSize}
        color={color}
        // size="t-text-sm"
        font="font-work-sans-semibold"
        className={` ${textClassName ?? ''} `}
      >
        {children}
      </Text>
    </Button>
  );
};
