import { useState, type ChangeEvent } from 'react';
import { useUploadImageMutation } from '../../../entities/nft/model';

export const CreateNftForm = () => {
  const [uploadFile, { isLoading, isError, data }] = useUploadImageMutation();
  const [file, setFile] = useState<File | null>(null);

  // const [img, setImg] = useState<{
  //   imageUrl: string;
  //   deleteImageUrl: string;
  // } | null>(null);

  const [name, setName] = useState<string>('');

  // ------get file
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  // ----get name
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const saveImgToDb = (file: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);

    uploadFile(formData);
  };

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

  //   console.log(data);

  return (
    <div className="text-amber-100">
      <input type="file" onChange={(e) => handleChangeFile(e)} />
      <input type="text" onChange={(e) => handleChangeName(e)} />
      <button onClick={() => saveImgToDb(file)}>test</button>
    </div>
  );
};
