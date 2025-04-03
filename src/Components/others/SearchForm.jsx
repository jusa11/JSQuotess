import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RxCross2 } from 'react-icons/rx';
import { selectUser } from '../redux/slices/userSlice';
import {
  selectQuery,
  selectResults,
  selectType,
  selectHasMore,
  selectPage,
  setQuery,
  setType,
  setReset,
  fetchSearch,
  setResult,
} from '../redux/slices/searchSlice';
import QuotesCard from './QuotesCard';
import { useOutletRef } from '../../Hooks/useOutletRef';

gsap.registerPlugin(ScrollTrigger);

const SearchForm = ({ isAuth }) => {
  const { username } = useSelector(selectUser);
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const type = useSelector(selectType);
  const page = useSelector(selectPage);
  const hasMore = useSelector(selectHasMore);
  const results = useSelector(selectResults);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadingMore, setLoadingMore] = useState(false);
  const quotesCardRef = useRef([]);
  const ref = useRef(null);
  const outletRef = useOutletRef();
  quotesCardRef.current = [];

  const handleSearch = useCallback(
    (e) => {
      const value = typeof e === 'string' ? e : e.target.value;

      if (!value.trim()) {
        dispatch(setQuery(''));
        dispatch(setResult([]));
        return;
      }

      dispatch(setQuery(value));
      dispatch(fetchSearch({ query: value, type, username, page: 1 }));
    },
    [dispatch, type, username]
  );

  const handleMore = async () => {
    setLoadingMore(true);
    await dispatch(fetchSearch({ query, type, page }));
    setLoadingMore(false);
  };

  const handleFilter = (e) => {
    const value = e.target.value;

    setActiveFilter(value);
    dispatch(setType(value));
  };

  useEffect(() => {
    if (quotesCardRef.current.length > 0) {
      quotesCardRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              // y: 0,
              scale: 1,
              delay: 0.1 * index,
              ease: 'power1.out',
            }
          );
        }
      });
    }
  }, [results]);

  useEffect(() => {
    if (ref.current && !outletRef.current.includes(ref.current)) {
      outletRef.current.push(ref.current);
    }
  }, [outletRef]);

  useEffect(() => {
    if (query.trim()) {
      handleSearch({ target: { value: query } });
    }
  }, [handleSearch, query, type]); 

  useEffect(() => {
    return () => dispatch(setReset());
  }, [dispatch]);
	
  return (
    <div className="profile-content__search">
      <div className="content-main__card_big" ref={ref}>
        <div className="search-quote__form search-quote__container card">
          <h3 className="action__card_title card-title">Найти цитату</h3>
          {isAuth && (
            <div className="search-filter">
              <button
                className={`search-filter__item filter-all ${
                  activeFilter === 'all' ? 'filter-active' : ''
                }`}
                value="all"
                onClick={(e) => handleFilter(e)}
              >
                Во вселенной
              </button>
              <button
                className={`search-filter__item filter-added ${
                  activeFilter === 'user' ? 'filter-active' : ''
                }`}
                value="user"
                onClick={(e) => handleFilter(e)}
              >
                Мои
              </button>
              <button
                className={`search-filter__item filter-liked ${
                  activeFilter === 'liked' ? 'filter-active' : ''
                }`}
                value="liked"
                onClick={(e) => handleFilter(e)}
              >
                Мне понравились
              </button>
            </div>
          )}

          <form className="searh-quote__form">
            {' '}
            <div className="searh-quote__form_wrapper">
              <input
                type="text"
                name="message"
                id="yourMessage"
                className="searh-quote__query"
                placeholder="Запрос во вселленную"
                value={query}
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <button
              className="form-search__reset"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setReset());
              }}
            >
              <RxCross2 />
            </button>
          </form>
        </div>
      </div>
      <div className="search-result__block">
        {results.map((quote, index) => (
          <QuotesCard
            ref={(el) => (quotesCardRef.current[index] = el)}
            className="card"
            quote={quote}
            key={quote._id}
          />
        ))}
        {query && hasMore && (
          <button
            className="show-more-btn"
            onClick={handleMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Загружаю...' : 'Показать ещё'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
