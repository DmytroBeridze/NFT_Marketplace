import { useContext } from 'react';
import { LogoVariantContext } from '../HeaderLogo/context/LogoVariantContext ';
import { Icon, Text } from '../../atoms';
import type { TextProps } from '../../atoms/Text/Text.types';

type LogoProps = {
  stacked?: boolean;
  size?: TextProps['size'];
};

export const Logo = ({
  stacked = true,
  size = 'responsive-size-ms',
}: LogoProps) => {
  const color = useContext(LogoVariantContext);

  {
    /* смена цвета иконки лого в бургере */
  }
  const colorVariants = {
    burger: 'burger-icon-color',
    header: 'static-text-purple-color',
  };

  return (
    <div
      className={`flex  ${stacked ? 'flex-col items-start' : 'items-center'}  gap-1   
    lg:flex-row lg:items-center lg:gap-3`}
    >
      <Icon
        name="logo-icon"
        size={24}
        className={`lg:w-8 lg:h-8 ${colorVariants[color]}`}
      />
      <Text
        Element="span"
        font="font-space-mono-bold"
        size={size}
        className="leading-normal "
        color="text-primary-text-color"
      >
        <span className="mr-2.5">NFT</span>

        {stacked && <br className="lg:hidden" />}

        <span>Marketplace</span>
      </Text>
    </div>
  );
};
