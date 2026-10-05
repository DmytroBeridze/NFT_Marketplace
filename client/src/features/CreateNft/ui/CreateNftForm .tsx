import {
  useSetNFTMutation,
  useUploadImageMutation,
} from '../../../entities/nft/model';
import { Formik } from 'formik';
import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Icon } from '../../../shared/ui/atoms';
import { Textarea } from '@headlessui/react';
import { NftMediaUpload } from './NftMediaUpload';
import { useGetCurrencyQuery } from '../../../shared/model';
import { convertCurrencyToUsd } from '../../../shared/lib/currencyConversion/currencyConversion';
import { afterRequiredStyle } from '../lib';
import { PriceField } from './PriceField';
import { SalesField } from './SalesField';
import { NFTSchema, type FormValues } from '../model';
import { CategoryField } from './CategoryField';
import { CollectionField } from './CollectionField';
import { UploadField } from './UploadField';
import { KeywordsField } from './KeywordsField';
import { useGetCategoriesQuery } from '../../BrowseCategories/model';
import { useGetCollectionQuery } from '../../../entities/collection/model';
import { useGetSalesConfigApiQuery } from '../../../entities/sales-config/model';
import { PriceSummaryField } from './PriceSummaryField';
import { getCurrencyOptions, normalizeKeyword, totalPriceCalc } from '../utils';
import { useAppSelector } from '../../../app/store/reduxHooks';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useState } from 'react';

export const CreateNftForm = () => {
  // -------------------reset preview state
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const { t } = useTranslation('translation');
  const { t: tt } = useTranslation('dashboard');

  const [uploadFile, { isLoading, isError }] = useUploadImageMutation();

  const [uploadNFT] = useSetNFTMutation();

  const userId = useAppSelector((store) => store.user.data?._id);
  if (!userId) return null;
  // --------------------------categories query
  const { data: categoriesData } = useGetCategoriesQuery();

  const optionCategories = [
    { _id: null, name: 'None' },
    ...(categoriesData ?? []),
  ];

  const { data: collectionData } = useGetCollectionQuery(userId);

  const optionCollections = [
    { _id: null, name: 'None' },
    ...(collectionData?.galleries ?? []),
  ];

  // ---------------------------sales config
  const { data: salesData } = useGetSalesConfigApiQuery();

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

  const currencyRates = {
    ...currencyData?.currency,
    USD: 1,
  };

  const currentSourceCollections = getCurrencyOptions(currencyRates);

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
          category: { id: null, name: 'None' },
          collection: { id: null, name: 'None' },
          price: '',
          currency: { id: 'USD', name: 'USD' },
          royalty: { id: null, name: '' },
          duration: { id: null, name: '' },
          isForSale: false,
          file: null,
        }}
        validationSchema={NFTSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            // ------------------check royalty, duration
            if (
              values.isForSale &&
              (!values.royalty.name || !values.duration.name)
            )
              return;

            // ------------------save img to DB
            if (!values.file) return;
            const imgResp = await saveImgToDb(values.file, values.file.name);
            if (!imgResp) return;

            // ----------reset img preview in start position
            setIsUploadSuccess(false);

            // -----------------convert currency to Usd

            const convertRate = currencyRates[values.currency?.name];
            if (!convertRate) return;

            const convertToUsd = convertCurrencyToUsd(
              Number(values.price),
              convertRate,
            );

            // ---------------- upload NFT
            await uploadNFT({
              name: values.name,
              description: values.description,

              galleryId: values.collection.id,
              categoryId: values.category.id,
              price: convertToUsd,

              keywords: normalizeKeyword(values.keywords),

              imageUrl: imgResp.imageUrl,
              deleteImageUrl: imgResp.deleteImageUrl,

              isActive: values.isForSale,
              percent: values.royalty.name,
              durationHours: values.duration.name,
            }).unwrap();
            // ------------------success pop-up alert
            toast.success(t('modal.serverMessages.data.nftAdded'), {
              className: '!bg-[var(--text-success-color)]',
            });

            resetForm();
            // ----------reset img preview
            setIsUploadSuccess(true);
          } catch (error) {
            console.error(error);
            // ------------------error pop-up alert
            toast.error(t('modal.serverMessages.error.failedToCreateNft'), {
              className: '!bg-[var(--text-error-color)]',
            });
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
        }) => {
          // ------------------calculated price

          const calculatedPrice = values.royalty?.name
            ? totalPriceCalc(
                +values.price,
                +values.royalty?.name,
                values.isForSale,
              )
            : values.price;

          // ----------calculated current change
          const currentRate = currencyRates[values.currency.name];

          const convertCurrency =
            calculatedPrice !== undefined && currentRate
              ? convertCurrencyToUsd(+calculatedPrice, currentRate).toFixed(2)
              : '-';

          return (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-5 max-[1200px]:grid-cols-6  max-[900px]:grid-cols-1"
              // className="grid grid-cols-2 gap-5 max-[1024px]:grid-cols-1"
            >
              {/* ---------name, description, upload img  block */}

              <div
                className=" flex flex-col basis-[50%] 
             max-[1200px]:col-span-4 max-[900px]:col-span-1"
                // max-[1200px]:col-start-1 max-[1200px]:col-end-5 max-[900px]:col-span-1"
              >
                {/* -------------------------name */}
                <FormikInput
                  name="name"
                  id="NFTname"
                  type="text"
                  variant="createForm"
                  label={tt('titles.name')}
                  // label="Name"
                  size="createForm"
                  placeholder={tt('titles.enterNFTName')}
                  // placeholder="Enter NFT name"
                  className="text-primary-text-color "
                  labelClass={`text-primary-text-color ${afterRequiredStyle}`}
                />

                {/* -------------------------description */}
                <label
                  htmlFor="NFTdescription"
                  className={`text-primary-text-color ${afterRequiredStyle}`}
                >
                  {tt('titles.description')}
                </label>
                <Textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="NFTdescription"
                  placeholder={tt('titles.tellTheStory')}
                  className={`w-full h-80 max-[900px]:h-50 p-[10px]  input-focus  border-secondary-color 
                  bg-secondary-background-color rounded-md text-primary-text-color 
                  ${errors.description && touched.description ? '!border-red-500 !border' : ''} `}
                  // rows={10}
                />
                {errors.description && touched.description ? (
                  <div className="text-red-500">
                    {t(`modal.errors.${errors.description}`)}
                  </div>
                ) : null}
              </div>
              {/* -----------------------upload img */}
              <NftMediaUpload
                setFile={(value) => setFieldValue('file', value)}
                isLoading={isLoading}
                isError={isError}
                isUploadSuccess={isUploadSuccess}
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

              {/* ------------- ----------price*/}
              <PriceField
                currentSourceCollections={currentSourceCollections}
                error={currencyError}
                loading={currencyLoading}
                disabled={!currencyData}
              />

              {/* -----------------------sales*/}
              <SalesField
                // values={values}
                // setFieldValue={setFieldValue}
                durations={durations}
                discounts={discounts}
              />

              {/* ------------- --------total price*/}
              <PriceSummaryField
                calculatedPrice={calculatedPrice}
                convertCurrency={convertCurrency}
                currencyName={values.currency.name}
                isForSale={values.isForSale}
                price={values.price}
              />

              {/* ------------- ----------------------upload*/}
              <UploadField isSubmitting={isSubmitting} />

              {/* -------------------------------spinner */}
              {/* <button onClick={() => toast('This is a toast')}>
                Test tost
              </button> */}
              <div
                className="static-text-purple-color flex items-center justify-center
                col-span-2  max-[1200px]:col-span-6 max-[900px]:col-span-1"
              >
                {/* ----------------------------------------------------------⚠-GRID Перевірити положення */}
                {isSubmitting && <Icon name="spinner" />}

                {/* {isError && <Icon name="spinner" />} */}
              </div>
            </form>
          );
        }}
      </Formik>
    </section>
  );
};
