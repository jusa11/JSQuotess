import { useState, useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowUp } from 'react-icons/fa6';
import AuthPopup from '../authorization/AuthPopup';
import {
  setAddQuotes,
  resetIsChange,
} from '../../redux/slices/displayQuotesSlice';
import { setError, setSuccess } from '../../redux/slices/notificationsSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { URL, ADD_QUOTE } from '../../../config';

const ShareForm = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { username, userId, logo } = useSelector(selectUser);
  const [isPopup, setPopup] = useState();
  const popupRef = useRef(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!message.trim()) {
      dispatch(setError('Поле не должно быть пустым'));
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(setError('Зарегистрируйтесь, чтобы оставлять реакции'));
      console.error('Нет токена! Пользователь не авторизован.');
      return;
    }

    try {
      const res = await axios.post(
        `${URL}${ADD_QUOTE}`,
        {
          text: message,
          author: username,
          userId: userId,
        },

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );


      dispatch(setAddQuotes({ ...res.data.newQuote, userId: { logo } }));
      dispatch(setSuccess('Твоя мысль принята во вселенную'));
      setTimeout(() => {
        dispatch(resetIsChange());
      }, 0);
    } catch (error) {
      console.error('Ошибка при отправке цитаты:', error);
      dispatch(setError('При отправке произошла ошибка'));
    }
    setMessage('');
  };

  return (
    <>
      <div className="quotes-action__share-quote quotes-action__card card">
        <div className="action__card_text">
          <h3 className="action__card_title card-title">Поделись мыслями</h3>
          <p className="action__card_subtitle card-subtitle">
            Все мысли являются собственностью Джейсона Стетхема. Но ты можешь
            ими со всеми поделиться
          </p>
        </div>

        <div className="share__qoute_form-container">
          <form
            className="share__qoute-form"
            action="#"
            method="post"
            onSubmit={onSubmitHandler}
          >
            <div className="your-message-wrapper">
              <input
                name="message"
                id="yourMessage"
                className="your-message"
                placeholder="Отправь мысль во вселенную"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                maxLength={200}
              />
            </div>
            <button className="form-btn" type="submit">
              <FaArrowUp className="form-btn-icon" />
            </button>
          </form>
        </div>
      </div>
      {isPopup && (
        <AuthPopup isPopup={isPopup} setPopup={setPopup} popupRef={popupRef} />
      )}
    </>
  );
};

export default ShareForm;
