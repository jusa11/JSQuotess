import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <FooterTop />
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
