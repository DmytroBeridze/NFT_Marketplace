import { Text } from '../../../shared/ui/atoms/Text';
import { Spinner } from '../../../shared/ui/atoms/Spinner';
import { useTranslation } from 'react-i18next';
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
  isFetchErrorWithMessage,
} from '../../../shared/lib/rtk-guards';

interface QueryStatusProps {
  error: unknown;
  isLoading: boolean;
  message?: string;
}

export const QueryStatus = ({
  message,
  error,
  isLoading,
}: QueryStatusProps) => {
  const { t } = useTranslation();

  return (
    <section>
      {message && (
        <Text color="text-success-color" size="t-text-sm">
          {t(`modal.serverMessages.data.${message}`)}
        </Text>
      )}
      {/* ------------------ */}

      {isFetchBaseQueryError(error) && isFetchErrorWithMessage(error) && (
        <Text color="text-error-color" size="t-text-sm">
          {t(`modal.serverMessages.error.${error.data.message}`)}
        </Text>
      )}

      {isErrorWithMessage(error) && (
        <Text color="text-error-color" size="t-text-sm">
          {t(`modal.serverMessages.error.${error.message}`)}
        </Text>
      )}

      {/* ------------------ */}
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
