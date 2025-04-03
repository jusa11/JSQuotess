import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/slices/userSlice';
import MainMenu from '../../others/MainMenu';
import Logo from '../../others/Logo';
import AuthPopup from '../authorization/AuthPopup';
import UserCard from '../../others/UserCard';
import Burger from '../../others/Burger';

const HeaderNav = () => {
  const { isAuth } = useSelector(selectUser);
  const [isPopup, setPopup] = useState();
  const popupRef = useRef(null);

  return (
    <nav className="header__nav nav-menu">
      <Logo />
      <div className="main-menu">
        <MainMenu />
      </div>
      <Burger />

      <div className="header-join">
        {isAuth ? (
          <>
            <Link to="/profile">
              <UserCard hidden={true} />
            </Link>
          </>
        ) : (
          <>
            <button onClick={() => setPopup(true)} className="main__btn">
              Присоединиться
            </button>
          </>
        )}

        {isPopup && (
          <AuthPopup
            isPopup={isPopup}
            setPopup={setPopup}
            popupRef={popupRef}
          />
        )}
      </div>
    </nav>
  );
};

export default HeaderNav;
