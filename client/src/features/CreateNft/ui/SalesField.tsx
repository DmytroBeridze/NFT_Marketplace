import { useFormikContext, type FormikErrors } from 'formik';
import { Text } from '../../../shared/ui/atoms';
import { Select } from '../../../shared/ui/molecules/Select';
import { SwitchButton } from '../../../shared/ui/molecules/SwitchButton';
import type { FormValues } from '../model';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

type SalesFieldProps = {
  // values: FormValues;
  // setFieldValue: (
  //   field: string,
  //   value: any,
  //   shouldValidate?: boolean | undefined,
  // ) => Promise<void | FormikErrors<FormValues>>;

  durations: { id: string; name: string }[];
  discounts: { id: string; name: string }[];
};

export const SalesField = ({
  // values,
  // setFieldValue,

  durations,
  discounts,
}: SalesFieldProps) => {
  const { t: tt } = useTranslation('dashboard');

  const { errors, touched, values, setFieldValue } =
    useFormikContext<FormValues>();

  //------ royalty error
  const royaltyError =
    values.isForSale && errors.royalty && touched.royalty
      ? t(`modal.errors.${errors.royalty.name ?? 'required'}`)
      : undefined;

  //------ duration error
  const durationError =
    values.isForSale && errors.duration && touched.duration
      ? t(`modal.errors.${errors.duration.name ?? 'required'}`)
      : undefined;

  return (
    <div
      className="col-span-2 max-[1200px]:col-span-6 max-[900px]:col-span-1
       border-secondary-color  bg-secondary-background-color rounded-md  p-[10px]"
    >
      <Text color="static-text-purple-color" className="mb-5">
        {tt('titles.sales')}
      </Text>

      <div className="flex justify-between gap-10 max-[660px]:flex-col max-[660px]:gap-5">
        {/* -------switch */}
        <div className="w-full  flex flex-col">
          <div className="flex gap-2.5">
            <SwitchButton
              variant="primary"
              checked={values.isForSale}
              onChange={(value) => setFieldValue('isForSale', value)}
            />
            <label>
              <Text color="text-primary-text-color">
                {tt('titles.saleItems')}
              </Text>
            </label>
          </div>
          <Text>{tt('desc.makePurchase')}</Text>
        </div>

        {/* --royalty */}
        <div
          className={`w-full ${values.isForSale ? 'opacity-100' : 'opacity-40'} transition  duration-300 ease-in-out`}
        >
          <label htmlFor="NFTroyalty" className="text-primary-text-color ">
            {tt('titles.royalty')} (%)
          </label>
          <Select
            data={discounts}
            className="text-primary-text-color  py-[10px] pl-2.5 "
            name="royalty"
            id="NFTroyalty"
            wrapperClassName="basis-[40%]"
            disabled={!values.isForSale}
            validationError={royaltyError}
          />
          <Text color="text-secondary-text-color">
            {tt('desc.secondarySales')}
          </Text>
        </div>
        {/* --duration */}
        <div
          className={`w-full ${values.isForSale ? 'opacity-100' : 'opacity-40'} transition  duration-300 ease-in-out`}
        >
          <label htmlFor="NFSduration" className="text-primary-text-color ">
            {tt('titles.duration')}
          </label>
          <Select
            data={durations}
            className={`text-primary-text-color  py-[10px] pl-2.5  `}
            name="duration"
            id="NFSduration"
            wrapperClassName="basis-[40%]"
            disabled={!values.isForSale}
            validationError={durationError}
          />
          <Text color="text-secondary-text-color">
            {tt('desc.howLongListed')}
          </Text>
        </div>
      </div>
    </div>
  );
};
