import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  userName: Yup.string().min(3, 'tooShort').required('required'),
  userPass: Yup.string()
    .min(5, 'tooShort')
    .required('required')
    .matches(/[A-Za-z]/, 'containLetters')
    .matches(/\d/, 'containNumbers'),
});
