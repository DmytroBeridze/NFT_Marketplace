import { Image, Text } from '../../../shared/ui/atoms';
import avatarPlaceholder from '../../../shared/assets/icons/User_plug.svg';
import { useNavigate } from 'react-router-dom';

type AuthorBageType = {
  avatar: string | undefined;
  userName: string | undefined;
  userId: string | undefined;
  className?: string;
};

const AuthorBage = ({
  avatar,
  userName,
  className,
  userId,
}: AuthorBageType) => {
  let navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/authorPage/${userId}`)}
      className={[
        'flex gap-3 py-2.5 px-5 max-w-fit  bg-secondary-background-color   rounded-[20px] cursor-pointer duration-300 shadow-accent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
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
