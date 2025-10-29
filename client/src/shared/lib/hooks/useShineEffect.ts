// !-------------перевірити чи працює відблиск на карточках галереї якщо ні- то видалити
// import { useEffect, useState } from 'react';

// export const useShineEffect = (
//   delay: number = 1200,
//   interval: number = 2500,
// ): Record<string, boolean> => {
//   const [shine, setShine] = useState<boolean>(false);

//   useEffect(() => {
//     let intervalId: any;

//     const timeoutId = setTimeout(() => {
//       intervalId = setInterval(() => {
//         setShine((prevState) => !prevState);
//       }, interval);
//     }, delay);

//     return () => {
//       clearInterval(intervalId);
//       clearTimeout(timeoutId);
//     };
//   }, [delay, interval]);

//   return { shine };
// };
