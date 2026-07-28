import { useTranslation } from 'react-i18next';
import { extractErrorKey } from '../lib';
import { Spinner, Text } from '../../../shared/ui/atoms';

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
  const errorKey = extractErrorKey(error);

  // spinner
  if (isLoading) {
    return (
      <Spinner
        className=" static-text-purple-color"
        wrapperClassName="bg-transparent"
        size={50}
        height={30}
      />
    );
  }
  // success message
  if (message) {
    return (
      <Text color="text-success-color" size="t-text-sm">
        {t(`modal.serverMessages.data.${message}`)}
      </Text>
    );
  }

  if (errorKey) {
    const translated = t(`modal.serverMessages.error.${errorKey}`);

    return (
      <Text color="text-error-color" size="t-text-sm">
        {translated || t('modal.serverMessages.error.unknownError')}
      </Text>
    );
  }
};
