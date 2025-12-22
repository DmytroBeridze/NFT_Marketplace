import Art from '../../../shared/assets/images/categories/art.jpg';
import Collectibles from '../../../shared/assets/images/categories/collectibles.png';
import Music from '../../../shared/assets/images/categories/music.png';
import Photography from '../../../shared/assets/images/categories/photography.png';
import Sport from '../../../shared/assets/images/categories/sport.png';
import Utility from '../../../shared/assets/images/categories/utility.png';
import Video from '../../../shared/assets/images/categories/video.png';
import VirtualWorlds from '../../../shared/assets/images/categories/virtual-vorlds.png';

export const categoriesImg: Record<string, string> = {
  Art: Art,
  Collectibles: Collectibles,
  Music: Music,
  Photography: Photography,
  Gaming: Video,
  Fantasy: Utility,
  Sports: Sport,
  'Virtual Worlds': VirtualWorlds,
} as const;
