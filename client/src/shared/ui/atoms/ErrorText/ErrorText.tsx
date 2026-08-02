interface ErrorTextProps {
  Element?: keyof HTMLElementTagNameMap;
  children: string;
  className?: string;
  'data-testid'?: string;
}

export const ErrorText = ({
  children,
  className,
  Element = 'span',
  'data-testid': dataTestId,
}: ErrorTextProps) => {
  return (
    <Element className={className} data-testid={dataTestId}>
      {children}
    </Element>
  );
};
