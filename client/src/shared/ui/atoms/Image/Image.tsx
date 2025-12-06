import type { ReactEventHandler } from 'react';

type ObjectFit =
  | 'object-fill'
  | 'object-cover'
  | 'object-contain'
  | 'object-none'
  | 'object-scale-down'
  | string;

type ObjectPosition =
  | 'object-top-left'
  | 'object-top'
  | 'object-top-right'
  | 'object-left'
  | 'object-center'
  | 'object-right'
  | 'object-bottom-left'
  | 'object-bottom'
  | 'object-bottom-right'
  | string;

type Width = 'w-auto' | 'w-full' | 'w-min' | 'w-max' | 'w-fit' | string;
type Height =
  | 'h-auto'
  | 'h-full'
  | 'h-min'
  | 'h-max'
  | 'h-fit'
  | 'h-screen'
  | string;

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: Width;
  height?: Height;
  objectPosition?: ObjectPosition;
  objectFit?: ObjectFit;
  onError?: ReactEventHandler<HTMLImageElement>;
}

export const Image = ({
  src,
  alt,
  className,
  width = 'w-full',
  height = 'w-full',
  objectPosition = 'object-center',
  objectFit = 'object-cover',
  onError,
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={[width, height, objectFit, objectPosition, className || '']
        .filter(Boolean)
        .join(' ')}
      // вбудований  захист від битих посиланнь
      onError={onError}
    />
  );
};
