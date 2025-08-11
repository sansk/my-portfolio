import React from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Skill3DIcon from "./Skill3DIcon";
import { skillCategories } from "@/data/skills";
import Star from "./Star";

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center py-20 gradient-bg px-6 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Skills & Expertise
          </h2>
        </motion.div>

        {/* Bento grid for skill category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl glass-card p-8 flex flex-col items-center shadow-lg h-full"
            >
              <h3 className="text-2xl font-bold mb-8 text-gradient text-center">
                {category.title}
              </h3>
              <div className="grid grid-cols-3 gap-6 w-full">
                <TooltipProvider>
                  {category.skills.map((skill, skillIndex) => (
                    <Tooltip key={skill.name}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            delay: skillIndex * 0.08,
                            ease: "easeOut",
                          }}
                          viewport={{ once: true }}
                          className="flex flex-col items-center space-y-2 cursor-pointer group"
                        >
                          <motion.div
                            whileHover={{
                              scale: 1.1,
                              y: -5,
                              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 22,
                              duration: 0.18,
                            }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-16 h-16 flex items-center justify-center">
                              <Skill3DIcon
                                icon={skill.icon}
                                name={skill.name}
                                color={skill.color}
                                size={60}
                                level={skill.level}
                              />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                              {skill.name}
                            </span>
                          </motion.div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-center">
                          <div className="flex justify-center items-center space-x-1">
                            <span className="text-xs text-muted-foreground mr-1">
                              Scale:
                            </span>
                            {[0, 1, 2, 3, 4].map((i) => {
                              const full = i < Math.floor(skill.level);
                              const half =
                                !full &&
                                i < skill.level &&
                                skill.level % 1 !== 0;
                              return (
                                <Star
                                  key={i}
                                  variant={
                                    full ? "full" : half ? "half" : "empty"
                                  }
                                />
                              );
                            })}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
