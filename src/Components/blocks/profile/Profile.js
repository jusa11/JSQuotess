import { useSelector } from 'react-redux';
import ListQuotes from '../../others/ListQuote';
import SearchForm from '../../others/SearchForm';
import { selectUser } from '../../redux/slices/userSlice';
import {
  /* POPULAR_URL,
  LAST_QUOTES_URL, */
  QUOTES_URL,
  LIKED_QUOTES,
} from '../../../config';
import ShareForm from '../quotes-action/ShareForm';

const Profile = () => {
  const { username, isAuth } = useSelector(selectUser);

  return (
    <>
      <div className="profile-content__main">
        <SearchForm isAuth={isAuth} />
        <ListQuotes
          url={QUOTES_URL.replace(':username', username)}
          title={'Я поделился'}
        />
        <ListQuotes
          url={LIKED_QUOTES.replace(':username', username)}
          title={'Понравившиеся цитаты'}
        />
        <div className="content-main__card_big">
          <ShareForm />
        </div>
      </div>
      {/* <div className="profile-content__bottom">
        <ListQuotes
          url={LAST_QUOTES_URL}
          title={'Последние мысли Джейсона Стетхема'}
        />
        <ListQuotes url={POPULAR_URL} title={'Популярные мысли'} />
      </div> */}
    </>
  );
};

export default Profile;
