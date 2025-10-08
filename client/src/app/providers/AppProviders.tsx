import { ScrollResetOnRouteChange } from '../../shared/lib/scrollResetOnRouteChange';
import { ThemeProvider } from './ThemeProvider';
import { ScrollProvider } from './scrollProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <ScrollResetOnRouteChange />
        {children}
      </ScrollProvider>
    </ThemeProvider>
  );
};
