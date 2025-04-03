import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShareForm from './ShareForm';
import ListQuotes from '../../others/ListQuote';
import { LAST_QUOTES_URL } from '../../../config';

gsap.registerPlugin(ScrollTrigger);

const QuotesAction = () => {
  const quotesActionRef = useRef(null);
  useEffect(() => {
    if (quotesActionRef.current) {
      gsap.fromTo(
        quotesActionRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quotesActionRef.current,
            start: 'top 85%',
            end: 'top 50%',

          },
        }
      );
    }
  }, []);

  return (
    <section id="quotes-action">
      <div className="container">
        <div ref={quotesActionRef} className="quotes-action__row">
          <div className="quotes-action__column">
            <ShareForm />
            <ListQuotes
              url={LAST_QUOTES_URL}
              title={'Последние мысли Джейсона Стетхема'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesAction;
