import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import SKLogo from "../images/SKLogo.svg";
import { socialLinks } from '@/data/socials';

const Header = ({ currentSection = 0, onNavigate }) => {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRefs = useRef([]);
    const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

    const menuItems = [
        { name: 'About Me', index: 0 },
        { name: 'Skills', index: 1 },
        { name: 'Projects', index: 2 },
        { name: 'Blog', index: 3 },
        { name: 'Contact', index: 4 },
    ];



    useLayoutEffect(() => {
        const updateHighlight = () => {
            // Only show highlight when a section is active (not in hero area)
            if (currentSection >= 0) {
                const el = menuRefs.current[currentSection];
                if (el && el.parentElement) {
                    try {
                        const { left, width } = el.getBoundingClientRect();
                        const parentLeft = el.parentElement.getBoundingClientRect().left;
                        setHighlightStyle({ 
                            left: left - parentLeft, 
                            width,
                            opacity: 1 
                        });
                    } catch (error) {
                        console.warn('Error updating highlight:', error);
                    }
                }
            } else {
                // Hide highlight when in hero area
                setHighlightStyle({ 
                    left: 0, 
                    width: 0,
                    opacity: 0 
                });
            }
        };

        // Add a small delay to ensure DOM is ready
        const timer = setTimeout(updateHighlight, 0);
        return () => clearTimeout(timer);
    }, [currentSection, isMobileMenuOpen]);

    const handleMenuClick = (index) => {
        if (onNavigate) onNavigate(index);
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold"
                    >
                        <img src={SKLogo} alt="SK Logo" className="h-10 w-auto" />
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <div className="relative flex items-center space-x-6">
                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    ref={el => menuRefs.current[index] = el}
                                    onClick={() => handleMenuClick(index)}
                                    className={`px-3 py-2 text-base font-medium transition-all duration-200 ${currentSection === index && currentSection >= 0 ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary hover:font-semibold'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                            {/* Highlight bar */}
                            <motion.div
                                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-full shadow-sm"
                                style={highlightStyle}
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ 
                                    opacity: highlightStyle.opacity || 1, 
                                    scaleX: 1,
                                    left: highlightStyle.left,
                                    width: highlightStyle.width
                                }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 300, 
                                    damping: 30,
                                    duration: 0.3
                                }}
                            />
                        </div>
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        {/* Theme toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="relative w-12 h-6 rounded-full p-1 transition-all duration-300"
                            style={{ background: 'linear-gradient(135deg, hsl(258 90% 66%), hsl(195 100% 50%))' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
                                animate={{
                                    x: theme === 'dark' ? 20 : 0
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {theme === 'dark' ? (
                                    <Moon className="w-2.5 h-2.5 text-gray-800" />
                                ) : (
                                    <Sun className="w-2.5 h-2.5 text-yellow-500" />
                                )}
                            </motion.div>
                        </motion.button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-full hover:bg-accent transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-border bg-background/98 backdrop-blur-md"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {menuItems.map((item, index) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleMenuClick(index)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                        currentSection === index && currentSection >= 0
                                            ? 'bg-gradient-to-r from-primary to-blue-500  shadow-md scale-105 font-semibold'
                                            : 'hover:bg-primary hover:scale-105 hover:font-semibold text-foreground'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                            
                            {/* Social Links for Mobile */}
                            <div className="pt-6 border-t border-border mt-4">
                                <div className="flex justify-center space-x-3">
                                    {socialLinks.map((social, index) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.2, y: -5 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-8 h-8 glass-card rounded-full flex items-center justify-center hover-glow transition-all duration-300"
                                            title={social.name}
                                        >
                                            <social.icon className="w-4 h-4" />
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;