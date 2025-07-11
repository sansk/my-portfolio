import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
            github: 'https://github.com/sangeetha-k/ecommerce',
            live: 'https://ecommerce-demo.com',
            techStack: ['React', 'Node.js', 'MongoDB', 'Stripe']
        },
        {
            id: 2,
            title: 'Task Management App',
            image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
            github: 'https://github.com/sangeetha-k/taskapp',
            live: 'https://taskapp-demo.com',
            techStack: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io']
        },
        {
            id: 3,
            title: 'Weather Dashboard',
            image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
            github: 'https://github.com/sangeetha-k/weather',
            live: 'https://weather-demo.com',
            techStack: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js']
        },
        {
            id: 4,
            title: 'Social Media App',
            image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop',
            github: 'https://github.com/sangeetha-k/social',
            live: 'https://social-demo.com',
            techStack: ['Next.js', 'Firebase', 'Tailwind', 'Framer Motion']
        },
        {
            id: 5,
            title: 'AI Chat Application',
            image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop',
            github: 'https://github.com/sangeetha-k/ai-chat',
            live: 'https://ai-chat-demo.com',
            techStack: ['React', 'Python', 'FastAPI', 'OpenAI']
        },
        {
            id: 6,
            title: 'Crypto Tracker',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
            github: 'https://github.com/sangeetha-k/crypto',
            live: 'https://crypto-demo.com',
            techStack: ['Angular', 'Node.js', 'Redis', 'CoinGecko API']
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
                        Featured Projects
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50, rotateY: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, rotateY: 5, scale: 1.02 }}
                            className="group relative glass-card rounded-2xl overflow-hidden hover-glow"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Project Image */}
                            <div className="relative overflow-hidden">
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Hover Overlay with Links */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-4"
                                >
                                    <motion.a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
                                    >
                                        <Github className="w-6 h-6 text-white" />
                                    </motion.a>

                                    <motion.a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, rotate: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors"
                                    >
                                        <ExternalLink className="w-6 h-6 text-white" />
                                    </motion.a>
                                </motion.div>
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-4 text-gradient">
                                    {project.title}
                                </h3>

                                {/* Tech Stack Tags */}
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, techIndex) => (
                                        <motion.span
                                            key={tech}
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ scale: 1.1 }}
                                            className="px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full border border-primary/30"
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Visit GitHub Button (matches Blog section style) */}
                <div className="mt-12 flex justify-center">
                    <motion.a
                        href="https://github.com/sangeetha-k"
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
                        <Github className="w-5 h-5 mr-2" />
                        <span>Visit My GitHub</span>
                        <span className="ml-2">→</span>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
