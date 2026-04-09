import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import { projectsData } from '../Data/projectsData';

const PROJECTS_PER_PAGE = 6;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const closeModal = () => setSelectedProject(null);

  // Pagination calculations
  const totalPages = Math.ceil(projectsData.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = projectsData.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of projects section
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <SectionWrapper id="projects" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 mx-auto w-fit">
            My Work
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="section-title mx-auto">
            Featured Projects
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="section-subtitle">
            A selection of projects that showcase my skills and passion
          </motion.p>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
          <AnimatePresence mode='popLayout'>
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 mt-12"
          >
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <motion.button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                className={`p-3 rounded-xl transition-all ${
                  currentPage === 1
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-white bg-white/10 hover:bg-primary/20 border border-white/10 hover:border-primary/30'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => goToPage(page)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`min-w-[40px] h-10 rounded-xl font-medium text-sm transition-all ${
                      currentPage === page
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                className={`p-3 rounded-xl transition-all ${
                  currentPage === totalPages
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-white bg-white/10 hover:bg-primary/20 border border-white/10 hover:border-primary/30'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            {/* Page Info */}
            <p className="text-sm text-gray-400">
              Showing {startIndex + 1}-{Math.min(endIndex, projectsData.length)} of {projectsData.length} projects
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={closeModal} 
        />
      )}
    </SectionWrapper>
  );
};

// Project Detail Modal Component
const ProjectDetailModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isImageHovered, setIsImageHovered] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'tech', label: 'Tech Stack', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { id: 'links', label: 'Links', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' }
  ];

  // Tech stack colors mapping
  const techColors = {
    'React.js': 'from-blue-500 to-cyan-500',
    'Node.js': 'from-green-500 to-emerald-500',
    'Express.js': 'from-gray-500 to-gray-700',
    'MongoDB': 'from-green-600 to-green-800',
    'JavaScript': 'from-yellow-400 to-yellow-600',
    'HTML': 'from-orange-500 to-red-500',
    'CSS': 'from-blue-400 to-blue-600',
    'Python': 'from-blue-500 to-yellow-500',
    'Tailwind CSS': 'from-cyan-400 to-teal-500',
    'default': 'from-primary to-purple-500'
  };

  const getTechColor = (tech) => {
    for (const [key, value] of Object.entries(techColors)) {
      if (tech.includes(key)) return value;
    }
    return techColors.default;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      {/* Animated Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass-card-strong rounded-3xl shadow-2xl shadow-primary/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isImageHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
          
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-primary hover:border-primary transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Category Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 z-10"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 border border-primary/40 text-primary text-sm font-semibold backdrop-blur-sm">
              {project.category}
            </span>
          </motion.div>

          {/* Title overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-6"
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 drop-shadow-lg">
              {project.title}
            </h2>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-white/10 bg-white/5">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary bg-primary/5' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[40vh] overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  Project Description
                </h3>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-xl p-4 text-center"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-400">Tech Stack</p>
                    <p className="text-lg font-bold text-white">{project.techStack.length}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-xl p-4 text-center"
                  >
                    {project.live && project.live !== '#' ? (
                      <>
                        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400">Status</p>
                        <p className="text-lg font-bold text-green-400">Live</p>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400">Status</p>
                        <p className="text-lg font-bold text-yellow-400">In Dev / not live</p>
                      </>
                    )}
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-xl p-4 text-center"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-400">Category</p>
                    <p className="text-lg font-bold text-accent-cyan">{project.category}</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tech' && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getTechColor(tech)} text-white font-medium text-sm shadow-lg`}
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'links' && (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-white mb-6">Project Links</h3>
                <div className="grid gap-4">
                  {project.github?.frontend && (
                    <motion.a
                      href={project.github.frontend}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all">
                        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Frontend Repository</p>
                        <p className="text-sm text-gray-400">View source code on GitHub</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  )}
                  {project.github?.backend && (
                    <motion.a
                      href={project.github.backend}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent-cyan/50 hover:bg-accent-cyan/5 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center group-hover:bg-accent-cyan/30 transition-all">
                        <svg className="w-6 h-6 text-accent-cyan" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Backend Repository</p>
                        <p className="text-sm text-gray-400">View API source code on GitHub</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-accent-cyan transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  )}
                  {project.live && project.live !== '#' && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary-dark/20 border border-primary/30 hover:border-primary transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/30 flex items-center justify-center group-hover:bg-primary/40 transition-all">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">Live Demo</p>
                        <p className="text-sm text-gray-300">Visit the deployed application</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer with quick actions */}
        <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
          <div className="flex gap-2">
            {project.github?.frontend && (
              <motion.a
                href={project.github.frontend}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-primary/20 transition-colors"
                title="Frontend Repo"
              >
                <svg className="w-5 h-5 text-gray-400 hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </motion.a>
            )}
            {project.live && project.live !== '#' && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-white/10 hover:bg-primary/20 transition-colors"
                title="Live Demo"
              >
                <svg className="w-5 h-5 text-gray-400 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            )}
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;