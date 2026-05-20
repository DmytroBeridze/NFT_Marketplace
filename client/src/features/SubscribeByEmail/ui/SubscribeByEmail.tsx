import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Form, FormikProvider } from 'formik';
import { Text } from '../../../shared/ui/atoms';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';
import { getFieldErrorClass } from '../../AuthorizationModal/lib';
import { QueryStatus } from '../../AuthorizationModal';
import { useEffect, useState } from 'react';
import useSubscribeByEmail from '../model/useSubscribeByEmail';
import { useTranslation } from 'react-i18next';

type SubscribeParams = {
  responsiveValue?: '835' | '1300';
};

const SubscribeByEmail = ({ responsiveValue = '1300' }: SubscribeParams) => {
  const { t } = useTranslation('weeklyDigest');

  const { data, error, isLoading, formik } = useSubscribeByEmail();

  const [reparedData, setReparedData] = useState<string>('');
  const [reparedError, setReparedError] = useState<any>('');

  useEffect(() => {
    if (!data?.message) return;

    setReparedData(data?.message);

    const timeout = setTimeout(() => {
      setReparedData('');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [data]);

  useEffect(() => {
    if (!error) return;

    setReparedError(error);

    const timeout = setTimeout(() => {
      setReparedError('');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="relative  gap-3 form-container mb-2.5">
          <FormikInput
            id="userMail"
            name="userMail"
            type="email"
            variant="subscribe"
            size="custom"
            className={`subscribeByEmailInput max-[834px]:py-2 py-5 px-5 w-full rounded-3xl  
          input-focus border border-transparent  ${getFieldErrorClass(reparedError, 'userMail')}`}
            placeholder={t('placeholder')}
            autoComplete="email"
          />

          <ButtonWithIcon
            data-test="subscribe-button"
            className={`subscribeByEmailButton subscribeByEmailButton-${responsiveValue} max-[834px]:py-2  py-5 px-12  
            right-0 top-0 border border-transparent  `}
            iconName="envelope-icon"
            radius="xl"
            type="submit"
            disabled={isLoading}
            variant={isLoading ? 'loading' : 'primary'}
          >
            <Text>{t('button')}</Text>
          </ButtonWithIcon>
        </div>
        {/*-------- render  messages after request  */}

        <div
          className="h-7"
          // className={`h-7  ${reparedError || reparedData ? 'opacity-100' : 'opacity-0'} transition-opacity `}
        >
          <QueryStatus
            message={reparedData}
            // message={data?.message}
            error={reparedError}
            isLoading={isLoading}
          />
        </div>
      </Form>
    </FormikProvider>
  );
};

export default SubscribeByEmail;
