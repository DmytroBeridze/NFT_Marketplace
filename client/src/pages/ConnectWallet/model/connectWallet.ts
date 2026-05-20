import { useEffect, useState } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useConnecMetaMask = () => {
  const [wallet, setWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);

  // ---------check wallet

  useEffect(() => {
    setHasMetaMask(!!window.ethereum);
  }, []);

  // -----connect, get accaunts
  const connect = async () => {
    if (!window.ethereum) return;

    setLoading(true);
    try {
      const accaunts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      syncWallet(accaunts[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ----------disconnect, clear storage
  const disconnect = () => {
    setWallet(null);
    localStorage.removeItem('metamask-wallet');
  };

  // -------------synchronize
  const syncWallet = (acc: string | null) => {
    if (!acc) {
      setWallet(null);
      localStorage.removeItem('metamask-wallet');
    } else {
      setWallet(acc);
      localStorage.setItem('metamask-wallet', acc);
    }
  };

  // ----------recovery actual wallet if user change account with worked site
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (acc: string[]) => {
      syncWallet(acc[0] ?? null);
    };

    // const handleAccountsChanged = (acc: string[]) => {
    //   if (acc.length === 0) {
    //     setWallet(null);
    //     localStorage.removeItem('metamask-wallet');
    //   } else {
    //     setWallet(acc[0]);
    //     localStorage.setItem('metamask-wallet', acc[0]);
    //   }
    // };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  // ----------recovery actual wallet if user change account with not worked site
  useEffect(() => {
    const checkWallet = async () => {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      syncWallet(accounts[0]);
    };

    checkWallet();
  }, []);

  return { wallet, connect, loading, disconnect, hasMetaMask };
};
