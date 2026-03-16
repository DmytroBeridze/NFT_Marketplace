import type { ReactNode } from 'react';
import { Text } from '../../atoms';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  responsive?: boolean;
}

export const SectionHeader = ({
  title,
  description,
  className,
  children,
  responsive = true,
}: SectionHeaderProps) => {
  return (
    <div
      className={`${responsive && 'block-title-padding-responsive'} ${className || ''}`}
    >
      <div className="">
        <Text
          className="  responsive-size-lg text-primary-text-color mb-2.5"
          Element="h2"
          font="font-work-sans-semibold"
        >
          {title}
        </Text>
        <Text
          className=" responsive-size-md text-primary-text-color"
          Element="p"
          font="font-work-sans-regular"
        >
          {description}
        </Text>
      </div>
      {children}
    </div>
  );
};
