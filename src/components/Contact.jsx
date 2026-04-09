import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionWrapper from './SectionWrapper';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { personalInfo } from '../Data/personalInfo';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // EmailJS Configuration from environment variables (Vite syntax)
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Validate that environment variables are set
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('EmailJS configuration missing. Please check your .env file has VITE_ prefixes.');
      }

      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location },
    { icon: FaPhone, label: 'Phone', value: 'Available on Request' }
  ];

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-100 to-dark" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px]" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 mx-auto w-fit">
            Get In Touch
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="section-title mx-auto">
            Let's Connect
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="section-subtitle">
            Have a project in mind? Let's create something amazing together
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            <div className="glass-card-strong p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Contact Information</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-sm sm:text-base">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <div className="space-y-4">
                {contactInfo.map((item, idx) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white font-medium hover:text-primary transition-colors text-sm sm:text-base break-all">{item.value}</a>
                      ) : (
                        <p className="text-white font-medium text-sm sm:text-base">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="glass-card p-6">
              <p className="text-gray-400 text-sm mb-4">Follow me on social media</p>
              <div className="flex gap-3">
                <motion.a 
                  href={personalInfo.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }} 
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href={personalInfo.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }} 
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card-strong p-6 sm:p-8 gradient-border">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Send a Message</h3>
              <div className="space-y-5">
                {[{ name: 'name', icon: FaUser, label: 'Your Name', type: 'text', placeholder: 'John Doe' }, { name: 'email', icon: FaEnvelope, label: 'Email Address', type: 'email', placeholder: 'hello@example.com' }].map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-300 text-sm font-medium mb-2">{field.label}</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-dark-100 rounded-lg z-10">
                        <field.icon className={`w-4 h-4 transition-colors ${focusedField === field.name ? 'text-primary' : 'text-gray-500'}`} />
                      </div>
                      <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} onFocus={() => setFocusedField(field.name)} onBlur={() => setFocusedField(null)} required className="input-field pl-12" placeholder={field.placeholder} disabled={loading} />
                    </div>
                  </div>
                ))}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Your Message</label>
                  <div className="relative">
                    <div className="absolute left-3 top-4 w-7 h-7 flex items-center justify-center bg-dark-100 rounded-lg z-10">
                      <FaComment className={`w-4 h-4 transition-colors ${focusedField === 'message' ? 'text-primary' : 'text-gray-500'}`} />
                    </div>
                    <textarea name="message" value={formData.message} onChange={handleChange} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} required rows="4" className="input-field pl-12 pt-4 resize-none" placeholder="Tell me about your project..." disabled={loading} />
                  </div>
                </div>
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: loading ? 1 : 1.02 }} 
                  whileTap={{ scale: loading ? 1 : 0.98 }} 
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 sm:py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="text-sm sm:text-base">Sending...</span>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span className="text-sm sm:text-base">Send Message</span>
                      <FaPaperPlane className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
                
                {/* Success Message */}
                {submitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3"
                  >
                    <FaCheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                    <div>
                      <p className="text-green-400 font-medium">Message sent successfully!</p>
                      <p className="text-green-400/70 text-sm">I'll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3"
                  >
                    <FaExclamationCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium">{error}</p>
                      <p className="text-red-400/70 text-sm">Try emailing directly at {personalInfo.email}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;