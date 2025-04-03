import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IoCopyOutline } from 'react-icons/io5';
import { FaQuoteLeft } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { setError, setSuccess } from '../../redux/slices/notificationsSlice';
import { generateRandomQuoteAPI } from '../../../utils/generateRandomQuoteAPI.js';
import useHandleLike from '../../../Hooks/useHandleLike';
import RetroLoading from './RetroLoading.js';
import { selectLikedQuotes } from '../../redux/slices/likedQuotesSlice.js';

const HeaderContent = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const quoteRef = useRef(null);
  const handleLike = useHandleLike();
  const likedQuotes = useSelector(selectLikedQuotes);
  const foundQuote = likedQuotes.find((q) => q._id === currentQuote?._id);
  const isLiked = foundQuote ? foundQuote.isLiked : currentQuote?.isLiked;

  useEffect(() => {
    gsap.from('.header__content', {
      opacity: 0,
      y: 400,
      duration: 1,
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentQuote.text);
    dispatch(setSuccess('Цитата скопирована!'));
  };

  const iconAnimation = (e) => {
    gsap.killTweensOf(e);

    gsap.set(e, { rotate: 0 });
    gsap.fromTo(
      e,
      { scale: 0.5, opacity: 0 },
      {
        rotate: 360,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
      }
    );
  };

  const typingQuoteEffect = (text, ref, onComplete) => {
    if (!ref.current) return;

    gsap.killTweensOf(ref.current);
    ref.current.innerHTML = '';

    const chars = text.split('');
    const tl = gsap.timeline({ onComplete }); // Создаём Timeline

    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = 0;
      ref.current.appendChild(span);

      tl.to(span, {
        opacity: 1,
        duration: 0.04,
      });
    });
  };

  const handleGetApiQuote = useCallback(async () => {
    try {
      setIsLoading(true);
      const newQuote = await generateRandomQuoteAPI();
      if (newQuote) {
        setCurrentQuote(newQuote);
      } else {
        console.error('API вернул невалидное значение');
      }
    } catch (error) {
      setCurrentQuote(null);
      console.log('Ошибка: ' + error);
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    handleGetApiQuote();
  }, [handleGetApiQuote]);

  useEffect(() => {
    if (currentQuote) {
      typingQuoteEffect(currentQuote.text, quoteRef);
    }
  }, [currentQuote]);

  return (
    <div className="header__content">
      <h1 className="main-title title" id="generator">
        Вселенная Джейсона Стетхема
      </h1>

      <div className="header__quote">
        <div className="header__quote_content">
          {isLoading ? (
            <RetroLoading />
          ) : (
            <>
              <p ref={quoteRef} className="quote__text"></p>
            </>
          )}
        </div>
        <div className="header__quote_btn">
          <button
            className="button-quote"
            onClick={handleGetApiQuote}
            disabled={isLoading}
          >
            <FaQuoteLeft />
            Сгенерировать
          </button>
          <button
            className="btn-like"
            onClick={(e) => {
              const icon = e.currentTarget.querySelector('*');
              if (icon) {
                iconAnimation(icon);
              }
              handleLike(currentQuote._id);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isLiked ? 'rgba(255, 0, 0, 0.8)' : 'none'}
              stroke="rgba(255, 0, 0, 0.8)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21s-6-4.35-9-8a5.5 5.5 0 0 1 0-7C5.2 3.2 8.5 4.5 12 8c3.5-3.5 6.8-4.8 9-2a5.5 5.5 0 0 1 0 7c-3 3.65-9 8-9 8z" />
            </svg>
          </button>
          <button
            className="btn-copy"
            onClick={(e) => {
              handleCopy();
              iconAnimation(e.currentTarget.children[0]);
            }}
          >
            <IoCopyOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
