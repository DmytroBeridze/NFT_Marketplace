import { useTranslation } from 'react-i18next';
import { useTranslate } from '../../../shared/lib/i18n';
import { InnerContainer } from '../../../shared/ui/layout';
import { HeaderLogo } from '../../../shared/ui/molecules/HeaderLogo';
import { Icon, Image, Text } from '../../../shared/ui/atoms';
import SubscribeByEmail from '../../../features/SubscribeByEmail/ui/SubscribeByEmail';
import { Link, NavLink } from 'react-router-dom';
import type { IconName } from '../../../shared/lib/icons';

type Links = {
  marketplace: string;
  rankings: string;
  connectWallet: string;
};

const linksMap: Record<keyof Links, string> = {
  connectWallet: '/connectWallet',
  rankings: '/rankings',
  marketplace: '/',
};

// ---- перевіряє лінки і якщо "marketplace" то замінює його на "/" боце корінний роут
const linkMapped = (link: keyof Links) => {
  return linksMap[link];
};

type Icons = { link: string; name: IconName };

const icons: Icons[] = [
  {
    link: 'https://discord.com/',
    name: 'discord-icon',
  },
  { link: 'https://youtu.be/2rUwQpwcOMI', name: 'youtube-icon' },
  {
    link: 'https://x.com/',
    name: 'twitter-icon',
  },
  {
    link: 'https://www.instagram.com/?hl=en',
    name: 'instagram-Icon',
  },
];

export const Footer = () => {
  const { translateVariables } = useTranslate<Links>({
    translateKey: 'explore',
    returnObjects: true,
    document: 'footer',
  });
  const { t } = useTranslation('footer');
  const { t: tt } = useTranslation('weeklyDigest');

  return (
    <div className="bg-secondary-background-color">
      <InnerContainer>
        <section className="main-padding-responsive font-work-sans-regular text-secondary-text-color">
          {/* <div className="mx-7 flex align-middle justify-between "> */}
          <div className="mx-7 footerWrapper">
            {/* -----------marketplace */}
            <div className="flex flex-col grow basis-1/3 ">
              <HeaderLogo
                className="max-[834px]:mb-6 mb-8"
                stacked={false}
                size="t-text-ms"
              />
              <p className="mb-8  responsive-size-sm">{t('main.createdBy')}</p>
              <div>
                <p className="responsive-size-sm pb-3">{t('main.social')}</p>

                {/* !-----Icons--------*/}
                <ul className="flex gap-3.5">
                  {icons.map((icon) => (
                    <li>
                      <Link to={icon.link}>
                        <Icon
                          name={icon.name}
                          size={32}
                          className="link"
                          fill={undefined}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* ---------explore */}
            <div className="grow basis-1/4 ">
              <Text
                Element="h3"
                font="font-space-mono-bold"
                color="text-primary-text-color"
                size="t-text-ms"
                // size="responsive-size-ms"
                className="max-[834px]:mb-6 mb-8"
              >
                {t('main.exploreTitle')}
              </Text>

              <ul className="flex flex-col gap-5">
                {(Object.keys(translateVariables) as (keyof Links)[]).map(
                  (link) => (
                    <li key={link} className="link">
                      <NavLink
                        to={linkMapped(link)}
                        className="responsive-size-sm"
                      >
                        {translateVariables[link]}
                      </NavLink>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* ------------subscribe */}
            <div className="grow basis-1/2">
              <Text
                font="font-space-mono-bold"
                color="text-primary-text-color"
                size="t-text-ms"
                className="max-[834px]:mb-6 mb-8"
              >
                {tt('title')}
              </Text>
              <Text className="mb-8 responsive-size-sm">
                {tt('description')}
              </Text>

              <div className="max-w-[420px] ">
                <SubscribeByEmail responsiveValue="835" />
              </div>
            </div>
          </div>
          <div>
            <div className="w-full h-0.5 bg-secondary-background-color mb-5"></div>
            <Text className="responsive-size-sm">{t('main.developed')}</Text>
          </div>
        </section>
      </InnerContainer>
    </div>
  );
};
