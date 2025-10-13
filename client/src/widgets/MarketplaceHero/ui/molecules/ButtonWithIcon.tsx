import { Button, Icon, Text } from '../../../../shared/ui/atoms';

interface ButtonWithIconProps {
  className?: string;
  children?: string;
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  onClick?: () => void;
}

export const ButtonWithIcon = ({
  className,
  radius,
  children,
  onClick,
}: ButtonWithIconProps) => {
  return (
    <Button className={className} radius={radius} onClick={onClick}>
      <Icon name="rocket-icon" className="mr-3" size={20} />
      <Text
        Element="span"
        size="t-text-sm"
        font="font-work-sans-semibold"
        className="static-text-white-color"
      >
        {children}
      </Text>
    </Button>
  );
};
