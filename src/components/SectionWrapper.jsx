import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionWrapper: Lightweight reveal-on-scroll container using viewport detection.
 * Optimized with:
 * - Reduced y distance (from 40px down to 20px) to prevent layout jumps
 * - Shorter duration (0.45s) for responsive feel
 * - once: true so elements never re-trigger animations while scrolling back and forth
 */
const SectionWrapper = ({ id, children, className = '' }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.08 }}
      className={`section-padding relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;