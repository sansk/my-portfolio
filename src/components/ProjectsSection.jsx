import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Star, GitBranch } from "lucide-react";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
  const TOPIC_FILTER = import.meta.env.VITE_GITHUB_TOPIC;

  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  const fetchGitHubProjects = async () => {
    try {
      setLoading(true);

      // Method: Using GitHub Search API (no authentication required)
      const query = `user:${GITHUB_USERNAME} topic:${TOPIC_FILTER}`;
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          query
        )}&sort=updated&order=desc&per_page=6`
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        console.log(data.items);
        const formattedProjects = data.items.map((repo) => ({
          id: repo.name,
          title: repo.name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          description: repo.description || "No description available",
          image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
          github: repo.html_url,
          live: repo.homepage,
          techStack: (repo.topics || [])
            .filter(
              (topic) => topic.toLowerCase() !== TOPIC_FILTER?.toLowerCase()
            )
            .map((topic) =>
              topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
            ),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
          topics: repo.topics || [],
        }));

        setProjects(formattedProjects);
      } else {
        // If no repos found with the topic, try without topic filter
        console.log(
          `No repositories found with topic "${TOPIC_FILTER}". Trying without topic filter...`
        );
        await fetchGitHubProjectsWithoutTopic();
      }
    } catch (err) {
      console.error("Error fetching GitHub projects:", err);
      setError("Failed to load projects from GitHub.");
      // Fallback to static projects
      setProjects(getFallbackProjects());
    } finally {
      setLoading(false);
    }
  };

  const fetchGitHubProjectsWithoutTopic = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const repos = await response.json();

      const formattedProjects = repos
        .filter((repo) => !repo.private && !repo.fork) // Only public, non-forked repos
        .slice(0, 6)
        .map((repo) => ({
          id: repo.name,
          title: repo.name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          description: repo.description || "No description available",
          image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
          github: repo.html_url,
          live: repo.homepage,
          techStack: (repo.topics || [])
            .filter(
              (topic) => topic.toLowerCase() !== TOPIC_FILTER?.toLowerCase()
            )
            .map((topic) =>
              topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
            ),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
          topics: repo.topics || [],
        }));

      setProjects(formattedProjects);
    } catch (err) {
      console.error("Error fetching GitHub projects without topic:", err);
      setProjects(getFallbackProjects());
    }
  };

  const getFallbackProjects = () => [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with modern UI",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      github: "https://github.com/sangeetha-k/ecommerce",
      live: "https://ecommerce-demo.com",
      techStack: ["React", "Node.js", "MongoDB", "Stripe"],
      stars: 15,
      forks: 3,
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Real-time task management with collaborative features",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      github: "https://github.com/sangeetha-k/taskapp",
      live: "https://taskapp-demo.com",
      techStack: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
      stars: 8,
      forks: 2,
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with real-time data",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      github: "https://github.com/sangeetha-k/weather",
      live: "https://weather-demo.com",
      techStack: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
      stars: 12,
      forks: 4,
    },
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

        {loading ? (
          <div className="text-center text-lg text-muted-foreground py-12">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span>Loading projects from GitHub...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-lg text-red-500 py-12">{error}</div>
        ) : (
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
                style={{ transformStyle: "preserve-3d" }}
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

                    {project.live && (
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
                    )}
                  </motion.div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gradient">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* GitHub Stats
                                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="flex items-center">
                                                <Star className="w-3 h-3 mr-1" />
                                                {project.stars || 0}
                                            </span>
                                            <span className="flex items-center">
                                                <GitBranch className="w-3 h-3 mr-1" />
                                                {project.forks || 0}
                                            </span>
                                        </div>
                                        <span className="flex items-center">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {new Date(project.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div> */}

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
        )}

        {/* Visit GitHub Button */}
        <div className="mt-12 flex justify-center">
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
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
            <span>View My Github</span>
            <span className="ml-2">→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
