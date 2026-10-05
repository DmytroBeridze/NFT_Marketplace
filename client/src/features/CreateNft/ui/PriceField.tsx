import { useTranslation } from 'react-i18next';
import { ErrorText, Spinner, Text } from '../../../shared/ui/atoms';
import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Select } from '../../../shared/ui/molecules/Select';
import { afterRequiredStyle } from '../lib';
import { currencyIconsMap } from '../maps/iconsMap';

type PriceFieldProps = {
  currentSourceCollections: { id: string; name: string }[];
  error: boolean;
  loading: boolean;
  disabled?: boolean;
};

export const PriceField = ({
  currentSourceCollections,
  error,
  loading,
  disabled,
}: PriceFieldProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <div
      className="col-span-1 max-[1200px]:col-span-4 max-[900px]:col-span-1
      border-secondary-color bg-secondary-background-color rounded-md  p-[10px]"
    >
      <Text className={`${afterRequiredStyle} static-text-purple-color mb-5`}>
        {t('titles.price')}
      </Text>

      <div className="flex flex-row gap-1  max-[660px]:flex-col max-[660px]:gap-5">
        {/* ------currency */}

        {!error && !loading && (
          <Select
            data={currentSourceCollections}
            className="text-primary-text-color  py-[10px] pl-8.5 "
            name="currency"
            id="NFTcurrency"
            wrapperClassName="basis-[40%]"
            iconSize={14}
            iconColor="text-primary-text-color"
            iconsMap={currencyIconsMap}
          />
        )}

        {/* -------------Loading */}
        {loading && !error && (
          <div className="w-full  basis-[40%] self-center">
            <Spinner
              className=" static-text-purple-color"
              wrapperClassName="flex justify-center items-center "
              fill={`var(--hover-primary-accent-color)`}
            />
          </div>
        )}

        {/* ----------------Error */}
        {error && (
          <ErrorText
            Element="div"
            className="text-red-700 w-full  text-center responsive-size-sm 
            animate-pulse basis-[40%] self-center"
          >
            Loading Error...
          </ErrorText>
        )}

        {/* -----------input currency*/}
        <FormikInput
          name="price"
          id="NFTprice"
          type="number"
          variant="createForm"
          size="custom"
          // size="createForm"
          placeholder="0.00"
          className="text-primary-text-color w-full h-[46px] p-2.5 border input-focus  border-secondary-color bg-secondary-background-color"
          labelClass={`text-primary-text-color  ${afterRequiredStyle}`}
          wrapperClass="w-full "
          disabled={disabled}
        />
      </div>
    </div>
  );
};
