interface InnerContainerProps {
  children: React.ReactNode;
}

export const InnerContainer = ({ children }: InnerContainerProps) => {
  return (
    <div className="w-full max-w-[1300px] p-x-inner-container-padding  mt-0 m-auto border border-red-400">
      {children}
    </div>
  );
};
