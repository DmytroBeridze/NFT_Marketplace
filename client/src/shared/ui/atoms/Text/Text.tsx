import type { TextProps } from './Text.types';

export const Text = ({
  children,
  className,
  style,
  Element = 'div',
  size = 't-text-md',
  font = 'font-work-sans-regular',
  color = 'text-primary-text-color',
}: TextProps) => {
  return (
    <Element style={style} className={` ${font} ${color} ${size} ${className}`}>
      {children}
    </Element>
  );
};
