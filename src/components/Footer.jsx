// Footer.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className='footer-text'> sifzerda <span>⚛</span> 2024</p>
       
        <a href="https://github.com/sifzerda/game-of-life" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>

          <p className='footer-text'>
          My 
          <a href="https://react-td-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;