interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const variantClasses = {
  primary: 'bg-general-background text-general-text hover:bg-avocado-100',
  secondary: 'text',
  // secondary: 'mint-500 text-avocado-100 hover:bg-gray-400',
};

const baseClass = 'rounded';

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
      // className={`${baseClass}  ${className} `}
      className={`${baseClass} ${variantClasses[variant]} ${className} `}
    >
      {children}
    </button>
  );
};
