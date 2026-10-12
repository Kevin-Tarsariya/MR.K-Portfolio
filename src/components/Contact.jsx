import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionWrapper from './SectionWrapper';
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaMapMarkerAlt, FaGithub, FaLinkedin, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { personalInfo } from '../Data/personalInfo';
import TiltCard from './TiltCard';

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
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        // Fallback: If EmailJS credentials are not present in .env, open user's mail client directly
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
        return;
      }

      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send through automated service. Please send an email directly.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location },
    { icon: FaGithub, label: 'GitHub', value: 'Kevin-Tarsariya', href: personalInfo.social.github },
    { icon: FaLinkedin, label: 'LinkedIn', value: 'Kevin Tarsariya', href: personalInfo.social.linkedin }
  ];

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden py-16 sm:py-24">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 -left-20 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-primary/10 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-accent-cyan/10 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            Get In Touch
          </div>
          <h2 className="section-title">
            Let's Build Something Together
          </h2>
          <p className="section-subtitle">
            Have a project in mind, an opportunity to discuss, or just want to say hi? Reach out anytime!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <TiltCard maxTilt={4} className="glass-card-strong p-5 sm:p-7 md:p-8 border border-white/10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Contact Information
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 font-normal">
                I am actively seeking software development and MERN stack engineering opportunities. Feel free to connect via form or directly through socials.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center shrink-0">
                      <item.icon className="text-primary-light w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-accent-cyan font-semibold text-xs sm:text-sm truncate block transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white font-semibold text-xs sm:text-sm truncate">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <TiltCard maxTilt={3} className="glass-card-strong p-5 sm:p-7 md:p-8 border border-white/10 gradient-border shadow-2xl">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-5 sm:mb-6 tracking-tight">
                Send a Direct Message
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5 sm:mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaUser className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${focusedField === 'name' ? 'text-primary-light' : 'text-gray-500'}`} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="e.g. John Doe"
                      disabled={loading}
                      className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-dark-200/70 border border-white/10 rounded-xl text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-dark-100 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5 sm:mb-2">
                    Your Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                      <FaEnvelope className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${focusedField === 'email' ? 'text-primary-light' : 'text-gray-500'}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      placeholder="e.g. john@example.com"
                      disabled={loading}
                      className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-dark-200/70 border border-white/10 rounded-xl text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-dark-100 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1.5 sm:mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3.5 sm:top-4 text-gray-400">
                      <FaComment className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${focusedField === 'message' ? 'text-primary-light' : 'text-gray-500'}`} />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows="4"
                      placeholder="Tell me about your project, idea, or questions..."
                      disabled={loading}
                      className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 bg-dark-200/70 border border-white/10 rounded-xl text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-dark-100 transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 sm:py-3.5 px-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs sm:text-sm md:text-base shadow-lg shadow-primary/25 transition-transform active:scale-97"
                >
                  {loading ? (
                    <>
                      <span>Sending Message...</span>
                      <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FaPaperPlane className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>

                {/* Success feedback */}
                {submitted && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <div>
                      <p className="text-emerald-400 font-semibold text-xs sm:text-sm">Message received!</p>
                      <p className="text-emerald-400/80 text-[11px] sm:text-xs">Thank you for reaching out. I'll get back to you shortly.</p>
                    </div>
                  </div>
                )}

                {/* Error feedback */}
                {error && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3">
                    <FaExclamationCircle className="text-rose-400 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <div>
                      <p className="text-rose-400 font-semibold text-xs sm:text-sm">{error}</p>
                      <a href={`mailto:${personalInfo.email}`} className="text-rose-400/90 text-[11px] sm:text-xs underline">
                        Click here to send direct email to {personalInfo.email}
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </TiltCard>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;