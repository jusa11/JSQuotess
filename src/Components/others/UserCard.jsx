import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { selectUser, logout } from '../redux/slices/userSlice';
import useGetQuotesCount from '../../Hooks/useGetQuotesCount';
import { URL } from '../../config';

const UserCard = ({ menuOpen }) => {
  const user = useSelector(selectUser);
  const statsInfo = useGetQuotesCount();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={`user-card ${menuOpen ? '' : 'user-card_profile'}`}>
      <div
        onClick={() => {
          navigate('/profile');
        }}
        className={`user-card__avatar ${
          menuOpen ? '' : 'user-card__avatar_profile'
        }`}
      >
        <img src={`${URL}${user.logo}`} alt={user.username} />
      </div>
      <div className="user-card__info">
        <div
          className="user-card__top"
          onClick={() => {
            navigate('/profile');
          }}
        >
          <span className="user-card__name">{user.username}</span>
          <IoIosNotifications className="user-card__notifications" />
        </div>
        <div className="user-card__level">{statsInfo?.titleLevel}</div>
        <button
          className={`user-card__logout ${
            menuOpen ? '' : 'user-card__logout_profile'
          }`}
          onClick={() => {
            dispatch(logout());
            navigate('/');
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default UserCard;
