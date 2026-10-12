import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaFileAlt, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useActiveSection } from '../hooks/useActiveSection';
import { personalInfo } from '../Data/personalInfo';
import Modern3DLogo from './Modern3DLogo';

const navLinks = [
  { name: 'Home', href: 'home' },
  { name: 'About', href: 'about' },
  { name: 'Skills', href: 'skills' },
  { name: 'Projects', href: 'projects' },
  { name: 'Experience', href: 'experience' },
  { name: 'Contact', href: 'contact' },
];

const MobileMenu = ({ isOpen, setIsOpen }) => {
  const activeSection = useActiveSection(navLinks.map((link) => link.href));

  // Lock body scroll reliably when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const handleLinkClick = (href) => {
    setIsOpen(false);
    const element = document.getElementById(href);
    if (element) {
      setTimeout(() => {
        const navOffset = 75;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navOffset;

        window.scrollTo({
          top: href === 'home' ? 0 : offsetPosition,
          behavior: 'smooth'
        });
      }, 150);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] md:hidden bg-dark/98 backdrop-blur-2xl flex flex-col justify-between p-5 sm:p-7 overflow-y-auto"
        >
          {/* Top Bar with Brand and Close Button */}
          <div className="flex justify-between items-center pb-5 border-b border-white/10 shrink-0">
            <Modern3DLogo size="md" />
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 rounded-xl bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white cursor-pointer active:scale-95"
              aria-label="Close menu"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2.5 my-auto py-6">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={`py-3.5 px-5 rounded-2xl text-left font-bold text-base sm:text-lg transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-accent-cyan text-white shadow-lg shadow-primary/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono opacity-50">0{idx + 1}</span>
                    <span>{link.name}</span>
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-white shadow-sm animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Actions & Socials */}
          <div className="pt-5 border-t border-white/10 flex flex-col gap-4 shrink-0">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm text-center"
            >
              <FaFileAlt />
              <span>View Resume</span>
            </a>

            <div className="flex items-center justify-center gap-4">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white"
                aria-label="Email"
              >
                <FaEnvelope size={18} />
              </a>
            </div>

            <p className="text-center text-[11px] text-gray-500">
              © {new Date().getFullYear()} Kevin Tarsariya. All rights reserved.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
