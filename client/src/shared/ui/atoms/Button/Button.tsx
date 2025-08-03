interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'secondary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const variantClasses = {
  primary:
    'bg-primary-accent-color text-primary-text-color bg-hover-primary-accent-color shadow-secondary',
  outline:
    'border-2  border-primary-accent-color border-hover-primary-accent-color text-primary-text-color shadow-secondary',
  secondary:
    'bg-adaptive-button-background-color text-inversive-text-color shadow-secondary',
};

const baseClass =
  'rounded-md sm:rounded-lg md:rounded-2xl lg:rounded-3xl cursor-pointer';

export const Button = ({
  type = 'button',
  children,
  variant = 'primary',
  onClick,
  className = '',
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClasses[variant]} ${className} `}
    >
      {children}
    </button>
  );
};
