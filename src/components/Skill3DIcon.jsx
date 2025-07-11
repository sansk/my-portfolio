import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '@/icons';
import './Skill3DIcon.css';

const Skill3DIcon = ({
    icon,
    name,
    color = '#61DAFB',
    size = 60,
    level = 3
}) => {
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
    };

    // Calculate progress percentage (0-100)
    const progressPercentage = (level / 5) * 100;
    const strokeWidth = 3; // Fixed border width
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    if (hasError) {
        // Use local SVG fallback
        const fallbackIcon = getIcon(name);
        return (
            <motion.div
                className="relative flex items-center justify-center rounded-full bg-gradient-to-br from-muted/20 to-muted/40 backdrop-blur-sm shadow-lg"
                style={{
                    width: size,
                    height: size,
                    color: color,
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
            >
                {/* Circular Progress Border */}
                <svg
                    className="absolute inset-0 w-full h-full transform -rotate-90"
                    style={{ width: size, height: size }}
                >
                    {/* Progress circle with solid primary color */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 0.5s ease-in-out',
                            filter: 'drop-shadow(0 0 2px rgba(var(--primary), 0.5))'
                        }}
                    />
                </svg>

                {/* Icon */}
                <div
                    className="relative z-10"
                    dangerouslySetInnerHTML={{ __html: fallbackIcon }}
                />
            </motion.div>
        );
    }

    return (
        <motion.div
            className="relative group cursor-pointer skill-3d-container"
        >
            {/* 3D Container */}
            <motion.div
                className="relative rounded-full skill-3d-icon embossed-icon"
                style={{
                    width: size,
                    height: size
                }}
            >
                {/* Circular Progress Border */}
                <svg
                    className="absolute inset-0 w-full h-full transform -rotate-90 z-10"
                    style={{ width: size, height: size }}
                >
                    {/* Progress circle with solid primary color */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 0.5s ease-in-out',
                            filter: 'drop-shadow(0 0 2px rgba(var(--primary), 0.5))'
                        }}
                    />
                </svg>

                {/* Icon */}
                <motion.img
                    src={icon}
                    alt={name}
                    onError={handleError}
                    className="w-full h-full object-contain p-3 relative z-20"
                    style={{ width: size, height: size }}
                />

                {/* 3D Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full skill-3d-glow"
                    style={{ width: size, height: size }}
                />

                {/* 3D Shadow */}
                <motion.div
                    className="absolute inset-0 rounded-full skill-3d-shadow"
                    style={{ width: size, height: size }}
                />

                {/* 3D Highlight */}
                <motion.div
                    className="absolute inset-0 rounded-full skill-3d-highlight"
                    style={{ width: size, height: size }}
                />
            </motion.div>

            {/* Floating Particles */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ width: size, height: size }}
            >
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/60 rounded-full floating-particle"
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${10 + i * 20}%`,
                        }}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Skill3DIcon; 