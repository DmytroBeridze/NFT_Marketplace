import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg';
import { ReactComponent as BallIcon } from '../../assets/icons/Basketball.svg';
import { ReactComponent as CameraIcon } from '../../assets/icons/Camera.svg';
import { ReactComponent as DiscordIcon } from '../../assets/icons/DiscordLogo.svg';
import { ReactComponent as EnvelopeIcon } from '../../assets/icons/EnvelopeSimple.svg';
import { ReactComponent as EyeIcon } from '../../assets/icons/Eye.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/InstagramLogo.svg';
import { ReactComponent as MagicWandIcon } from '../../assets/icons/MagicWand.svg';
import { ReactComponent as MusicNotesIcon } from '../../assets/icons/MusicNotes.svg';
import { ReactComponent as PaintBrushIcon } from '../../assets/icons/PaintBrush.svg';
import { ReactComponent as PlanetIcon } from '../../assets/icons/Planet.svg';
import { ReactComponent as RocketIcon } from '../../assets/icons/RocketLaunch.svg';
import { ReactComponent as SwatchesIcon } from '../../assets/icons/Swatches.svg';
import { ReactComponent as TwitterIcon } from '../../assets/icons/TwitterLogo.svg';
import { ReactComponent as VideoCameraIcon } from '../../assets/icons/VideoCamera.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/icons/YoutubeLogo.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/User.svg';
import { ReactComponent as BurgerMenu } from '../../assets/icons/BurgerMenu.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';

export const iconsMap = {
  'logo-icon': LogoIcon,
  'camera-icon': CameraIcon,
  'discord-icon': DiscordIcon,
  'ball-icon': BallIcon,
  'envelope-icon': EnvelopeIcon,
  'eye-icon': EyeIcon,
  'instagram-Icon': InstagramIcon,
  'magicWand-icon': MagicWandIcon,
  'musicNotes-icon': MusicNotesIcon,
  'paintBrush-icon': PaintBrushIcon,
  'planet-icon': PlanetIcon,
  'rocket-icon': RocketIcon,
  'swatches-icon': SwatchesIcon,
  'twitter-icon': TwitterIcon,
  'videoCamera-icon': VideoCameraIcon,
  'youtube-icon': YoutubeIcon,
  'user-icon': UserIcon,
  'BurgerMenu-icon': BurgerMenu,
  'Close-icon': Close,
} as const;

export type IconName = keyof typeof iconsMap;

/* NFT Marketplace */
