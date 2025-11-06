import { Text } from '../../atoms';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className="block-title-padding-responsive">
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
  );
};
