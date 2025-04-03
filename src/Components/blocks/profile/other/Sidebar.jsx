import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutPopup from '../../authorization/LogoutPopup';
import { IoMdHome } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { MdFavorite } from 'react-icons/md';
import { FiShare } from 'react-icons/fi';
import { ImSwitch } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';

const Sidebar = () => {
  const [isPopup, setPopup] = useState();
  const popupRef = useRef(null);

  return (
    <>
      <aside className="profile-sidebar">
        <nav className="profile-sidebar__navigation">
          <ul className="sidebar-navigation__list">
            <li className="sidebar-navigation__item">
              <NavLink to="/" end>
                <IoMdHome className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <NavLink to="/profile" end>
                <CgProfile className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <NavLink to="/profile/favorite">
                <MdFavorite className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <NavLink to="/profile/share">
                <FiShare className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <NavLink to="/profile/settings">
                <IoMdSettings className="navigation__item-icon" />
              </NavLink>
            </li>
            <li className="sidebar-navigation__item">
              <ImSwitch
                className="navigation__item-icon"
                onClick={() => {
                  setPopup(true);
                }}
              />
            </li>
          </ul>
        </nav>
      </aside>
      {isPopup && (
        <LogoutPopup
          isPopup={isPopup}
          setPopup={setPopup}
          popupRef={popupRef}
        />
      )}
    </>
  );
};

export default Sidebar;
