import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useGetTopNftsQuery } from '../../model/topNftApi';
import { useEffect, useRef, useState } from 'react';
import { HeroSlide } from './HeroSlide';
import { CenteredMessage } from '../../../../shared/ui/helpers';
import { SwiperNavButton } from '../atoms';
// import { useShineEffect } from '../../../../shared/lib/hooks/useShineEffect';

export const HeroPreview = () => {
  const { isError, isLoading, data } = useGetTopNftsQuery(10);
  const items = data?.items || [];
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(false);
  // const { shine, setShine } = useShineEffect();
  const [shine, setShine] = useState<boolean>(false);

  // const { randomElement, updateRandom } = useRandomItem(items);

  // ------🏷️-GSAP previw anination
  useEffect(() => {
    gsap.set(swiperRef.current, { rotateY: -10 });
    const anim = gsap.to(swiperRef.current, {
      rotateY: 10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center center',
      onRepeat: () => {
        setTimeout(() => {
          setShine((prev) => !prev);
        }, 1500);
      },
    });

    return () => {
      anim.kill();
    };
  }, []);

  // --------------Error
  if (isError) return <CenteredMessage message="Error loading..." />;

  // --------------Loading
  if (!isLoading && items.length === 0)
    return <CenteredMessage message="No NFTs found..." />;

  return (
    <div
      className="basis-1/2 min-w-0  h-full flex-1  relative  "
      style={{
        perspective: 800, // 👈 добавляет глубину
      }}
    >
      <Swiper
        ref={swiperRef}
        className={`w-full h-full mySwiper shadow-secondary
           rounded-2xl relative  overflow-hidden  ${shine ? 'shine' : ''}`}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          setIsFirstSlide(swiper.isBeginning);
          setIsLastSlide(swiper.isEnd);
        }}
        // autoplay={{
        //   delay: 6000,
        //   disableOnInteraction: false,
        // }}
        // loop={true}

        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
      >
        {/*--------- buttons */}
        <SwiperNavButton
          direction="next"
          nawRef={nextRef}
          isLastSlide={isLastSlide}
        />
        <SwiperNavButton
          direction="prev"
          nawRef={prevRef}
          isFirstSlide={isFirstSlide}
        />

        {items.map((nft, index) => {
          return (
            <SwiperSlide
              key={nft._id || index}
              className="w-full h-full flex justify-center"
            >
              <HeroSlide isLoading={isLoading} nft={nft} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
