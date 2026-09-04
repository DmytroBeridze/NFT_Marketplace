import { useEffect } from 'react';
import { useSetNFTMutation, type CreateNftDto } from '../../entities/nft/model';
import { CreateNftForm } from '../../features/CreateNft';
import { InnerContainer } from '../../shared/ui/layout';
import { Text } from '../../shared/ui/atoms';

export const CreateNftPage = () => {
  return (
    <section>
      <InnerContainer>
        <Text
          Element="h2"
          font="font-work-sans-semibold"
          size="responsive-size-lg"
          color="text-primary-text-color"
          className="mt-[90px] "
        >
          Create NFT
        </Text>
        <Text
          Element="p"
          font="font-work-sans-regular"
          size="responsive-size-md"
          color="text-primary-text-color"
          className="mb-[60px] "
        >
          Mint your unique digital item on the blockchain
        </Text>

        <CreateNftForm />
      </InnerContainer>
    </section>
  );
};
