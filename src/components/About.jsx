import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { personalInfo } from '../Data/personalInfo';
import { FaCode, FaRocket, FaHeart, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: FaCode, value: '10+', label: 'Projects Completed' },
    { icon: FaRocket, value: '1+', label: 'Years Experience' },
    { icon: FaHeart, value: '100%', label: 'Dedication' },
    { icon: FaLightbulb, value: '24/7', label: 'Learning Mode' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: { staggerChildren: 0.1 }
    },
    viewport: { once: true }
  };

  return (
    <SectionWrapper id="about" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[128px]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span {...fadeInUp} className="block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 mx-auto w-fit">
            Get to know me
          </motion.span>
          <motion.h2 {...fadeInUp} transition={{ delay: 0.1 }} className="section-title mx-auto">About Me</motion.h2>
          <motion.p {...fadeInUp} transition={{ delay: 0.2 }} className="section-subtitle">
            Passionate developer crafting digital experiences that make a difference
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
            <div className="glass-card-strong p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">My Story</h3>
              <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">{personalInfo.about.long}</p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{personalInfo.about.passion}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ label: 'Name', value: personalInfo.name }, { label: 'Email', value: personalInfo.email }, { label: 'Location', value: personalInfo.location }, { label: 'Remote', value: 'Available' }].map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card p-4">
                  <p className="text-primary text-sm font-medium mb-1">{item.label}</p>
                  <p className="text-white font-semibold text-sm sm:text-base">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="glass-card-strong p-6 sm:p-8 gradient-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-primary to-accent-cyan flex items-center justify-center shrink-0"><span className="text-xl sm:text-2xl">⚡</span></div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">What Drives Me</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
                I believe in writing clean, maintainable code that delivers exceptional user experiences. My goal is to build solutions that not only work flawlessly but also leave a lasting impression.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Problem Solving', 'Clean Code', 'User Experience', 'Innovation'].map((tag) => (
                  <span key={tag} className="tag text-xs sm:text-sm">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((stat, index) => (
                <motion.div key={stat.label} variants={{ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 } }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)" }} className="glass-card p-4 sm:p-6 text-center group cursor-default">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;