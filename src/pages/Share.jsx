// Share Page
// Displays the shareable link after test creation

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getTest } from '../utils/storage';
import AdUnit from '../components/AdUnit';
import './Share.css';

const Share = () => {
  const { t } = useTranslation();
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
  const shareMessage = `${t('share.message_part1')} ${creatorName || 'creator'} ${t('share.message_part2')}`;
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
          <h1><span style={{ WebkitTextFillColor: 'initial', textShadow: 'none' }}>🎉</span> {t('share.header')}</h1>
          <p>{t('share.subtitle')}</p>
        </div>

        <div className="id-container-highlight glass-card">
          <span className="id-label">{t('share.test_id')}</span>
          <h2 className="test-id-display">{testId}</h2>
        </div>

        {/* Primary Share Action */}
        <div className="share-buttons-group">
          <button
            className={`btn btn-primary btn-large btn-share-main hover-pulse ${copiedSection === 'main' ? 'btn-success' : ''}`}
            onClick={handleNativeShare}
            disabled={copiedSection === 'main'}
          >
            {copiedSection === 'main' ? t('share.btn_copied') : t('share.btn_share')}
          </button>
        </div>

        <div className="link-container">
          <div className="link-section">
            <label className="link-label">{t('share.manual_label')}</label>
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
                {copiedSection === 'manual' ? t('share.btn_copy_done') : t('share.btn_copy')}
              </button>
            </div>
          </div>

          <div className="link-section">
            <label className="link-label">{t('share.results_label')}</label>
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
                {copiedSection === 'results' ? t('share.btn_copy_done') : t('share.btn_copy_results')}
              </button>
            </div>
          </div>
        </div>

        <div className="share-actions">
          <button
            className="btn btn-outline"
            onClick={() => navigate(`/results/${testId}`)}
          >
            {t('share.view_results')}
          </button>
          <button className="btn btn-secondary" onClick={handleCreateNew}>
            {t('share.create_another')}
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            {t('share.home')}
          </button>
        </div>

        <div className="share-info">
          <p><strong>{t('share.how_works')}</strong></p>
          <ul className="share-instructions">
            <li>{t('share.instruction_1')}</li>
            <li>{t('share.instruction_2')}</li>
            <li>{t('share.instruction_3')}</li>
          </ul>
        </div>

        {/* Ad Space */}
        <div style={{ marginTop: '2rem' }}>
          <AdUnit format="square" />
        </div>
      </div>
    </div>
  );
};

export default Share;

