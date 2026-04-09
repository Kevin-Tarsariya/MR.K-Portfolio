import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="glass-card-strong rounded-2xl overflow-hidden group cursor-pointer"
    >
      <div className="relative overflow-hidden h-44 sm:h-52">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-medium text-white">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <motion.h3
          className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors"
        >
          {project.title}
        </motion.h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span key={i} className="tag text-xs px-2 sm:px-3 py-1">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="tag text-xs px-2 sm:px-3 py-1">+{project.techStack.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;