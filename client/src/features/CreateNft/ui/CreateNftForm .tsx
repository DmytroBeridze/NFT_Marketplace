import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type RefObject,
} from 'react';
import { useUploadImageMutation } from '../../../entities/nft/model';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Button, Icon, Image, Text } from '../../../shared/ui/atoms';
import { Textarea } from '@headlessui/react';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';
import { Select } from '../../../shared/ui/molecules/Select';

export const CreateNftForm = () => {
  const [uploadFile, { isLoading, isError, data }] = useUploadImageMutation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<boolean | null>(null);
  const [name, setName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const afterRequiredStyle =
    " relative after:inline-block after:w-2 after:h-2 after:bg-[var(--primary-accent-color) ] after:bg-[var(--primary-accent-color)] after:ml-2 after:rounded-full after:content-[''] after:absolute after:top-1";

  // const [img, setImg] = useState<{
  //   imageUrl: string;
  //   deleteImageUrl: string;
  // } | null>(null);

  const uploadHandler = (target: RefObject<HTMLInputElement | null>) => {
    target.current?.click();
  };

  // ------get file
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFile(file);
    setPreview(url);
    setIsFocused(true);
  };

  // ------remove previev
  const handleRemovePreviev = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    preview && URL.revokeObjectURL(preview);
    setPreview(null);
  };

  // ----get name
  // const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
  //   const name = e.target.value;
  //   setName(name);
  // };

  const saveImgToDb = (file: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', name);

    uploadFile(formData);
  };

  // ---------------Скидання виділення з контейнера для прев'ю при кліці не на цьому контейнері
  useEffect(() => {
    const focusedHandler = (e: globalThis.MouseEvent) => {
      if (
        imgContainerRef.current &&
        !imgContainerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('click', focusedHandler);

    return () => document.removeEventListener('click', focusedHandler);
  }, []);

  return (
    <section className="  font-work-sans-regular text-secondary-text-color mb-8 responsive-size-sm ">
      <Formik
        initialValues={{ name: '', description: '', keywords: '' }}
        // validate={} // сюда подключаем Yup
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log('SUbmitting');
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* ---------name, description, upload img  block */}
            <div className="w-full  flex  gap-5 justify-between  items-stretch">
              <div className=" flex flex-col basis-[50%]">
                {/* -------------------------name */}
                <FormikInput
                  name="name"
                  id="NFTname"
                  type="text"
                  variant="createForm"
                  label="Name"
                  size="createForm"
                  placeholder="Enter NFT name"
                  className="text-primary-text-color "
                  labelClass={`text-primary-text-color ${afterRequiredStyle}`}
                />

                {/* -------------------------description */}
                <label
                  htmlFor="NFTdescription"
                  className={`text-primary-text-color ${afterRequiredStyle}`}
                >
                  Description
                </label>
                <Textarea
                  name="description"
                  id="NFTdescription"
                  // aria-label="Description"
                  placeholder="Tell the story behind your NFT"
                  className="w-full h-80 p-[10px]  input-focus  border-secondary-color 
                  bg-secondary-background-color rounded-md text-primary-text-color"
                  // rows={10}
                ></Textarea>
              </div>
              {/* ------------upload img */}
              <div className="basis-[50%]  w-full   flex flex-col  flex-1 min-w-0 ">
                <label
                  htmlFor="uploadImg"
                  className={`text-primary-text-color ${afterRequiredStyle}`}
                >
                  Upload Image/Video/Gif
                </label>

                <div
                  id="uploadImg"
                  className={`h-full   border-dashed-secondary-color 
                  bg-secondary-background-color rounded-md input-focus relative`}
                  onClick={() => uploadHandler(inputRef)}
                >
                  {preview ? (
                    <div
                      ref={imgContainerRef}
                      className={`max-h-[412px] h-full w-full border-dashed-secondary-color 
                  bg-secondary-background-color rounded-md overflow-hidden relative ${isFocused ? 'container-focus' : ''}`}
                    >
                      <Button
                        onClick={(e) => handleRemovePreviev(e)}
                        className="absolute bottom-3 right-3 px-4 py-1 "
                        type="button"
                        variant="primary"
                        radius="xl"
                      >
                        <Text
                          Element="span"
                          color="static-text-white-color"
                          size="t-text-xs"
                        >
                          Remove
                        </Text>
                      </Button>

                      <Image
                        alt="preview"
                        src={preview}
                        objectFit="object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <div
                        className="absolute top-[50%] left-[50%] -translate-[50%] 
                      flex flex-col gap-2 items-center justify-center static-text-purple-color"
                      >
                        <Icon name="upload-cloud" size={100} />

                        <Text
                          Element="h3"
                          font="font-work-sans-regular"
                          size="responsive-size-md"
                        >
                          Click to upload
                        </Text>
                        <Text
                          Element="p"
                          color="text-primary-text-color"
                          font="font-work-sans-regular"
                          className="opacity-40"
                          size="responsive-size-sm"
                        >
                          PNG, JPG, GIF, MP4, WEBM
                        </Text>
                        <Text
                          Element="p"
                          color="text-primary-text-color"
                          font="font-work-sans-regular"
                          className="opacity-40"
                          size="responsive-size-sm"
                        >
                          Max size: 50 MB
                        </Text>
                      </div>
                      <input
                        type="file"
                        hidden={true}
                        ref={inputRef}
                        onChange={(e) => handleChangeFile(e)}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* ------------- keywords---------------- */}
            <div>
              <label
                htmlFor="NFTkeywords"
                className={`text-primary-text-color ${afterRequiredStyle}`}
              >
                Keywords
              </label>
              <Textarea
                name="keywords"
                id="NFTkeywords"
                placeholder="e.g. art, landscape, digital, abstract"
                className="w-full h-18 p-[10px]  input-focus  border-secondary-color 
              bg-secondary-background-color rounded-md text-primary-text-color"
                // rows={10}
              ></Textarea>
            </div>

            {/* ------------- category, collection ---------------- */}
            <div className=" flex justify-between gap-5">
              <div className="flex flex-col w-full ">
                <label
                  htmlFor="NFTcategory"
                  className={`text-primary-text-color `}
                >
                  Category
                </label>
                <Select />
                {/* <select
                  name="category"
                  id="NFTcategory"
                  className={`text-primary-text-color ${afterRequiredStyle}`}
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select> */}
              </div>
              <div className="flex flex-col w-full ">
                <label
                  htmlFor="NFTcategory"
                  className={`text-primary-text-color `}
                >
                  Category
                </label>
                <Select />
                {/* <select
                  name="category"
                  id="NFTcategory"
                  className={`text-primary-text-color ${afterRequiredStyle}`}
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select> */}
              </div>
            </div>

            {/* ------------- upload---------------- */}
            <div>
              <ButtonWithIcon
                type="submit"
                className="px-12 py-5 w-full flex items-center justify-center static-text-white-color"
                iconName="upload-cloud"
              >
                <Text
                  Element="span"
                  color="static-text-white-color"
                  font="font-work-sans-regular"
                >
                  Upload & Create NFT
                </Text>
              </ButtonWithIcon>
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
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
