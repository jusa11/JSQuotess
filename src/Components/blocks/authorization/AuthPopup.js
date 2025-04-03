import { useState, useEffect } from 'react';
import gsap from 'gsap';
import Popup from 'reactjs-popup';
import Registration from './Registration';
import Login from './Login';

const AuthPopup = ({ isPopup, setPopup, popupRef }) => {
  const [isLogin, setIsLogin] = useState(true);

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
          {isLogin ? (
            <>
              <Login
                onSwitch={() => setIsLogin(false)}
                onClose={() => setPopup(false)}
              />
            </>
          ) : (
            <>
              <Registration onSwitch={() => setIsLogin(true)} />
            </>
          )}
        </div>
      </Popup>
    </>
  );
};

export default AuthPopup;
