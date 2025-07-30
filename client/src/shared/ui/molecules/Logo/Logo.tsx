import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text';

export const Logo = () => {
  return (
    <div className="flex gap-3 items-center">
      <Icon name="logo-icon" size={32} />
      <Text
        Element="span"
        font="font-space-mono-bold"
        size="t-text-ms"
        className="leading-normal"
      >
        {'NFT Marketplace'}
      </Text>
    </div>
  );
};
