import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('user_language_preference', lang);

        // Set direction
        const dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = lang;
    };

    return (
        <div className="language-switcher">
            <button
                className={`lang-btn ${i18n.language === 'ar' ? 'active' : ''}`}
                onClick={() => changeLanguage('ar')}
                title="العربية"
            >
                AR
            </button>
            <button
                className={`lang-btn ${i18n.language === 'fr' ? 'active' : ''}`}
                onClick={() => changeLanguage('fr')}
                title="Français"
            >
                FR
            </button>
            <button
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => changeLanguage('en')}
                title="English"
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
