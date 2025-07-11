import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import SocialSidebar from '@/components/SocialSidebar';
import ParticleBackground from '@/components/ParticleBackground';
import ThemeProvider from '@/components/ThemeProvider';

const Index = () => {
    // Section refs
    const sectionRefs = [
        useRef(null), // AboutSection
        useRef(null), // SkillsSection
        useRef(null), // ProjectsSection
        useRef(null), // BlogSection
        useRef(null), // ContactSection
    ];
    const [currentSection, setCurrentSection] = useState(0);

    // Scroll to section on menu click
    const handleNavigate = (index) => {
        const ref = sectionRefs[index]?.current;
        if (ref) {
            const headerHeight = 64; // Approximate header height
            const elementTop = ref.offsetTop - headerHeight;
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        }
    };

    // Scrollspy: update currentSection based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Offset for header
            const offsets = sectionRefs.map((ref, index) => {
                const element = ref.current;
                if (!element) return { top: Infinity, index };
                return { top: element.offsetTop, index };
            });
            
            // Find the current section - only activate when actually in a section
            let activeIndex = -1; // -1 means no active section (hero area)
            for (let i = offsets.length - 1; i >= 0; i--) {
                if (scrollPosition >= offsets[i].top) {
                    activeIndex = offsets[i].index;
                    break;
                }
            }
            
            setCurrentSection(activeIndex);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionRefs]);

    return (
        <ThemeProvider>
            <div className="relative min-h-screen overflow-hidden">
                <ParticleBackground />
                <Header currentSection={currentSection} onNavigate={handleNavigate} />
                <SocialSidebar />

                <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:pl-20 space-y-24">
                    <div><HeroSection /></div>
                    <div ref={sectionRefs[0]}><AboutSection /></div>
                    <div ref={sectionRefs[1]}><SkillsSection /></div>
                    <div ref={sectionRefs[2]}><ProjectsSection /></div>
                    <div ref={sectionRefs[3]}><BlogSection /></div>
                    <div ref={sectionRefs[4]}><ContactSection /></div>
                </main>
            </div>
        </ThemeProvider>
    );
};

export default Index;