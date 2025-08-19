import { Input } from '../../atoms/Input/Input';
import { useField } from 'formik';
import type { InputWrapper } from '../../atoms/Input/types';
import { useTranslate } from '../../../lib/i18n';

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

  const error = meta.error;
  const { translateVariables } = useTranslate({
    translateKey: error ? `modal.errors.${error}` : '',
  });
  // const { translateVariables } = useTranslate({ translateKey: error ?? '' });

  return (
    <Input
      field={field}
      meta={{ ...meta, error: translateVariables }}
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
      // value={value}
    />
  );
};
