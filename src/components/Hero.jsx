import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { personalInfo } from '../Data/personalInfo';
import ThreeDScene from './ThreeDScene';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 75;
      const elementPos = contactSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPos - offset, behavior: 'smooth' });
    }
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const offset = 75;
      const elementPos = aboutSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPos - offset, behavior: 'smooth' });
    }
  };

  // High performance typewriter with role loop
  const roles = [
    'MERN Stack Developer',
    'React & Full Stack Engineer',
    'Cloud Computing Enthusiast',
    'Node.js & Backend Specialist'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timer = setTimeout(() => {
          setDisplayText(current.substring(0, displayText.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(current.substring(0, displayText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-16"
    >
      {/* 3D Interactive Canvas Scene Background */}
      <ThreeDScene />

      {/* Atmospheric Aurora Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-primary/15 rounded-full blur-[90px] sm:blur-[110px] transform-gpu" />
        <div className="absolute -bottom-10 right-0 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-accent-cyan/12 rounded-full blur-[90px] sm:blur-[110px] transform-gpu" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] bg-purple-900/10 rounded-full blur-[110px] sm:blur-[130px] transform-gpu" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.035)_1px,transparent_1px)] bg-[size:48px_48px] sm:bg-[size:64px_64px] opacity-70" />
      </div>

      <motion.div className="relative z-10 container-custom px-4 sm:px-6 w-full max-w-5xl mx-auto" style={{ y, opacity }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mx-auto"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-5 sm:mb-6 shadow-lg shadow-purple-500/5 max-w-full">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-300 truncate">
              Available for Opportunities & Projects
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-5 tracking-tight leading-[1.15] break-words">
            <span className="text-white block sm:inline">Hi, I'm </span>
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(139,92,246,0.35)]">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Interactive Role Box */}
          <motion.div variants={itemVariants} className="mb-5 sm:mb-6 flex justify-center px-2">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-dark-200/70 backdrop-blur-md border border-white/10 shadow-xl shadow-primary/10 max-w-full">
              <span className="text-[10px] sm:text-xs tracking-wider uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-primary/20 text-primary-light font-semibold border border-primary/30 shrink-0">
                ROLE
              </span>
              <span className="text-sm sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent min-h-[26px] sm:min-h-[32px] flex items-center truncate">
                {displayText}
                <span className="inline-block w-0.5 h-4 sm:h-6 ml-1 bg-accent-cyan animate-pulse shrink-0" />
              </span>
            </div>
          </motion.div>

          {/* Bio Summary */}
          <motion.p variants={itemVariants} className="text-xs sm:text-base md:text-lg text-gray-300/90 max-w-2xl mx-auto mb-6 sm:mb-9 leading-relaxed font-normal px-2">
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 w-full max-w-xs sm:max-w-none mx-auto">
            <button
              onClick={handleContactClick}
              className="btn-primary w-full sm:w-auto text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-8 flex items-center justify-center gap-2 font-medium cursor-pointer transition-transform duration-200 hover:scale-103 active:scale-97"
            >
              <span>Let's Talk</span>
              <span>→</span>
            </button>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary w-full sm:w-auto text-center text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-8 backdrop-blur-md bg-white/[0.03] transition-transform duration-200 hover:scale-103 active:scale-97 cursor-pointer"
            >
              View Resume
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={itemVariants} className="flex justify-center items-center gap-3 sm:gap-4">
            {[
              { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub' },
              { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
              { icon: FaTwitter, href: personalInfo.social.twitter || '#', label: 'Twitter' },
              { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-gray-300 hover:text-white bg-dark-200/70 backdrop-blur-md border border-white/10 transition-transform duration-200 hover:scale-110 hover:-translate-y-1 cursor-pointer p-2.5 sm:p-3"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <button 
          onClick={scrollToAbout} 
          className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary-light transition-colors group cursor-pointer focus:outline-none"
          aria-label="Scroll to About Section"
        >
          <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 group-hover:text-primary-light">Scroll Down</span>
          <FaChevronDown size={14} className="animate-bounce" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-dark via-dark/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;