import React, { useEffect, useRef } from 'react';
import { sound } from '../../utils/soundEffects';

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

    // Sistema de partículas de corazones y destellos audio-reactivos
    const particles = [];
    const numParticles = Math.min(40, Math.floor(window.innerWidth / 28));

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
        baseSize: 10 + Math.random() * 16,
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

      // Obtener energía / beat del motor de audio en tiempo real
      const audioEnergy = sound.getAudioEnergy();
      const beatBoost = audioEnergy * 1.3;

      particles.forEach(p => {
        // Velocidad y tamaño reactivos al ritmo musical
        const currentSpeedY = p.speedY * (1 + beatBoost * 1.5);
        p.y -= currentSpeedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed * (1 + beatBoost);
        p.size = p.baseSize * (1 + beatBoost * 0.4);

        if (p.y < -30) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        const dynamicAlpha = Math.min(0.9, p.alpha * (1 + beatBoost * 0.8));

        if (p.isSparkle) {
          // Destello de estrella reactivo
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = theme === 'midnight' 
            ? `rgba(232, 121, 249, ${dynamicAlpha})`
            : theme === 'golden'
            ? `rgba(245, 158, 11, ${dynamicAlpha})`
            : `rgba(255, 255, 255, ${dynamicAlpha})`;
          ctx.shadowBlur = 10 + beatBoost * 15;
          ctx.shadowColor = theme === 'golden' ? '#fbbf24' : '#f43f5e';
          ctx.fill();
        } else {
          // Corazón flotante reactivo
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.translate(-p.x, -p.y);
          
          heartPath(ctx, p.x, p.y, p.size);
          ctx.fillStyle = theme === 'midnight'
            ? `rgba(168, 85, 247, ${dynamicAlpha * 0.7})`
            : theme === 'golden'
            ? `rgba(251, 191, 36, ${dynamicAlpha * 0.6})`
            : `rgba(244, 63, 94, ${dynamicAlpha * 0.6})`;
          
          if (beatBoost > 0.2) {
            ctx.shadowBlur = 8 + beatBoost * 10;
            ctx.shadowColor = '#fb7185';
          }
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
