import { useField } from 'formik';
import {
  CheckControl,
  type FormikCheckControlProps,
} from '../../atoms/CheckControl';

export const FormikCheckControl = ({
  id,
  name,
  type,
  className,
  label,
  wrapperClass,
  autoComplete,
  value,
}: FormikCheckControlProps) => {
  const [field, meta] = useField({ name, type, value });
  console.log(field);

  return (
    <CheckControl
      id={id}
      type={type}
      className={className}
      label={label}
      wrapperClass={wrapperClass}
      autoComplete={autoComplete}
      field={field}
      meta={meta}
    />
  );
};
