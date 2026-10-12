import { useState, useEffect } from 'react';

/**
 * useActiveSection: High-performance IntersectionObserver + fallback scroll tracker.
 * Ensures:
 * - Accurate active state for the section occupying the main viewport
 * - No flickering, no multiple active sections
 * - Instant scroll synchronization
 */
export const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // If IntersectionObserver is supported, use threshold calculation
    const observerCallback = (entries) => {
      // Find the entry that has the highest intersection ratio and is intersecting
      const intersectingEntries = entries.filter((e) => e.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Sort by intersection ratio descending
        intersectingEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const mostVisible = intersectingEntries[0].target.id;
        if (mostVisible) {
          setActiveSection(mostVisible);
        }
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px', // Account for navbar height
      threshold: [0.15, 0.4, 0.7]
    };

    let observer = null;
    try {
      observer = new IntersectionObserver(observerCallback, observerOptions);
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    } catch {
      // Fallback below
    }

    // Scroll listener fallback for edge cases (e.g. top of page, bottom of page)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          const windowHeight = window.innerHeight;
          const fullHeight = document.documentElement.scrollHeight;

          // If at very top, force home
          if (scrollPos < 120) {
            setActiveSection('home');
            ticking = false;
            return;
          }

          // If scrolled to very bottom, select contact
          if (scrollPos + windowHeight >= fullHeight - 60) {
            setActiveSection(sectionIds[sectionIds.length - 1] || 'contact');
            ticking = false;
            return;
          }

          // Fallback measurement if observer didn't catch
          if (!observer) {
            const checkPoint = scrollPos + windowHeight * 0.35;
            for (let i = sectionIds.length - 1; i >= 0; i--) {
              const el = document.getElementById(sectionIds[i]);
              if (el && el.offsetTop <= checkPoint) {
                setActiveSection(sectionIds[i]);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeSection;
};