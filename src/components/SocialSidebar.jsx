import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, X, Instagram, Rss, Codepen } from 'lucide-react';

const SocialSidebar = () => {
    const socialLinks = [
        { name: 'Blog', url: 'https://blog.sangeetha-k.dev', icon: Rss },
        { name: 'GitHub', url: 'https://github.com/sangeetha-k', icon: Github },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/sangeetha-k', icon: Linkedin },
        { name: 'CodePen', url: 'https://codepen.io/sangeetha-k', icon: Codepen },
        { name: 'X', url: 'https://x.com/sangeetha_k', icon: X },
        { name: 'Instagram', url: 'https://instagram.com/sangeetha.k', icon: Instagram },
    ];

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden sm:flex flex-col items-center space-y-6"
            style={{ top: '45%' }}
        >
            {/* Top Line */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary"></div>

            {/* Social Icons */}
            <div className="flex flex-col space-y-4">
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.2, rotateZ: 5, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-xl hover-glow transition-all duration-300 group"
                        title={social.name}
                    >
                        {typeof social.icon === 'string' ? (
                            <span className="group-hover:animate-bounce">{social.icon}</span>
                        ) : (
                            <social.icon className="w-5 h-5 group-hover:animate-pulse" />
                        )}
                    </motion.a>
                ))}
            </div>

            {/* Bottom Line */}
            <div className="w-px h-16 bg-gradient-to-t from-transparent to-primary"></div>
        </motion.div>
    );
};

export default SocialSidebar;
