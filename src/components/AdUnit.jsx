import React from 'react';
import './AdUnit.css';

const AdUnit = ({ slot, format = 'horizontal', label = 'Advertisement' }) => {
    return (
        <div className={`ad-unit-container ad-${format}`}>
            <div className="ad-placeholder glass-panel">
                <span className="ad-label">{label}</span>
                <div className="ad-dimensions">
                    {format === 'horizontal' ? 'Banner Ad Space' : 'Square Ad Space'}
                </div>
                {/* Actual ad script would go here */}
            </div>
        </div>
    );
};

export default AdUnit;
