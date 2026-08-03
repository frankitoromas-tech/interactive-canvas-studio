import React, { useEffect, useRef } from 'react';

export default function ParticleBackground({ theme = 'romantic-pink' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Paleta según tema
    const getThemeColors = () => {
      switch (theme) {
        case 'midnight':
          return ['#c084fc', '#e879f9', '#818cf8', '#f472b6', '#38bdf8'];
        case 'golden':
          return ['#fbbf24', '#f59e0b', '#fb7185', '#f43f5e', '#fed7aa'];
        case 'enchanted':
          return ['#34d399', '#f43f5e', '#ec4899', '#a7f3d0', '#fb7185'];
        default: // romantic-pink
          return ['#f43f5e', '#fb7185', '#fda4af', '#ec4899', '#f472b6', '#fff1f2'];
      }
    };

    // Partículas de fondo flotantes constantes
    const floatingHearts = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 8,
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.1,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      color: getThemeColors()[Math.floor(Math.random() * getThemeColors().length)]
    }));

    // Partículas interactivas del cursor
    const cursorParticles = [];

    const addCursorSparkle = (x, y) => {
      const colors = getThemeColors();
      for (let i = 0; i < 2; i++) {
        cursorParticles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          size: Math.random() * 12 + 6,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
          opacity: 0.8,
          decay: 0.025,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const onMouseMove = (e) => {
      addCursorSparkle(e.clientX, e.clientY);
    };

    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        addCursorSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    const drawHeart = (c, x, y, size, color, opacity) => {
      c.save();
      c.translate(x, y);
      c.scale(size / 20, size / 20);
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-10, -10, -20, 5, 0, 20);
      c.bezierCurveTo(20, 5, 10, -10, 0, 0);
      c.fillStyle = color;
      c.globalAlpha = opacity;
      c.shadowColor = color;
      c.shadowBlur = 10;
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dibujar partículas flotantes
      floatingHearts.forEach((h) => {
        h.y -= h.speedY;
        h.sway += h.swaySpeed;
        const curX = h.x + Math.sin(h.sway) * 18;

        if (h.y < -30) {
          h.y = height + 30;
          h.x = Math.random() * width;
        }

        drawHeart(ctx, curX, h.y, h.size, h.color, h.opacity);
      });

      // Dibujar partículas interactivas del cursor
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const cp = cursorParticles[i];
        cp.x += cp.vx;
        cp.y += cp.vy;
        cp.opacity -= cp.decay;

        if (cp.opacity <= 0) {
          cursorParticles.splice(i, 1);
          continue;
        }

        drawHeart(ctx, cp.x, cp.y, cp.size, cp.color, cp.opacity);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
