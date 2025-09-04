interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'secondary' | 'loading';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  disabled?: boolean;
}

const variantClasses = {
  primary:
    'bg-primary-accent-color text-primary-text-color bg-hover-primary-accent-color shadow-secondary',
  outline:
    'border-2  border-primary-accent-color border-hover-primary-accent-color text-primary-text-color shadow-secondary',
  secondary:
    'bg-adaptive-button-background-color text-inversive-text-color shadow-secondary',
  loading: 'bg-tab-active-background-color',
};

const baseClass = 'cursor-pointer';

const responsiveRadius = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-3xl',
  responsive: 'rounded-md sm:rounded-lg lg:rounded-3xl',
};

export const Button = ({
  type = 'button',
  children,
  variant = 'primary',
  radius = 'responsive',
  onClick,
  className = '',
  disabled = false,
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClasses[variant]} ${responsiveRadius[radius]} ${className} `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
