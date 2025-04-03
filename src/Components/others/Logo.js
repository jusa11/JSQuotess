import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <div className="logo">
        <img
          src={process.env.PUBLIC_URL + '/img/logo.png'}
          alt="Цитаты Джейсона Стетхема"
        />

        <p className="logo-text">цитаты джейсона стетхема</p>
      </div>
    </Link>
  );
};

export default Logo;
