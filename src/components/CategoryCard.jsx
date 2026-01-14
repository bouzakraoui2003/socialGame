import React, { useRef, useState } from 'react';
import './CategoryCard.css';

function CategoryCard({ option, onClick, isSelected }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Handle strings (legacy/fallback) or objects (new image format)
  const isObject = typeof option === 'object' && option !== null;
  const text = isObject ? option.text : option;
  const image = isObject ? option.image : null;

  // 3D Tilt Effect Calculation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on cursor position
    // Center is (0,0), range is -15deg to 15deg
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -15; // Invert Y axis for correct tilt
    const rotateYValue = ((x - centerX) / centerX) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      className={`category-card-3d-wrapper ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className="category-card-content glass-card">
        {image ? (
          <div className="card-image-container">
            <img src={image} alt={text} className="card-image" loading="lazy" />
            <div className="image-overlay"></div>
          </div>
        ) : (
          <div className="icon-wrapper">
            {/* Fallback for text-only options if any exist */}
            <span className="emoji">✨</span>
          </div>
        )}

        <h3 className="category-title">{text}</h3>

        {/* Selection Indicator */}
        {isSelected && <div className="selected-badge">✓</div>}

        <div className="glow-effect"></div>
      </div>
    </div>
  );
}

export default CategoryCard;
