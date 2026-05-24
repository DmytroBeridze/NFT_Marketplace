import { useAppSelector } from '../../app/store/reduxHooks';
import { Outlet, useNavigate } from 'react-router';

import { useGetMeQuery } from '../../entities/user/model';

import { useLocalStorage } from '../lib/hooks';
import { Spinner } from '../ui/atoms';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { getLocal } = useLocalStorage();
  const user = useAppSelector((state) => state.user.data);
  const token = getLocal('token');
  const { isLoading, isFetching, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (!token || isError || (!isLoading && !isFetching && !user)) {
      navigate('/auth', { replace: true });
    }
  }, [token, isError, user, isLoading, isFetching, navigate]);

  if (isLoading || isFetching || isError || !user)
    return (
      <div className="h-screen flex items-center justify-center bg-primary-background-color">
        <Spinner fill={`var(--hover-primary-accent-color)`} />
      </div>
    );

  return <Outlet />;
};
