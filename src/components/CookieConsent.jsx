import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CookieConsent.css';

const CookieConsent = () => {
    const { t } = useTranslation();
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
                    {t('cookie.message')}
                    <Link to="/privacy"> {t('cookie.policy_link')}</Link>.
                </p>
                <div className="cookie-actions">
                    <button onClick={handleAccept} className="btn-accept">
                        {t('cookie.accept')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
