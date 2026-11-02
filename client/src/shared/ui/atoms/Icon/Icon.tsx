// import type { FC } from 'react';
// import { iconsMap } from '../../../lib/icons';
// import type { IconProps } from './types';

// export const Icon: FC<IconProps> = ({
//   name,
//   size = 24,
//   height,
//   className,
//   style,
//   // fill = 'none',

//   onClick,
// }) => {
//   const IconComponent = iconsMap[name];

//   if (!IconComponent) {
//     console.error('Missing icon:', name);
//     return <span>Missing icon: {name}</span>;
//   }

//   return (
//     <IconComponent
//       // fill={fill}
//       width={size}
//       height={height || size}
//       className={className}
//       style={{ display: 'block', ...style }}
//       onClick={onClick}
//     />
//   );
// };
import type { FC } from 'react';
import { iconsMap } from '../../../lib/icons';
import type { IconProps } from './types';

export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  height,
  className,
  style,
  // fill = 'none',

  onClick,
}) => {
  const IconComponent = iconsMap[name];

  return (
    <IconComponent
      // fill={fill}
      width={size}
      height={height || size}
      className={className}
      style={{ display: 'block', ...style }}
      onClick={onClick}
    />
  );
};
