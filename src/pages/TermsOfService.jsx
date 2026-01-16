import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const TermsOfService = () => {
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
                <h1>Terms of Service</h1>
                <p>Last updated: January 16, 2026</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using Social 2.0, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

                <h2>2. Description of Service</h2>
                <p>Social 2.0 is an entertainment platform that allows users to create and share personality quizzes ("Vibe Checks") with friends.</p>

                <h2>3. User Conduct</h2>
                <p>You agree not to use the service for any illegal or unauthorized purpose. You are solely responsible for your conduct and any data you submit to the service.</p>

                <h2>4. Intellectual Property</h2>
                <p>The content, design, and functionality of Social 2.0 are owned by us and are protected by international copyright laws.</p>

                <h2>5. Disclaimer of Warranties</h2>
                <p>The service is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation of the service or the information, content, or materials included.</p>

                <h2>6. Limitation of Liability</h2>
                <p>In no event shall Social 2.0 be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our service.</p>
            </div>
        </>
    );
};

export default TermsOfService;
