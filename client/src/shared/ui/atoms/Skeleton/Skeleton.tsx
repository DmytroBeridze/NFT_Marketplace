/**
 * Skeleton — это компонент-заглушка для отображения скелетона при загрузке данных.
 *
 * Важно:
 * 1. Если Skeleton используется **на месте текста или небольшого блока**, его обычно делают `absolute`,
 *    а родитель должен иметь `position: relative`, чтобы скелетон накрывал контент.
 *
 * 2. Если Skeleton используется **на месте изображения или блока с фиксированными размерами**,
 *    ему можно задать `width: 100%` и `height: 100%`, чтобы он занимал весь родительский элемент.
 *
 * 3. Для универсальности позиционирование (absolute, размеры) можно задавать через `className` при использовании.
 */

interface SkeletonProps {
  isLoading?: boolean;
  background: string;
  className?: string;
  Component?: React.ElementType;
}

export const Skeleton = ({
  isLoading,
  background,
  className,
  Component = 'span',
}: SkeletonProps) => {
  if (!isLoading) return null;

  return (
    <Component
      className={` 
            text-transparent animate-pulse inset-0  opacity-100 ${background} ${className}`}
    />
  );
};
