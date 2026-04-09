import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ id, children, className = '' }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.1 }}
      className={`section-padding relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;