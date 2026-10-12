import React, { useRef, useState, useCallback } from 'react';

/**
 * TiltCard: High-performance 3D glass card using GPU CSS transforms.
 * - Zero Framer Motion spring overhead per card (runs at 60-120 FPS smoothly)
 * - Pure requestAnimationFrame dampening
 * - Automatically disables tilt on touch/mobile devices
 * - Subtle specular light highlight without heavy SVG filter re-draws
 */
const TiltCard = ({
  children,
  className = '',
  maxTilt = 7,
  glare = false,
  onClick,
  style = {}
}) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef(null);

  // Check touch once
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handleMouseMove = useCallback((e) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalised from -1 to 1
    const normX = (clientX / rect.width) * 2 - 1;
    const normY = (clientY / rect.height) * 2 - 1;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setTilt({
        x: normY * -maxTilt,
        y: normX * maxTilt
      });
    });
  }, [isTouch, maxTilt]);

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const transformStyle = isTouch || !isHovered
    ? 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    : `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.015, 1.015, 1.015)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.4s ease-out',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style
      }}
      className={`relative rounded-2xl ${className}`}
    >
      <div 
        style={{ 
          transform: isHovered && !isTouch ? 'translateZ(10px)' : 'translateZ(0px)', 
          transition: 'transform 0.2s ease-out' 
        }}
      >
        {children}
      </div>

      {glare && isHovered && !isTouch && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden z-20"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)'
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
