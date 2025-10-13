import { useField } from 'formik';
import { CheckControl, type FormikCheckControlProps } from '../../atoms';

export const FormikCheckControl = ({
  id,
  name,
  type,
  className,
  label,
  wrapperClass,
  labelClass,
  autoComplete,
  value,
}: FormikCheckControlProps) => {
  const [field, meta] = useField({ name, type, value });

  return (
    <CheckControl
      id={id}
      type={type}
      className={className}
      // className={className}
      label={label}
      wrapperClass={wrapperClass}
      autoComplete={autoComplete}
      field={field}
      meta={meta}
      labelClass={labelClass}
    />
  );
};
