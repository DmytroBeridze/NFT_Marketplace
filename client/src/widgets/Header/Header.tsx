import { NavigationPanel } from '../../features/navigation';

export const Header = () => {
  return (
    <header
      className="
     max-w-full
     bg-primary-background-color
     text-primary-text-color
     py-5
     px-2.5
     "
    >
      <NavigationPanel />
    </header>
  );
};
