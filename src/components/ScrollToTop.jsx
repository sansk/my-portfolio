import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button when scrolled past 50% of viewport height
            const scrolled = window.scrollY;
            const viewportHeight = window.innerHeight;
            setIsVisible(scrolled > viewportHeight * 0.5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[9999] p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover-glow"
                    style={{
                        background: 'linear-gradient(135deg, hsl(258 90% 66%), hsl(195 100% 50%))',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                >
                    <ChevronUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop; 