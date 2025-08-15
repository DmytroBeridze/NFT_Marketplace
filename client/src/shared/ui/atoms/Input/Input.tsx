import type { InputProps } from './types';

export const Input = ({
  id,
  type = 'text',
  field,
  meta,
  placeholder,
  className,
  leftIcon,
  rightIcon,
  onRightIconClick,
  accept, // вказується для завантаження файлів
  label,
  labelClass,
  autoComplete,
  wrapperClass, //для розтягування інпута на всю довжину  wrapperClass="w-full flex "
}: InputProps) => {
  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}

      <div
        style={{
          position: 'relative',
          flexGrow: '1',
          flexShrink: '1',
          flexBasis: '0',
        }}
      >
        {leftIcon && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: '16px',
            }}
          >
            {leftIcon}
          </span>
        )}
        <input
          {...field}
          id={id}
          type={type}
          placeholder={placeholder}
          className={className}
          accept={accept}
          autoComplete={autoComplete}
        />
        {rightIcon && (
          <span
            onClick={onRightIconClick}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: '16px',
            }}
          >
            {rightIcon}
          </span>
        )}
        {meta.error && meta.touched && <div>{meta.error}</div>}
      </div>
    </div>
  );
};
