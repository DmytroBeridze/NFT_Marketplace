import { useAppSelector } from '../../app/store/reduxHooks';

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.data);
  console.log('cc---', user);

  return <div className=" bg-red-600"></div>;
};
export default Dashboard;
