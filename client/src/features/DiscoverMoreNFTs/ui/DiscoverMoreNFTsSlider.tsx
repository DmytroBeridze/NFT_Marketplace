import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
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
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const mq1300 = window.matchMedia('(min-width:1300px)');
    const mq834 = window.matchMedia('(min-width:834px)');

    const update = () => {
      if (mq1300.matches) {
        setWidth(3);
      } else if (mq834.matches) {
        setWidth(2);
      } else setWidth(1);
    };
    update();

    mq1300.addEventListener('change', update);
    mq834.addEventListener('change', update);

    return () => {
      mq1300.removeEventListener('change', update);
      mq834.removeEventListener('change', update);
    };
  }, []);

  console.log('responsiveData', width);

  const skeletonElements = Array.from({ length: 3 });

  return (
    <section>
      <div
        className="grid grid-cols-1
       md:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        {skeletonElements.map((element, i) => (
          <NFTCard.Skeleton />
        ))}
      </div>

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
    </section>
  );
};
