import { createContext, useContext, useState, type ReactNode } from 'react';

type WalletProviderProps = {
  children: ReactNode;
};

type WalletDataType = { name: string; link: string };

type WalletContextType = {
  walletData: WalletDataType | null;
  setWalletData: (wallet: WalletDataType | null) => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

export const useWalletContext = () => {
  const wallet = useContext(WalletContext);

  if (!wallet) {
    throw new Error(
      'useAuthorizationContext must be used within WalletContextProvider',
    );
  }
  return wallet;
};

export const WalletContextProvider = ({ children }: WalletProviderProps) => {
  const [walletData, setWalletData] = useState<WalletDataType | null>(null);

  return (
    <WalletContext.Provider value={{ walletData, setWalletData }}>
      {children}
    </WalletContext.Provider>
  );
};
