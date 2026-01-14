import './Footer.css';

const Footer = () => {
    return (
        <footer className="app-footer glass-panel">
            <div className="footer-content">
                <div className="footer-top">
                    <p className="tagline">" Designed for Vibe Checks & Good Times "</p>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <p className="copyright">© 2026 Bouzakraoui Mohamed</p>
                    <a
                        href="https://instagram.com/bzkr_simo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                    >
                        <span className="instagram-icon">📸</span> @bzkr_simo
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
