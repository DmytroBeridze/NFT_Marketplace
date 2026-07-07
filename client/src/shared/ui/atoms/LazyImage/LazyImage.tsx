import { useState } from 'react';
import { Image } from '../Image';

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
};

export const LazyImage = ({
  src,
  alt,
  className,
  containerClassName,
  loading,
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  // const loaded = false;
  return (
    <div
      className={`w-full h-full ${containerClassName || ''} ${className || null}`}
    >
      {!loaded && (
        // <div className="w-full h-full bg-amber-400 animate-pulse"></div>
        <div
          className="w-full h-full skeleton-adaptive-background animate-pulse"
          data-testid="skeleton"
        ></div>
      )}
      {
        <Image
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          // className={`transition-opacity duration-500  ${loaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
          loading={loading}
        />
      }
    </div>
  );
};
