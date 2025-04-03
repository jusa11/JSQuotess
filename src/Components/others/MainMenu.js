import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-scroll';
import {
  setChoosedSearch,
  selectChosedSearch,
} from '../redux/slices/searchSlice';

const MainMenu = ({ closeMenu }) => {
  const dispatch = useDispatch();
  const chosedSearch = useSelector(selectChosedSearch);
  return (
    <ul className="menu__list">
      <li className="menu__item">
        <Link
          to="generator"
          className="menu__link"
          smooth={true}
          duration={800}
          onClick={closeMenu}
        >
          Генератор
        </Link>
      </li>
      <li className="menu__item">
        <Link
          to="space-planet"
          className="menu__link"
          smooth={true}
          duration={800}
          onClick={closeMenu}
        >
          Поймать
        </Link>
      </li>
      <li className="menu__item">
        <Link
          to="quotes-action"
          className="menu__link"
          smooth={true}
          duration={800}
          onClick={closeMenu}
        >
          Поделиться
        </Link>
      </li>
      <li className="menu__item">
        <Link
          to="popular"
          className="menu__link"
          smooth={true}
          duration={800}
          onClick={closeMenu}
        >
          Популярные
        </Link>
      </li>
      <li className="menu__item">
        <span
          className="menu__link"
          onClick={() => {
            chosedSearch
              ? dispatch(setChoosedSearch(false))
              : dispatch(setChoosedSearch(true));
          }}
        >
          Найти
        </span>
      </li>
    </ul>
  );
};

export default MainMenu;
