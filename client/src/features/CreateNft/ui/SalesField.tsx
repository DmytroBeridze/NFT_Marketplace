import type { FormikErrors } from 'formik';
import { Text } from '../../../shared/ui/atoms';
import { Select } from '../../../shared/ui/molecules/Select';
import { SwitchButton } from '../../../shared/ui/molecules/SwitchButton';
import type { FormValues } from '../model';

type SalesFieldProps = {
  values: FormValues;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<FormValues>>;
  // royaltyPercent: { id: string; name: string }[];
  durations: { id: string; name: string }[];
  discounts: { id: string; name: string }[];
};

export const SalesField = ({
  values,
  setFieldValue,
  // royaltyPercent,
  durations,
  discounts,
}: SalesFieldProps) => {
  return (
    <div
      className="col-span-2 border-secondary-color 
                    bg-secondary-background-color rounded-md  p-[10px]"
    >
      <Text color="static-text-purple-color" className="mb-5">
        Sales
      </Text>

      <div className="flex justify-between gap-10">
        {/* -------switch */}
        <div className="w-full  flex flex-col">
          <div className="flex gap-2.5">
            <SwitchButton
              variant="primary"
              checked={values.isForSale}
              onChange={(value) => setFieldValue('isForSale', value)}
            />
            <label>
              <Text color="text-primary-text-color">Item for sale</Text>
            </label>
          </div>
          <Text>Make this NFT available for purchase</Text>
        </div>

        {/* --royalty */}
        <div
          className={`w-full ${values.isForSale ? 'opacity-100' : 'opacity-40'} transition  duration-300 ease-in-out`}
        >
          <label htmlFor="NFTroyalty" className="text-primary-text-color ">
            Royalty(%)
          </label>
          <Select
            data={discounts}
            className="text-primary-text-color  py-[10px] pl-2.5 "
            name="royalty"
            id="NFTroyalty"
            wrapperClassName="basis-[40%]"
            disabled={!values.isForSale}
          />
          <Text color="text-secondary-text-color">
            You`ll receive this % on secondary sales
          </Text>
        </div>
        {/* --duration */}
        <div
          className={`w-full ${values.isForSale ? 'opacity-100' : 'opacity-40'} transition  duration-300 ease-in-out`}
        >
          <label htmlFor="NFSduration" className="text-primary-text-color ">
            Duration
          </label>
          <Select
            data={durations}
            className={`text-primary-text-color  py-[10px] pl-2.5  `}
            name="duration"
            id="NFSduration"
            wrapperClassName="basis-[40%]"
            disabled={!values.isForSale}
          />
          <Text color="text-secondary-text-color">
            Set how long the term will be listed
          </Text>
        </div>
      </div>
    </div>
  );
};
