import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchComments, postComment, likeComment } from '../services/commentsService';
import { useNavigate, Link } from 'react-router-dom';
import { FaRocket, FaPalette, FaLock, FaBolt, FaMobileAlt } from 'react-icons/fa';
import AdUnit from '../components/AdUnit';
import './Home.css';

function Home() {
  const { t } = useTranslation(); // Hook for translations
  const videoRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [likedCommentIds, setLikedCommentIds] = useState(new Set());

  // Force video playback for iOS
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
        // Fallback: show controls if autoplay fails
        // videoRef.current.controls = true; 
      });
    }
  }, []);

  useEffect(() => {
    loadComments();
    // Load liked comments from local storage
    const storedLikes = JSON.parse(localStorage.getItem('likedComments') || '[]');
    setLikedCommentIds(new Set(storedLikes));
  }, []);

  const loadComments = async () => {
    const data = await fetchComments();
    console.log("Fetched comments:", data); // Debugging
    setComments(data);
  };

  const handleLike = async (commentId) => {
    if (likedCommentIds.has(commentId)) return; // Prevent double like

    // Optimistic UI update
    setComments(comments.map(c =>
      c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c
    ));

    // Update Local State & Storage
    const newLikedIds = new Set(likedCommentIds);
    newLikedIds.add(commentId);
    setLikedCommentIds(newLikedIds);
    localStorage.setItem('likedComments', JSON.stringify([...newLikedIds]));

    // API call
    const success = await likeComment(commentId);
    if (!success) {
      // Revert if needed
    }
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    const savedComment = await postComment(newComment, username);
    if (savedComment) {
      setComments([savedComment, ...comments]);
      setNewComment('');
    }
    setIsSubmitting(false);
  };

  return (
    <main className="home-container animate-fade-in">
      <div className="hero-section">
        <div className="hero-content">
          <span className="badge-new">{t('home.trending')}</span>
          <h1 className="title-gradient">
            {t('home.hero_title_1')}<br />
            <span className="text-highlight">{t('home.hero_title_2')}</span> <span style={{ WebkitTextFillColor: 'initial', textShadow: 'none' }}>🤔</span>
          </h1>
          <p className="subtitle">
            {t('home.hero_subtitle')}
          </p>

          <div className="action-buttons">
            <Link to="/play" className="btn btn-primary pulse-on-hover">
              {t('home.play_now')}
            </Link>
            <Link to="/create" className="btn btn-secondary glass-hover">
              {t('home.create_quiz')}
            </Link>
          </div>
        </div>

        <div className="hero-visual animate-float">
          <div className="glass-card visual-card">
            <video
              ref={videoRef}
              src="/detective_video.mp4"
              className="visual-card-bg"
              autoPlay
              loop
              muted
              playsInline
              webkit-playsinline="true" /* Explicit IOS support */
            />
            <div className="card-info">
              <h3>{t('home.visual_card_title')}</h3>
              <p>{t('home.visual_card_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Space - High Visibility */}
      <div style={{ margin: '2rem auto', maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
        <AdUnit />
      </div>

      <div className="features-grid">
        <div className="feature-card glass-panel">
          <FaRocket className="feature-icon" style={{ color: '#f59e0b' }} />
          <h3>{t('home.feature_fast')}</h3>
          <p>{t('home.feature_fast_desc')}</p>
        </div>
        <div className="feature-card glass-panel">
          <FaPalette className="feature-icon" style={{ color: '#d946ef' }} />
          <h3>{t('home.feature_custom')}</h3>
          <p>{t('home.feature_custom_desc')}</p>
        </div>
        <div className="feature-card glass-panel">
          <FaLock className="feature-icon" style={{ color: '#10b981' }} />
          <h3>{t('home.feature_private')}</h3>
          <p>{t('home.feature_private_desc')}</p>
        </div>
      </div>

      <div className="content-section glass-panel">
        <h2 className="section-title">{t('home.how_it_works')}</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>{t('home.step_1_title')}</h3>
            <p>{t('home.step_1_desc')}</p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h3>{t('home.step_2_title')}</h3>
            <p>{t('home.step_2_desc')}</p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h3>{t('home.step_3_title')}</h3>
            <p>{t('home.step_3_desc')}</p>
          </div>
        </div>
      </div>

      {/* Ad Space Mid-Page */}
      <div style={{ margin: '2rem auto', maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
        <AdUnit />
      </div>

      <div className="content-section glass-panel" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">{t('home.story_title')}</h2>
        <div className="story-container">
          <p>
            {t('home.story_p1')}
          </p>
          <p>
            <strong>Social 2.0</strong> {t('home.story_p2')}
          </p>
          <p>
            {t('home.story_p3')}
          </p>
          <p className="story-footer">
            {t('home.story_footer')}
          </p>
        </div>
      </div>

      <div className="content-section glass-panel" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">{t('home.why_choose')}</h2>
        <div className="features-detailed">
          <div className="detail-item">
            <h3><FaLock style={{ color: '#10b981', marginRight: '8px', verticalAlign: 'middle' }} /> {t('home.detail_privacy')}</h3>
            <p>{t('home.detail_privacy_desc')}</p>
          </div>
          <div className="detail-item">
            <h3><FaPalette style={{ color: '#d946ef', marginRight: '8px', verticalAlign: 'middle' }} /> {t('home.detail_custom')}</h3>
            <p>{t('home.detail_custom_desc')}</p>
          </div>
          <div className="detail-item">
            <h3><FaBolt style={{ color: '#eab308', marginRight: '8px', verticalAlign: 'middle' }} /> {t('home.detail_feedback')}</h3>
            <p>{t('home.detail_feedback_desc')}</p>
          </div>
          <div className="detail-item">
            <h3><FaMobileAlt style={{ color: '#3b82f6', marginRight: '8px', verticalAlign: 'middle' }} /> {t('home.detail_cross')}</h3>
            <p>{t('home.detail_cross_desc')}</p>
          </div>
        </div>
      </div>

      <div className="content-section glass-panel" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">{t('home.community_vibes')}</h2>

        {/* Comment Form */}
        <div className="comment-form-container">
          <h3>{t('home.leave_vibe')}</h3>
          <form className="comment-form" onSubmit={handlePostComment}>
            <input
              type="text"
              placeholder={t('home.your_name')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="comment-input"
              required
            />
            <textarea
              placeholder={t('home.share_exp')}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-textarea"
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? t('home.posting') : t('home.post_vibe')}
            </button>
          </form>
        </div>

        {/* Dynamic Comments List */}
        <div className="comments-feed-container">
          <div className="comments-feed">
            {comments.length === 0 ? (
              <p style={{ textAlign: 'center', width: '100%', color: '#94a3b8' }}>{t('home.be_first')}</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment-bubble animate-fade-in">
                  <div className="comment-header">
                    <span className="comment-author">{comment.username}</span>
                    <span className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                  <div className="comment-actions">
                    <button
                      className={`btn-like ${likedCommentIds.has(comment.id) ? 'liked' : ''}`}
                      onClick={() => handleLike(comment.id)}
                      disabled={likedCommentIds.has(comment.id)}
                    >
                      {likedCommentIds.has(comment.id) ? '❤️' : '🤍'} <span className="like-count">{comment.likes || 0}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="content-section glass-panel" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">{t('home.faq_title')}</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>{t('home.faq_1_q')}</h3>
            <p>{t('home.faq_1_a')}</p>
          </div>
          <div className="faq-item">
            <h3>{t('home.faq_2_q')}</h3>
            <p>{t('home.faq_2_a')}</p>
          </div>
          <div className="faq-item">
            <h3>{t('home.faq_3_q')}</h3>
            <p>{t('home.faq_3_a')}</p>
          </div>
        </div>
      </div>

      {/* Ad Space Bottom */}
      <div style={{ margin: '2rem auto', maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
        <AdUnit />
      </div>

    </main >
  );
}

export default Home;
