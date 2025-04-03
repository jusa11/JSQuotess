import { FaTelegram } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

const FooterBottom = () => {
  return (
    <div className="footer__bottom">
      <div className="footer-bottom__copyright">
        © 2025 цитаты-джейсона-стейтема
        <br />
        Данный проект носит исключительно юмористический характер
      </div>
      <div className="footer-bottom__social">
        <div className="footer-social__telegram">
          <a
            href="https://t.me/jusaa28"
            target="_blank"
            rel="noreferrer"
            className="tg-link"
          >
            <FaTelegram className="fa-brands" />
          </a>
        </div>
        <div className="footer-social__github">
          <a
            href="https://github.com/jusa11/JSQuotes"
            target="_blank"
            rel="noreferrer"
            className="gh-link"
          >
            <FaGithub className="fa-brands" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
