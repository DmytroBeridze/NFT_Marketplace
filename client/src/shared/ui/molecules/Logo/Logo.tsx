import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text';

export const Logo = () => {
  return (
    <div className="flex flex-col gap-1 items-start  lg:flex-row lg:items-center lg:gap-3">
      <Icon name="logo-icon" size={24} className="lg:w-8 lg:h-8  " />
      <Text
        Element="span"
        font="font-space-mono-bold"
        size="responsive-size-ms"
        className="leading-normal"
      >
        NFT
        <br className=" lg:hidden" />
        <span>Marketplace</span>
        {/* {'NFT Marketplace'} */}
      </Text>
    </div>
  );
};
