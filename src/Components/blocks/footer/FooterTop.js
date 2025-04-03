import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import UserCard from '../../others/UserCard';
import { selectUser } from '../../redux/slices/userSlice';
import AuthPopup from '../authorization/AuthPopup';
import MainMenu from '../../others/MainMenu';
import Logo from '../../others/Logo';
import Burger from '../../others/Burger';

const FooterTop = () => {
  const { isAuth } = useSelector(selectUser);
  const [isPopup, setPopup] = useState(false);
  const popupRef = useRef(null);

  return (
    <div className="footer__top">
      <Logo />
      <div className="main-menu">
        <MainMenu />
      </div>
      <Burger />

      <div className="join__btn">
        {isAuth ? (
          <Link to="/profile">
            <UserCard hidden={true} />
          </Link>
        ) : (
          <button onClick={() => setPopup(true)} className="main__btn">
            Присоединиться
          </button>
        )}

        {isPopup && (
          <AuthPopup
            isPopup={isPopup}
            setPopup={setPopup}
            popupRef={popupRef}
          />
        )}
      </div>
    </div>
  );
};

export default FooterTop;
