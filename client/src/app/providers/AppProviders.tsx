import { ThemeProvider } from './ThemeProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}
export const AppProviders = ({ children }: AppProvidersProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
