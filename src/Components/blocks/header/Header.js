import HeaderNav from './HeaderNav';
import HeaderContent from './HeaderContent';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <HeaderNav />
        <HeaderContent />
      </div>
    </header>
  );
};

export default Header;
