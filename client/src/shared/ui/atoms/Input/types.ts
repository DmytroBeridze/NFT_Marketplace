import { type FieldInputProps, type FieldMetaProps } from 'formik';
import type { InputHTMLAttributes } from 'react';

//  ---------------------------base input

// export type InputType =
//   | 'text'
//   | 'email'
//   | 'password'
//   | 'number'
//   | 'file'
//   | 'image';

export interface InputProps {
  id: string;
  type: React.HTMLInputTypeAttribute;
  field: FieldInputProps<any>;
  meta: FieldMetaProps<any>;
  placeholder?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  accept?: string;
  label?: string;
  labelClass?: string;
  autoComplete?: string;
  wrapperClass?: string;
}

// --------------------------reusable input wrapper
export type InputWrapper = Omit<InputProps, 'field' | 'meta'> & {
  name: string;
  variant: 'page' | 'modal' | 'subscribe' | 'custom' | 'createForm';
  size?: 'default' | 'custom' | 'createForm';
};
