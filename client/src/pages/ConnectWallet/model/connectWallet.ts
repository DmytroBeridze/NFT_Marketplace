import { useEffect, useState } from 'react';
import { toast } from 'sonner';
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

  // -----connect, get accounts
  const connect = async () => {
    if (!window.ethereum) {
      return;
    }
    setLoading(true);

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    try {
      // -----Metamask request
      const request = window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // -----Timer
      const timeout = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error('METAMASK_TIMEOUT'));
        }, 1500);
      });
      // ----------Race
      const accounts = await Promise.race([request, timeout]);

      syncWallet(accounts[0] ?? null);
    } catch (error: any) {
      if (error.code === -32002) {
        toast.info('MetaMask вже очікує підтвердження');
      } else if (error.message === 'METAMASK_TIMEOUT') {
        toast.info('Перевірте MetaMask: запит ще може очікувати підтвердження');
      } else if (error.code === 4001) {
        toast.info('Підключення скасовано');
      } else {
        console.error('Помилка підключення:', error);
      }
    } finally {
      if (timeoutId !== undefined) clearTimeout(timeoutId);

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
