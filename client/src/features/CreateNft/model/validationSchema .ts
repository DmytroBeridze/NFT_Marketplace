import * as Yup from 'yup';

export let NFTSchema = Yup.object().shape({
  name: Yup.string().required('required').min(2, 'tooShort'),
  description: Yup.string().required('required').min(10, 'tooShort'),
  file: Yup.mixed<File>().required('required'),
  keywords: Yup.string()
    .matches(/^[a-zA-Z\s,]+$/, 'onlyLatin')
    .required('required'),
  price: Yup.number()
    .typeError('containNumbers')
    .moreThan(0, 'greaterThan-0')
    .required('required'),

  royalty: Yup.object({
    id: Yup.string().nullable(),
    name: Yup.string(),
  }).when('isForSale', {
    is: true,
    then: (schema) =>
      schema.shape({
        name: Yup.string().required('required'),
      }),
  }),

  duration: Yup.object({
    id: Yup.string().nullable(),
    name: Yup.string(),
  }).when('isForSale', {
    is: true,
    then: (schema) =>
      schema.shape({
        name: Yup.string().required('required'),
      }),
  }),
  isForSale: Yup.boolean(),
});
