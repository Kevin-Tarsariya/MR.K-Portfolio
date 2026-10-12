import React, { useRef, useEffect } from 'react';

/**
 * ThreeDScene: Ultra-lightweight, 60 FPS Canvas background.
 * Optimized for performance:
 * - Reduced vertices & particle calculations
 * - Automatically throttles on low-power devices and mobile
 * - Pauses completely when scrolled out of view or tab hidden
 * - Eliminates lag and heavy GPU draw calls
 */
const ThreeDScene = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect if device is low-power / mobile
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return; // Do not animate if user prefers reduced motion
    }

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isVisible = true;
    let isIntersecting = true;

    // Resize handler (throttled)
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!canvas || !canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }, 150);
    };

    const handleMouseMove = (e) => {
      // Light dampening
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };

    // IntersectionObserver to pause rendering when hero is scrolled past
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    // Optimized particle count: 35 for desktop, 18 for mobile
    const PARTICLE_COUNT = isMobile ? 18 : 36;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * width * 1.4,
      y: (Math.random() - 0.5) * height * 1.4,
      z: Math.random() * 600 + 100,
      vz: Math.random() * 0.35 + 0.15,
      size: Math.random() * 1.4 + 0.8,
      isCyan: Math.random() > 0.5
    }));

    // 3D Polyhedrons: 2 lightweight structures instead of 3 heavy ones
    const createCube = (size) => {
      const s = size / 2;
      return {
        vertices: [
          [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
          [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]
        ],
        edges: [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        ]
      };
    };

    const createOctahedron = (radius) => {
      const r = radius;
      return {
        vertices: [
          [r, 0, 0], [-r, 0, 0], [0, r, 0], [0, -r, 0], [0, 0, r], [0, 0, -r]
        ],
        edges: [
          [0, 2], [2, 1], [1, 3], [3, 0],
          [0, 4], [1, 4], [2, 4], [3, 4],
          [0, 5], [1, 5], [2, 5], [3, 5]
        ]
      };
    };

    const objects3D = isMobile ? [
      {
        ...createOctahedron(65),
        center: { x: width * 0.25, y: -height * 0.05, z: 420 },
        rot: { x: 0.3, y: 0.2, z: 0 },
        speed: { x: 0.003, y: 0.005, z: 0.002 },
        color: 'rgba(168, 85, 247, 0.45)'
      }
    ] : [
      {
        ...createOctahedron(95),
        center: { x: width * 0.26, y: -height * 0.04, z: 400 },
        rot: { x: 0.3, y: 0.2, z: 0 },
        speed: { x: 0.003, y: 0.005, z: 0.002 },
        color: 'rgba(168, 85, 247, 0.45)'
      },
      {
        ...createCube(110),
        center: { x: -width * 0.28, y: height * 0.08, z: 440 },
        rot: { x: 0.2, y: 0.4, z: 0.2 },
        speed: { x: -0.003, y: 0.004, z: -0.002 },
        color: 'rgba(6, 182, 212, 0.4)'
      }
    ];

    const rotate3D = (v, rx, ry, rz) => {
      const [x, y, z] = v;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y1 = y * cosX - z * sinX;
      const z1 = y * sinX + z * cosX;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;
      const cosZ = Math.cos(rz), sinZ = Math.sin(rz);
      return [x2 * cosZ - y1 * sinZ, x2 * sinZ + y1 * cosZ, z2];
    };

    const fov = 400;
    const project = (x, y, z) => {
      const scale = fov / (fov + z);
      return {
        x: x * scale + width / 2,
        y: y * scale + height / 2,
        scale
      };
    };

    // Render loop
    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible || !isIntersecting) return;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw Star Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z -= p.vz;
        if (p.z <= 10) {
          p.z = 600;
          p.x = (Math.random() - 0.5) * width * 1.4;
          p.y = (Math.random() - 0.5) * height * 1.4;
        }

        const px = p.x + mouse.x * 35;
        const py = p.y + mouse.y * 35;
        const proj = project(px, py, p.z);

        if (proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
          const alpha = (1 - p.z / 600) * 0.6;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
          ctx.fillStyle = p.isCyan ? `rgba(6, 182, 212, ${alpha})` : `rgba(168, 85, 247, ${alpha})`;
          ctx.fill();
        }
      }

      // Draw 3D wireframe polyhedrons
      objects3D.forEach((obj) => {
        obj.rot.x += obj.speed.x;
        obj.rot.y += obj.speed.y;
        obj.rot.z += obj.speed.z;

        const objCenterX = obj.center.x + mouse.x * 45;
        const objCenterY = obj.center.y + mouse.y * 45;

        const projVerts = obj.vertices.map((v) => {
          const rot = rotate3D(v, obj.rot.x, obj.rot.y, obj.rot.z);
          return project(rot[0] + objCenterX, rot[1] + objCenterY, rot[2] + obj.center.z);
        });

        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        obj.edges.forEach(([i, j]) => {
          const p1 = projVerts[i];
          const p2 = projVerts[j];
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        });
        ctx.stroke();

        // Small nodes
        projVerts.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        });
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};

export default ThreeDScene;
