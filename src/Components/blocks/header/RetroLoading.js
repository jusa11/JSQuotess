import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const RetroLoading = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
    });
  }, []);

  return (
    <div
      className="terminal"
      style={{
        fontFamily: 'Courier New, monospace',
        color: '#33FF33',
        padding: '20px',
        fontSize: '20px',
        textShadow: '0 0 5px #00CC00',
      }}
    >
      INITIALIZING SYSTEM...
      <span ref={cursorRef}>_</span>
    </div>
  );
};

export default RetroLoading;
