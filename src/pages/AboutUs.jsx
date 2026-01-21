import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';

const AboutUs = () => {
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
                <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', textAlign: 'center' }}>{t('about.title')}</h1>

                <p className="lead" style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', textAlign: 'center', color: '#cbd5e1' }}>
                    {t('about.lead')}
                </p>

                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>{t('about.story_title')}</h2>
                    <p style={{ lineHeight: '1.8', color: '#e2e8f0', marginBottom: '1rem' }}>
                        {t('about.story_text_1')}
                    </p>
                    <p style={{ lineHeight: '1.8', color: '#e2e8f0' }}>
                        {t('about.story_text_2')}
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>{t('about.mission_title')}</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#38bdf8' }}>{t('about.point_1_title')}</strong>
                            {t('about.point_1_text')}
                        </li>
                        <li style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#a78bfa' }}>{t('about.point_2_title')}</strong>
                            {t('about.point_2_text')}
                        </li>
                        <li style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#f472b6' }}>{t('about.point_3_title')}</strong>
                            {t('about.point_3_text')}
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>{t('about.join_title')}</h2>
                    <p style={{ lineHeight: '1.8', color: '#e2e8f0' }}>
                        {t('about.join_text')}
                    </p>
                    <p style={{ marginTop: '2rem', fontStyle: 'italic', opacity: 0.8 }}>
                        {t('about.team')}
                    </p>
                </section>
            </div>
        </>
    );
};

export default AboutUs;
