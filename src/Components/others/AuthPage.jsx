import { useState } from 'react';
import Login from '../blocks/authorization/Login';
import Registration from '../blocks/authorization/Registration';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="auth-page">
      {/* <h1>Погоди, панцанчик!</h1> */}
      <div className="auth-page__content">
        {isLogin ? (
          <>
            <Login onSwitch={() => setIsLogin(false)} />
          </>
        ) : (
          <>
            <Registration onSwitch={() => setIsLogin(true)} />
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
