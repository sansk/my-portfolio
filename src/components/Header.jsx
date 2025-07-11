import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Github, Linkedin, Instagram } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Header = ({ currentSection = 0, onNavigate }) => {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRefs = useRef([]);
    const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });

    const menuItems = [
        { name: 'Home', index: 0 },
        { name: 'About Me', index: 1 },
        { name: 'Skills', index: 2 },
        { name: 'Projects', index: 3 },
        { name: 'Blog', index: 4 },
        { name: 'Contact', index: 5 },
    ];

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/sangeetha-k', icon: Github },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/sangeetha-k', icon: Linkedin },
        { name: 'Instagram', url: 'https://instagram.com/sangeetha.k', icon: Instagram },
    ];

    useLayoutEffect(() => {
        const el = menuRefs.current[currentSection];
        if (el) {
            const { left, width } = el.getBoundingClientRect();
            const parentLeft = el.parentElement.getBoundingClientRect().left;
            setHighlightStyle({ left: left - parentLeft, width });
        }
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
                        className="text-xl font-bold text-gradient"
                    >
                        SK
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <div className="relative flex items-center space-x-6">
                            {menuItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    ref={el => menuRefs.current[index] = el}
                                    onClick={() => handleMenuClick(index)}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${currentSection === index ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                </motion.button>
                            ))}
                            {/* Highlight bar */}
                            <motion.div
                                className="absolute bottom-0 h-0.5 bg-primary rounded-full"
                                style={highlightStyle}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </div>
                    </nav>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        {/* Theme toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-accent transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
                        className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {menuItems.map((item, index) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleMenuClick(index)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentSection === index ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;