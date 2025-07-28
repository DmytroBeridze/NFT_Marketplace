import type { TextProps } from './Text.types';

export const Text = ({
  children,
  className,
  Element = 'div',
  size = 't-text-md',
  font = 'font-work-sans-regular',
  color = 'text-primary-text-color',
}: TextProps) => {
  return (
    <Element className={`${font} ${size} ${className} ${color}`}>
      {children}
    </Element>
  );
};
