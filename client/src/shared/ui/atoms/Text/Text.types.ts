import type { CSSProperties } from 'react';

export type TextSize =
  | 't-text-xs'
  | 't-text-sm'
  | 't-text-ms'
  | 't-text-md'
  | 't-text-lg'
  | 't-text-xl'
  | 't-text-2xl'
  | 't-text-3xl'
  | 'responsive-size-xs'
  | 'responsive-size-xxs'
  | 'responsive-size-sm'
  | 'responsive-size-ms'
  | 'responsive-size-md'
  | 'md:text-sm'
  | 'md:text-base'
  | undefined;

export type TextFont =
  | 'font-space-mono-regular'
  | 'font-space-mono-bold'
  | 'font-work-sans-regular'
  | 'font-work-sans-semibold';

export type TextColor =
  | 'text-primary-text-color'
  | 'text-secondary-text-color'
  | 'text-inversive-text-color'
  | 'static-text-black-color'
  | 'static-text-white-color'
  | 'text-burger-color'
  | 'text-error-color'
  | 'text-success-color'
  | 'text-inherit';

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  //   Element?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
  Element?: keyof HTMLElementTagNameMap;
  style?: CSSProperties;
  size?: TextSize;
  font?: TextFont;
  color?: TextColor;
}
// export type TextSize = TextProps['size'];
export type TextSecondaryProps = Omit<
  TextProps,
  'className' | 'Element' | 'style'
>;
