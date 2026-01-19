import React from 'react';
import AdsterraBanner from './AdsterraBanner';
import './AdUnit.css';

const AdUnit = ({ slot, format = 'horizontal', label = 'Advertisement' }) => {
    return (
        <div className={`ad-unit-container ad-${format}`}>
            {/* Show local label for debugging/layout only if needed, or remove */}
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                <span style={{
                    display: 'block',
                    fontSize: '0.7rem',
                    color: '#64748b',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>{label}</span>
                <AdsterraBanner variant={format === 'horizontal' ? 'responsive' : 'rectangle'} />
            </div>
        </div>
    );
};

export default AdUnit;
