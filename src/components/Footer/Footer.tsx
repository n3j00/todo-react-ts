import './footer.scss';
import { DiGithubBadge } from 'react-icons/di';
import { ImLinkedin } from 'react-icons/im';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        <div className="rights">
          <span> Nikodem `nejoo` Stach </span>
        </div>
        <div className="name">
          <span>nejoo.</span>
        </div>
        <div className="footer-links">
          <a className="link" href="https://github.com/n3j00">
            <DiGithubBadge size={30} />
          </a>
          <a
            className="link"
            href="https://www.linkedin.com/in/nikodem-stach-148399280/"
          >
            <ImLinkedin size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
