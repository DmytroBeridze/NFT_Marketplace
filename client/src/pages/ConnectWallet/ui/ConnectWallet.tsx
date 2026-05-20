import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../../../widgets/AuthLayout';
import ConnectWalletPlaceholder from '../../../shared/assets/images/connectWallet_Placeholder.png';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';
import { pngIconsMap, type PngIconName } from '../../../shared/lib/icons';
import { useConnecMetaMask } from '../model/connectWallet';

import { useToggleOverlay } from '../../../shared/ui/molecules/Overlay';
import { useWalletContext } from '../context/connectWalletContext';

type WalletItems = {
  name: 'Metamask' | 'Wallet Connect' | 'Coinbase';
  icon: PngIconName;
  link: string;
  connectWallet: (name: string, link: string) => Promise<void>;
};

const ConnectWallet = () => {
  const { t } = useTranslation('connectionWallet');
  const { openHandler } = useToggleOverlay();
  const { wallet, connect, loading, disconnect, hasMetaMask } =
    useConnecMetaMask();

  const { setWalletData } = useWalletContext();

  // -------------------check has browser extension
  const connectMetaMaskWallet = async (name: string, link: string) => {
    if (!hasMetaMask) {
      setWalletData({
        link,
        name,
      });
      openHandler('wallet');
      return;
    }
    connect();
  };

  const connectWalletConnect = async (name: string, link: string) => {
    setWalletData({
      link,
      name,
    });
    openHandler('wallet');
    return;
  };
  const connectCoinbase = async (name: string, link: string) => {
    setWalletData({
      link,
      name,
    });
    openHandler('wallet');
    return;
  };

  const walletItems: WalletItems[] = [
    {
      name: 'Metamask',
      icon: 'metamaskIcon-icon',
      connectWallet: connectMetaMaskWallet,
      link: 'https://metamask.io/download/',
    },
    {
      name: 'Wallet Connect',
      icon: 'walletConnect-icon',
      link: 'https://walletconnect.com/',
      connectWallet: connectWalletConnect,
      // connectWallet: async () => console.log('WalletConnect'),
    },
    {
      name: 'Coinbase',
      icon: 'coinbase-icon',
      link: 'https://www.coinbase.com/',
      connectWallet: connectCoinbase,
    },
  ];

  return (
    <AuthLayout
      description={t('description')}
      image={ConnectWalletPlaceholder}
      alt="authorizationPlaceholder"
      title={t('title')}
    >
      <section
        className=" pb-16 flex flex-col justify-center  
        gap-8 bg-primary-background-color 
     max-[834px]:flex-col max-w-[320px] max-[834px]:max-w-full 
      max-[834px]:items-center px-4 "
      >
        {/* <section className="max-w-[320px]  flex-1 basis-[50%]  flex flex-col justify-center"> */}
        {walletItems.map((item) => (
          <ButtonWithIcon
            disabled={loading}
            key={item.name}
            children={item.name}
            className="py-4 px-6  md:px-12 
          bg-secondary-background-color w-full  
          justify-start items-center border-[1px] "
            textClassName="text-primary-text-color"
            variant="outline"
            radius="xl"
            icon={
              <img
                alt={item.name}
                src={pngIconsMap[item.icon]}
                className="w-10 max-[834px]:w-8"
              />
            }
            onClick={() => item.connectWallet(item.name, item.link)}
            // onClick={item.connectWallet}
          />
        ))}
      </section>
    </AuthLayout>
  );
};

export default ConnectWallet;
