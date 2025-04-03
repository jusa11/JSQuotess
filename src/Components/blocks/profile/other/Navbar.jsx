import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { MdFavorite } from 'react-icons/md';
import { FiShare } from 'react-icons/fi';
import { ImSwitch } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import { IoIosStats } from 'react-icons/io';
import LogoutPopup from '../../authorization/LogoutPopup';
import {
  setStatBar,
  selectStatsStatus,
} from '../../../redux/slices/statsBarSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statsBarStatus = useSelector(selectStatsStatus);
  const [isPopup, setPopup] = useState();
  const popupRef = useRef(null);

  return (
    <>
      <aside className="profile-navbar">
        <nav className="profile-navbar__navigation">
          <ul className="navbar-navigation__list">
            <li className="navbar-navigation__item">
              <IoMdHome
                className="navigation__item-icon"
                onClick={() => navigate('/')}
              />
            </li>
            <li className="navbar-navigation__item">
              <CgProfile
                className="navigation__item-icon"
                onClick={() => navigate('/profile')}
              />
            </li>
            <li className="navbar-navigation__item">
              <MdFavorite
                className="navigation__item-icon"
                onClick={() => navigate('/profile/favorite')}
              />
            </li>
            <li className="navbar-navigation__item">
              <FiShare
                className="navigation__item-icon"
                onClick={() => navigate('/profile/share')}
              />
            </li>
            <li className="navbar-navigation__item">
              <IoMdSettings
                className="navigation__item-icon"
                onClick={() => navigate('/profile/settings')}
              />
            </li>

            <li className="navbar-navigation__item navbar-stats">
              <IoIosStats
                className="navigation__item-icon navigation__item-stats"
                onClick={() =>
                  dispatch(
                    setStatBar(
                      statsBarStatus === 'stats-active' ? '' : 'stats-active'
                    )
                  )
                }
              />
            </li>
            <li className="navbar-navigation__item">
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
