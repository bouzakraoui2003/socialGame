import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AboutUs = () => {
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
                <h1>About Us</h1>

                <p>Welcome to <strong>Social 2.0</strong>, the ultimate platform for checking usage vibes and connecting with friends through fun, interactive tests.</p>

                <h2>Our Mission</h2>
                <p>In a world of endless scrolling, we wanted to build something that actually brings people closer together. Social 2.0 is designed to spark conversations, share laughs, and see how well your friends really know you.</p>

                <h2>What We Do</h2>
                <p>We provide a simple, beautifully designed interface for creating personalized quizzes. Whether it's your taste in music, your travel style, or your daily habits, Social 2.0 turns your personality into a game.</p>

                <h2>The Team</h2>
                <p>Social 2.0 was founded in 2026 by Bouzakraoui Mohamed with a vision to make social gaming more aesthetic and engaging.</p>
            </div>
        </>
    );
};

export default AboutUs;
