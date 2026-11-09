import { ProfileHeader } from '../../../../widgets/ProfileHeader';
import { InnerContainer } from '../../layout';

import type { RefObject } from 'react';

type PageHeaderProps = {
  headerRef: RefObject<HTMLHeadingElement | null>;

  coverImage?: string;
  avatarSrc?: string;
  showAvatar?: boolean;
  title: string;
};

export const PageHeader = ({
  coverImage,
  avatarSrc,
  showAvatar,
  headerRef,
  title,
}: PageHeaderProps) => {
  return (
    <div className="relative ">
      <ProfileHeader
        coverImage={coverImage}
        avatarSrc={avatarSrc}
        showAvatar={showAvatar}
      />

      <InnerContainer className="absolute  left-1/2  top-1/2 -translate-x-1/2  -translate-y-1/2">
        <h1
          className=" text-amber-primary  font-space-mono-bold   text-4xl 
           heading-responsive"
          ref={headerRef}
        >
          {title}
        </h1>
      </InnerContainer>
    </div>
  );
};
