import AuthorBage from '../../../entities/DiscountedWork/ui/AuthorBage';
import { Text } from '../../../shared/ui/atoms';
import { InnerContainer } from '../../../shared/ui/layout';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';

type NFTPreviewType = {
  imageUrl: string | undefined;
  userName: string | undefined;
  avatar: string | undefined;
  name: string | undefined;
};

const NFTPreview = ({ imageUrl, avatar, userName, name }: NFTPreviewType) => {
  return (
    <div
      className="bg-center bg-no-repeat bg-cover w-full nftPreview-responsive
       text-primary-text-color "
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <InnerContainer className="flex flex-col h-full">
        <div className=" mt-auto">
          {/* ---------------content */}
          <div>
            <AuthorBage avatar={avatar} userName={userName} />
            <Text children={name} />
            <ButtonWithIcon
              children="See NFT"
              variant="secondary"
              icon="eye-icon"
              className="py-5 px-12 items-center cursor-pointer "
              textClassName="text-inversive-text-color md:text-base text-xs"
            />
          </div>
          {/* ---------------countdown */}
        </div>
      </InnerContainer>
    </div>
  );
};

export default NFTPreview;
