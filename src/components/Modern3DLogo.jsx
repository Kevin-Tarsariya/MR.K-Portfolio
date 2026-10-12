import React from 'react';

/**
 * Modern3DLogo: A high-end, futuristic 3D developer emblem.
 * Features:
 * - 3D isometric perspective cube with multi-layered bevels & glass faces
 * - Cyberpunk neon depth glow (purple -> electric blue)
 * - Animated specular light sheen across the 3D polygon
 * - Sleek typography with metallic chrome gradient & glowing dot
 * - Interactive 3D tilt on hover
 */
const Modern3DLogo = ({ size = 'md' }) => {
  const isLarge = size === 'lg';

  return (
    <div className="group/logo inline-flex items-center gap-3 select-none cursor-pointer">
      {/* 3D Isometric Emblem */}
      <div 
        className="relative perspective-[600px]"
        style={{ perspective: '600px' }}
      >
        <div 
          className="relative transition-all duration-300 ease-out group-hover/logo:scale-110 group-hover/logo:[transform:rotateX(12deg)_rotateY(-15deg)_translateZ(4px)] [transform-style:preserve-3d]"
        >
          {/* Ambient 3D Neon Back-Glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-500 to-fuchsia-500 opacity-60 blur-md group-hover/logo:opacity-100 group-hover/logo:blur-lg transition-all duration-300 -z-10" />

          {/* 3D Glass Hex-Box Canvas */}
          <div className={`${isLarge ? 'w-11 h-11' : 'w-10 h-10'} rounded-xl relative p-[1px] bg-gradient-to-br from-white/40 via-cyan-400/30 to-violet-500/40 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] overflow-hidden`}>
            
            {/* Dark inner faceted chamber */}
            <div className="w-full h-full rounded-[11px] bg-gradient-to-br from-[#121124] via-[#0d0d18] to-[#171530] flex items-center justify-center relative overflow-hidden">
              
              {/* Dynamic 3D diagonal light slice */}
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.15] to-transparent transform -rotate-45 translate-x-[-120%] group-hover/logo:translate-x-[120%] transition-transform duration-700 pointer-events-none" />

              {/* Holographic grid lines inside emblem */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:6px_6px] pointer-events-none" />

              {/* 3D Embossed Stylized 'K' */}
              <span 
                className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-b from-white via-cyan-200 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [transform:translateZ(10px)]"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                K
              </span>

              {/* Corner 3D Cyan Light Dot */}
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Typography: "Kevin .dev" with futuristic 3D feel */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover/logo:text-transparent group-hover/logo:bg-gradient-to-r group-hover/logo:from-white group-hover/logo:via-cyan-300 group-hover/logo:to-violet-400 group-hover/logo:bg-clip-text transition-all duration-300">
            Kevin
          </span>
          <span className="text-xs sm:text-sm font-bold font-mono px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-cyan-400 group-hover/logo:border-cyan-400/40 group-hover/logo:text-white transition-colors duration-200 shadow-sm">
            .dev
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modern3DLogo;
