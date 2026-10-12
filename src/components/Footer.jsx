import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaArrowUp } from 'react-icons/fa';
import { personalInfo } from '../Data/personalInfo';
import Modern3DLogo from './Modern3DLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, href: personalInfo.social.twitter || '#', label: 'Twitter' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-dark-100/50 backdrop-blur-xl">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Modern3DLogo size="md" />
            <div className="sm:border-l sm:border-white/10 sm:pl-4">
              <p className="text-gray-400 text-xs mt-0.5">
                © {currentYear} Kevin Tarsariya. All rights reserved.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a 
                key={social.label} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -3, scale: 1.1 }} 
                className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary-light hover:border-primary/40 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary-light hover:bg-primary hover:text-white transition-all cursor-pointer ml-2"
              aria-label="Scroll to top of page"
            >
              <FaArrowUp className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Built with love info */}
          <p className="text-gray-400 text-xs flex items-center gap-1.5">
            Crafted with <FaHeart className="text-pink-500 w-3.5 h-3.5 animate-pulse" /> using React, Framer Motion & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;