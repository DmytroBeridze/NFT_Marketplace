interface IButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button = ({
  children,
  variant,
  onClick,
  className = '',
}: IButtonProps) => {
  return (
    <button onClick={onClick} className={`btn ${className} ${variant}`}>
      {/* <button onClick={onClick} className={className ?? ''}> */}
      {children}
    </button>
  );
};
