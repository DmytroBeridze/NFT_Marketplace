/*

Компоненты и их слои

DiscoverMoreNFTs — feature

Контейнер с логикой: получает данные, управляет слайдером.

Папка: features/DiscoverMoreNFTs/ui/DiscoverMoreNFTs.tsx

Заголовок — widget

Только рендерит текст.

Папка: widgets/DiscoverMoreNFTsTitle/ui/DiscoverMoreNFTsTitle.tsx

Кнопка "See All" — widget

Только рендер и callback через props.

Папка: widgets/SeeAllButton/ui/SeeAllButton.tsx

Слайдер — widget или ui-компонент внутри feature

Может быть частью features/DiscoverMoreNFTs/ui/Slider.tsx если тесно связан с логикой DiscoverMoreNFTs.

Либо отдельный widget, если его планируется использовать где-то ещё.

Карточка — widget

Получает данные через props от DiscoverMoreNFTs.

Папка: widgets/DiscoverMoreNFTsCard/ui/DiscoverMoreNFTsCard.tsx




features/
 └─ DiscoverMoreNFTs/
     ├─ ui/
     │   ├─ DiscoverMoreNFTs.tsx    ← основной контейнер
     │   └─ Slider.tsx               ← слайдер (если не переиспользуемый)
     └─ model/
         └─ useDiscoverMoreNFTs.ts   ← локальная логика, state, хуки

widgets/
 ├─ DiscoverMoreNFTsTitle/
 │   └─ ui/DiscoverMoreNFTsTitle.tsx
 ├─ SeeAllButton/
 │   └─ ui/SeeAllButton.tsx
 └─ DiscoverMoreNFTsCard/
     └─ ui/DiscoverMoreNFTsCard.tsx
*/

import { DiscoverMoreNFTsContent } from './DiscoverMoreNFTsContent';
import { DiscoverMoreNFTsSlider } from './DiscoverMoreNFTsSlider';

const DiscoverMoreNFTs = () => {
  return (
    <section className="main-padding-responsive">
      <DiscoverMoreNFTsContent />
      <DiscoverMoreNFTsSlider />
    </section>
  );
};

export default DiscoverMoreNFTs;
