import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Text } from '../../../shared/ui/atoms/Text';
import { Spinner } from '../../../shared/ui/atoms/Spinner';

interface QueryStatusProps {
  error: unknown;
  isLoading: boolean;
  data: { message: string };
}

export const QueryStatus = ({ data, error, isLoading }: QueryStatusProps) => {
  const isFetchBaseQueryError = (
    error: unknown,
  ): error is FetchBaseQueryError => {
    return typeof error === 'object' && error !== null && 'status' in error;
  };

  return (
    <section>
      {data && data.message && (
        <Text color="text-success-color" size="t-text-sm">
          {data.message}
        </Text>
      )}

      {isFetchBaseQueryError(error) && (
        <Text color="text-error-color" size="t-text-sm">
          {(error.data as { message: string }).message}
        </Text>
      )}

      {isLoading && (
        <Spinner
          fill={`var(--hover-primary-accent-color)`}
          wrapperClassName="bg-transparent"
          size={50}
          height={30}
        />
      )}
    </section>
  );
};
