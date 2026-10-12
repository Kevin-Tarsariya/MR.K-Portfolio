import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import { projectsData } from '../Data/projectsData';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaCheckCircle, FaLayerGroup } from 'react-icons/fa';

const PROJECTS_PER_PAGE = 6;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState('All');

  const closeModal = () => setSelectedProject(null);

  // Available categories
  const categories = ['All', 'Web', 'React js'];

  // Filter projects by category
  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <SectionWrapper id="projects" className="relative overflow-hidden py-16 sm:py-24">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-primary/10 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-accent-cyan/10 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            Portfolio
          </div>
          <h2 className="section-title">
            Featured Projects
          </h2>
          <p className="section-subtitle">
            Full-stack web applications, interactive web tools, and production frontends
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-2 mb-10 sm:mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-primary to-accent-cyan text-white shadow-lg shadow-primary/25'
                  : 'bg-dark-200/60 backdrop-blur-md text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {currentProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={idx} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 mt-10 sm:mt-12">
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all text-xs sm:text-sm ${
                  currentPage === 1
                    ? 'text-gray-600 border-white/5 cursor-not-allowed'
                    : 'text-white bg-dark-200/80 hover:bg-primary/20 border-white/10 hover:border-primary/40 cursor-pointer'
                }`}
                aria-label="Previous page"
              >
                ← Prev
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-primary text-white shadow-md shadow-primary/30'
                        : 'text-gray-400 hover:text-white bg-dark-200/60 border border-white/5'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all text-xs sm:text-sm ${
                  currentPage === totalPages
                    ? 'text-gray-600 border-white/5 cursor-not-allowed'
                    : 'text-white bg-dark-200/80 hover:bg-primary/20 border-white/10 hover:border-primary/40 cursor-pointer'
                }`}
                aria-label="Next page"
              >
                Next →
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-400">
              Showing {startIndex + 1}–{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} items
            </p>
          </div>
        )}
      </div>

      {/* Project Detail 3D Glass Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
};

// Project Detail Modal Component
const ProjectDetailModal = ({ project, onClose }) => {
  const [modalImgLoaded, setModalImgLoaded] = useState(false);
  const [modalImgError, setModalImgError] = useState(false);
  const fallbackImage = '/mr-k-portfolio.vercel.app_.png';

  // Prevent background scrolling while modal is open & add ESC key support
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-dark-100/98 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl shadow-primary/25 flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden"
      >
        {/* Sticky Close Button on Mobile / Desktop */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-dark/90 hover:bg-dark text-white border border-white/20 hover:border-white/40 shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer z-30 focus:outline-none"
          aria-label="Close modal"
        >
          <FaTimes size={16} />
        </button>

        {/* Modal Header Preview Image */}
        <div className="relative h-44 sm:h-64 md:h-72 w-full bg-dark-200 overflow-hidden shrink-0">
          {!modalImgLoaded && !modalImgError && (
            <div className="absolute inset-0 bg-dark-300 animate-pulse" />
          )}
          <img
            src={modalImgError ? fallbackImage : project.image}
            alt={project.title}
            onLoad={() => setModalImgLoaded(true)}
            onError={() => setModalImgError(true)}
            className={`w-full h-full object-cover object-top transition-opacity duration-300 ${modalImgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/30 to-transparent pointer-events-none" />

          {/* Category Badge */}
          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 z-10">
            <span className="px-3 py-1 rounded-full bg-primary/30 border border-primary/40 backdrop-blur-md text-[11px] sm:text-xs font-semibold text-white shadow-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight leading-snug">
              {project.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-[11px] sm:text-xs uppercase tracking-wider text-gray-400 font-bold mb-2.5 sm:mb-3 flex items-center gap-2">
              <FaLayerGroup className="text-primary-light" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.05] border border-white/10 text-[11px] sm:text-xs font-medium text-gray-200"
                >
                  <FaCheckCircle className="text-accent-cyan w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs sm:text-sm py-3 px-5 sm:px-6 flex items-center justify-center gap-2 text-center"
              >
                <span>Live Demo</span>
                <FaExternalLinkAlt size={12} />
              </a>
            )}
            {project.github?.frontend && project.github.frontend !== '#' && project.github.frontend !== '/' && (
              <a
                href={project.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs sm:text-sm py-3 px-5 sm:px-6 flex items-center justify-center gap-2 bg-white/[0.04] text-center"
              >
                <FaGithub size={15} />
                <span>Frontend Repo</span>
              </a>
            )}
            {project.github?.backend && project.github.backend !== '#' && (
              <a
                href={project.github.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs sm:text-sm py-3 px-5 sm:px-6 flex items-center justify-center gap-2 bg-white/[0.04] text-center"
              >
                <FaGithub size={15} />
                <span>Backend Repo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;