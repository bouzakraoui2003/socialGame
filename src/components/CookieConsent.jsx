import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('social_game_cookie_consent');
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('social_game_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-banner">
            <div className="cookie-content">
                <p>
                    We use cookies to improve your experience and deliver personalized ads. 
                    By using our site, you acknowledge that you have read and understand our 
                    <Link to="/privacy"> Privacy Policy</Link>.
                </p>
                <div className="cookie-actions">
                    <button onClick={handleAccept} className="btn-accept">
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
