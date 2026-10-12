import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { personalInfo } from '../Data/personalInfo';
import { 
  FaCode, 
  FaRocket, 
  FaGraduationCap, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaCheckCircle, 
  FaLaptopCode, 
  FaCloud,
  FaServer
} from 'react-icons/fa';
import TiltCard from './TiltCard';

const About = () => {
  const stats = [
    { 
      icon: FaCode, 
      value: '6+', 
      label: 'Production & Full-Stack Projects', 
      desc: 'MERN, React, Angular & Web tools',
      gradient: 'from-purple-500 to-indigo-600'
    },
    { 
      icon: FaRocket, 
      value: '6 Mos', 
      label: 'MERN Developer Internship', 
      desc: 'Yesquest LMS Full-Stack Development',
      gradient: 'from-cyan-500 to-blue-600'
    },
    { 
      icon: FaGraduationCap, 
      value: 'MCA', 
      label: 'Cloud Computing Specialization', 
      desc: 'MIT ADT University (2026 - 2028)',
      gradient: 'from-emerald-500 to-teal-600'
    },
    { 
      icon: FaServer, 
      value: '100%', 
      label: 'Full-Stack Execution', 
      desc: 'Frontend, REST APIs & Databases',
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  const quickDetails = [
    { label: 'Full Name', value: personalInfo.name, icon: FaLaptopCode },
    { label: 'Current Education', value: 'MCA in Cloud Computing', institution: 'MIT ADT University', icon: FaGraduationCap },
    { label: 'Undergraduate', value: 'BCA (Web & Software)', institution: 'Vivekanand College', icon: FaGraduationCap },
    { label: 'Location', value: personalInfo.location, icon: FaMapMarkerAlt },
    { label: 'Direct Email', value: personalInfo.email, icon: FaEnvelope, isLink: true }
  ];

  const coreFocusTags = [
    { name: 'MERN Stack', icon: FaLaptopCode },
    { name: 'React.js Ecosystem', icon: FaCode },
    { name: 'Node.js & Express.js', icon: FaServer },
    { name: 'MongoDB & SQL', icon: FaServer },
    { name: 'Cloud Computing', icon: FaCloud },
    { name: 'RESTful API Architecture', icon: FaCode },
    { name: 'Tailwind CSS & UI Systems', icon: FaCode }
  ];

  return (
    <SectionWrapper id="about" className="relative overflow-hidden py-16 sm:py-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-primary/10 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-accent-cyan/10 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            About Me
          </div>
          <h2 className="section-title">
            Passionate MERN & Cloud Developer
          </h2>
          <p className="section-subtitle">
            Crafting scalable full-stack web applications, RESTful APIs, and modern responsive user interfaces
          </p>
        </div>

        {/* Top Split: My Story & What Drives Me */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-stretch mb-8 sm:mb-10">
          {/* Card 1: My Story */}
          <div className="lg:col-span-7 flex flex-col">
            <TiltCard 
              maxTilt={4} 
              className="glass-card-strong p-5 sm:p-7 md:p-8 border border-white/10 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-white/10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-primary to-accent-cyan flex items-center justify-center text-white shadow-md shadow-primary/20 shrink-0">
                    <FaLaptopCode className="text-lg sm:text-xl" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight truncate">
                      My Story & Background
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-400">Engineering journey & technical foundation</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  <p>
                    {personalInfo.about.long}
                  </p>
                  <p className="text-gray-300/90">
                    {personalInfo.about.passion}
                  </p>
                </div>
              </div>

              {/* Core technical pills */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10">
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5 sm:mb-3">
                  Core Technical Focus
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {coreFocusTags.map((tag) => (
                    <span
                      key={tag.name}
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-white/[0.04] border border-white/10 text-gray-200 hover:border-primary/40 hover:bg-white/[0.08] transition-all cursor-default"
                    >
                      <FaCheckCircle className="text-accent-cyan w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                      <span>{tag.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Card 2: What Drives Me */}
          <div className="lg:col-span-5 flex flex-col">
            <TiltCard 
              maxTilt={4} 
              className="glass-card-strong p-5 sm:p-7 md:p-8 border border-white/10 gradient-border flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-white/10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-accent-cyan to-primary flex items-center justify-center text-white shadow-md shadow-cyan-500/20 shrink-0">
                    <FaRocket className="text-base sm:text-lg" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight truncate">
                      What Drives Me
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-400">Core engineering values & principles</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                  <p>
                    I believe in writing clean, well-structured, and maintainable code that scales gracefully. Every project is an opportunity to solve genuine user problems and bridge technical complexity with sleek design.
                  </p>
                  <p className="text-gray-300/90">
                    From architecting backend endpoints and data schemas to crafting high-performance, accessible client-side experiences, my goal is delivering complete, production-ready solutions.
                  </p>
                </div>
              </div>

              {/* Guiding Principles */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10">
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2.5 sm:mb-3">
                  Guiding Principles
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Clean Architecture',
                    'User-Centric UX',
                    'Scalable REST APIs',
                    'Continuous Growth'
                  ].map((principle) => (
                    <div 
                      key={principle} 
                      className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] sm:text-xs text-gray-300 font-medium flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-light shrink-0" />
                      <span className="truncate">{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Verified Stats Grid */}
        <div className="mb-8 sm:mb-10">
          <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 sm:mb-4 px-1">
            Verified Portfolio Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <TiltCard
                key={stat.label}
                maxTilt={4}
                className="glass-card-strong p-4 sm:p-5 border border-white/10 flex flex-col justify-between hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md shrink-0`}>
                    <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-0.5 sm:mb-1 tracking-tight">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-normal leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        {/* Personal Details Information Strip */}
        <div>
          <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 sm:mb-4 px-1">
            Personal & Education Credentials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {quickDetails.map((detail) => (
              <TiltCard
                key={detail.label}
                maxTilt={3}
                className="glass-card p-3.5 sm:p-4 md:p-5 border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-light shrink-0 mt-0.5">
                    <detail.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      {detail.label}
                    </p>
                    {detail.isLink ? (
                      <a 
                        href={`mailto:${detail.value}`}
                        className="text-white hover:text-accent-cyan font-bold text-xs sm:text-sm truncate block transition-colors"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-white font-bold text-xs sm:text-sm truncate">
                        {detail.value}
                      </p>
                    )}
                    {detail.institution && (
                      <p className="text-[11px] sm:text-xs text-primary-light/90 font-medium truncate mt-0.5">
                        {detail.institution}
                      </p>
                    )}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;