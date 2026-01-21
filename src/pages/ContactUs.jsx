import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaFacebook, FaTiktok, FaEnvelope, FaMobileAlt, FaArrowLeft } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
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

            <div className="contact-container glass-panel">
                <div className="contact-header">
                    <h1>{t('contact.title')}</h1>
                    <p>
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Social Media Card */}
                    <div className="contact-card">
                        <span className="card-icon"><FaMobileAlt /></span>
                        <h2 className="card-title">{t('contact.social_title')}</h2>
                        <p className="card-desc">{t('contact.social_desc')}</p>

                        <div className="social-links">
                            <a href="https://instagram.com/bzkr_simo" target="_blank" rel="noreferrer" className="social-btn instagram">
                                <FaInstagram size={24} /> Instagram
                            </a>
                            <a href="https://www.facebook.com/people/BE-RL-IN/pfbid02PYBT2aVLSTUk6KU6WJ3y9zGyFg7apbLPiHTvpjEyh2y5BrTWtVF6kNgTQ7GxJBbRl/?locale=fr_FR" target="_blank" rel="noreferrer" className="social-btn facebook">
                                <FaFacebook size={24} /> Facebook
                            </a>
                            <a href="https://www.tiktok.com/@bzkr.simo?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="social-btn tiktok">
                                <FaTiktok size={24} /> TikTok
                            </a>
                        </div>
                    </div>

                    {/* Email Card */}
                    <div className="contact-card">
                        <span className="card-icon"><FaEnvelope /></span>
                        <h2 className="card-title">{t('contact.email_title')}</h2>
                        <p className="card-desc">{t('contact.email_desc')}</p>

                        <div className="social-links">
                            <a href="mailto:simo10bouzakraoui@gmail.com" className="social-btn email">
                                <FaEnvelope size={20} /> simo10bouzakraoui@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
