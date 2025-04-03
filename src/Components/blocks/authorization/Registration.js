import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { RxCross2 } from 'react-icons/rx';
import { setUser } from '../../redux/slices/userSlice';
import Logo from '../../others/Logo';
import FileDrop from './FileDrop';
import { setError, setSuccess } from '../../redux/slices/notificationsSlice';
import { URL, REGISTRATION } from '../../../config';

const Registration = ({ onSwitch }) => {
  const [form, setForm] = useState({
    username: '',
    name: '',
    password: '',
    logo: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fieldError, setFieldError] = useState([]);
  const [formError, setFormError] = useState({});
  const [activeField, setActiveField] = useState(null);

  const handleFocus = (field) => setActiveField(field);
  const handleBlur = () => setActiveField(null);

  const checkFields = (name, value) => {
    const fieldNames = {
      username: 'Логин',
      name: 'Имя',
      password: 'Пароль',
      logo: 'Лого',
    };

    let errors = [];
    let formErrors = { ...formError };

    const fieldName = fieldNames[name] || name;

    if (!value.trim()) {
      setFieldError((prev) => prev.filter((err) => !err.includes(fieldName)));

      formErrors[name] = false;
      setFormError((prev) => ({ ...prev, ...formErrors }));
      return;
    }

    if (value.length >= 20) {
      errors.push(`Поле "${fieldName}" не должно быть не длиннее 20 символов`);
      formErrors[name] = true;
    }
    if (fieldName !== 'Имя' && fieldName !== 'Лого') {
      if (/\s/.test(value)) {
        errors.push(`Поле "${fieldName}" не должно содержать пробелов`);
        formErrors[name] = true;
      } else if (!/^[A-Za-z0-9]+$/.test(value)) {
        errors.push(
          `В поле "${fieldName}" можно использовать только латиницу и цифры`
        );
        formErrors[name] = true;
      } else {
        formErrors[name] = false;
      }
    }

    setFormError((prev) => ({ ...prev, ...formErrors }));
    setFieldError((prev) => {
      const newError = prev.filter((err) => !err.includes(fieldName));
      return [...newError, ...errors];
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    checkFields(name, value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = useCallback((file) => {
    setForm((prevForm) => ({ ...prevForm, logo: file }));
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      dispatch(setError('Не заполнены обязательные поля'));
      return;
    }

    if (fieldError.length !== 0) {
      dispatch(setError('В форме есть ошибки, исправь их!'));
      return;
    }

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('name', form.name);
    formData.append('password', form.password);
    if (form.logo) {
      formData.append('logo', form.logo);
    }
    try {
      const res = await axios.post(`${URL}${REGISTRATION}`, formData);
      const { token } = res.data;
      localStorage.setItem('token', token);
      try {
        const decode = jwtDecode(token);
        dispatch(
          setUser({
            username: decode.username,
            userId: decode._id,
            logo: decode.logo,
          })
        );
      } catch (e) {
        console.error('Ошибка при декодировании токена', e);
        dispatch(setError('Ошибка при обработке токена'));
        return;
      }
      navigate('/profile');
      dispatch(setSuccess('Добро пожаловать в сообщество!'));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message || 'Произошла ошибка при регистрации'
        )
      );
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <>
      <Logo />
      <p className="auth-form__text">
        Присоединяйся к сообществу ценителей пацанских цитат Джейсона Стетхэма!
        Если у тебя есть мудрые мысли или жизненные принципы, которыми ты хочешь
        поделиться — добро пожаловать. Здесь каждый может внести свою лепту в
        искусство суровых афоризмов. 📢 <br />
        <br />
        Зарегистрируйся и добавляй цитаты, которые заставят задуматься даже
        самого бывалого мужика. 🔥 Оценивай и сохраняй лучшие изречения. 💬
        Делись мудростью с единомышленниками. Войди в круг избранных —
        регистрируйся прямо сейчас! 🚀
      </p>
      <form className="auth-form " onSubmit={onSubmitHandler}>
        {fieldError.map((error, index) => {
          return (
            <ul className="auth-form__error" key={index}>
              <li className="auth-form__error-list">{error}</li>
            </ul>
          );
        })}
        <div className="auth-form__wrapper form-wrapper__username">
          <input
            name="username"
            placeholder="Придумай себе погоняло"
            type="text"
            onChange={handleChange}
            className={`${formError?.username ? 'auth-form__error-field' : ''}`}
            value={form.username}
            onFocus={() => handleFocus('username')}
            onBlur={handleBlur}
            maxLength={20}
          />
          {activeField === 'username' && (
            <button
              type="button"
              className="form-reset"
              onMouseDown={() => {
                setForm((prev) => ({ ...prev, username: '' }));
              }}
            >
              <RxCross2 />
            </button>
          )}
        </div>
        <div className="auth-form__wrapper form-wrapper__name">
          <input
            name="name"
            placeholder="Как тебя зовут, сынок?"
            className={`${formError?.name ? 'auth-form__error-field' : ''}`}
            type="text"
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={handleBlur}
            value={form.name}
          />
          {activeField === 'name' && (
            <button
              className="form-reset"
              type="button"
              onMouseDown={() => {
                setForm((prev) => ({ ...prev, name: '' }));
              }}
            >
              <RxCross2 />
            </button>
          )}
        </div>

        <div className="auth-form__wrapper form-wrapper__password">
          {' '}
          <input
            name="password"
            placeholder="Зашифруйся как следует"
            type="password"
            onChange={handleChange}
            value={form.password}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
            className={`${formError?.password ? 'auth-form__error-field' : ''}`}
          />
          {activeField === 'password' && (
            <button
              type="button"
              className="form-reset"
              onMouseDown={() => {
                setForm((prev) => ({ ...prev, password: '' }));
              }}
            >
              <RxCross2 />
            </button>
          )}
        </div>

        <FileDrop username={form.username} onFileSelect={handleFileChange} />

        <button className="popup-btn_active" type="submit">
          Зарегистрироваться
        </button>
        <span className="auth-form__bottom-link" onClick={onSwitch}>
          Уже есть аккаунт
        </span>
      </form>
    </>
  );
};

export default Registration;
