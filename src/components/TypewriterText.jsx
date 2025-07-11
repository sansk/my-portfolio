import React, { useState, useEffect } from 'react';

const TypewriterText = ({
    texts,
    speed = 100,
    delay = 2000
}) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentCharIndex < texts[currentTextIndex].length) {
                    setCurrentCharIndex(prev => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            } else {
                if (currentCharIndex > 0) {
                    setCurrentCharIndex(prev => prev - 1);
                } else {
                    setIsDeleting(false);
                    setCurrentTextIndex(prev => (prev + 1) % texts.length);
                }
            }
        }, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [currentCharIndex, isDeleting, currentTextIndex, texts, speed, delay]);

    return (
        <span className="text-xl md:text-2xl text-gradient">
            {texts[currentTextIndex].slice(0, currentCharIndex)}
            <span className="animate-pulse text-primary">|</span>
        </span>
    );
};

export default TypewriterText; 