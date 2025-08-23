import { Text } from '../../../shared/ui/atoms/Text';
import { Spinner } from '../../../shared/ui/atoms/Spinner';
import { useTranslation } from 'react-i18next';
import { isFetchBaseQueryError } from '../../../shared/lib/rtk-guards';

interface QueryStatusProps {
  error: unknown;
  isLoading: boolean;
  data: { message: string };
}

export const QueryStatus = ({ data, error, isLoading }: QueryStatusProps) => {
  const { t } = useTranslation();

  return (
    <section>
      {data && data.message && (
        <Text color="text-success-color" size="t-text-sm">
          {t(`modal.serverMessages.data.${data.message}`)}
        </Text>
      )}

      {isFetchBaseQueryError(error) && (
        <Text color="text-error-color" size="t-text-sm">
          {t(
            `modal.serverMessages.error.${(error.data as { message: string }).message}`,
          )}
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
