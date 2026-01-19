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
                <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem', textAlign: 'center' }}>About Social 2.0</h1>

                <p className="lead" style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem', textAlign: 'center', color: '#cbd5e1' }}>
                    We are redefining digital connection through gamified interactions, bringing fun and authenticity back to social media.
                </p>

                <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '2rem 0' }} />

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>Our Story</h2>
                    <p style={{ lineHeight: '1.8', color: '#e2e8f0', marginBottom: '1rem' }}>
                        Social 2.0 was born in 2026 from a simple observation: social media had become too serious. What started as platforms for connecting friends had morphed into spaces for curated perfection and endless scrolling. We missed the early days of the internet—the days of fun surveys, personality tests, and simply hanging out online.
                    </p>
                    <p style={{ lineHeight: '1.8', color: '#e2e8f0' }}>
                        Founded by Bouzakraoui Mohamed, we set out to build a platform that focuses on <strong>active interaction</strong> rather than passive consumption. We believe that asking questions ("Vibe Checks") is a powerful way to deepen relationships and spark conversations that might not happen otherwise.
                    </p>
                </section>

                <section style={{ marginBottom: '2.5rem' }}>
                    <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>Our Mission</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#38bdf8' }}>Authencity Over Algorithms</strong>
                            We don't have a feed. We don't have an algorithm deciding what you see. Your interactions are between you and the friends you share your link with.
                        </li>
                        <li style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#a78bfa' }}>Privacy centered Design</strong>
                            In a data-hungry world, we choose to starve. We don't require emails or phone numbers to play. We believe fun shouldn't come at the cost of your personal data.
                        </li>
                        <li style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                            <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '0.5rem', color: '#f472b6' }}>Aesthetics Matter</strong>
                            We believe that digital tools should be beautiful. We invest heavily in design, animations, and user experience to ensure that every "Vibe Check" feels premium.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ color: '#f8fafc', marginBottom: '1rem' }}>Join the Movement</h2>
                    <p style={{ lineHeight: '1.8', color: '#e2e8f0' }}>
                        Whether you are here to test your best friend, challenge your partner, or just kill some time, we are glad you are here. Social 2.0 is more than just a website; it's a reminder that friendship is supposed to be fun.
                    </p>
                    <p style={{ marginTop: '2rem', fontStyle: 'italic', opacity: 0.8 }}>
                        — The Social 2.0 Team
                    </p>
                </section>
            </div>
        </>
    );
};

export default AboutUs;
