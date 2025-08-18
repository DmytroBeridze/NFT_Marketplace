import * as Yup from 'yup';
import { loginSchema } from './loginSchema';

export const signupSchema = loginSchema.concat(
  Yup.object({
    userconfirmPass: Yup.string()
      .min(5, 'tooShort')
      .required('required')
      .matches(/[A-Za-z]/, 'containLetters')
      .matches(/\d/, 'containNumbers')
      .oneOf([Yup.ref('userPass')], 'passwordsMustMatch'),
    userMail: Yup.string().email('invalidEmail').required('required'),
    userType: Yup.string().required('required'),
  }),
);
