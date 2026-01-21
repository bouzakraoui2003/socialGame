import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Blog.css'; // We will create this

const Blog = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="blog-page-container fade-in">
            <button
                className="btn btn-secondary"
                onClick={() => navigate('/')}
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

            <header className="blog-header">
                <h1>{t('blog.header_title')}</h1>
                <p>{t('blog.header_subtitle')}</p>
            </header>

            <div className="blog-grid">
                {blogPosts.map((post) => (
                    <Link to={`/blog/${post.id}`} key={post.id} className="blog-card glass-panel">
                        <div className="blog-image-wrapper">
                            <img src={post.imageUrl} alt={t(`blog_posts.${post.id}.title`, post.title)} className="blog-image" loading="lazy" />
                        </div>
                        <div className="blog-content">
                            <div className="blog-meta">
                                <span><FaCalendar size={12} /> {post.date}</span>
                                <span><FaUser size={12} /> {t(`blog_posts.${post.id}.readTime`, post.readTime)}</span>
                            </div>
                            <h2 className="blog-title">{t(`blog_posts.${post.id}.title`, post.title)}</h2>
                            <p className="blog-excerpt">{t(`blog_posts.${post.id}.excerpt`, post.excerpt)}</p>
                            <span className="read-more">{t('blog.read_more')} &rarr;</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blog;
