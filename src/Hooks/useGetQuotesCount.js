import { useSelector, useDispatch } from 'react-redux';
import { selectErrorMessage } from '../Components/redux/slices/notificationsSlice';
import { useGetQuotesCountQuery } from '../Components/redux/api/countQuotesApi';
import { selectUser } from '../Components/redux/slices/userSlice';

const useGetQuotesCount = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetQuotesCountQuery(user?.username, {
    skip: !user?.username,
  });

  if (isLoading) return null;
  if (error) {
    console.log('Ошибка:', error);
    dispatch(selectErrorMessage('Ошибка при загрузке уровня'));
    return null;
  }

  return data || {};
};
export default useGetQuotesCount;
