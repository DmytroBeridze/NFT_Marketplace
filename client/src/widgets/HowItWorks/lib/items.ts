import type { TFunction } from 'i18next';

export const getHowItWorksItems = (t: TFunction) => {
  return [
    {
      id: 'setup-wallet',
      image: 'wallet',
      title: t('cards.setup-wallet.title'),
      description: t('cards.setup-wallet.proposal'),
      link: '/connectWallet',
    },
    {
      id: 'create-collection',
      image: 'collection',
      title: t('cards.create-collection.title'),
      description: t('cards.create-collection.proposal'),
      link: '/dashboard',
    },
    {
      id: 'start-buying',
      image: 'buying',
      title: t('cards.start-buying.title'),
      description: t('cards.start-buying.proposal'),
      link: '/gallery',
    },
  ];
};
