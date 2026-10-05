import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
  type RefObject,
} from 'react';
import { Button, ErrorText, Icon, Image, Text } from '../../../shared/ui/atoms';
import { afterRequiredStyle } from '../lib';
import { useField } from 'formik';

import { useTranslation } from 'react-i18next';

type NftMediaUploadProps = {
  setFile: (value: File | null) => void;
  // setFile: Dispatch<SetStateAction<File | null>>;
  isLoading: boolean;
  isError: boolean;
  isUploadSuccess?: boolean;
};

export const NftMediaUpload = ({
  setFile,
  isLoading,
  isError,
  isUploadSuccess,
}: NftMediaUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<boolean | null>(null);

  const imgContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [_, meta] = useField('file');

  const { t } = useTranslation('translation');
  const { t: tt } = useTranslation('dashboard');

  //   -------upload
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
    setFile(null);
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

  // -----------------------скмдагння прев'ю після вдалого завантаження NFT
  useEffect(() => {
    isUploadSuccess && preview && URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
  }, [isUploadSuccess]);

  return (
    <div
      className={`basis-[50%] max-[1200px]:col-start-5 max-[1200px]:col-end-7 max-[900px]:col-span-1
         w-full   flex flex-col  flex-1 min-w-0 relative min-h-[200px]`}
    >
      <label
        htmlFor="uploadImg"
        className={`text-primary-text-color ${afterRequiredStyle}`}
      >
        {tt('titles.uploadImg')}
      </label>

      <div
        id="uploadImg"
        className={`max-h-[412px] h-full max-[900px]:max-h-[280px] border-dashed-secondary-color 
                  bg-secondary-background-color rounded-md input-focus relative
                   ${meta.error && meta.touched ? ' !border-red-500 !border' : ''}`}
        onClick={() => uploadHandler(inputRef)}
      >
        {preview ? (
          <div
            ref={imgContainerRef}
            className={` h-full w-full border-dashed-secondary-color 
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
            {isLoading && (
              <div
                className="static-text-purple-color flex items-center justify-center
               absolute left-[50%] top-[50%]  -translate-[50%]"
              >
                <div className="w-20">
                  {/*-------------------- spinner */}
                  <div className="loader"></div>
                </div>
              </div>
            )}

            <Image alt="preview" src={preview} objectFit="object-cover" />
          </div>
        ) : (
          <>
            <div
              className="absolute top-[50%] left-[50%] -translate-[50%] 
                      flex flex-col gap-2 items-center justify-center static-text-purple-color"
            >
              {/* <Icon
                name="upload-cloud"
                className="w-[clamp(1.25rem, -0.383rem + 8.16vw, 6.25rem)] "
                className="w-[10px] "
              /> */}
              <Icon
                name="upload-cloud"
                size="clamp(1.25rem, -0.383rem + 8.16vw, 6.25rem)"
              />
              {/* <Icon name="upload-cloud" size={100} /> */}

              <Text
                Element="h3"
                font="font-work-sans-regular"
                size="responsive-size-md"
                className="text-center"
              >
                {tt('buttons.clickToUpload')}
              </Text>
              <Text
                Element="p"
                color="text-primary-text-color"
                font="font-work-sans-regular"
                className="opacity-40"
                size="responsive-size-sm"
              >
                PNG, JPG, GIF
              </Text>
              <Text
                Element="p"
                color="text-primary-text-color"
                font="font-work-sans-regular"
                className="opacity-40"
                size="responsive-size-sm"
              >
                {tt('titles.maxSize')}: 50 MB
              </Text>
            </div>
            <input
              name="file"
              type="file"
              hidden={true}
              ref={inputRef}
              onChange={(e) => handleChangeFile(e)}
            />
          </>
        )}
      </div>
      {isError && (
        <ErrorText
          Element="div"
          data-testid={'CategoriesCard-error'}
          className="text-red-700 w-full  text-right responsive-size-sm animate-pulse
                absolute  right-5 bottom-5"
        >
          Loading Error...
        </ErrorText>
      )}

      {meta.error && meta.touched && (
        <div className="text-red-500">{t(`modal.errors.${meta.error}`)}</div>
      )}
    </div>
  );
};
