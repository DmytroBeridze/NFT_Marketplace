import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Formik, Form, Field } from 'formik';

import { Text } from '../../../shared/ui/atoms';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';
import { subscribeSchema } from '../config/subscribeSchema';
import { useSetSubscribeEmailMutation } from '../model';
import { getFieldErrorClass } from '../../AuthorizationModal/lib';
import { QueryStatus } from '../../AuthorizationModal';
import { useEffect, useState } from 'react';

const SubscribeByEmail = () => {
  const [subscribeEmail, { error, isLoading, data }] =
    useSetSubscribeEmailMutation();

  const [reparedData, setReparedData] = useState<string>('');

  useEffect(() => {
    if (!data?.message) return;

    setReparedData(data?.message);
    const timeout = setTimeout(() => {
      setReparedData('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [data]);

  return (
    <Formik
      initialValues={{
        userMail: '',
      }}
      validationSchema={subscribeSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await subscribeEmail({ email: values.userMail }).unwrap();
          resetForm();
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Form>
        <div className="relative  gap-3 form-container mb-2.5">
          {/* <div className="relative h-[70px] border"> */}
          <FormikInput
            id="userMail"
            name="userMail"
            type="email"
            className={`subscribeByEmailInput py-5 px-5 w-full rounded-3xl 
          input-focus border border-transparent  placeholder:text-base ${getFieldErrorClass(error, 'userMail')}`}
            placeholder="Enter your email here"
            autoComplete="email"
          />

          <ButtonWithIcon
            className={` subscribeByEmailButton py-5 px-12 flex items-center justify-center  
            right-0 top-0 border border-transparent  `}
            icon="envelope-icon"
            radius="xl"
            type="submit"
            disabled={isLoading}
            variant={isLoading ? 'loading' : 'primary'}
          >
            <Text>Subscribe</Text>
          </ButtonWithIcon>
        </div>
        {/*-------- render  messages after request  */}
        <QueryStatus
          message={reparedData}
          // message={data?.message}
          error={error}
          isLoading={isLoading}
        />
      </Form>
    </Formik>
  );
};

export default SubscribeByEmail;
