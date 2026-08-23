import {
  useSetNFTMutation,
  useUploadImageMutation,
} from '../../../entities/nft/model';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Icon, Image, Text } from '../../../shared/ui/atoms';
import { Textarea } from '@headlessui/react';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';
import { Select } from '../../../shared/ui/molecules/Select';
import { NftMediaUpload } from './NftMediaUpload';
import { useState } from 'react';
import { SwitchButton } from '../../../shared/ui/molecules/Switch';

// !=-------------Fake  data-------------------
export const mockCategories = [
  { id: '1', name: 'Art' },
  { id: '2', name: 'Photography' },
  { id: '3', name: 'Gaming' },
  { id: '4', name: 'Music' },
];

export const mockCollections = [
  { id: '101', name: 'Cyber Samurai' },
  { id: '102', name: 'Digital Dreams' },
  { id: '103', name: 'Pixel Animals' },
];

const currentServerSource = {
  ETH: 0.0002325,
  BTC: 0.00000893,
  USDT: 1.001,
  USDC: 1.0,
  EUR: 0.85,
  UAH: 41.2,
};

const currentSource = Object.keys(currentServerSource).map((currency) => ({
  id: currency,
  name: currency,
}));

const royaltyPercent = [
  { id: '1', name: '3' },
  { id: '2', name: '7' },
  { id: '3', name: '10' },
];
// !=--------------------------------
export const afterRequiredStyle =
  " relative after:inline-block after:w-2 after:h-2 after:bg-[var(--primary-accent-color) ] after:bg-[var(--primary-accent-color)] after:ml-2 after:rounded-full after:content-[''] after:absolute after:top-1";

export const CreateNftForm = () => {
  const [uploadFile, { isLoading, isError, data }] = useUploadImageMutation();

  // { message: "nftAdded", item: nft }
  const [
    uploadNFT,
    { isError: nftError, isLoading: nftLoading, data: nftResponse },
  ] = useSetNFTMutation();

  const [file, setFile] = useState<File | null>(null);
  // const [preview, setPreview] = useState<string | null>(null);
  // const [isFocused, setIsFocused] = useState<boolean | null>(null);
  // const imgContainerRef = useRef<HTMLDivElement | null>(null);
  // const [name, setName] = useState<string>('');
  // const inputRef = useRef<HTMLInputElement | null>(null);

  // --------------------------added default option
  const optionCategories = [{ id: null, name: 'None' }, ...mockCategories];
  const optionCollections = [{ id: null, name: 'None' }, ...mockCollections];
  const currentSourceCollections = [
    { id: 'USD', name: 'USD' },
    ...currentSource,
  ];

  // ----------------------save Img ToDb

  const saveImgToDb = async (file: File, name: string) => {
    if (!file) return;
    const formdata = new FormData();

    formdata.append('image', file);
    formdata.append('name', name);

    return await uploadFile(formdata).unwrap();
  };

  return (
    <section className="  font-work-sans-regular text-secondary-text-color mb-8 responsive-size-sm ">
      <Formik
        initialValues={{
          name: '',
          description: '',
          keywords: '',
          category: { id: 'None', name: 'None' },
          collection: { id: 'None', name: 'None' },
          price: '',
          currency: { id: 'USD', name: 'USD' },
        }}
        // validate={} // сюда подключаем Yup
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // console.log(values);

          try {
            if (!file) return;
            const imgResp = await saveImgToDb(file, file.name);

            if (!imgResp) return;

            // ---------------- upload NFT
            uploadNFT({
              name: values.name,
              description: values.description,

              galleryId: '100',
              categoryId: '50',
              price: Number(values.price),

              keywords: values.keywords,

              imageUrl: imgResp.imageUrl,
              deleteImageUrl: imgResp.deleteImageUrl,
            });
            // resetForm();
          } catch (error) {
            console.error(error);
          }
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
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
            {/* ---------name, description, upload img  block */}

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
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                id="NFTdescription"
                placeholder="Tell the story behind your NFT"
                className="w-full h-80 p-[10px]  input-focus  border-secondary-color 
                  bg-secondary-background-color rounded-md text-primary-text-color"
                // rows={10}
              />
            </div>
            {/* -----------------------upload img */}
            <NftMediaUpload
              setFile={setFile}
              isLoading={isLoading}
              isError={isError}
            />

            {/* ------------- -----------keywords*/}
            <div className="col-span-2 ">
              <label
                htmlFor="NFTkeywords"
                className={`text-primary-text-color ${afterRequiredStyle}`}
              >
                Keywords
              </label>
              <Textarea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.keywords}
                name="keywords"
                id="NFTkeywords"
                placeholder="e.g. art, landscape, digital, abstract"
                className="w-full h-18 p-[10px]  input-focus  border-secondary-color 
              bg-secondary-background-color rounded-md text-primary-text-color"
                // rows={10}
              />
            </div>

            {/* ----------------------- category, collection*/}

            <div className="flex flex-col w-full ">
              <label
                htmlFor="NFTcategory"
                className={`text-primary-text-color `}
              >
                Category
              </label>
              <Select
                data={optionCategories}
                className="text-primary-text-color pr-8 py-[10px] pl-9"
                name="category"
                id="NFTcategory"
                icon="category-icon"
              />
            </div>
            <div className="flex flex-col w-full ">
              <label
                htmlFor="NFTcategory"
                className={`text-primary-text-color `}
              >
                Collection
              </label>
              <Select
                data={optionCollections}
                className="text-primary-text-color pr-8 py-[10px] pl-9 "
                name="collection"
                id="NFTcollection"
                icon="galleryPhoto-icon"
              />
            </div>

            {/* ------------- ---------------------price*/}

            <div
              className="col-span-1 border-secondary-color 
                  bg-secondary-background-color rounded-md text-primary-text-color p-[10px]"
            >
              <Text className={`${afterRequiredStyle}`}> Price</Text>

              <div className="flex flex-row gap-1">
                {/* ------currency */}
                <Select
                  data={currentSourceCollections}
                  className="text-primary-text-color  py-[10px] pl-8.5 "
                  name="currency"
                  id="NFTcurrency"
                  wrapperClassName="basis-[40%]"
                  icon="ball-icon"
                  iconSize={20}
                />
                {/* -----------input currency*/}

                <FormikInput
                  name="price"
                  id="NFTprice"
                  type="text"
                  variant="createForm"
                  size="createForm"
                  placeholder="0.00"
                  className="text-primary-text-color "
                  labelClass={`text-primary-text-color  ${afterRequiredStyle}`}
                  wrapperClass="w-full "
                />
              </div>
            </div>
            {/* -----------sales*/}
            <div
              className="col-span-2 border-secondary-color 
                  bg-secondary-background-color rounded-md text-primary-text-color p-[10px]"
            >
              <Text> Sales</Text>

              <div className="flex justify-between gap-10">
                {/* --switch */}
                <div className="w-full">
                  <SwitchButton />
                </div>

                {/* --royalty */}
                <div className="w-full">
                  <label
                    htmlFor="NFTroyalty"
                    className="text-primary-text-color "
                  >
                    Royalty(%)
                  </label>
                  <Select
                    data={royaltyPercent}
                    className="text-primary-text-color  py-[10px] pl-2.5 "
                    name="royalty"
                    id="NFTroyalty"
                    wrapperClassName="basis-[40%]"
                  />
                  <Text>You`ll receive this % on secondary sales</Text>
                </div>
                {/* --duration */}
                <div className="w-full">
                  <label
                    htmlFor="NFSduration"
                    className="text-primary-text-color "
                  >
                    Duration
                  </label>
                  <Select
                    data={royaltyPercent}
                    className="text-primary-text-color  py-[10px] pl-2.5 "
                    name="duration"
                    id="NFSduration"
                    wrapperClassName="basis-[40%]"
                  />
                  <Text>Set how long the term will be listed</Text>
                </div>
              </div>
            </div>
            {/* ------------- ----------------------upload*/}
            <div className="col-span-2">
              <ButtonWithIcon
                type="submit"
                className={`px-12 py-5 w-full flex items-center justify-center static-text-white-color
                  ${isSubmitting ? 'opacity-40' : 'opacity-100'}`}
                iconName="upload-cloud"
                disabled={isSubmitting}
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
            <div className="static-text-purple-color flex items-center justify-center">
              {isSubmitting && <Icon name="spinner" />}
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};
//   return (
//     <section className="  font-work-sans-regular text-secondary-text-color mb-8 responsive-size-sm ">
//       <Formik
//         initialValues={{
//           name: '',
//           description: '',
//           keywords: '',
//           category: null,
//           collection: null,
//         }}
//         // validate={} // сюда подключаем Yup
//         onSubmit={async (values, { setSubmitting, resetForm }) => {
//           try {
//             if (!file) return;
//             const ingResp = await saveImgToDb(file, file.name);

//             if (!ingResp) return;

//             console.log(ingResp);

//             // ----------------fake upload
//             uploadNFT({
//               name: values.name,
//               description: values.description,

//               galleryId: '100',
//               categoryId: '50',
//               price: 120,

//               keywords: values.keywords,

//               imageUrl: ingResp.imageUrl,
//               deleteImageUrl: ingResp.deleteImageUrl,
//             });
//             // resetForm();
//           } catch (error) {
//             console.error(error);
//           }
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting,
//         }) => (
//           <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//             {/* ---------name, description, upload img  block */}
//             <div className="w-full  flex  gap-5 justify-between  items-stretch">
//               <div className=" flex flex-col basis-[50%]">
//                 {/* -------------------------name */}
//                 <FormikInput
//                   name="name"
//                   id="NFTname"
//                   type="text"
//                   variant="createForm"
//                   label="Name"
//                   size="createForm"
//                   placeholder="Enter NFT name"
//                   className="text-primary-text-color "
//                   labelClass={`text-primary-text-color ${afterRequiredStyle}`}
//                 />

//                 {/* -------------------------description */}
//                 <label
//                   htmlFor="NFTdescription"
//                   className={`text-primary-text-color ${afterRequiredStyle}`}
//                 >
//                   Description
//                 </label>
//                 <Textarea
//                   name="description"
//                   value={values.description}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   id="NFTdescription"
//                   placeholder="Tell the story behind your NFT"
//                   className="w-full h-80 p-[10px]  input-focus  border-secondary-color
//                   bg-secondary-background-color rounded-md text-primary-text-color"
//                   // rows={10}
//                 />
//               </div>
//               {/* -----------------------upload img */}
//               <NftMediaUpload
//                 setFile={setFile}
//                 isLoading={isLoading}
//                 isError={isError}
//               />
//             </div>
//             {/* ------------- -----------keywords*/}
//             <div>
//               <label
//                 htmlFor="NFTkeywords"
//                 className={`text-primary-text-color ${afterRequiredStyle}`}
//               >
//                 Keywords
//               </label>
//               <Textarea
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 value={values.keywords}
//                 name="keywords"
//                 id="NFTkeywords"
//                 placeholder="e.g. art, landscape, digital, abstract"
//                 className="w-full h-18 p-[10px]  input-focus  border-secondary-color
//               bg-secondary-background-color rounded-md text-primary-text-color"
//                 // rows={10}
//               />
//             </div>

//             {/* ----------------------- category, collection*/}
//             <div className=" flex justify-between gap-5">
//               <div className="flex flex-col w-full ">
//                 <label
//                   htmlFor="NFTcategory"
//                   className={`text-primary-text-color `}
//                 >
//                   Category
//                 </label>
//                 <Select
//                   data={optionCategories}
//                   className="text-primary-text-color"
//                   name="category"
//                   id="NFTcategory"
//                 />
//               </div>
//               <div className="flex flex-col w-full ">
//                 <label
//                   htmlFor="NFTcategory"
//                   className={`text-primary-text-color `}
//                 >
//                   Collection
//                 </label>
//                 <Select
//                   data={optionCollections}
//                   className="text-primary-text-color"
//                   name="collection"
//                   id="NFTcollection"
//                 />
//               </div>
//             </div>

//             {/* ------------- ----------------------upload*/}

//             <div className="flex gap-5">
//               <div
//                 className="  basis-[50%]   border-secondary-color
//                   bg-secondary-background-color rounded-md text-primary-text-color"
//               >
//                 sdfghh
//               </div>
//               <div className="basis-[50%]"></div>
//             </div>

//             {/* ------------- ----------------------upload*/}
//             <div>
//               <ButtonWithIcon
//                 type="submit"
//                 className={`px-12 py-5 w-full flex items-center justify-center static-text-white-color
//                   ${isSubmitting ? 'opacity-40' : 'opacity-100'}
//                   `}
//                 iconName="upload-cloud"
//                 disabled={isSubmitting}
//               >
//                 <Text
//                   Element="span"
//                   color="static-text-white-color"
//                   font="font-work-sans-regular"
//                 >
//                   Upload & Create NFT
//                 </Text>
//               </ButtonWithIcon>
//             </div>
//             <div className="static-text-purple-color flex items-center justify-center">
//               {isSubmitting && <Icon name="spinner" />}
//             </div>
//           </form>
//         )}
//       </Formik>
//     </section>
//   );
// };
