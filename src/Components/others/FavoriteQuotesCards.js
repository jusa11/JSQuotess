import { useSelector, useDispatch } from 'react-redux';
import {
  setdeleteAllQuote,
  setDeleteQuote,
  selectQuote,
} from '../redux/slices/quotesSlice';
import {
  selectTextFilter,
  selectAuthorFilter,
} from './redux/slices/filterSlice';
import { filterQuotes } from './utils/filterQuotes';

const FavoriteQuotesCards = () => {
  const favoriteQuote = useSelector(selectQuote);
  const textFilter = useSelector(selectTextFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const dispatch = useDispatch();

  const handleRemoveAllQuotes = () => {
    dispatch(setdeleteAllQuote());
  };

  const handleRemoveQuote = (id) => {
    dispatch(setDeleteQuote(id));
  };

  const filteredQuotes = filterQuotes(favoriteQuote, textFilter, authorFilter);

  const highLightMatch = (text, filter) => {
    if (!filter) {
      return text;
    }
    const regex = new RegExp(`(${filter})`, 'gi');

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div>
      <div className="favorites-qoutes">
        <h3 className="favorites-qoutes-title">Избранные цитаты</h3>
        <div className="favorites-qoutes-item">
          {filteredQuotes.map((quote) => (
            <div className="favorites-qoute" key={quote.id}>
              {highLightMatch(quote.text, textFilter)}
              {highLightMatch(quote.author, authorFilter)}
              <span
                className="remove-btn"
                onClick={() => handleRemoveQuote(quote.id)}
              >
                ★
              </span>
            </div>
          ))}
        </div>
        <div className="delete-btn btn" onClick={handleRemoveAllQuotes}>
          Очистить избранное
        </div>
      </div>
    </div>
  );
};

export default FavoriteQuotesCards;
