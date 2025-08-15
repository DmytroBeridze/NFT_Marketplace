import { Input } from '../../atoms/Input/Input';
import { useField } from 'formik';
import type { InputWrapper } from '../../atoms/Input/types';

export const FormikInput = ({
  id,
  name,
  type = 'text',
  placeholder,
  className,
  leftIcon,
  rightIcon,
  onRightIconClick,
  accept,
  label,
  labelClass,
  autoComplete,
  wrapperClass,
}: InputWrapper) => {
  const [field, meta] = useField(name);
  return (
    <Input
      field={field}
      meta={meta}
      id={id}
      type={type}
      className={className}
      placeholder={placeholder}
      autoComplete={autoComplete}
      wrapperClass={wrapperClass}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onRightIconClick={onRightIconClick}
      accept={accept}
      label={label}
      labelClass={labelClass}
    />
  );
};
