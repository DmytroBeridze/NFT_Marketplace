import { useTranslation } from 'react-i18next';
import { Text } from '../../../shared/ui/atoms';

type PriceSummaryFieldProps = {
  isForSale: boolean;
  price: string;
  currencyName: string;
  calculatedPrice: string;
  convertCurrency: string;
};

export const PriceSummaryField = ({
  isForSale,
  price,
  currencyName,
  calculatedPrice,
  convertCurrency,
}: PriceSummaryFieldProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <div
      className="col-span-2 max-[1200px]:col-span-4 max-[900px]:col-span-1
      border-secondary-color  bg-secondary-background-color rounded-md  p-[10px] flex justify-between "
    >
      <Text color="text-primary-text-color">{t('titles.totalPrice')}</Text>
      <div>
        <div className="flex gap-2.5 items-baseline">
          {/* ----before discount */}

          <Text
            Element="del"
            className={`${isForSale ? '  visible ' : 'invisible '}`}
          >
            {price || '0.00'} {currencyName}
          </Text>

          {/* --------------total */}
          <Text
            className=" static-text-purple-color "
            size="responsive-size-md"
          >
            {/*----------- calculated price */}
            {calculatedPrice || '0.00'}

            <span className=" ml-1.5">{currencyName}</span>
          </Text>
        </div>
        {/* ----currency convert */}
        {currencyName !== 'USD' && (
          <Text className="flex justify-end ">
            {convertCurrency}

            <span className="ml-1.5">USD</span>
          </Text>
        )}
      </div>
    </div>
  );
};
