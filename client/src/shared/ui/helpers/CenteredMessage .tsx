import { Text } from '../atoms';
import type { TextProps } from '../atoms/Text/Text.types';

type CenteredMessageProps = {
  message: string;
  classList?: string;
};

export const CenteredMessage = ({
  message,
  classList,
}: CenteredMessageProps) => {
  return (
    <Text
      size="responsive-size-ms"
      className={` basis-1/2 min-w-0  h-full flex-1 m-auto relative  heroPrewiew-responsive  text-center text-red-700 ${classList}`}
    >
      {message}
    </Text>
  );
};
