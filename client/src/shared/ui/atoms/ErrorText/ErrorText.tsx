interface ErrorTextProps {
  children: string;
  className?: string;
}

export const ErrorText = ({ children, className }: ErrorTextProps) => {
  return <span className={className}>{children}</span>;
};
