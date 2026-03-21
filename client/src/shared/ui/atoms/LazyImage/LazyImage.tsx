import { useState } from 'react';
import { Image } from '../Image';

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
};

export const LazyImage = ({
  src,
  alt,
  className,
  containerClassName,
}: LazyImageProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  // const loaded = false;
  return (
    <div className={`w-full h-full ${containerClassName || ''}`}>
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
          // onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-500  ${loaded ? 'opacity-100' : 'opacity-0'} ${className || ''}`}
        />
      }
    </div>
  );
};
