import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setError } from '../Components/redux/slices/notificationsSlice';
import { toggleLike } from '../Components/redux/slices/likedQuotesSlice';
import { selectUser } from '../Components/redux/slices/userSlice';
import { URL, LIKE } from '../config';

const useHandleLike = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector(selectUser);

  const handleLike = async (quoteId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(setError('Зарегистрируйтесь, чтобы оставлять реакции'));
      console.error('Нет токена! Пользователь не авторизован.');
      return;
    }

    try {
      const res = await axios.post(
        `${URL}${LIKE.replace(':quoteId', quoteId)}`,
        { userId, quoteId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { quantity, liked } = res.data;

      dispatch(toggleLike({ _id: quoteId, likes: quantity, isLiked: liked }));
    } catch (error) {
      dispatch(setError('Ошибка при лайке цитаты'));
      console.error('Ошибка при лайке цитаты:', error);
    }
  };

  return handleLike;
};

export default useHandleLike;
