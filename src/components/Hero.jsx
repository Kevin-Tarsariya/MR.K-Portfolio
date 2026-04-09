import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { personalInfo } from '../Data/personalInfo';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  const TypingEffect = ({ text, speed = 100, className = "" }) => {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (!isDeleting) {
          if (index < text.length) {
            setDisplayText(text.substring(0, index + 1));
            setIndex(index + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (index > 0) {
            setDisplayText(text.substring(0, index - 1));
            setIndex(index - 1);
          } else {
            setIsDeleting(false);
          }
        }
      }, isDeleting ? speed / 2 : speed);

      return () => clearTimeout(timeout);
    }, [index, isDeleting, text, speed]);

    return (
      <span className={className}>
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = personalInfo.roles;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [roles]);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[128px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-pink/5 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/20"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div className="relative z-10 container-custom" style={{ opacity }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight pt-15">
            <span className="text-white">Hi, I'm </span>
            <span className="bg-gradient-to-r from-primary via-accent-cyan to-primary bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'gradient-x 3s ease infinite' }}>
              {personalInfo.name}
            </span>
          </motion.h1>

          <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-gradient-to-r from-primary/10 to-accent-cyan/10 border border-primary/20 min-h-[60px] sm:min-h-[70px]">
              <span className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                <TypingEffect text={roles[currentRoleIndex]} speed={80} />
              </span>
            </div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
            {personalInfo.bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 px-4 sm:px-0">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139, 92, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="btn-primary group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Let's Talk
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </span>
            </motion.button>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full sm:w-auto text-center">
              View Resume
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            {[
              { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub' },
              { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
              { icon: FaTwitter, href: personalInfo.social.twitter || '#', label: 'Twitter' },
              { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="social-icon"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.5 }}>
        <motion.button onClick={scrollToAbout} className="flex flex-col items-center gap-2 text-gray-500 hover:text-primary transition-colors" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FaChevronDown size={20} />
        </motion.button>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;