import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Kevin-Tarsariya', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/Kevin-Tarsariya', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' }
  ];

  return (
    <footer className="border-t border-white/10">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm order-2 md:order-1">
            {currentYear} Kevin Tarsariya. All rights reserved.
          </p>

          <div className="flex items-center gap-6 order-1 md:order-2">
            {socialLinks.map((social) => (
              <motion.a 
                key={social.label} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -3, color: '#8B5CF6' }} 
                className="text-gray-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <p className="text-gray-500 text-sm flex items-center gap-1 order-3">
            Crafted with <FaHeart className="text-red-500 w-4 h-4" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;