import { useTranslation } from 'react-i18next';
import { useWalletContext } from '../../pages/ConnectWallet/context/connectWalletContext';
import { Button } from '../../shared/ui/atoms';

export const WalletInstallModal = () => {
  const { t } = useTranslation('walletInstallModal');
  const { walletData } = useWalletContext();

  return (
    <div className=" p-9 bg-static-surface rounded-lg flex flex-col gap-5">
      <div className="responsive-size-sm font-space-mono-regular">
        <span className="static-text-purple-color"> {walletData?.name}</span>
        <span>{t('walletNotInstalled-part-1')}</span>
        <span className="static-text-purple-color"> {walletData?.name}</span>
        <span>{t('walletNotInstalled-part-2')}</span>
        <br />
        <span>{t('walletNotInstalled-part-3')}</span>
        <a
          href={walletData?.link}
          className="static-text-purple-color underline"
        >
          {walletData?.link}
        </a>
      </div>
      <Button
        className="px-5 py-2"
        onClick={() => {
          if (!walletData?.link) return;
          window.open(walletData?.link, '_blanc', 'noopener,noreferer');
        }}
      >
        {t('goTo')}
      </Button>
      {/* {t('walletNotInstalled', {
        name: walletData?.name,
        link: walletData?.link,
      })}
      <a href={walletData?.link}>{walletData?.link}</a> */}
    </div>
  );
};
