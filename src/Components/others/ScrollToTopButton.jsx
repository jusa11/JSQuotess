import { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener(scroll, toggleVisible);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutQuad',
    });
  };
  return (
    isVisible && (
      <button onClick={scrollToTop} className="scroll-to-top">
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
