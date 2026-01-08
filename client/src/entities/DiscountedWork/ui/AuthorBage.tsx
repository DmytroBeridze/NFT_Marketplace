import { Image, Text } from '../../../shared/ui/atoms';
import avatarPlaceholder from '../../../shared/assets/icons/User_plug.svg';

type AuthorBageType = {
  avatar: string | undefined;
  userName: string | undefined;
};

const AuthorBage = ({ avatar, userName }: AuthorBageType) => {
  console.log(avatar);

  return (
    <div className="flex gap-3 py-2.5 px-5 max-w-40  bg-secondary-background-color rounded-[20px]">
      <div className="max-w-[24px] max-h-[24px] rounded-full overflow-hidden  ">
        <Image alt="test" src={avatar || avatarPlaceholder} />
      </div>
      <Text
        children={userName}
        font="font-space-mono-regular"
        Element="span"
        size="t-text-sm"
        color={'text-inherit'}
      />
    </div>
  );
};

export default AuthorBage;
