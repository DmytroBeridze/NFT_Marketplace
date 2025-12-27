import { useFormik } from 'formik';
import { useLoginMutation, type LoginValues } from '../model';
// import type { LoginValues } from '../../../shared/types';
import { loginSchema } from '../config';
import { useLocalStorage } from '../../../shared/lib/hooks';
// import {
//   isErrorWithMessage,
//   isFetchBaseQueryError,
// } from '../../../shared/lib/rtk-guards';

export const useLoginForm = () => {
  const [login, { error, isLoading, data }] = useLoginMutation();
  const { setLocal } = useLocalStorage();
  const formik = useFormik<LoginValues>({
    initialValues: {
      userName: '',
      userPass: '',
    },

    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await login(values).unwrap();
        // localStorage.setItem('token', result.token);
        setLocal('token', result.token);

        // ⚠️ dispatch замінено на addMatcher в userSlice для автоматичного оновлення стану
        // dispatch(addUserData(result.userData));
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
