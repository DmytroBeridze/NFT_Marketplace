import type { CheckControlProps } from './types';

export const CheckControl = ({
  id,
  type,
  field,
  meta,
  label,
  className,
  wrapperClass,
  autoComplete,
}: CheckControlProps) => {
  return (
    <div className={wrapperClass}>
      <label htmlFor={id}>{label}</label>
      <input
        {...field}
        id={id}
        type={type}
        className={className}
        autoComplete={autoComplete}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}
    </div>
  );
};
