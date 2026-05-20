import type { ReactNode } from 'react';
import {
  pngIconsMap,
  type IconName,
  type PngIconName,
} from '../../../lib/icons';
import { Button, Icon, Image, Text } from '../../atoms';
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
  iconName?: IconName;
  icon?: ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;

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
  type,
  disabled,
  iconName,
  // icon = 'rocket-icon',
  icon,
  // textSize = 't-text-sm',
}: ButtonWithIconProps) => {
  const renderIcon = () => {
    if (icon) return icon;
    if (iconName) {
      return (
        <Icon
          name={iconName}
          className={` ${iconClassName ?? ''} `}
          size={20}
          fill={fill}
        />
      );
    }
  };

  const renderedIcon = renderIcon();

  return (
    <Button
      className={`flex  ${className ?? ''} `}
      radius={radius}
      onClick={onClick}
      variant={variant}
      type={type}
      disabled={disabled}
    >
      {renderedIcon && <span className="mr-3">{renderedIcon}</span>}

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
