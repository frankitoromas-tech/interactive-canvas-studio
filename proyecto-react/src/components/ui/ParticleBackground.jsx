import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ theme = 'romantic-pink' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Sistema de partículas de corazones y destellos
    const particles = [];
    const numParticles = Math.min(36, Math.floor(window.innerWidth / 30));

    const heartPath = (ctx, x, y, size) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 30, size / 30);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-15, -15, -30, 5, 0, 30);
      ctx.bezierCurveTo(30, 5, 15, -15, 0, 0);
      ctx.closePath();
      ctx.restore();
    };

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 16,
        speedY: 0.3 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: 0.2 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        isSparkle: Math.random() > 0.6
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y < -30) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        if (p.isSparkle) {
          // Destello de estrella
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = theme === 'midnight' 
            ? `rgba(232, 121, 249, ${p.alpha})`
            : theme === 'golden'
            ? `rgba(245, 158, 11, ${p.alpha})`
            : `rgba(255, 255, 255, ${p.alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#f43f5e';
          ctx.fill();
        } else {
          // Corazón flotante
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.translate(-p.x, -p.y);
          
          heartPath(ctx, p.x, p.y, p.size);
          ctx.fillStyle = theme === 'midnight'
            ? `rgba(168, 85, 247, ${p.alpha * 0.6})`
            : theme === 'golden'
            ? `rgba(251, 191, 36, ${p.alpha * 0.5})`
            : `rgba(244, 63, 94, ${p.alpha * 0.5})`;
          ctx.fill();
          ctx.restore();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
