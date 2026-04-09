import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useActiveSection } from '../hooks/useActiveSection';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Experience', href: 'experience' },
  { name: 'Contact', href: 'contact' },
];

const Navbar = ({ isOpen, setIsOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const activeSection = useActiveSection(navLinks.map(link => link.href));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (href) => {
    setIsOpen(false);
    const element = document.getElementById(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isOpen 
          ? 'bg-dark' 
          : scrolled 
            ? 'bg-dark/80 backdrop-blur-xl shadow-lg shadow-black/10' 
            : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4 flex justify-between items-center">
        <motion.a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }} whileHover={{ scale: 1.05 }} className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">Mr</span>
          <span className="text-white">.</span>
          <span className="text-primary">K</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              whileHover={{ y: -2 }}
              className={`relative text-sm font-medium transition-colors px-1 ${activeSection === link.href ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
            >
              {link.name}
            </motion.button>
          ))}
        </div>

        <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="md:hidden text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <FaTimes size={24} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <FaBars size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
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
              width: '100vw',
              height: '100vh',
              backgroundColor: '#0a0a0f',
              zIndex: 9999
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
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;