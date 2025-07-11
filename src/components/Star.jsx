import React from 'react';

const Star = ({ variant, size = 16 }) => {
    if (variant === 'full') {
        return (
            <svg width={size} height={size} viewBox="0 0 20 20" fill="#facc15" className="inline-block">
                <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.1 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36" />
            </svg>
        );
    }
    if (variant === 'half') {
        return (
            <svg width={size} height={size} viewBox="0 0 20 20" className="inline-block">
                <defs>
                    <linearGradient id="half-star" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="50%" stopColor="#facc15" />
                        <stop offset="50%" stopColor="#e5e7eb" />
                    </linearGradient>
                </defs>
                <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.1 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36" fill="url(#half-star)" />
            </svg>
        );
    }
    // empty
    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="#e5e7eb" className="inline-block">
            <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.1 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36" />
        </svg>
    );
};

export default Star; 