interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-mint-500 text-gray-800 hover:bg-gray-400 ',
};
const baseClass = 'px-4 py-2 rounded';
export const Button = ({
  type = 'button',
  children,
  variant = 'secondary',
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
