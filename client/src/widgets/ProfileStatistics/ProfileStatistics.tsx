import { Link } from 'react-router-dom';
import type { INft } from '../../entities/nft/model';
import type { SocialLinks } from '../../entities/user/model';
import { Icon, Text } from '../../shared/ui/atoms';
import { ButtonWithIcon } from '../../shared/ui/molecules/ButtonWithIcon';
import { linksMap } from './socialIconMap';

type ProfileStatisticsProps = {
  bio?: string;
  nfts?: INft[];
  followers?: number;
  name: string;
  socialLinks?: SocialLinks;
};

export const ProfileStatistics = ({
  bio,
  nfts,
  name,
  followers,
  socialLinks,
}: ProfileStatisticsProps) => {
  const nftSold = nfts?.filter((elem) => elem.sold);

  // -----------------------statistics
  const statistics = [
    { itemName: 'Volume', value: nfts?.length },
    { itemName: 'NFTs Sold', value: nftSold?.length },
    { itemName: 'Followers', value: followers },
  ];

  // -------------------------socialLinks
  const linksCollection = socialLinks
    ? Object.entries(socialLinks).filter(
        ([key, value]) => key !== '_id' && Boolean(value),
      )
    : [];

  return (
    <section
      className="flex justify-between mt-[90px] text-primary-text-color mb-10
    max-[1300px]:flex-col gap-7
    "
    >
      {/* ------responsive-hidden block------ */}

      <Text
        className="hidden  max-[1300px]:block"
        Element="h2"
        font="font-work-sans-semibold"
        size="responsive-size-lg"
      >
        {name}
      </Text>

      {/* ------------------------- */}

      <div
        className="basis-[50%] grow shrink flex flex-col gap-8 max-w-[800px] 
      max-[1300px]:order-2
      "
      >
        <Text
          className="max-[1300px]:hidden"
          Element="h2"
          font="font-work-sans-semibold"
          size="responsive-size-lg"
          // color="text-primary-text-color"
          // className="mt-[90px] "
        >
          {name}
        </Text>
        {/* -------statistics */}
        <ul className="grid grid-cols-3 gap-4 max-w-[600px]">
          {statistics.map((elem) => (
            <li key={elem.itemName}>
              <Text font="font-space-mono-bold" size="responsive-size-mdl">
                {elem.value}
              </Text>
              <Text
                font="font-work-sans-regular"
                size="responsive-size-md"
                className="hyphens-auto break-words"
              >
                {elem.itemName}
              </Text>
            </li>
          ))}
        </ul>
        {/* -------bio */}
        <div>
          <Text
            font="font-space-mono-bold"
            size="t-text-md"
            color="text-secondary-text-color"
          >
            Bio
          </Text>
          <Text font="font-work-sans-regular" size="responsive-size-md">
            {bio}
          </Text>
        </div>

        {/* -------links */}
        <div>
          <Text
            font="font-space-mono-bold"
            size="t-text-md"
            color="text-secondary-text-color"
          >
            Links
          </Text>

          <ul className="flex gap-3.5  mt-4  static-text-purple-color ">
            {linksCollection.map((elem) => {
              const lnc = linksMap[elem[0]];

              return (
                <li
                  key={elem[0]}
                  className="hover:opacity-70 duration-300 ease-in-out"
                >
                  <Link to={elem[1]}>
                    <Icon name={lnc} size={32} fill="currentColor" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* <div className="basis-[50%] grow shrink flex justify-end items-start "> */}
      <div className="basis-[50%]  self-start max-[834px]:self-auto flex justify-end  max-[834px]:justify-normal  max-[1300px]:order-1">
        <div className="grid  grid-cols-2 gap-4 w-full max-w-[400px] justify-end   max-[834px]:grid-cols-1">
          <ButtonWithIcon
            radius="xl"
            iconName="imgPlus-icon"
            className="py-5 px-12  col-start-1 col-end-3 items-center
            max-[834px]:col-end-1
            "
            fill="none"
            iconClassName="static-text-white-color "
          >
            Create NFT
          </ButtonWithIcon>
          <ButtonWithIcon
            radius="xl"
            variant="outline"
            iconName="edit-icon"
            className="py-[18px]  max-[834px]:py-[20px] px-10 items-center"
            textClassName="text-primary-text-color leading-[normal]"
            iconClassName="text-primary-text-color"
          >
            Edit Profile
          </ButtonWithIcon>
          <ButtonWithIcon
            radius="xl"
            variant="secondary"
            iconName="gallery-icon"
            className="py-[18px] max-[834px]:py-[20px] px-10 items-center "
            textClassName="text-inversive-text-color text-base leading-[normal] "
          >
            Create Gallery
          </ButtonWithIcon>
        </div>
      </div>
    </section>
  );
};

/*

entities
│
├── user
│   ├── model
│   │     userApi.ts
│   │     userSlice.ts
│   │     types.ts
│   └── index.ts
│
├── nft
│
├── subscribe
│   ├── model
│   │     subscribeApi.ts
│   │     types.ts
│   └── index.ts

*/
