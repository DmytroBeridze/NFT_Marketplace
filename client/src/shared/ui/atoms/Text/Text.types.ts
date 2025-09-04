import type { CSSProperties } from 'react';

export interface TextProps {
  children: React.ReactNode;
  className?: string;
  Element?: keyof HTMLElementTagNameMap;
  style?: CSSProperties;

  //   Element?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
  size?:
    | 't-text-xs'
    | 't-text-sm'
    | 't-text-ms'
    | 't-text-md'
    | 't-text-lg'
    | 't-text-xl'
    | 't-text-2xl'
    | 't-text-3xl'
    | 'responsive-size-sm'
    | 'responsive-size-ms'
    | 'responsive-size-md';
  font?:
    | 'font-space-mono-regular'
    | 'font-space-mono-bold'
    | 'font-work-sans-regular'
    | 'font-work-sans-semibold';
  color?:
    | 'text-primary-text-color'
    | 'text-secondary-text-color'
    | 'text-inversive-text-color'
    | 'static-text-black-color'
    | 'static-text-white-color'
    | 'text-burger-color'
    | 'text-error-color'
    | 'text-success-color'
    | 'text-inherit'
    | 
}
