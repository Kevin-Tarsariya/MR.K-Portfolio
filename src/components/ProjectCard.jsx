import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import TiltCard from './TiltCard';

const ProjectCard = ({ project, index, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = '/mr-k-portfolio.vercel.app_.png';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="h-full"
    >
      <TiltCard
        maxTilt={6}
        onClick={onClick}
        className="glass-card-strong rounded-2xl overflow-hidden group cursor-pointer border border-white/10 hover:border-primary/40 transition-all duration-300 h-full flex flex-col justify-between shadow-xl shadow-black/40"
      >
        <div>
          {/* Project Preview Image */}
          <div className="relative overflow-hidden h-48 sm:h-52 bg-dark-300/60">
            <img
              src={imageError ? fallbackImage : project.image}
              alt={project.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Gradient shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-200 via-transparent to-black/25 pointer-events-none" />

            {/* Category badge */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="px-3 py-1 rounded-full bg-dark/80 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-md">
                {project.category}
              </span>
            </div>

            {/* Quick action buttons on preview */}
            <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {project.live && project.live !== '#' && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-xl bg-primary/90 text-white hover:bg-primary backdrop-blur-md shadow-lg transition-transform hover:scale-110 cursor-pointer"
                  aria-label="Open live demo"
                  title="Live Demo"
                >
                  <FaExternalLinkAlt size={12} />
                </a>
              )}
              {project.github?.frontend && project.github.frontend !== '#' && project.github.frontend !== '/' && (
                <a
                  href={project.github.frontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-xl bg-dark/90 text-white hover:bg-dark border border-white/20 backdrop-blur-md shadow-lg transition-transform hover:scale-110 cursor-pointer"
                  aria-label="View frontend code"
                  title="Source Code"
                >
                  <FaGithub size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="p-5 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 group-hover:text-primary-light transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed font-normal">
              {project.description}
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.04] border border-white/10 text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-primary/10 border border-primary/20 text-primary-light">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer with Details Prompt */}
        <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-primary-light transition-colors">
          <span className="font-medium">View Project Details</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default ProjectCard;