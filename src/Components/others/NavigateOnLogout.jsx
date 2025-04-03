import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';

const NavigateOnLogout = () => {
  const { isAuth } = useSelector(selectUser);

  return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default NavigateOnLogout;
