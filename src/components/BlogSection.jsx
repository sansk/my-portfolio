import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Github, BookOpen, ExternalLink } from 'lucide-react';

const HASHNODE_PUBLICATION_ID = import.meta.env.VITE_HASHNODE_PUBLICATION_ID;

async function fetchHashnodePosts(publicationId) {
    const query = `
      query Publication($id: ObjectId!) {
        publication(id: $id) {
          posts(first: 6) {
            edges {
              node {
                cuid
                title
                brief
                slug
                coverImage {
                  url
                }
                publishedAt
                url
              }
            }
          }
        }
      }
    `;
    const response = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { id: publicationId } })
    });
    const { data } = await response.json();
    return data?.publication?.posts?.edges?.map(edge => edge.node) || [];
}

const BlogSection = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHashnodePosts(HASHNODE_PUBLICATION_ID)
            .then(posts => {
                setBlogPosts(posts);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load blog posts.');
                setLoading(false);
            });
    }, []);

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

                {loading ? (
                    <div className="text-center text-lg text-muted-foreground py-12">Loading blog posts...</div>
                ) : error ? (
                    <div className="text-center text-lg text-red-500 py-12">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.cuid || post.slug || post.url || index}
                                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, rotateY: 5, scale: 1.02 }}
                                className="group relative glass-card rounded-xl overflow-hidden hover-glow cursor-pointer flex flex-col"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Blog Image */}
                                <div className="relative overflow-hidden">
                                    <motion.img
                                        src={post.coverImage?.url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop'}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                {/* Blog Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-gradient group-hover:text-primary transition-colors text-center">
                                        {post.title}
                                    </h3>
                                    <div className="mt-auto flex items-center text-sm text-muted-foreground justify-between pt-4">
                                        <span className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
                                        </span>
                                        <a
                                            href={post.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 hover:bg-primary/20 transition-colors ml-2"
                                        >
                                            Read
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}

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
