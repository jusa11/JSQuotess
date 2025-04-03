import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../redux/slices/notificationsSlice';
import { setUser } from '../../redux/slices/userSlice';
import Logo from '../../others/Logo';
import { URL, LOGIN } from '../../../config';

const Login = ({ onSwitch }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [activeField, setActiveField] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => setActiveField(field);
  const handleBlur = () => setActiveField(null);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!form.username || !form.password) {
      dispatch(setError('Заполни все поля, сынок'));
      return;
    }

    try {
      const res = await axios.post(`${URL}${LOGIN}`, form);
      const { token } = res.data;
      localStorage.setItem('token', token);
      dispatch(setSuccess('Приветствуем тебя, брат!'));

      const decode = jwtDecode(token);

      dispatch(
        setUser({
          username: decode.username,
          userId: decode._id,
          logo: decode.logo,
        })
      );
      navigate('/profile');
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || 'Ошибка при авторизации')
      );
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <>
      <Logo />
      <form className="auth-form" onSubmit={onSubmitHandler}>
        <div className="auth-form__wrapper form-wrapper__name">
          {' '}
          <input
            name="username"
            placeholder="Скажи своё погоняло"
            type="text"
            onFocus={() => handleFocus('username')}
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.username}
          />
          {activeField === 'username' && (
            <button
              className="form-reset"
              type="button"
              onMouseDown={() => {
                setForm((prev) => ({ ...prev, username: '' }));
              }}
            >
              <RxCross2 />
            </button>
          )}
        </div>
        <div className="auth-form__wrapper form-wrapper__password">
          <input
            name="password"
            placeholder="Скажи шифр"
            type="password"
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.password}
          />
          {activeField === 'password' && (
            <button
              className="form-reset"
              type="button"
              onMouseDown={() => {
                setForm((prev) => ({ ...prev, password: '' }));
              }}
            >
              <RxCross2 />
            </button>
          )}
        </div>

        <button className="popup-btn_active">Войти</button>
        <span className="auth-form__bottom-link" onClick={onSwitch}>
          Еще нет аккаунта
        </span>
      </form>
    </>
  );
};

export default Login;
