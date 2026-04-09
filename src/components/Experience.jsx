import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { experiences, education } from '../Data/experienceData';

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <SectionWrapper id="experience" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 mx-auto w-fit">
            My Journey
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="section-title mx-auto">
            Experience & Education
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center shadow-lg shrink-0">
                <FaBriefcase className="text-white text-xl sm:text-2xl" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Work Experience</h3>
            </div>
            <div className="space-y-4 sm:space-y-6 relative">
              <div className="absolute left-5 sm:left-6 top-12 sm:top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent" />
              {experiences.map((exp, idx) => (
                <motion.div key={idx} variants={itemVariants} whileHover={{ x: 4 }} className="relative pl-12 sm:pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-200 border-2 border-primary flex items-center justify-center z-10">
                    <span className="text-primary font-bold text-xs sm:text-sm">{idx + 1}</span>
                  </div>
                  <div className="glass-card-strong p-4 sm:p-6 gradient-border">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{exp.title}</h4>
                    <p className="text-primary font-medium mb-2 text-sm sm:text-base">{exp.company}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mb-3">
                      <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{exp.date}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-accent-cyan to-primary flex items-center justify-center shadow-lg shrink-0">
                <FaGraduationCap className="text-white text-xl sm:text-2xl" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Education</h3>
            </div>
            <div className="space-y-4 sm:space-y-6 relative">
              <div className="absolute left-5 sm:left-6 top-12 sm:top-14 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan to-transparent" />
              {education.map((edu, idx) => (
                <motion.div key={idx} variants={itemVariants} whileHover={{ x: 4 }} className="relative pl-12 sm:pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-200 border-2 border-accent-cyan flex items-center justify-center z-10">
                    <span className="text-accent-cyan font-bold text-xs sm:text-sm">{idx + 1}</span>
                  </div>
                  <div className="glass-card-strong p-4 sm:p-6">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-cyan/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-2 relative z-10">{edu.degree}</h4>
                    <p className="text-accent-cyan font-medium mb-2 text-sm sm:text-base relative z-10">{edu.institution}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mb-3 relative z-10">
                      <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{edu.date}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed relative z-10">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;