import { Image } from '../../atoms/Image';
import PlugImg from '../../../assets/images/plugImage.webp';
import { Icon } from '../../atoms/Icon';

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
};

export const Avatar = ({ src, alt = 'avatar', className }: AvatarProps) => {
  return (
    <div
      className={[
        'rounded-full',
        'overflow-hidden',
        'max-w-[120px]',
        'max-h-[120px]',
        'w-full',
        'h-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* <div className="rounded-full overflow-hidden max-w-[120px] max-h-[120px] w-full h-full "> */}
      {src ? (
        <Image
          alt={alt}
          src={src}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.currentTarget.src = PlugImg;
          }}
        />
      ) : (
        <div className="bg-primary-background-color overflow-hidden static-text-purple-color">
          <Icon name="fallbackAvatar-icon" className=" w-full h-full" />
        </div>
      )}
    </div>
  );
};
