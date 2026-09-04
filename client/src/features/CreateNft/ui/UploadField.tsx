import { Text } from '../../../shared/ui/atoms';
import { ButtonWithIcon } from '../../../shared/ui/molecules/ButtonWithIcon';

type UploadFieldProps = {
  isSubmitting: boolean;
};

export const UploadField = ({ isSubmitting }: UploadFieldProps) => {
  return (
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
  );
};
