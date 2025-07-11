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
        useRef(null), // HeroSection
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
            ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Scrollspy: update currentSection based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const offsets = sectionRefs.map(ref => ref.current?.getBoundingClientRect().top ?? Infinity);
            const threshold = 120; // px from top
            const activeIndex = offsets.findIndex((offset, i) => {
                if (i === offsets.length - 1) return true;
                return offset >= -threshold && offset < (offsets[i + 1] ?? Infinity);
            });
            setCurrentSection(activeIndex === -1 ? 0 : activeIndex);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionRefs]);

    return (
        <ThemeProvider>
            <div className="relative min-h-screen overflow-hidden">
                <ParticleBackground />
                <Header currentSection={currentSection} onNavigate={handleNavigate} />
                <SocialSidebar />

                <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:pl-20 space-y-24">
                    <div ref={sectionRefs[0]}><HeroSection /></div>
                    <div ref={sectionRefs[1]}><AboutSection /></div>
                    <div ref={sectionRefs[2]}><SkillsSection /></div>
                    <div ref={sectionRefs[3]}><ProjectsSection /></div>
                    <div ref={sectionRefs[4]}><BlogSection /></div>
                    <div ref={sectionRefs[5]}><ContactSection /></div>
                </main>
            </div>
        </ThemeProvider>
    );
};

export default Index;