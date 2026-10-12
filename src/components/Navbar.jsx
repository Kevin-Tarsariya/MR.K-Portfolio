import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaFileAlt } from 'react-icons/fa';
import { useActiveSection } from '../hooks/useActiveSection';
import Modern3DLogo from './Modern3DLogo';

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
  const activeSection = useActiveSection(navLinks.map((link) => link.href));

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    setIsOpen(false);
    const element = document.getElementById(href);
    if (element) {
      const navOffset = 75; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: href === 'home' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-dark/85 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/40' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        {/* Brand Logo with 3D Emblem */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }} 
          className="focus:outline-none"
        >
          <Modern3DLogo size="md" />
        </a>

        {/* Desktop Navigation Links with Smooth Active Pill */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/30 z-[-1]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Resume Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <FaFileAlt className="text-primary-light" />
            <span>Resume</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2.5 rounded-xl bg-white/[0.05] border border-white/10 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;