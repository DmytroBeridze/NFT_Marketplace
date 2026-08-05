import { useAppSelector } from '../../app/store/reduxHooks';
import { Outlet, useNavigate } from 'react-router';

import { useGetMeQuery, userApi } from '../../entities/user/model';

import { useLocalStorage } from '../lib/hooks';
import { Spinner } from '../ui/atoms';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.user.data);

  const navigate = useNavigate();
  const { getLocal } = useLocalStorage();
  const token = getLocal('token');

  // const { isError, isLoading, isFetching } =
  //   userApi.endpoints.getMe.useQueryState();

  const { isLoading, isFetching, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    // Немає токена - вхід неможливий.
    if (!token) {
      navigate('/auth', { replace: true });
      return;
    }
    // Чекаємо на закінчення запиту.
    if (isLoading || isFetching) return;
    // Запит закінчився.
    if (isError || !user) {
      navigate('/auth', { replace: true });
    }
  }, [token, isError, user, isLoading, isFetching, navigate]);

  if (isLoading || isFetching || isError || !user)
    return (
      // <div className=" flex items-center justify-center bg-primary-background-color ">
      <div className="h-screen flex items-center justify-center bg-primary-background-color ">
        {/* <Spinner className=" static-text-purple-color" /> */}
      </div>
    );

  return <Outlet />;
};
