import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import gsap from 'gsap';
import { checkAuth, selectUser } from './Components/redux/slices/userSlice';
import Error from './Components/others/Error';
import Header from './Components/blocks/header/Header';
import Stars from './Components/others/Stars';
import Space from './Components/blocks/space/Space';
import QuotesAction from './Components/blocks/quotes-action/QuotesAction';
import Popular from './Components/blocks/popular/Popular';
import Footer from './Components/blocks/footer/Footer';
import Profile from './Components/blocks/profile/Profile';
import FavoritePage from './Components/blocks/profile/FavoritePage';
import SharePage from './Components/blocks/profile/SharePage';
import SettingsPage from './Components/blocks/profile/SettingsPage';
import Layout from './Components/others/Layout';
import { RefProvider } from './Hooks/useOutletRef';
import ScrollToTopButton from './Components/others/ScrollToTopButton';
import NotFound from './Components/others/NotFound';
import AuthPage from './Components/others/AuthPage';
import AuthPopup from './Components/blocks/authorization/AuthPopup';
import {
  selectChosedSearch,
  setReset,
} from './Components/redux/slices/searchSlice';
import SearchOverlay from './Components/others/SearchOverlay';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(selectUser);
  const [loading, setLoading] = useState(true);
  const [isPopup, setPopup] = useState(false);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const chosedSearch = useSelector(selectChosedSearch);

  useEffect(() => {
    const body = document.body;
    if (chosedSearch) {
      body.classList.add('lock');

      gsap.fromTo(
        '.search-overlay',
        {
          y: '-40%',
        },
        {
          duration: 1,
          y: 0,
          ease: 'bounce.out',
        }
      );
    } else {
      body.classList.remove('lock');
      dispatch(setReset());
    }
  }, [chosedSearch, dispatch]);

  useEffect(() => {
    dispatch(checkAuth()).finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) {
      setJustLoggedOut(true);
    }
  }, [isAuth]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="app">
      <RefProvider>
        <Router>
          <Stars />
          <Routes>
            <Route
              path="/profile"
              element={
                <ProfileRedirect
                  isAuth={isAuth}
                  setPopup={setPopup}
                  justLoggedOut={justLoggedOut}
                  setJustLoggedOut={setJustLoggedOut}
                />
              }
            >
              <Route index element={<Profile />} />
              <Route path="favorite" element={<FavoritePage />} />
              <Route path="share" element={<SharePage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            <Route
              index
              element={
                <>
                  <Header />
                  <div className="wrapper">
                    <div className="content">
                      <Space />
                      <QuotesAction />
                      <div className="swiper-container">
                        <Popular />
                      </div>
                    </div>
                  </div>
                  <Footer />
                </>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ScrollToTopButton />

          {!justLoggedOut && isPopup && (
            <AuthPopup isPopup={isPopup} setPopup={setPopup} />
          )}
          <Error />
        </Router>
        {chosedSearch && <SearchOverlay />}
      </RefProvider>
    </div>
  );
}

function ProfileRedirect({
  isAuth,
  setPopup,
  justLoggedOut,
  setJustLoggedOut,
}) {
  const location = useLocation();

  useEffect(() => {
    if (!isAuth && location.pathname === '/profile') {
      setPopup(true);
    }
  }, [isAuth, location.pathname, setPopup]);

  useEffect(() => {
    if (!isAuth && justLoggedOut) {
      setJustLoggedOut(false);
    }
    if (isAuth) {
      setPopup(false);
    }
  }, [isAuth, justLoggedOut, setJustLoggedOut, setPopup]);

  return isAuth ? <Layout /> : <Navigate to="/" replace />;
}

export default App;
