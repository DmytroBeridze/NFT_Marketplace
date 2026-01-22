import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';

import type { NavigationOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SLIDER_BREAKPOINTS } from '../features/DiscoverMoreNFTs/constants/slider.constants';
import { useGetNftsByCreateDateQuery } from '../entities/nft/model';
import { useResponsiveValue } from '../shared/lib/hooks';
import { ErrorText } from '../shared/ui/atoms';
import { NFTCard } from '../widgets/NFTCard';
import { SwiperNavButton } from '../widgets/MarketplaceHero/ui/atoms';
import { mapNftToCard } from '../entities/nft/lib/mapNftToCard';

const DiscoverMoreNFTsSlider = () => {
  const { isError, isLoading, data } = useGetNftsByCreateDateQuery(20);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);

  const { responsiveValue } = useResponsiveValue(SLIDER_BREAKPOINTS, 1);
  const [width, setWidth] = useState<number>(0);
  const skeletonElements = Array.from({ length: responsiveValue });

  return (
    <section>
      {isError ? (
        <ErrorText className="text-red-700 w-full  text-center responsive-size-sm animate-pulse">
          Loading Error...
        </ErrorText>
      ) : isLoading ? (
        <div className=" discoverMoreNFTsResponsiveSkeleton gap-7">
          {skeletonElements.map((_, i) => (
            <NFTCard.Skeleton key={i} />
          ))}
        </div>
      ) : (
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
          //   !-------------------------------------------------
          //Срабатывает один раз, когда слайдер создаётся.     swiper.params.slidesPerView содержит текущее количество слайдов, видимых одновременно (берётся из  breakpoints).
          onInit={(swiper) => setWidth(swiper.params.slidesPerView as number)}
          // Срабатывает каждый раз, когда меняется размер окна. Swiper автоматически пересчитывает slidesPerView по текущим breakpoints.
          onResize={(swiper) => setWidth(swiper.params.slidesPerView as number)}
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

          {!isError &&
            !isLoading &&
            data?.items.map((nft) => {
              // const { _id, imageUrl, name, price, views, authorId } = nft;
              // const { userName, avatar } = authorId;

              return (
                <SwiperSlide key={nft._id} className="overflow-visible">
                  {/*------------ маппер */}
                  <NFTCard {...mapNftToCard(nft)} />
                  {/* <NFTCard
                    id={_id}
                    src={imageUrl}
                    name={name}
                    price={price}
                    views={views}
                    userName={userName}
                    avatar={avatar}
                  /> */}
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </section>
  );
};
