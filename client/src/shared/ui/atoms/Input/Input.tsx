import { useField } from 'formik';

type InputType = 'text' | 'email' | 'password' | 'number' | 'file' | 'image';
// type IconPosition = 'left' | 'right';
interface InputProps {
  id: string;
  name: string;
  type: InputType;
  placeholder?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  //   iconPosition?: IconPosition;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  accept?: string;
  label?: string;
  labelClass?: string;
  autoComplete?: string;
  wrapperClass?: string;
}

export const Input = ({
  id,
  name,
  type = 'text',
  placeholder,
  className,
  leftIcon,
  //   iconPosition = 'left',
  rightIcon,
  onRightIconClick,
  accept,
  label,
  labelClass,
  autoComplete,
  wrapperClass,
}: InputProps) => {
  const [field, meta] = useField(name);

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
