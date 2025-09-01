import React from 'react';
import { motion } from 'framer-motion';
import './Section.css';

const Section = ({ children, fullWidth = false }) => {
  return (
    <motion.section
      className={`section ${fullWidth ? 'full-width' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};

export default Section;
