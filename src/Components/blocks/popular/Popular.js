import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/skyblue';
import QuotesCard from '../../others/QuotesCard';
import { setError } from '../../redux/slices/notificationsSlice';
import {
  setPopularQuotes,
  selectDisplayPopularQuotes,
} from '../../redux/slices/displayQuotesSlice';
import { POPULAR_URL, URL } from '../../../config';

const Popular = () => {
  const dispatch = useDispatch();
  const popularQuotes = useSelector(selectDisplayPopularQuotes);
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios(`${URL}${POPULAR_URL}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setPopularQuotes(res.data));
      } catch (error) {
        console.error('Ошибка при загрузке цитат', error);
        dispatch(setError('Ошибка при загрузке цитат'));
      }
    })();
  }, [dispatch, token]);

  return (
    <section id="popular">
      <h2 className="popular__title title">Популярные мысли</h2>

      <div className="popular__content">
        <Splide
          key={popularQuotes.length}
          options={{
            type: 'loop',
            perPage: 2,
            focus: 'center',
            arrows: true,
            pagination: false,
            wheel: true,
            gap: '20px',
            breakpoints: {
              768: {
                direction: 'ttb',
                perPage: 1.5,
                height: '450px',
                arrows: true,
                pagination: false,
              },
            },
          }}
        >
          {popularQuotes.map((quote, index) => (
            <SplideSlide key={index}>
              <QuotesCard quote={quote} />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Popular;
