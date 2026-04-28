import type { ReactNode } from 'react';
import { Image } from '../../shared/ui/atoms';
import { SectionHeader } from '../../shared/ui/molecules/SectionHeader';

type AuthLayoutProps = {
  image: string;
  alt: string;
  title: string;
  children: ReactNode;
  description: string;
};

export const AuthLayout = ({
  image,
  alt,
  title,
  children,
  description,
}: AuthLayoutProps) => {
  return (
    <section
      className="flex h-[800px] gap-12 bg-primary-background-color 
     max-[834px]:flex-col  max-[834px]:h-auto max-[834px]:items-center "
    >
      <Image
        alt={alt}
        src={image}
        className="flex-1 basis-[50%] min-w-0"
        height="100%"
      />
      <div className=" flex-1 basis-[50%]  flex flex-col justify-center">
        {/* <AuthorizationModal /> */}

        <SectionHeader
          responsive={false}
          title={title}
          description={description}
          className="mb-10"
        />
        {children}
      </div>
    </section>
  );
};
