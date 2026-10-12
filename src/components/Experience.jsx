import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt } from 'react-icons/fa';
import { experiences, education } from '../Data/experienceData';
import TiltCard from './TiltCard';

const Experience = () => {
  return (
    <SectionWrapper id="experience" className="relative overflow-hidden py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-24 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-primary/10 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-accent-cyan/10 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            Timeline
          </div>
          <h2 className="section-title">
            Experience & Education
          </h2>
          <p className="section-subtitle">
            My academic foundation and professional developer experience
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Work Experience Column */}
          <div>
            <div className="flex items-center gap-3 sm:gap-3.5 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-primary to-accent-cyan flex items-center justify-center shadow-lg shadow-primary/25 shrink-0">
                <FaBriefcase className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">Work Experience</h3>
                <p className="text-[11px] sm:text-xs text-gray-400">Professional internships & roles</p>
              </div>
            </div>

            <div className="relative pl-5 sm:pl-7 space-y-5 sm:space-y-6">
              {/* Glowing Timeline Line */}
              <div className="absolute left-2 sm:left-3 top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-accent-cyan to-transparent rounded-full shadow-[0_0_12px_rgba(139,92,246,0.6)]" />

              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[19px] sm:-left-[25px] top-4 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-dark-200 border-2 border-primary flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.8)] z-10 group-hover:scale-125 transition-transform duration-300">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                  </div>

                  <TiltCard maxTilt={4} className="glass-card-strong p-4 sm:p-6 border border-white/10 gradient-border">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-primary/20 text-primary-light border border-primary/30">
                        {exp.company}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 font-mono">
                        <FaCalendarAlt className="text-primary-light w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{exp.date}</span>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 tracking-tight">
                      {exp.title}
                    </h4>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-normal">
                      {exp.description}
                    </p>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 sm:gap-3.5 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-accent-cyan to-primary flex items-center justify-center shadow-lg shadow-cyan-500/25 shrink-0">
                <FaGraduationCap className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">Education</h3>
                <p className="text-[11px] sm:text-xs text-gray-400">Academic background & qualifications</p>
              </div>
            </div>

            <div className="relative pl-5 sm:pl-7 space-y-5 sm:space-y-6">
              {/* Glowing Timeline Line */}
              <div className="absolute left-2 sm:left-3 top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent-cyan via-primary to-transparent rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]" />

              {education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[19px] sm:-left-[25px] top-4 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-dark-200 border-2 border-accent-cyan flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.8)] z-10 group-hover:scale-125 transition-transform duration-300">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white" />
                  </div>

                  <TiltCard maxTilt={4} className="glass-card-strong p-4 sm:p-6 border border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-accent-cyan/15 text-cyan-300 border border-accent-cyan/30">
                        {edu.institution}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 font-mono">
                        <FaCalendarAlt className="text-accent-cyan w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{edu.date}</span>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 tracking-tight">
                      {edu.degree}
                    </h4>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-normal">
                      {edu.description}
                    </p>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;