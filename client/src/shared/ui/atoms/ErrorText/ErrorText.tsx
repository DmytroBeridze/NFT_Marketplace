interface ErrorTextProps {
  children: string;
  className?: string;
  'data-testid'?: string;
}

export const ErrorText = ({
  children,
  className,
  'data-testid': dataTestId,
}: ErrorTextProps) => {
  return (
    <span className={className} data-testid={dataTestId}>
      {children}{' '}
    </span>
  );
};
