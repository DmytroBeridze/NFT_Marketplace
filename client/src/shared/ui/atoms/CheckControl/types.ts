import type { FieldInputProps, FieldMetaProps } from 'formik';

export interface CheckControlProps {
  id: string;
  type: 'checkbox' | 'radio';
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
  label?: string;
  value?: string;
  className?: string;
  wrapperClass?: string;
  labelClass?: string;
  autoComplete?: string;
}
export type FormikCheckControlProps = Omit<
  CheckControlProps,
  'field' | 'meta'
> & {
  name: string;
};
