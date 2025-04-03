import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import UserCard from './UserCard';
import { selectUser } from '../redux/slices/userSlice';
import AuthPopup from '../blocks/authorization/AuthPopup';
import MainMenu from './MainMenu';

const Burger = () => {
  const { isAuth } = useSelector(selectUser);
  const [isPopup, setPopup] = useState();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const popupRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (isMenuOpen && !event.target.closest('.bm-menu-wrap')) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, [isMenuOpen]);

  return (
    <>
      <Menu
        right
        noOverlay
        isOpen={isMenuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
      >
        {isAuth ? (
          <UserCard menuOpen={isMenuOpen} />
        ) : (
          <button
            onClick={() => {
              setPopup(true);
              closeMenu();
            }}
            className="burger-btn"
          >
            Присоединиться
          </button>
        )}

        <MainMenu closeMenu={closeMenu} />
      </Menu>

      {isPopup && (
        <AuthPopup isPopup={isPopup} setPopup={setPopup} popupRef={popupRef} />
      )}
    </>
  );
};

export default Burger;
