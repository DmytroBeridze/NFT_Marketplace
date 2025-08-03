interface OuterContainerProps {
  children: React.ReactNode;
}

export const OuterContainer = ({ children }: OuterContainerProps) => {
  return (
    <div
      className="
      max-w-outer-container-width
      m-auto mt-0 
      "
    >
      {children}
    </div>
  );
};
