import type { INft } from '../../entities/nft/model';
import type { SocialLinks } from '../../entities/user/model';
import { Text } from '../../shared/ui/atoms';

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

  const statistics = [
    { itemName: 'Volume', value: nfts?.length },
    { itemName: 'NFTs Sold', value: nftSold?.length },
    { itemName: 'Followers', value: followers },
  ];

  return (
    <section className="flex items-center justify-between mt-[90px] text-primary-text-color">
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
        </div>
      </div>
      <div className="basis-[50%] grow shrink">action button</div>
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
