import avatarFallback from '../../shared/assets/images/user_plug.png';
import coverImageFallback from '../../shared/assets/images/spiral.webp';

import { Image } from '../../shared/ui/atoms';
import { InnerContainer } from '../../shared/ui/layout';

type ProfileHeaderProps = { coverImage?: string; avatar?: string };

export const ProfileHeader = ({ coverImage, avatar }: ProfileHeaderProps) => {
  return (
    <section className="relative ">
      <div
        style={{ backgroundImage: `url(${coverImage || coverImageFallback})` }}
        className="  h-[320px] bg-no-repeat bg-center bg-cover max-[1300px]:h-[280px] max-[834px]:h-[250px] "
      />
      <InnerContainer>
        <div
          className="rounded-2xl absolute -bottom-12 p-0.5  max-[834px]:left-[50%]  max-[834px]:translate-x-[-50%]
        bg-secondary-background-color"
        >
          <div className="w-[120px] h-[120px] rounded-2xl overflow-hidden">
            <Image src={avatar || avatarFallback} alt="test" />
          </div>
        </div>
      </InnerContainer>
    </section>
  );
};

// ---------------------------------Skeleton

ProfileHeader.Skeleton = () => {
  return (
    <section className="relative ">
      <div
        className="  h-[320px] bg-no-repeat bg-center bg-cover 
        max-[1300px]:h-[280px] max-[834px]:h-[250px]
         skeleton-adaptive-background animate-pulse"
      />
      <InnerContainer>
        <div
          className="rounded-2xl absolute -bottom-12 p-0.5  max-[834px]:left-[50%]  max-[834px]:translate-x-[-50%]
        bg-secondary-background-color"
        >
          <div
            className="w-[120px] h-[120px] rounded-2xl overflow-hidden
          skeleton-adaptive-background "
          ></div>
        </div>
      </InnerContainer>
    </section>
  );
};
