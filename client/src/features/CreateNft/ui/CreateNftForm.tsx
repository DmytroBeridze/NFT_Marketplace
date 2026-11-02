import { useAppSelector } from '../../../app/store/reduxHooks';
import { CreateNftFormContent } from './CreateNftFormContent';

export const CreateNftForm = () => {
  const userId = useAppSelector((store) => store.user.data?._id);
  if (!userId) return null;

  return <CreateNftFormContent userId={userId} />;
};
