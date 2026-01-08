interface InnerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const InnerContainer = ({
  children,
  className,
}: InnerContainerProps) => {
  return (
    <div
      className={[
        'w-full max-w-[1300px] p-x-inner-container-padding  mt-0 m-auto',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      // className={`w-full max-w-[1300px] p-x-inner-container-padding  mt-0 m-auto ${className ?? ''}`}
    >
      {children}
    </div>
  );
};
