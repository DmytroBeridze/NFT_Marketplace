import { object, string } from 'yup';

export const subscribeSchema = object({
  userMail: string().email('invalidEmail').required('required'),
});
