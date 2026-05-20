import AuthorBage from '../../../entities/DiscountedWork/ui/AuthorBage';
import SalesCountdown from '../../../entities/DiscountedWork/ui/SalesCountdown';
import type { ISales } from '../../../entities/nft/model';
import { Text } from '../../../shared/ui/atoms';
import { InnerContainer } from '../../../shared/ui/layout';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';
import Countdown from 'react-countdown';

type NFTPreviewType = {
  imageUrl: string | undefined;
  userName: string | undefined;
  userId: string | undefined;
  avatar: string | undefined;
  name: string | undefined;
  sales: ISales | undefined;
};

const NFTPreview = ({
  imageUrl,
  avatar,
  userName,
  name,
  sales,
  userId,
}: NFTPreviewType) => {
  return (
    <div
      data-testid="NFTPreview"
      className="bg-center bg-no-repeat bg-cover w-full nftPreview-responsive
       text-primary-text-color pb-16"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <InnerContainer className="flex flex-col h-full">
        <div className=" mt-auto ">
          {/* -----------------author */}
          <AuthorBage
            avatar={avatar}
            userName={userName}
            userId={userId}
            className="mb-8 "
          />
          <div className="nftPreview-content-responsive">
            {/* ---------------content */}
            <div className="flex flex-col gap-7 ">
              <Text
                children={name}
                font="font-work-sans-semibold"
                size="t-text-2xl"
                color="static-text-white-color"
              />

              {/* -------------smallSize -CountDown------- */}
              <div className="discountCountDown-bigSize-hidden ">
                <Countdown
                  date={sales?.endAt ? new Date(sales?.endAt) : undefined}
                  renderer={({ days, hours, minutes, seconds, completed }) => (
                    <SalesCountdown
                      // hours={24}
                      hours={days * 24 + hours}
                      minutes={minutes}
                      seconds={seconds}
                    />
                  )}
                />
              </div>

              {/* --------------------- */}
              <ButtonWithIcon
                children="See NFT"
                variant="secondary"
                iconName="eye-icon"
                className="py-5 px-12 items-center cursor-pointer nftPreview-button-responsive "
                textClassName="text-inversive-text-color text-base  "
                radius="xl"
              />
            </div>
            {/* ---------------countdown */}
            <div className="discountCountDown-smallSize-hidden">
              <Countdown
                date={sales?.endAt ? new Date(sales?.endAt) : undefined}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <SalesCountdown
                    hours={days * 24 + hours}
                    minutes={minutes}
                    seconds={seconds}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </InnerContainer>
    </div>
  );
};

export default NFTPreview;

// ----------skeleton

NFTPreview.Skeleton = () => {
  return (
    <div
      data-testid="NFTPreview-skeleton"
      className=" w-full nftPreview-responsive
       pb-16 skeleton-adaptive-background animate-pulse "
    >
      <InnerContainer className="flex flex-col h-full">
        <div className=" mt-auto ">
          {/* -----------------author */}
          <div className="bg-primary-background-color py-5 w-36 mb-8 rounded-3xl"></div>

          <div className="nftPreview-content-responsive">
            {/* ---------------content */}
            <div className="flex flex-col gap-10 ">
              <div className="w-[250px] max-w-full  h-[40px] bg-primary-background-color"></div>

              {/* -------------smallSize -CountDown------- */}
              <div className="discountCountDown-bigSize-hidden ">
                <SalesCountdown.Skeleton />
              </div>

              {/* -------------button-------- */}
              <div
                className="bg-primary-background-color py-8 px-24 
                nftPreview-button-responsive
               rounded-3xl
               "
              ></div>
            </div>
            {/* ---------------countdown */}
            <div className="discountCountDown-smallSize-hidden">
              <SalesCountdown.Skeleton />
            </div>
          </div>
        </div>
      </InnerContainer>
    </div>
  );
};
