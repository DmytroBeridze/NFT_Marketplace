import {
  useSetNFTMutation,
  useUploadImageMutation,
} from '../../../entities/nft/model';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Icon } from '../../../shared/ui/atoms';
import { Textarea } from '@headlessui/react';
import { NftMediaUpload } from './NftMediaUpload';
import { useState } from 'react';
import { useGetCurrencyQuery, type Data } from '../../../shared/model';
import { convertCurrencyToUsd } from '../../../shared/lib/currencyConversion/currencyConversion';
import { useCurrencyOptions } from '../hooks/useCurrencyOptions ';
import { afterRequiredStyle } from '../lib';
import { PriceField } from './PriceField';
import { SalesField } from './SalesField';
import type { CategoryItem, FormValues } from '../model';
import { CategoryField } from './CategoryField';
import { CollectionField } from './CollectionField';
import { UploadField } from './UploadField';
import { KeywordsField } from './KeywordsField';
import { useGetCategoriesQuery } from '../../BrowseCategories/model';
import type { CategoriesType } from '../../BrowseCategories/model/types';
import { useGetCollectionQuery } from '../../../entities/collection/model';
import { useGetSalesConfigApiQuery } from '../../../entities/sales-config/model';

export const CreateNftForm = () => {
  const [uploadFile, { isLoading, isError, data }] = useUploadImageMutation();

  const [
    uploadNFT,
    { isError: nftError, isLoading: nftLoading, data: nftResponse },
  ] = useSetNFTMutation();

  const [file, setFile] = useState<File | null>(null);

  // --------------------------categories query
  const { data: categoriesData } = useGetCategoriesQuery();

  const optionCategories = [
    { _id: null, name: 'None' },
    ...(categoriesData ?? []),
  ];

  const { data: collectionData } = useGetCollectionQuery(
    '68c9bca9ce411a86c0b8de19',
  );

  const optionCollections = [
    { _id: null, name: 'None' },
    ...(collectionData?.galleries ?? []),
  ];

  // ---------------------------sales config
  const { data: salesData } = useGetSalesConfigApiQuery();
  console.log(salesData?.config);

  const durations =
    salesData?.config.durations.map((elem) => ({
      id: elem.toString(),
      name: elem.toString(),
    })) ?? [];

  const discounts =
    salesData?.config.discounts.map((elem) => ({
      id: elem.toString(),
      name: elem.toString(),
    })) ?? [];

  // ---------------------------currency get
  const {
    isError: currencyError,
    isLoading: currencyLoading,
    data: currencyData,
  } = useGetCurrencyQuery();

  const currentSourceCollections = useCurrencyOptions(currencyData?.currency);

  // ----------------------save Img ToDb
  const saveImgToDb = async (file: File, name: string) => {
    if (!file) return;
    const formdata = new FormData();

    formdata.append('image', file);
    formdata.append('name', name);

    return await uploadFile(formdata).unwrap();
  };

  return (
    <section className="font-work-sans-regular text-secondary-text-color mb-8 responsive-size-sm ">
      <Formik<FormValues>
        initialValues={{
          name: '',
          description: '',
          keywords: '',
          category: { id: 'None', name: 'None' },
          collection: { id: 'None', name: 'None' },
          price: '',
          currency: { id: 'USD', name: 'USD' },
          royalty: '',
          duration: '',
          isForSale: false,
        }}
        // validate={} // сюда подключаем Yup
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (!file) return;
            const imgResp = await saveImgToDb(file, file.name);

            if (!imgResp) return;

            // -----convert currency to Usd
            const convertCurrency = convertCurrencyToUsd(
              Number(values.price),
              currencyData?.currency[values.currency?.name as Data]!,
            );

            // ---------------- upload NFT
            uploadNFT({
              name: values.name,
              description: values.description,

              galleryId: '100',
              categoryId: '50',
              price: convertCurrency,

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
          setFieldValue,
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
            <KeywordsField
              handleChange={handleChange}
              handleBlur={handleBlur}
              keywords={values.keywords}
            />

            {/* ----------------------- category, collection*/}
            <CategoryField categories={optionCategories} />
            <CollectionField categories={optionCollections} />

            {/* ------------- ---------------------price*/}
            <PriceField currentSourceCollections={currentSourceCollections} />

            {/* -----------sales*/}
            <SalesField
              values={values}
              setFieldValue={setFieldValue}
              // royaltyPercent={durations}
              durations={durations}
              discounts={discounts}
            />

            {/* ------------- ----------------------upload*/}
            <UploadField isSubmitting={isSubmitting} />

            {/* -------------------------------spinner */}
            <div className="static-text-purple-color flex items-center justify-center col-span-2">
              {isSubmitting && <Icon name="spinner" />}
            </div>
          </form>
        )}
      </Formik>
    </section>
  );
};
