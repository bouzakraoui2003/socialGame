
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer glass-panel">
            <div className="footer-content">
                <div className="footer-top">
                    <p className="tagline">" Designed for Vibe Checks & Good Times "</p>
                </div>

                <div className="footer-links">
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms</Link>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <p className="copyright">© 2026 Bouzakraoui Mohamed. All rights reserved.</p>
                    <a href="mailto:simo10bouzakraoui@gmail.com" className="footer-email-link">
                        simo10bouzakraoui@gmail.com
                    </a>
                    <div className="social-links-row" style={{ display: 'flex', gap: '10px' }}>
                        <a
                            href="https://instagram.com/bzkr_simo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link instagram"
                            title="Instagram"
                            style={{ fontSize: '1.2rem' }}
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://www.facebook.com/people/BE-RL-IN/pfbid02PYBT2aVLSTUk6KU6WJ3y9zGyFg7apbLPiHTvpjEyh2y5BrTWtVF6kNgTQ7GxJBbRl/?locale=fr_FR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link facebook"
                            title="Facebook"
                            style={{ fontSize: '1.2rem' }}
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://www.tiktok.com/@bzkr.simo?is_from_webapp=1&sender_device=pc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link tiktok"
                            title="TikTok"
                            style={{ fontSize: '1.2rem' }}
                        >
                            <FaTiktok />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
