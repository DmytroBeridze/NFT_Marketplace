import { useFormik } from 'formik';
import { subscribeSchema } from '../config/subscribeSchema';
import { useSetSubscribeEmailMutation } from './subscribeApi';

const useSubscribeByEmail = () => {
  const [subscribeEmail, { error, isLoading, data }] =
    useSetSubscribeEmailMutation();

  const formik = useFormik({
    initialValues: {
      userMail: '',
    },
    validationSchema: subscribeSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await subscribeEmail({ email: values.userMail }).unwrap();
        resetForm();
      } catch (error) {
        // обробляється в QueryStatus
      }
    },
  });

  return { formik, error, isLoading, data };
};

export default useSubscribeByEmail;
