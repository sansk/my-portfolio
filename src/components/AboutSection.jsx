import React from "react";
import { motion } from "framer-motion";
import PlaceholderImg from "../images/placeholder.svg";
import MyImage from "../images/Profile-2.jpg";

const AboutSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.04,
                rotate: -2,
                boxShadow: "0 8px 32px rgba(59,130,246,0.18)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary to-blue-500 rounded-2xl transform rotate-6"
                animate={{ rotate: [6, 9, 6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
              <img
                src={MyImage || PlaceholderImg}
                alt="About Sangeetha"
                className="relative w-80 h-96 rounded-2xl object-cover shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mr-0 lg:mr-20"
          >
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-gradient"
              >
                About Me
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4 text-lg text-muted-foreground"
              >
                <p>
                  I’m a passionate Full-Stack Developer with 8+ years of
                  experience and a strong focus on front-end engineering for the
                  past 4+ years. I specialize in creating scalable,
                  production-grade applications using JavaScript (ES6+),
                  React.js, Node.js, and PostgreSQL.
                </p>
                <p>
                  My journey in tech began with a curiosity for how things work,
                  which evolved into a love for building solutions. Specializing
                  in modern web technologies, I focus on creating scalable,
                  user-friendly applications that solve real-world problems.
                </p>
                <p>
                  When I’m not coding, you’ll find me creating content and
                  sharing knowledge, and exploring new tech trends to stay ahead
                  in this ever-evolving field.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
