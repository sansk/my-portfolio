import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, X, Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
// import emailjs from 'emailjs-com';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const { toast } = useToast();

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/sangeetha-k', icon: Github },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/sangeetha-k', icon: Linkedin },
        { name: 'X', url: 'https://x.com/sangeetha_k', icon: X },
        { name: 'Instagram', url: 'https://instagram.com/sangeetha.k', icon: Instagram },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send email using emailjs
        emailjs.send(
            'YOUR_SERVICE_ID', // replace with your EmailJS service ID
            'YOUR_TEMPLATE_ID', // replace with your EmailJS template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
            },
            'YOUR_USER_ID' // replace with your EmailJS user/public key
        )
            .then(() => {
                toast({
                    title: "Message sent!",
                    description: "Thank you for your message. I'll get back to you soon!",
                });
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((error) => {
                toast({
                    title: "Error",
                    description: "There was a problem sending your message. Please try again later.",
                    variant: "destructive",
                });
                console.error('EmailJS error:', error);
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="min-h-screen flex items-center justify-center py-20 gradient-bg px-6 lg:px-24 scroll-mt-24">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8">
                        Let's Work Together
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="glass-card p-8 rounded-2xl"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">Send Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <Textarea
                                    name="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full resize-none"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full hover-glow transition-all duration-300"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Social Icons Box */}
                        <div className="glass-card p-6 rounded-2xl flex flex-col items-center">
                            <div className="flex justify-center space-x-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.2, y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover-glow transition-all duration-300"
                                        title={social.name}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                        {/* Location Box */}
                        <div className="glass-card p-6 rounded-2xl flex items-start justify-start">
                            <MapPin className="w-5 h-5 text-primary mr-2" />
                            <span className="text-base text-foreground">Chennai, India</span>
                        </div>
                        {/* Email Box */}
                        <div className="glass-card p-6 rounded-2xl flex items-start justify-start">
                            <Mail className="w-5 h-5 text-primary mr-2" />
                            <span className="text-base text-foreground">sangeetha@email.com</span>
                        </div>
                        {/* Phone Box */}
                        <div className="glass-card p-6 rounded-2xl flex items-start justify-start">
                            <Phone className="w-5 h-5 text-primary mr-2" />
                            <span className="text-base text-foreground">+91 98765 43210</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
