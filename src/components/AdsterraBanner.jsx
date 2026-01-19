import React, { useEffect, useRef, useState } from 'react';

const AD_CONFIGS = {
    '728x90': {
        key: 'd870feab762da27bea5f693ce10f3db6',
        width: 728,
        height: 90
    },
    '468x60': {
        key: '3656fb2519e5cbea6280ac734e5e6610',
        width: 468,
        height: 60
    },
    '300x250': {
        key: 'f698151623930b35927ccbf0e764ee64',
        width: 300,
        height: 250
    },
    '320x50': {
        key: 'e8fdb6d910b4f1648fca48dfa11e2965',
        width: 320,
        height: 50
    }
};

const AdsterraBanner = ({ variant = 'responsive' }) => {
    const bannerRef = useRef(null);
    const [currentConfig, setCurrentConfig] = useState(null);

    // Determine the best ad size based on window width AND variant preference
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let bestConfig = AD_CONFIGS['300x250']; // Default safe fallback

            if (variant === 'rectangle') {
                // Force 300x250 for cards/squares
                bestConfig = AD_CONFIGS['300x250'];
            } else {
                // 'responsive' - Standard horizontal logic
                if (width >= 768) { // PC 
                    bestConfig = AD_CONFIGS['728x90'];
                } else if (width >= 480) { // Tablets
                    bestConfig = AD_CONFIGS['468x60'];
                } else { // Mobile
                    bestConfig = AD_CONFIGS['300x250'];
                }
            }

            // Only update if config changes
            setCurrentConfig(prev => {
                if (!prev || prev.key !== bestConfig.key) {
                    return bestConfig;
                }
                return prev;
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [variant]);

    // Inject the script when config is set
    useEffect(() => {
        if (!currentConfig) return;

        const container = bannerRef.current;
        if (!container) return;

        container.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.style.width = `${currentConfig.width}px`;
        iframe.style.height = `${currentConfig.height}px`;
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.scrolling = 'no';

        container.appendChild(iframe);

        const adScript = `
            <html>
                <head>
                    <style>body { margin: 0; display: flex; justify-content: center; align-items: center; }</style>
                </head>
                <body>
                    <script type="text/javascript">
                        atOptions = {
                            'key' : '${currentConfig.key}',
                            'format' : 'iframe',
                            'height' : ${currentConfig.height},
                            'width' : ${currentConfig.width},
                            'params' : {}
                        };
                    </script>
                    <script type="text/javascript" src="//www.highperformanceformat.com/${currentConfig.key}/invoke.js"></script>
                </body>
            </html>
        `;

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(adScript);
        doc.close();

    }, [currentConfig]);

    if (!currentConfig) return null;

    return (
        <div
            ref={bannerRef}
            className="adsterra-banner-container"
            style={{
                width: '100%',
                minHeight: `${currentConfig.height}px`,
                margin: '10px auto', // Reduced margin
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
            }}
        />
    );
};

export default AdsterraBanner;
