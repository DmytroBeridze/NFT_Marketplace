import { useEffect } from 'react';
import { useSetNFTMutation, type CreateNftDto } from '../../entities/nft/model';
import { CreateNftForm } from '../../features/CreateNft';
import { InnerContainer } from '../../shared/ui/layout';
import { Text } from '../../shared/ui/atoms';

export const CreateNftPage = () => {
  //   const [updatePost, { isLoading, isError, data }] = useSetNFTMutation();
  //   const fakeNft = {
  //     name: 'Cyber Samurai',
  //     description: 'Unique cyberpunk NFT with animated neon effects.',
  //     imageUrl: 'https://i.ibb.co/example/cyber-samurai.webp',
  //     deleteImageUrl: 'https://api.imgbb.com/1/delete/example',

  //     galleryId: '686e6dfe1d35a61dfd222222',
  //     categoryId: '686e6dfe1d35a61dfd333333',

  //     price: 0.85,

  //     keywords: ['cyberpunk', 'samurai', 'neon', 'future'],

  //     isActive: true,
  //     percent: 20,
  //     durationHours: 72,
  //   };

  //   useEffect(() => {
  //     updatePost(fakeNft);
  //   }, []);

  //   console.log(data);

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
