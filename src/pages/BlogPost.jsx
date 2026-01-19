import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import { FaArrowLeft, FaCalendar, FaUser } from 'react-icons/fa';
import AdUnit from '../components/AdUnit';
import './Blog.css';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <div className="blog-not-found">
                <h2>Article not found</h2>
                <button onClick={() => navigate('/blog')} className="btn btn-primary">Back to Blog</button>
            </div>
        );
    }

    return (
        <article className="blog-post-page fade-in">
            <button
                className="btn btn-secondary"
                onClick={() => navigate('/blog')}
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

            <div className="blog-post-container glass-panel">
                <header className="post-header">
                    <div className="post-meta">
                        <span><FaCalendar style={{ marginBottom: -2 }} /> {post.date}</span>
                        <span className="separator">•</span>
                        <span><FaUser style={{ marginBottom: -2 }} /> {post.author}</span>
                    </div>
                    <h1 className="post-title">{post.title}</h1>
                    <img src={post.imageUrl} alt={post.title} className="post-hero-image" />
                </header>

                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                <div className="post-footer">
                    <hr />
                    {/* Insert Ad within article footer */}
                    <div className="post-ad-container">
                        <AdUnit format="square" label="Sponsored" />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
