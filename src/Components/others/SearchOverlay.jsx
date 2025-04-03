import { useSelector, useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { selectUser } from '../redux/slices/userSlice';
import SearchForm from './SearchForm';
import { setChoosedSearch } from '../redux/slices/searchSlice';

const SearchOverlay = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(selectUser);

  return (
    <div className="search-overlay">
      <div className="search-overlay__handler">
        <button
          className="search-overlay__close"
          onClick={() => dispatch(setChoosedSearch(false))}
        >
          <RxCross2 />
        </button>
      </div>
      <div className="search-overlay__container">
        <div className="search-overlay__content">
          <SearchForm isAuth={isAuth} />
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
