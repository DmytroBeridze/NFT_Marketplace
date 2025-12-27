import { type Ref } from 'react';
import { Icon } from '../../../../shared/ui/atoms';

interface SwiperNavButtonProps {
  nawRef: Ref<HTMLDivElement> | undefined;
  direction: 'prev' | 'next';
  top?: number;
  correctingTop?: number;
  isFirstSlide?: boolean;
  isLastSlide?: boolean;
}
export const SwiperNavButton = ({
  nawRef,
  direction,
  isLastSlide,
  isFirstSlide,
  top = 50,
  correctingTop = 50,
}: SwiperNavButtonProps) => {
  const isDirect = direction === 'prev';
  return (
    <div
      ref={nawRef}
      style={{ top: `${top}%`, transform: `translateY(-${correctingTop}%)` }}
      className={`absolute    z-20  transition-opacity delay-150 duration-300 ease-in-out
         ${isDirect ? 'left-3' : 'right-3 '}
         ${isDirect ? (isFirstSlide ? 'opacity-20 cursor-auto' : ' cursor-pointer opacity-100') : isLastSlide ? 'opacity-20 cursor-auto' : 'cursor-pointer opacity-100'}
         `}
    >
      <Icon
        name="arrow-icon"
        className={` static-text-purple-color ${isDirect ? 'rotate-180' : ''}`}
        size={24}
      />
    </div>
  );
};
