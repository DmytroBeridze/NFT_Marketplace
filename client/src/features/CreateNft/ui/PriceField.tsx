import type { Data } from '../../../shared/model';
import { Text } from '../../../shared/ui/atoms';
import { FormikInput } from '../../../shared/ui/molecules/FormikInput';
import { Select } from '../../../shared/ui/molecules/Select';
import { afterRequiredStyle } from '../lib';
import { currencyIconsMap } from '../maps/iconsMap';

type PriceFieldProps = {
  currentSourceCollections: { id: string; name: string }[];
  //   currentSourceCollections: { id: Data; name: Data }[];
};

export const PriceField = ({ currentSourceCollections }: PriceFieldProps) => {
  return (
    <div
      className="col-span-1 border-secondary-color 
                     bg-secondary-background-color rounded-md  p-[10px]"
    >
      <Text className={`${afterRequiredStyle} static-text-purple-color mb-5`}>
        Price
      </Text>

      <div className="flex flex-row gap-1 ">
        {/* ------currency */}
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
  );
};
