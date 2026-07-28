import { Link } from 'react-router-dom';
import type { INft } from '../../entities/nft/model';
import type { SocialLinks } from '../../entities/user/model';
import { Icon, Text } from '../../shared/ui/atoms';
import { ButtonWithIcon } from '../../shared/ui/molecules/ButtonWithIcon';
import { linksMap } from './socialIconMap';

type ProfileStatisticsProps = {
  userId: string;
  bio?: string;
  nfts?: INft[];
  followers?: number;
  name: string;
  isError: boolean;
  isLoading: boolean;
  socialLinks?: SocialLinks;
};

export const ProfileStatistics = ({
  bio,
  userId,
  nfts,
  name,
  followers,
  isError,
  isLoading,
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
    <section className="flex justify-between mt-[90px] text-primary-text-color mb-10 ">
      <div className="basis-[50%] grow shrink flex flex-col gap-7">
        <Text
          Element="h2"
          font="font-work-sans-semibold"
          size="responsive-size-lg"
          // color="text-primary-text-color"
          // className="mt-[90px] "
        >
          {name}
        </Text>
        {/* -------statistics */}
        <ul className="grid grid-cols-3 gap-4">
          {statistics.map((elem) => (
            <li key={elem.itemName}>
              <Text font="font-space-mono-bold" size="t-text-lg">
                {elem.value}
              </Text>
              <Text font="font-work-sans-regular" size="t-text-md">
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
          <Text font="font-work-sans-regular" size="t-text-md">
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
      <div className="basis-[50%] grow shrink self-start flex justify-end">
        <div className="grid  grid-cols-2 gap-2.5 w-[400px] justify-end  ">
          <ButtonWithIcon
            iconName="imgPlus-icon"
            className="py-5 px-12  col-start-1 col-end-3 items-center"
            fill="none"
            iconClassName="static-text-white-color "
          >
            Create NFT
          </ButtonWithIcon>
          <ButtonWithIcon
            variant="outline"
            iconName="edit-icon"
            className="py-[18px] px-10 items-center"
            textClassName="text-primary-text-color leading-[normal]"
            iconClassName="text-primary-text-color"
          >
            Edit Profile
          </ButtonWithIcon>
          <ButtonWithIcon
            variant="secondary"
            iconName="gallery-icon"
            className="py-[18px] px-10 items-center"
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
