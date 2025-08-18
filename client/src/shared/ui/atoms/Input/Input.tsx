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
  value, //для radio і checkBox
}: InputProps) => {
  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}

      <div // для розтягування інпута на всю ширину
        className="basis-0 grow-1 shrink-1"
      >
        {/* для вірівнювання іконок відносно інпута */}
        <div className="relative flex ">
          {leftIcon && (
            <span className="absolute top-1/2 -translate-y-1/2 left-[16px]">
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
            value={value}
          />
          {rightIcon && (
            <span
              onClick={onRightIconClick}
              className="absolute top-1/2 -translate-y-1/2 right-[16px]"
            >
              {rightIcon}
            </span>
          )}
        </div>
        {meta.error && meta.touched && (
          <div className="text-red-500">{meta.error}</div>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------inline class

// import type { InputProps } from './types';

// export const Input = ({
//   id,
//   type = 'text',
//   field,
//   meta,
//   placeholder,
//   className,
//   leftIcon,
//   rightIcon,
//   onRightIconClick,
//   accept, // вказується для завантаження файлів
//   label,
//   labelClass,
//   autoComplete,
//   wrapperClass, //для розтягування інпута на всю довжину  wrapperClass="w-full flex "
//   value, //для radio і checkBox
// }: InputProps) => {
//   return (
//     <div className={wrapperClass}>
//       {label && (
//         <label htmlFor={id} className={labelClass}>
//           {label}
//         </label>
//       )}

//       <div // для розтягування інпута на всю ширину
//         style={{
//           flexGrow: '1',
//           flexShrink: '1',
//           flexBasis: '0',
//           // border: '1px solid red',
//         }}
//       >
//         {/* для вірівнювання іконок відносно інпута */}
//         <div style={{ position: 'relative', display: 'flex' }}>
//           {leftIcon && (
//             <span
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 left: '16px',
//               }}
//             >
//               {leftIcon}
//             </span>
//           )}
//           <input
//             {...field}
//             id={id}
//             type={type}
//             placeholder={placeholder}
//             className={className}
//             accept={accept}
//             autoComplete={autoComplete}
//             value={value}
//           />
//           {rightIcon && (
//             <span
//               onClick={onRightIconClick}
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 right: '16px',
//               }}
//             >
//               {rightIcon}
//             </span>
//           )}
//         </div>
//         {meta.error && meta.touched && <div>{meta.error}</div>}
//       </div>
//     </div>
//   );
// };
