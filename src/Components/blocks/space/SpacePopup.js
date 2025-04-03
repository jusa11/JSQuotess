import { useEffect } from 'react';
import gsap from 'gsap';
import Popup from 'reactjs-popup';
import QuotesCard from '../../others/QuotesCard';

const SpacePopup = ({ currentQuote, isPopup, setPopup, popupRef }) => {
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
    <Popup
      open={isPopup}
      modal
      overlayStyle={{ background: 'rgba(0, 0, 0, 0.7)' }}
      onClose={() => setPopup(false)}
    >
      <QuotesCard
        className="card"
        currentQuote={currentQuote}
        popupRef={popupRef}
      />
    </Popup>
  );
};

export default SpacePopup;
