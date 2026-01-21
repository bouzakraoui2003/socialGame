import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
import './Home.css'; // Re-use main styles for consistency

const PrivacyPolicy = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
                style={{
                    position: 'fixed',
                    top: '24px',
                    left: '24px',
                    padding: '10px',
                    borderRadius: '50%',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer'
                }}
            >
                <FaArrowLeft />
            </button>

            <div className="policy-container glass-panel" style={{ maxWidth: '800px', margin: '40px auto', padding: '40px', color: '#fff' }}>
                <h1>{t('privacy.title')}</h1>
                <p>{t('privacy.last_updated')}</p>

                <h2>{t('privacy.intro_title')}</h2>
                <p>{t('privacy.intro_text')}</p>

                <h2>{t('privacy.info_title')}</h2>
                <p>{t('privacy.info_text')}</p>

                <h3>{t('privacy.cookies_title')}</h3>
                <p>{t('privacy.cookies_text_1')}</p>
                <p>{t('privacy.cookies_text_2')}</p>

                <h2>{t('privacy.use_title')}</h2>
                <p>{t('privacy.use_text')}</p>
                <ul>
                    <li>{t('privacy.use_list_1')}</li>
                    <li>{t('privacy.use_list_2')}</li>
                </ul>

                <h2>{t('privacy.ads_title')}</h2>
                <p>{t('privacy.ads_text_1')}</p>
                <p>{t('privacy.ads_text_2')} <a href="https://www.aboutads.info/" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>www.aboutads.info</a>.</p>

                <h2>{t('privacy.retention_title')}</h2>
                <p>{t('privacy.retention_text')}</p>

                <h2>{t('privacy.contact_title')}</h2>
                <p>{t('privacy.contact_text')}</p>
            </div>
        </>
    );
};

export default PrivacyPolicy;
