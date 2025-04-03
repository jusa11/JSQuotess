import { useDispatch, useSelector } from 'react-redux';
import {
  setTextFilter,
  setAuthorFilter,
  resetFilter,
  selectTextFilter,
  selectAuthorFilter,
} from './redux/slices/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const textFilter = useSelector(selectTextFilter);
  const authorFilter = useSelector(selectAuthorFilter);

  const handleTextFilter = (e) => {
    dispatch(setTextFilter(e.target.value));
  };

  const handleAuthorFilter = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleResetFilter = () => dispatch(resetFilter());

  return (
    <div className="filter">
      <div className="filter-input-wrapper">
        <input
          type="text"
          className="filter-input"
          placeholder="Введите текст "
          value={textFilter}
          onChange={handleTextFilter}
        />
        <button
          className="filter-clear-btn"
          aria-label="Очистить фильтр"
          onClick={handleResetFilter}
        >
          ✕
        </button>
        <input
          type="text"
          className="filter-input"
          placeholder="Введите автора"
          value={authorFilter}
          onChange={handleAuthorFilter}
        />
      </div>
    </div>
  );
};

export default Filter;
