import React from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '@/data/socials';

const SocialSidebar = () => {

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="fixed left-8 bottom-8 z-50 flex flex-col items-center space-y-6 hidden md:flex"
        >
            {/* Top Line */}
            <div className="w-0.5 h-20 rounded-full" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, hsl(258 90% 66%) 70%, hsl(195 100% 50%) 100%)' }}></div>

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
            <div className="w-0.5 h-20 rounded-full" style={{ background: 'linear-gradient(to top, transparent 0%, transparent 30%, hsl(258 90% 66%) 70%, hsl(195 100% 50%) 100%)' }}></div>
        </motion.div>
    );
};

export default SocialSidebar;
