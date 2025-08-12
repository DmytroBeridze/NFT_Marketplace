import { useContext } from 'react';
import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text';
import { LogoVariantContext } from '../HeaderLogo/context/LogoVariantContext ';

export const Logo = () => {
  const color = useContext(LogoVariantContext);

  {
    /* смена цвета иконки лого в бургере */
  }
  const colorVariants = {
    burger: 'burger-icon-color',
    header: 'static-text-purple-color',
  };

  return (
    <div className="flex flex-col gap-1 items-start  lg:flex-row lg:items-center lg:gap-3">
      <Icon
        name="logo-icon"
        size={24}
        className={`lg:w-8 lg:h-8 ${colorVariants[color]}`}
      />
      <Text
        Element="span"
        font="font-space-mono-bold"
        size="responsive-size-ms"
        className="leading-normal"
      >
        NFT
        <br className=" lg:hidden" />
        <span>Marketplace</span>
      </Text>
    </div>
  );
};
