import { useFormik } from 'formik';
import { signupSchema } from '../config';
import { useRegisterMutation } from '../model';
import type { RegisterValues } from '../../../shared/types';

export const useSignUpForm = () => {
  const [register, { isLoading, error, data }] = useRegisterMutation();

  const formik = useFormik<RegisterValues>({
    initialValues: {
      userName: '',
      userMail: '',
      userPass: '',
      userconfirmPass: '',
      userType: '',
    },
    validationSchema: signupSchema,

    onSubmit: async (values, { resetForm }) => {
      const { userconfirmPass, ...body } = values;

      try {
        const result = await register(body).unwrap(); // Якщо помилка- кидає виключення

        resetForm();
      } catch (error) {
        //! Помилки обробляються в <QueryStatus />, тому еуе нічого не робимо
        // if (isFetchBaseQueryError(error)) {
        //   console.log(
        //     t(
        //       `modal.serverMessages.error.${(error.data as { message: string }).message}`,
        //     ),
        //   );
        // } else if (isErrorWithMessage(error)) {
        //   console.log(t(`modal.serverMessages.error.${error.message}`));
        // }
      }
    },
  });

  return { formik, isLoading, error, data };
};
