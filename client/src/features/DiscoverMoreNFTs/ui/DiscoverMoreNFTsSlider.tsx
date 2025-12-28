import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import { SwiperNavButton } from '../../../widgets/MarketplaceHero/ui/atoms';
import type { NavigationOptions } from 'swiper/types';

import placeholderImage from '../../../shared/assets/images/plugImage.png';
import { NFTCard } from '../../../widgets/NFTCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGetNftsByCreateDateQuery } from '../../../entities/nft/model';
import { ErrorText } from '../../../shared/ui/atoms';

export const DiscoverMoreNFTsSlider = () => {
  const { isError, isLoading, data } = useGetNftsByCreateDateQuery(20);
  // const isError = true;

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);

  // const testArray = Array.from({ length: 9 }, (_, i) => ({
  //   i,
  //   placeholderImage,
  // }));

  return (
    <div className="">
      <Swiper
        className=" px-5 overflow-visible"
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          834: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        pagination={{
          type: 'fraction',
        }}
        onSlideChange={(swiper) => {
          setIsFirstSlide(swiper.isBeginning);
          setIsLastSlide(swiper.isEnd);
        }}
        onBeforeInit={(swiper) => {
          const navigation = swiper.params.navigation as NavigationOptions;
          navigation.prevEl = prevRef.current;
          navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[Navigation]}
        // className=" mySwiper"
      >
        <SwiperNavButton
          nawRef={prevRef}
          direction="prev"
          isFirstSlide={isFirstSlide}
        />
        <SwiperNavButton
          nawRef={nextRef}
          direction="next"
          isLastSlide={isLastSlide}
        />
        {isError && (
          <ErrorText className="text-red-700 w-full  text-center responsive-size-sm animate-pulse">
            Loading Error...
          </ErrorText>
        )}
        {!isError &&
          !isLoading &&
          data?.items.map((nft) => {
            const { _id, imageUrl, name, price, views, authorId } = nft;
            const { userName, avatar } = authorId;

            return (
              <SwiperSlide key={_id} className="overflow-visible">
                <NFTCard
                  id={_id}
                  src={imageUrl}
                  name={name}
                  price={price}
                  views={views}
                  userName={userName}
                  avatar={avatar}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
