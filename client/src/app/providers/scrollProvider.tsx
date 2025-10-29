// import React, { createContext, useContext, useEffect, useState } from 'react';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface IScrollContext {
  scroll: boolean;
  toggleScroll: () => void;
  lockScroll: () => void;
  unlockScroll: () => void;
}

interface ScrollProviderProps {
  children: React.ReactNode;
}

const ScrollContext = createContext<IScrollContext | null>(null);

// --------context
export const useScrollContext = () => {
  const context = useContext<IScrollContext | null>(ScrollContext);
  if (!context)
    throw new Error('useScrollContext must be used within ScrollProvider');

  return context;
};

// -------provider
export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [scroll, setScroll] = useState(true);

  const toggleScroll = () => {
    setScroll((prev) => !prev);
  };

  const unlockScroll = () => {
    setScroll(true);
  };
  const lockScroll = () => {
    setScroll(false);
  };

  useEffect(() => {
    document.body.style.overflow = scroll ? 'auto' : 'hidden';
  }, [scroll]);

  return (
    <ScrollContext.Provider
      value={{ scroll, toggleScroll, unlockScroll, lockScroll }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
