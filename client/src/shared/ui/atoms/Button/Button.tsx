interface IButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  type = 'button',
  children,
  variant,
  onClick,
  className = '',
}: IButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className} ${variant}`}
    >
      {/* <button onClick={onClick} className={className ?? ''}> */}
      {children}
    </button>
  );
};
