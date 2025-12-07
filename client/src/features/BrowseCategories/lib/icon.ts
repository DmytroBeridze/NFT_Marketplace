import type { IconName } from '../../../shared/lib/icons';

export const categoriesIcon: Record<string, IconName> = {
  Art: 'paintBrush-icon',
  Collectibles: 'swatches-icon',
  Music: 'musicNotes-icon',
  Photography: 'camera-icon',
  Gaming: 'videoCamera-icon',
  Fantasy: 'magicWand-icon',
  Sports: 'ball-icon',
  'Virtual Worlds': 'planet-icon',
} as const;
