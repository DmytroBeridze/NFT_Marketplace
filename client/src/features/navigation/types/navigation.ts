export type NavItemTuple = [string, string];

export interface NavigationPanelProps {
  classNameList?: string;
  classNameItem?: string;
  navItems: NavItemTuple[];
  lang: string;
  renderItem?: (value: string, lang: string) => React.ReactNode;
}

export type NavigationPanelItemProps = Omit<
  NavigationPanelProps,
  'classNameList' | 'navItems'
> & {
  value: string;
  routeKey: string;
};
