import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FloatingShape from './FloatingShape';
import TypewriterText from './TypewriterText';
import ResumePDF from '../cv/Sangeetha-K_Resume.pdf';
import ProfileImg from '../images/Profile.jpg';

// --- Heading Block ---
const HeroHeading = () => (
    <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold leading-relaxed"
    >
        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">Hi There 👋, I am </span>
        <br />
        <span className="text-gradient">Sangeetha K  {" "}</span>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl">aka <span className="text-gradient">SK</span></span>
    </motion.h1>
);

// --- Subtitle Block ---
const HeroSubtitle = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-2xl mx-auto lg:mx-0"
    >
        <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">
            I am a <TypewriterText
                texts={["Javascript Enthusiast", "Pythonista", "Content Creator"]}
                speed={80}
                delay={1500}
            />
        </span>
        <br />
        <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">
            Specialised in <span className="text-gradient">Front-end</span> and <span className="text-gradient">Scripting</span>.
        </span>
    </motion.div>
);

// --- Resume Button Block ---
const ResumeButton = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
    >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <motion.a
                href={ResumePDF}
                download="Sangeetha-K_Resume.pdf"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300 text-lg hover-glow text-primary-foreground border-2 border-primary bg-[hsl(var(--primary))]"
            >
                <Download className="w-5 h-5 mr-2" />
                <span>Resume</span>
            </motion.a>
        </motion.div>
    </motion.div>
);

// --- Main Hero Section ---
const HeroSection = () => {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg">
            {/* Floating 3D Elements */}
            <FloatingShape />
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-32">
                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6 lg:space-y-8 flex flex-col items-start text-left w-full lg:max-w-xl"
                >
                    <HeroHeading />
                    <HeroSubtitle />
                    <ResumeButton />
                </motion.div>
                {/* Right: Profile Image & Floating Icons */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="relative flex justify-center items-center w-full lg:w-auto"
                >
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        {/* Animated Profile Image */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotateY: [0, 8, 0],
                                rotateX: [0, 3, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-blue-500 p-1"
                            style={{
                                transformStyle: 'preserve-3d',
                                perspective: '1000px'
                            }}
                        >
                            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-4">
                                <motion.img
                                    src={ProfileImg}
                                    alt="Sangeetha K."
                                    className="w-full h-full rounded-full object-cover"
                                    animate={{
                                        rotateY: [0, 15, -15, 0],
                                        rotateX: [0, 8, -8, 0],
                                        rotateZ: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 12,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        transform: 'perspective(1000px)'
                                    }}
                                />
                            </div>
                        </motion.div>
                        {/* Floating Icons */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-4 -right-4 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl lg:text-2xl"
                        >
                            ✨
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-lg lg:text-xl"
                        >
                            🚀
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
