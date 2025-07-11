import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Github, BookOpen, ExternalLink } from 'lucide-react';

const BlogSection = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'Getting Started with React 18',
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop',
            date: '2024-01-15',
            link: '#'
        },
        {
            id: 2,
            title: 'Building Scalable APIs',
            image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop',
            date: '2024-01-10',
            link: '#'
        },
        {
            id: 3,
            title: 'CSS Grid vs Flexbox',
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop',
            date: '2024-01-05',
            link: '#'
        },
        {
            id: 4,
            title: 'TypeScript Advanced Types',
            image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=250&fit=crop',
            date: '2024-01-01',
            link: '#'
        },
        {
            id: 5,
            title: 'Performance Optimization',
            image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop',
            date: '2023-12-28',
            link: '#'
        },
        {
            id: 6,
            title: 'State Management Solutions',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
            date: '2023-12-25',
            link: '#'
        }
    ];

    return (
        <section className="min-h-screen flex items-center justify-center py-20 gradient-bg scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                        Latest Blog Posts
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 50, rotateY: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5, rotateY: 5, scale: 1.02 }}
                            className="group relative glass-card rounded-xl overflow-hidden hover-glow cursor-pointer"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Blog Image */}
                            <div className="relative overflow-hidden">
                                <motion.img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Read More Button Overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
                                    >
                                        <ExternalLink className="w-6 h-6 text-white" />
                                    </motion.button>
                                </motion.div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-6">
                                <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <time>{new Date(post.date).toLocaleDateString()}</time>
                                </div>

                                <h3 className="text-lg font-bold text-gradient group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Visit My Blog Button */}
                <div className="mt-12 flex justify-center">
                    <motion.a
                        href="https://blog.sangeetha-k.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300 text-lg hover-glow text-primary-foreground border-2 border-primary bg-[hsl(var(--primary))]"
                    >
                        <BookOpen className="w-5 h-5 mr-2" />
                        <span>Read My Blog</span>
                        <span className="ml-2">→</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
