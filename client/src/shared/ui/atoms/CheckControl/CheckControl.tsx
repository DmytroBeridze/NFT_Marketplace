import type { CheckControlProps } from './types';

export const CheckControl = ({
  id,
  type,
  field,
  meta,
  label,
  className,
  wrapperClass,
  labelClass,
  autoComplete,
}: CheckControlProps) => {
  return (
    <div className={wrapperClass}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>

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
