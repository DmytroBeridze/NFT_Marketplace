import { useField } from 'formik';
import { useTranslate } from '../../../lib/i18n';
import { Input } from '../../atoms';
import type { InputWrapper } from '../../atoms/Input/types';

// dynamic styles
const inputStyles = {
  page: 'subscribeByEmailInput rounded-3xl',
  modal: 'border-2 border-gray-300 rounded-sm ',
  subscribe: 'subscribeByEmailInput py-5 px-5 w-full rounded-3xl ',
} as const;

// base styles
const baseInput = {
  default: 'w-full h-10 lg:h-12 p-2.5 pl-10 sm:pl-14 input-focus focus:ring-1',
  custom: '',
};

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
  variant = 'modal',
  size = 'default',
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
      className={`${baseInput[size]}  
          ${inputStyles[variant]} ${className ?? ''}`}
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
