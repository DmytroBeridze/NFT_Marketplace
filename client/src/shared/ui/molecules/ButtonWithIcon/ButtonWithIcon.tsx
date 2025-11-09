import { Button, Icon, Text } from '../../atoms';
import type { TextSecondaryProps } from '../../atoms/Text/Text.types';

interface ButtonWithIconProps extends TextSecondaryProps {
  className?: string;
  // children?: string;
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  variant?: 'primary' | 'outline' | 'secondary' | 'loading';
  textSize?: TextSecondaryProps['size'];
  textClassName?: string;

  onClick?: () => void;
}
// interface ButtonWithIconProps {
//   className?: string;
//   children?: string;
//   radius?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
//   variant?: 'primary' | 'outline' | 'secondary' | 'loading';
//   textSize?: TextSize;
//   textClassName?: string;
//   color?: string;
//   onClick?: () => void;
// }

export const ButtonWithIcon = ({
  className,
  radius,
  children,
  onClick,
  variant,
  textClassName,
  textSize,
  color,
  // textSize = 't-text-sm',
}: ButtonWithIconProps) => {
  return (
    <Button
      className={`flex ${className} `}
      radius={radius}
      onClick={onClick}
      variant={variant}
    >
      <Icon name="rocket-icon" className="mr-3" size={20} />
      <Text
        Element="span"
        size={textSize}
        color={color}
        // size="t-text-sm"
        font="font-work-sans-semibold"
        className={`static-text-white-color ${textClassName} `}
      >
        {children}
      </Text>
    </Button>
  );
};
