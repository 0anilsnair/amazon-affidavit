import { APP_NAME } from '../../constants/general';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">About {APP_NAME}</h3>
          <p>
            {APP_NAME} is your premier destination for high-quality products
            across multiple categories.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <a href="#" className="footer-link">
            <i className="fas fa-home"></i> Home
          </a>
          <a href="#" className="footer-link">
            <i className="fas fa-tag"></i> Shop
          </a>
          <a href="#" className="footer-link">
            <i className="fas fa-percent"></i> Deals
          </a>
          <a href="#" className="footer-link">
            <i className="fas fa-question-circle"></i> Help Center
          </a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <a href="#" className="footer-link">
            <i className="fas fa-envelope"></i> itsyourtopchoice@gmail.com
          </a>
          <a href="#" className="footer-link">
            <i className="fas fa-phone"></i> +91 81291 87135
          </a>
          <a href="#" className="footer-link">
            <i className="fas fa-map-marker-alt"></i> Byrasandra, Bangalore
          </a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#" className="footer-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="footer-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="footer-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="footer-link">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;