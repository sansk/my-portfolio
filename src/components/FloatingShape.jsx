import React from 'react';
import { motion } from 'framer-motion';

const FloatingShape = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating geometric shapes using CSS */}
            <motion.div
                className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-full blur-xl"
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-lg"
                animate={{
                    y: [0, 30, 0],
                    x: [0, -15, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <motion.div
                className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-lg"
                animate={{
                    y: [0, -25, 0],
                    x: [0, 20, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl blur-2xl"
                animate={{
                    y: [0, 40, 0],
                    x: [0, -20, 0],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
};

export default FloatingShape;
