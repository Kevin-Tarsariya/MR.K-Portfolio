import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import { skillsData } from '../Data/skillsData';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <SectionWrapper id="skills" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100 via-dark to-dark-100" />
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="block mx-auto w-fit px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
          >
            My Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            viewport={{ once: true }} 
            className="section-title mx-auto"
          >
            Technical Skills
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            viewport={{ once: true }} 
            className="section-subtitle"
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category) => (
            <motion.div
              key={category.category}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="bg-dark-200/80 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 shadow-lg"
            >
              <h3 className={`text-lg font-semibold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm text-gray-300 bg-dark-300/50 rounded-full border border-white/5 hover:border-primary/30 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;