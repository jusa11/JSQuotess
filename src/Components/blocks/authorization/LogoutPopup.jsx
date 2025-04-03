import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import Popup from 'reactjs-popup';
import { logout } from '../../redux/slices/userSlice';

const LogoutPopup = ({ isPopup, setPopup, popupRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isPopup && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.1,
          ease: 'power1.out',
        }
      );
    }
  }, [isPopup, popupRef]);

  return (
    <>
      <Popup
        open={isPopup}
        modal
        overlayStyle={{
          backdropFilter: 'blur(10px)',
        }}
        onClose={() => setPopup(false)}
      >
        <div className="main-popup" ref={popupRef}>
          <h2 className="loguot-title">Ну, все, погнал?</h2>
          <div className="loguot-buttons">
            <button
              className="popup-btn_active"
              onClick={() => setPopup(false)}
            >
              Остаться
            </button>
            <button
              className="popup-btn"
              onClick={() => {
                dispatch(logout());
                navigate('/');
              }}
            >
              Выйти
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default LogoutPopup;
