// Share Page
// Displays the shareable link after test creation

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTest } from '../utils/storage';
import './Share.css';

const Share = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [creatorName, setCreatorName] = useState('');
  const [copiedSection, setCopiedSection] = useState(null); // 'main', 'manual', 'results'

  useEffect(() => {
    const fetchTestData = async () => {
      const testData = await getTest(testId);
      if (testData?.creatorName) {
        setCreatorName(testData.creatorName);
      }
    };
    fetchTestData();
  }, [testId]);

  const getShareableLink = () => {
    return `${window.location.origin}/play/${testId}`;
  };

  const getResultsLink = () => {
    return `${window.location.origin}/results/${testId}`;
  };

  // Construct the creative message
  const shareMessage = `Your friend ${creatorName || 'creator'} wants to find out how much you know about them! Take the quiz:`;
  const shareableLink = getShareableLink();
  const fullShareText = `${shareMessage} ${shareableLink}`;

  const handleNativeShare = async () => {
    // Combine text and URL for better compatibility with apps like WhatsApp/Telegram
    // which often ignore the 'text' field if 'url' is present.
    const shareData = {
      title: 'How well do you know me?',
      text: fullShareText
      // url: shareableLink // Intentionally omitted to force text-mode sharing
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy FULL message + link
      navigator.clipboard.writeText(fullShareText).then(() => {
        setCopiedSection('main');
        setTimeout(() => setCopiedSection(null), 2000);
      }).catch(() => {
        alert('Could not auto-copy. Please copy the link below.');
      });
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullShareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink).then(() => {
      setCopiedSection('manual');
      setTimeout(() => setCopiedSection(null), 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareableLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedSection('manual');
      setTimeout(() => setCopiedSection(null), 2000);
    });
  };

  const handleCopyResultsLink = () => {
    const link = getResultsLink();
    navigator.clipboard.writeText(link).then(() => {
      setCopiedSection('results');
      setTimeout(() => setCopiedSection(null), 2000);
    });
  };

  const handleCreateNew = () => {
    navigate('/create');
  };

  return (
    <div className="share-container">
      <div className="share-content">
        <div className="share-header">
          <h1><span style={{ WebkitTextFillColor: 'initial', textShadow: 'none' }}>🎉</span> Your Test is Ready!</h1>
          <p>Share this link with your friends and see how well they know you!</p>
        </div>

        <div className="id-container-highlight glass-card">
          <span className="id-label">Test ID:</span>
          <h2 className="test-id-display">{testId}</h2>
        </div>

        {/* Primary Share Action */}
        <div className="share-buttons-group">
          <button
            className={`btn btn-primary btn-large btn-share-main hover-pulse ${copiedSection === 'main' ? 'btn-success' : ''}`}
            onClick={handleNativeShare}
            disabled={copiedSection === 'main'}
          >
            {copiedSection === 'main' ? 'Link & Message Copied! ✅' : '📤 Share Link'}
          </button>
        </div>

        <div className="link-container">
          <div className="link-section">
            <label className="link-label">Or copy link manually:</label>
            <div className="link-box">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="link-input"
              />
              <button
                className={`btn btn-secondary ${copiedSection === 'manual' ? 'btn-success' : ''}`}
                onClick={handleCopyLink}
                disabled={copiedSection === 'manual'}
              >
                {copiedSection === 'manual' ? 'Copied! ✅' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="link-section">
            <label className="link-label">📊 Your results link (save this!):</label>
            <div className="link-box">
              <input
                type="text"
                value={getResultsLink()}
                readOnly
                className="link-input"
              />
              <button
                className={`btn btn-secondary ${copiedSection === 'results' ? 'btn-success' : ''}`}
                onClick={handleCopyResultsLink}
                disabled={copiedSection === 'results'}
              >
                {copiedSection === 'results' ? 'Copied! ✅' : 'Copy Result Link'}
              </button>
            </div>
          </div>
        </div>

        <div className="share-actions">
          <button
            className="btn btn-outline"
            onClick={() => navigate(`/results/${testId}`)}
          >
            View Results 📊
          </button>
          <button className="btn btn-secondary" onClick={handleCreateNew}>
            Create Another Test
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>

        <div className="share-info">
          <p><strong>How it works:</strong></p>
          <ul className="share-instructions">
            <li>📤 Click "Share With Friends" to send the test directly!</li>
            <li>📊 Check the results link to see all player scores</li>
            <li>💾 Save the results link to track the leaderboard!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Share;

