import {
  createContext,
  useContext,
  useState,
  //   type Dispatch,
  //   type SetStateAction,
} from 'react';

type FormsName = 'login' | 'signUp';

interface IAuthorizationContext {
  tab: FormsName;
  setTab: (tab: FormsName) => void;
  //   setTab: Dispatch<SetStateAction<FormsName>>;
}

interface AuthorizationContextProviderProps {
  children: React.ReactNode;
}

const AuthorizationContext = createContext<IAuthorizationContext | null>(null);

export const useAuthorizationContext = () => {
  const context = useContext(AuthorizationContext);

  if (!context) {
    throw new Error(
      'useAuthorizationContext must be used within AuthorizationContextProvider',
    );
  }
  return context;
};

export const AuthorizationContextProvider = ({
  children,
}: AuthorizationContextProviderProps) => {
  const [tab, setTab] = useState<FormsName>('login');

  return (
    <AuthorizationContext.Provider value={{ tab, setTab }}>
      {children}
    </AuthorizationContext.Provider>
  );
};
