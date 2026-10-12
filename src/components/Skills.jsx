import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { skillsData } from '../Data/skillsData';
import TiltCard from './TiltCard';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaUsers, FaCheckCircle, FaLaptopCode, FaCloud } from 'react-icons/fa';

const iconMap = {
  FaReact,
  FaNodeJs,
  FaCloud,
  FaDatabase,
  FaGitAlt,
  FaUsers
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...skillsData.map(c => c.category)];

  const filteredCategories = activeCategory === 'All'
    ? skillsData
    : skillsData.filter(c => c.category === activeCategory);

  return (
    <SectionWrapper id="skills" className="relative overflow-hidden py-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            Capabilities
          </div>
          <h2 className="section-title">
            Technical & Professional Skills
          </h2>
          <p className="section-subtitle">
            Production-grade stack, core frameworks, cloud architectures, and development tools
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-accent-cyan text-white shadow-lg shadow-primary/25 scale-105'
                  : 'bg-dark-200/60 backdrop-blur-md text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 3D Glass Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((group) => {
              const IconComponent = iconMap[group.icon] || FaLaptopCode;
              return (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <TiltCard
                    maxTilt={6}
                    className="glass-card-strong p-6 sm:p-7 border border-white/10 h-full flex flex-col justify-between hover:border-primary/40 transition-colors"
                  >
                    <div>
                      {/* Card Title & Icon */}
                      <div className="flex items-center gap-3.5 mb-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center text-white shadow-md`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {group.category}
                          </h3>
                          <p className="text-xs text-gray-400">{group.subtitle}</p>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent my-4" />

                      {/* Skill Badges */}
                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 hover:border-primary/40 hover:bg-white/[0.08] transition-all group/item cursor-default"
                          >
                            <FaCheckCircle className="text-accent-cyan w-3 h-3" />
                            <span className="text-xs font-medium text-gray-200 group-hover/item:text-white">
                              {skill.name}
                            </span>
                            {skill.level && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-gray-400 font-mono">
                                {skill.level}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer badge */}
                    <div className="mt-6 pt-3 flex items-center justify-between text-[11px] text-gray-400 border-t border-white/5">
                      <span>{group.skills.length} proficiencies</span>
                      <span className="text-accent-cyan font-semibold">Verified</span>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;