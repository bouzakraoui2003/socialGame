import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';

const TermsOfService = () => {
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
                <h1>{t('terms.title')}</h1>
                <p>{t('terms.last_updated')}</p>

                <h2>{t('terms.accept_title')}</h2>
                <p>{t('terms.accept_text')}</p>

                <h2>{t('terms.desc_title')}</h2>
                <p>{t('terms.desc_text')}</p>

                <h2>{t('terms.conduct_title')}</h2>
                <p>{t('terms.conduct_text')}</p>

                <h2>{t('terms.ip_title')}</h2>
                <p>{t('terms.ip_text')}</p>

                <h2>{t('terms.disclaimer_title')}</h2>
                <p>{t('terms.disclaimer_text')}</p>

                <h2>{t('terms.liability_title')}</h2>
                <p>{t('terms.liability_text')}</p>
            </div>
        </>
    );
};

export default TermsOfService;
