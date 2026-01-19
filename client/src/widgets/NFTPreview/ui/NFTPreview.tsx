import { Fragment } from 'react/jsx-runtime';
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
}: NFTPreviewType) => {
  return (
    <div
      className="bg-center bg-no-repeat bg-cover w-full nftPreview-responsive
       text-primary-text-color pb-16"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <InnerContainer className="flex flex-col h-full">
        <div className=" mt-auto ">
          {/* -----------------author */}
          <AuthorBage avatar={avatar} userName={userName} className="mb-8" />
          {/* <div className="flex justify-between  flex-col"> */}
          <div className="nftPreview-content-responsive">
            {/* <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center"> */}

            {/* ---------------content */}
            <div className="flex flex-col gap-7 ">
              <Text
                children={name}
                font="font-work-sans-semibold"
                size="t-text-2xl"
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
                icon="eye-icon"
                className="py-5 px-12 items-center cursor-pointer nftPreview-button-responsive "
                // className="py-5 px-12 items-center cursor-pointer max-w-[198px] "
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
      className="bg-center bg-no-repeat bg-cover w-full nftPreview-responsive
       text-primary-text-color pb-16"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <InnerContainer className="flex flex-col h-full">
        <div className=" mt-auto ">
          {/* -----------------author */}
          <AuthorBage avatar={avatar} userName={userName} className="mb-8" />
          {/* <div className="flex justify-between  flex-col"> */}
          <div className="nftPreview-content-responsive">
            {/* <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center"> */}

            {/* ---------------content */}
            <div className="flex flex-col gap-7 ">
              <Text
                children={name}
                font="font-work-sans-semibold"
                size="t-text-2xl"
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
                icon="eye-icon"
                className="py-5 px-12 items-center cursor-pointer nftPreview-button-responsive "
                // className="py-5 px-12 items-center cursor-pointer max-w-[198px] "
                textClassName="text-inversive-text-color text-base  "
                radius="xl"
              />
            </div>
            {/* ---------------countdown */}
            <div className="discountCountDown-smallSize-hidden">
              {/* <Countdown
                date={sales?.endAt ? new Date(sales?.endAt) : undefined}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <SalesCountdown
                    hours={days * 24 + hours}
                    minutes={minutes}
                    seconds={seconds}
                  />
                )}
              /> */}
            </div>
          </div>
        </div>
      </InnerContainer>
    </div>
  );
};
