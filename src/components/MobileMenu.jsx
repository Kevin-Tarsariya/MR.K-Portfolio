import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useActiveSection } from '../hooks/useActiveSection';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Experience', href: 'experience' },
  { name: 'Contact', href: 'contact' },
];

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const activeSection = useActiveSection(navLinks.map(link => link.href));

  const handleLinkClick = (href) => {
    setIsOpen(false);
    const element = document.getElementById(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0a0a0f',
        zIndex: 9998
      }}
    >
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-300 hover:text-white focus:outline-none p-2"
        >
          <FaTimes size={28} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center h-full px-6 py-20">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleLinkClick(link.href)}
            className={`text-xl sm:text-2xl font-medium py-4 px-6 rounded-xl transition-all w-full text-center ${
              activeSection === link.href
                ? 'text-primary bg-primary/10'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {link.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
