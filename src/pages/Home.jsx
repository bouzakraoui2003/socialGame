import React, { useState, useEffect } from 'react';
import { fetchComments, postComment, likeComment } from '../services/commentsService';
import { useNavigate, Link } from 'react-router-dom';
import { FaRocket, FaPalette, FaLock, FaBolt, FaMobileAlt } from 'react-icons/fa';
import AdUnit from '../components/AdUnit';
import './Home.css';

function Home() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [likedCommentIds, setLikedCommentIds] = useState(new Set());

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
          <span className="badge-new">🔥 Trending Now</span>
          <h1 className="title-gradient">
            Do They Really<br />
            <span className="text-highlight">Know You?</span> <span style={{ WebkitTextFillColor: 'initial', textShadow: 'none' }}>🤔</span>
          </h1>
          <p className="subtitle">
            Create custom quizzes, challenge your friends, and unlock your true social potential in a stunning new dimension.
          </p>

          <div className="action-buttons">
            <Link to="/play" className="btn btn-primary pulse-on-hover">
              Play Now
            </Link>
            <Link to="/create" className="btn btn-secondary glass-hover">
              Create Quiz
            </Link>
          </div>
        </div>

        <div className="hero-visual animate-float">
          <div className="glass-card visual-card">
            <video
              src="/detective_video.mp4"
              className="visual-card-bg"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="card-info">
              <h3>Guess someone</h3>
              <p>will get 20/20 huh</p>
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
          <h3>Fast</h3>
          <p>Instant results and real-time sharing.</p>
        </div>
        <div className="feature-card glass-panel">
          <FaPalette className="feature-icon" style={{ color: '#d946ef' }} />
          <h3>Custom</h3>
          <p>Design your own tests with unique styles.</p>
        </div>
        <div className="feature-card glass-panel">
          <FaLock className="feature-icon" style={{ color: '#10b981' }} />
          <h3>Private</h3>
          <p>Your data is yours. Secure and ephemeral.</p>
        </div>
      </div>

      <div className="content-section glass-panel">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>Create Your Quiz</h3>
            <p>Choose from our templates or build your own custom "Vibe Check" to test your friends.</p>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <h3>Share the Link</h3>
            <p>Send your unique quiz link to friends, family, or followers on social media.</p>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <h3>See Results</h3>
            <p>Watch the answers roll in and discover who really knows you best!</p>
          </div>
        </div>
      </div>

      {/* Ad Space Mid-Page */}
      <div style={{ margin: '2rem auto', maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
        <AdUnit />
      </div>

      <div className="content-section glass-panel" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">The Vibe Check Revolution</h2>
        <div className="story-container">
          <p>
            In an era where social connection often feels like a metric—likes, views, follows—we wanted to bring back the mystery and fun of genuinely knowing someone.
          </p>
          <p>
            <strong>Social 2.0</strong> wasn't built just to be another app; it was created to be a mirror. A way to ask the questions you might be too shy to ask in person, and to discover who in your circle truly understands your vibe.
          </p>
          <p>
            We believe friendship isn't about how many people follow you, but how well a few people know you. That's why we gamified the "Vibe Check". It's not just a test; it's a celebration of the unique bond you share with your friends.
          </p>
          <p className="story-footer">
            So go ahead. Create your test. Share your link. And find out: <em>Do they really know you?</em>
          </p>
        </div>
      </div>

      <div className="content-section glass-panel" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">Why Choose Social 2.0?</h2>
        <div className="features-detailed">
          <div className="detail-item">
            <h3><FaLock style={{ color: '#10b981', marginRight: '8px', verticalAlign: 'middle' }} /> Privacy First</h3>
            <p>We don't ask for your email, phone number, or firstborn child. Your quizzes are ephemeral and your data stays yours.</p>
          </div>
          <div className="detail-item">
            <h3><FaPalette style={{ color: '#d946ef', marginRight: '8px', verticalAlign: 'middle' }} /> Limitless Customization</h3>
            <p>From neon aesthetics to dark mode vibes, our design engine lets you create a test that actually looks like <em>you</em>.</p>
          </div>
          <div className="detail-item">
            <h3><FaBolt style={{ color: '#eab308', marginRight: '8px', verticalAlign: 'middle' }} /> Instant Feedback</h3>
            <p>No waiting for results. Watch live as your friends take the test and see who tops the leaderboard in real-time.</p>
          </div>
          <div className="detail-item">
            <h3><FaMobileAlt style={{ color: '#3b82f6', marginRight: '8px', verticalAlign: 'middle' }} /> Cross-Platform Magic</h3>
            <p>Works perfectly on Instagram stories, TikTok bio links, WhatsApp groups, and Discord servers. One link, everywhere.</p>
          </div>
        </div>
      </div>

      <div className="content-section glass-panel" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">Community Vibes</h2>

        {/* Comment Form */}
        <div className="comment-form-container">
          <h3>Leave a Vibe</h3>
          <form className="comment-form" onSubmit={handlePostComment}>
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="comment-input"
              required
            />
            <textarea
              placeholder="Share your experience..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-textarea"
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Vibe'}
            </button>
          </form>
        </div>

        {/* Dynamic Comments List */}
        <div className="comments-feed-container">
          <div className="comments-feed">
            {comments.length === 0 ? (
              <p style={{ textAlign: 'center', width: '100%', color: '#94a3b8' }}>Be the first to share your vibe!</p>
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
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>Is Social 2.0 free to use?</h3>
            <p>Yes! Creating and playing quizzes is 100% free. We are supported by ads.</p>
          </div>
          <div className="faq-item">
            <h3>Do I need an account?</h3>
            <p>No account is required to create or play a test. We believe in privacy and simplicity.</p>
          </div>
          <div className="faq-item">
            <h3>How do I delete my data?</h3>
            <p>Test data is automatically archived. You can also contact us to request immediate deletion.</p>
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
