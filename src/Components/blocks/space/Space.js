import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Popup from 'reactjs-popup';
import { setError } from '../../redux/slices/notificationsSlice.js';
import { generateRandomQuoteAPI } from '../../../utils/generateRandomQuoteAPI';
import Orbit from './Orbit';
import Planet from './Planet';
import QuotesCard from '../../others/QuotesCard.js';

gsap.registerPlugin(MotionPathPlugin);

const Space = () => {
  const spaceRef = useRef(null);
  const orbitRef = useRef([]);
  const planetRef = useRef([]);
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const [currentQuote, setCurrentQuote] = useState({}); 
  const [isPopup, setPopup] = useState(false);

  const orbitData = [
    {
      id: 1,
      width: 703,
      height: 707,
      d: 'M351.445 705.961C544.745 705.961 701.445 548.141 701.445 353.461C701.445 158.781 544.745 0.961182 351.445 0.961182C158.146 0.961182 1.44531 158.781 1.44531 353.461C1.44531 548.141 158.146 705.961 351.445 705.961Z',
    },
    {
      id: 2,
      width: 601,
      height: 604,
      d: 'M300.445 602.961C465.579 602.961 599.445 468.199 599.445 301.961C599.445 135.723 465.579 0.961182 300.445 0.961182C135.312 0.961182 1.44531 135.723 1.44531 301.961C1.44531 468.199 135.312 602.961 300.445 602.961Z',
    },
    {
      id: 3,
      width: 505,
      height: 507,
      d: 'M252.445 505.961C391.069 505.961 503.445 392.913 503.445 253.461C503.445 114.009 391.069 0.961182 252.445 0.961182C113.822 0.961182 1.44531 114.009 1.44531 253.461C1.44531 392.913 113.822 505.961 252.445 505.961Z',
    },
    {
      id: 4,
      width: 403,
      height: 404,
      d: 'M201.445 402.961C311.902 402.961 401.445 312.97 401.445 201.961C401.445 90.952 311.902 0.961182 201.445 0.961182C90.9883 0.961182 1.44531 90.952 1.44531 201.961C1.44531 312.97 90.9883 402.961 201.445 402.961Z',
    },
    {
      id: 5,
      width: 303,
      height: 303,
      d: 'M151.445 301.961C234.288 301.961 301.445 234.58 301.445 151.461C301.445 68.3423 234.288 0.961182 151.445 0.961182C68.6026 0.961182 1.44531 68.3423 1.44531 151.461C1.44531 234.58 68.6026 301.961 151.445 301.961Z',
    },
  ];
  const randomSpeed = () => Math.floor(Math.random() * (10 - 5) + 5);
  const randomPosition = () => Math.random() * (0.9 - 0.1) + 0.1;

  const catchThink = useCallback(async () => {
    try {
      const newQuote = await generateRandomQuoteAPI();

      if (newQuote) {
        setCurrentQuote(newQuote);
        setPopup(true);
      } else {
        console.error('API вернул невалидное значение');
      }
    } catch (error) {
      setCurrentQuote(false);
      console.log('error ' + error);
      dispatch(setError(error.message));
    }
  }, [dispatch]);

  useEffect(() => {
    if (spaceRef.current) {
      gsap.fromTo(
        spaceRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: spaceRef.current,
            start: 'top 95%',
            end: 'top 50%',
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const ctx = gsap.context(() => {
        planetRef.current.forEach((planet, index) => {
          const path = orbitRef.current[index];
          if (path && planet) {
            const handleMouseEnter = () => {
              gsap.to(planet, {
                scale: 0.9,
                filter: 'drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.8))',
                duration: 0.3,
              });
            };
            const handleMouseLeave = () => {
              gsap.to(planet, {
                scale: 0.7,
                filter: 'drop-shadow(0px 0px 0px rgba(255, 255, 255, 0))',
                duration: 0.3,
              });
            };

            planet.addEventListener('click', catchThink);
            planet.addEventListener('mouseenter', handleMouseEnter);
            planet.addEventListener('mouseleave', handleMouseLeave);

            gsap
              .to(planet, {
                duration: randomSpeed(),
                repeat: -1,
                ease: 'linear',
                rotation: 360,
                force3D: true,
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                },
              })
              .progress(randomPosition());
          }
        });
        return () => ctx.revert();
      });
    }, 100);
  }, [catchThink]);

  return (
    <section ref={spaceRef} className="space" id="space-planet">
      <h2 className="visually-hidden">орбиты</h2>
      <div className="space__content">
        <div className="space__orbit">
          {orbitData.map((orbit, index) => {
            return (
              <Orbit
                key={`orbit-${orbit.id}`}
                ref={(el) => (orbitRef.current[index] = el)}
                {...orbit}
              />
            );
          })}
          <div className="orbit-center">
            <img src={process.env.PUBLIC_URL + "/img/space-content/spase-center.png"} alt="" />
          </div>
        </div>

        {orbitData.map((orbit, index) => {
          return (
            <div className="planet__quote" key={`planet__quote-${orbit.id}`}>
              <Planet
                id={orbit.id}
                ref={(el) => (planetRef.current[index] = el)}
              />
            </div>
          );
        })}
      </div>

      <Popup
        open={isPopup}
        modal
        overlayStyle={{
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
        }}
        onClose={() => setPopup(false)}
      >
        <QuotesCard
          className="card"
          quote={currentQuote}
          ref={popupRef}
          isPopup={isPopup}
        />
      </Popup>
    </section>
  );
};

export default Space;
