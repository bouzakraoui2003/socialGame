import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Home.css'; // Re-use main styles for consistency

const PrivacyPolicy = () => {
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
                <h1>Privacy Policy</h1>
                <p>Last updated: January 16, 2026</p>

                <h2>1. Introduction</h2>
                <p>Welcome to Social 2.0 ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how your information is collected, used, and disclosed by Social 2.0.</p>

                <h2>2. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you create a test, including your name and the answers you select. We do not require you to create an account or provide an email address.</p>

                <h3>Cookies and Web Beacons</h3>
                <p>We use third-party services, specifically Google AdSense, to serve ads. Google uses cookies to serve ads based on your prior visits to our website or other websites.</p>
                <p>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.</p>
                <p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Google Ads Settings</a>.</p>

                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve our services.</li>
                    <li>Generate your personalized "Vibe Check" tests.</li>
                </ul>

                <h2>4. Advertising and Cookies</h2>
                <p><strong>Google AdSense:</strong> We use Google AdSense to serve advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites.</p>
                <p>Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.</p>
                <p><strong>Your Choices:</strong> You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Google Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>www.aboutads.info</a>.</p>
                <p>For more information on how Google uses data when you use our partners' sites or apps, please visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>How Google uses data when you use our partners' sites or apps</a>.</p>

                <h2>5. Data Retention</h2>
                <p>Test data (names and answers) is stored securely to allow your friends to play. We do not sell your personal data to third parties.</p>

                <h2>5. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us.</p>
            </div>
        </>
    );
};

export default PrivacyPolicy;
