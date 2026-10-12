import React, { useState } from 'react';
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
    <SectionWrapper id="projects" className="relative overflow-hidden py-24">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] bg-accent-cyan/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-custom relative z-10">
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
        <div className="flex justify-center items-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="flex flex-col items-center gap-3 mt-12">
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2.5 rounded-xl border transition-all text-sm ${
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
                    className={`w-9 h-9 rounded-xl font-medium text-xs transition-all cursor-pointer ${
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
                className={`p-2.5 rounded-xl border transition-all text-sm ${
                  currentPage === totalPages
                    ? 'text-gray-600 border-white/5 cursor-not-allowed'
                    : 'text-white bg-dark-200/80 hover:bg-primary/20 border-white/10 hover:border-primary/40 cursor-pointer'
                }`}
                aria-label="Next page"
              >
                Next →
              </button>
            </div>
            <p className="text-xs text-gray-400">
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-dark-100/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header Preview */}
        <div className="relative h-60 sm:h-72 w-full bg-dark-200 overflow-hidden shrink-0">
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
          <div className="absolute inset-0 bg-gradient-to-t from-dark-100 via-dark-100/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-dark/80 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-md transition-all cursor-pointer z-10"
            aria-label="Close modal"
          >
            <FaTimes size={16} />
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-6">
            <span className="px-3.5 py-1 rounded-full bg-primary/30 border border-primary/40 backdrop-blur-md text-xs font-semibold text-white">
              {project.category}
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3 flex items-center gap-2">
              <FaLayerGroup className="text-primary-light" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-medium text-gray-200"
                >
                  <FaCheckCircle className="text-accent-cyan w-3 h-3" />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap gap-3">
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm py-3 px-6 flex items-center gap-2"
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
                className="btn-secondary text-sm py-3 px-6 flex items-center gap-2 bg-white/[0.04]"
              >
                <FaGithub size={16} />
                <span>Frontend Repo</span>
              </a>
            )}
            {project.github?.backend && project.github.backend !== '#' && (
              <a
                href={project.github.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-3 px-6 flex items-center gap-2 bg-white/[0.04]"
              >
                <FaGithub size={16} />
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