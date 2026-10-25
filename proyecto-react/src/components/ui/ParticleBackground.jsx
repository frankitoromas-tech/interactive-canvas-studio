import React, { useEffect, useRef } from 'react';
import { sound } from '../../utils/soundEffects';

/**
 * ParticleBackground — Motor Cósmico de Partículas de Alto Rendimiento
 * 
 * Características principales:
 * • Canvas 2D optimizado con escalado HiDPI (devicePixelRatio).
 * • Partículas flotantes ligeras con degradado radial y resplandor suave.
 * • Sistema de estelas orbitales (orbital trails) con memoria de trayectoria y atenuación progresiva.
 * • Normalización delta time a 60 FPS fijos: movimiento idéntico en pantallas 60Hz, 120Hz y 144Hz.
 * • Pausa automática completa cuando la pestaña pierde visibilidad (document.hidden).
 * • Reactividad acústica adaptativa al audio ambiente.
 */
export default function ParticleBackground({ theme = 'romantic-pink' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = !document.hidden;
    let lastTime = performance.now();
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Paletas temáticas para degradados y estelas cósmicas
    const themePalettes = {
      'romantic-pink': {
        bokehCore: 'rgba(254, 205, 211, ',
        bokehGlow: 'rgba(244, 63, 94, 0)',
        heartFill: 'rgba(244, 63, 94, ',
        heartShadow: '#fda4af',
        starFill: 'rgba(255, 255, 255, ',
        starShadow: '#fef08a',
        trailGradient: ['rgba(255, 107, 129, ', 'rgba(253, 230, 138, '],
        dustColor: 'rgba(255, 182, 193, '
      },
      'golden': {
        bokehCore: 'rgba(253, 230, 138, ',
        bokehGlow: 'rgba(245, 158, 11, 0)',
        heartFill: 'rgba(253, 230, 138, ',
        heartShadow: '#fbbf24',
        starFill: 'rgba(254, 240, 138, ',
        starShadow: '#f59e0b',
        trailGradient: ['rgba(245, 200, 66, ', 'rgba(253, 230, 138, '],
        dustColor: 'rgba(253, 224, 71, '
      },
      'midnight': {
        bokehCore: 'rgba(168, 85, 247, ',
        bokehGlow: 'rgba(99, 102, 241, 0)',
        heartFill: 'rgba(216, 180, 254, ',
        heartShadow: '#c084fc',
        starFill: 'rgba(255, 255, 255, ',
        starShadow: '#a855f7',
        trailGradient: ['rgba(168, 85, 247, ', 'rgba(56, 189, 248, '],
        dustColor: 'rgba(192, 132, 252, '
      }
    };

    const currentPalette = themePalettes[theme] || themePalettes['romantic-pink'];

    // ── 1. Orbes Bokeh con degradado radial ──────────────────────────────
    const numBokeh = Math.min(14, Math.floor(width / 85));
    const bokehs = [];
    for (let i = 0; i < numBokeh; i++) {
      bokehs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 40 + Math.random() * 75,
        speedY: 0.18 + Math.random() * 0.28,
        speedX: (Math.random() - 0.5) * 0.22,
        alpha: 0.07 + Math.random() * 0.11,
        isGold: Math.random() > 0.6
      });
    }

    // ── 2. Corazones Flotantes de Rose Quartz ───────────────────────────
    const numHearts = Math.min(24, Math.floor(width / 45));
    const hearts = [];
    for (let i = 0; i < numHearts; i++) {
      hearts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseSize: 11 + Math.random() * 16,
        size: 11 + Math.random() * 16,
        speedY: 0.35 + Math.random() * 0.55,
        swaySpeed: 0.02 + Math.random() * 0.02,
        swayAmount: 0.8 + Math.random() * 1.4,
        swayAngle: Math.random() * Math.PI * 2,
        alpha: 0.24 + Math.random() * 0.42,
        rotation: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        isGold: Math.random() > 0.75
      });
    }

    // ── 3. Estrellas Prismáticas y Destellos de 4 Puntas ─────────────────
    const numStars = Math.min(28, Math.floor(width / 40));
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 2 + Math.random() * 3.8,
        speedY: 0.2 + Math.random() * 0.35,
        speedX: (Math.random() - 0.5) * 0.15,
        alpha: 0.3 + Math.random() * 0.55,
        twinkleSpeed: 0.028 + Math.random() * 0.038,
        twinklePhase: Math.random() * Math.PI * 2,
        isCross: Math.random() > 0.45
      });
    }

    // ── 4. Partículas Flotantes con Estela Orbital y Degradado Radial ────
    // Varios centros gravitacionales celestes que flotan suavemente
    const numAttractors = Math.max(3, Math.min(5, Math.floor(width / 320)));
    const orbitalSystems = [];

    for (let i = 0; i < numAttractors; i++) {
      const centerX = Math.random() * width;
      const centerY = Math.random() * height;
      const driftVx = (Math.random() - 0.5) * 0.25;
      const driftVy = -0.12 - Math.random() * 0.15;
      const satellites = [];
      const numSats = 4 + Math.floor(Math.random() * 4);

      for (let j = 0; j < numSats; j++) {
        satellites.push({
          radiusX: 25 + Math.random() * 70,
          radiusY: 15 + Math.random() * 45,
          angle: Math.random() * Math.PI * 2,
          orbitSpeed: (0.015 + Math.random() * 0.025) * (Math.random() > 0.5 ? 1 : -1),
          tilt: (Math.random() - 0.5) * 0.8,
          coreRadius: 1.5 + Math.random() * 2.2,
          glowRadius: 6 + Math.random() * 8,
          colorIdx: j % 2,
          baseAlpha: 0.35 + Math.random() * 0.45,
          trail: [] // Array de estela histórica [{x, y, alpha}]
        });
      }

      orbitalSystems.push({
        x: centerX,
        y: centerY,
        vx: driftVx,
        vy: driftVy,
        satellites
      });
    }

    // Dibujo de corazón Bezier suavizado
    const drawHeart = (c, x, y, size) => {
      c.save();
      c.translate(x, y);
      c.scale(size / 30, size / 30);
      c.beginPath();
      c.moveTo(0, 0);
      c.bezierCurveTo(-15, -15, -30, 5, 0, 30);
      c.bezierCurveTo(30, 5, 15, -15, 0, 0);
      c.closePath();
      c.restore();
    };

    // Dibujo de estrella prismática de 4 puntas
    const drawPrismStar = (c, x, y, size) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.restore();
    };

    // ── Bucle de Renderizado con Delta Time a 60 FPS Normalizados ────────
    let smoothedEnergy = 0;

    const render = (currentTime) => {
      if (!isVisible) return;

      const now = currentTime || performance.now();
      let dt = (now - lastTime) / 1000;
      lastTime = now;

      // Clamping defensivo contra picos al reanudar o caídas de frame
      if (dt > 0.1 || dt <= 0) {
        dt = 1 / 60;
      }
      const deltaScale = dt * 60; // 1.0 a 60Hz, 0.5 a 120Hz, 0.416 a 144Hz

      ctx.clearRect(0, 0, width, height);

      // Reactividad acústica suavizada con delta time
      const rawEnergy = typeof sound.getAudioEnergy === 'function' ? sound.getAudioEnergy() : 0;
      smoothedEnergy += (rawEnergy - smoothedEnergy) * Math.min(1, 0.18 * deltaScale);
      const beatBoost = smoothedEnergy * 1.25;

      // ── 1. Renderizar Orbes Bokeh (Degradado Radial) ───────────────────
      for (let i = 0; i < bokehs.length; i++) {
        const b = bokehs[i];
        b.y -= b.speedY * (1 + beatBoost * 0.45) * deltaScale;
        b.x += b.speedX * deltaScale;

        if (b.y < -b.radius * 2) {
          b.y = height + b.radius;
          b.x = Math.random() * width;
        }
        if (b.x < -b.radius * 2) b.x = width + b.radius;
        if (b.x > width + b.radius * 2) b.x = -b.radius;

        const effectiveRadius = b.radius * (1 + beatBoost * 0.18);
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, effectiveRadius);

        if (theme === 'golden' || b.isGold) {
          grad.addColorStop(0, `rgba(253, 230, 138, ${b.alpha * 1.25})`);
          grad.addColorStop(1, 'rgba(253, 230, 138, 0)');
        } else if (theme === 'midnight') {
          grad.addColorStop(0, `rgba(168, 85, 247, ${b.alpha * 1.15})`);
          grad.addColorStop(1, 'rgba(168, 85, 247, 0)');
        } else {
          grad.addColorStop(0, `rgba(254, 205, 211, ${b.alpha * 1.35})`);
          grad.addColorStop(1, 'rgba(254, 205, 211, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, effectiveRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. Renderizar Estelas Orbitales Cósmicas ────────────────────────
      for (let i = 0; i < orbitalSystems.length; i++) {
        const sys = orbitalSystems[i];
        sys.x += sys.vx * deltaScale;
        sys.y += sys.vy * (1 + beatBoost * 0.3) * deltaScale;

        if (sys.y < -120) {
          sys.y = height + 100;
          sys.x = Math.random() * width;
        }
        if (sys.x < -120) sys.x = width + 100;
        if (sys.x > width + 120) sys.x = -100;

        for (let j = 0; j < sys.satellites.length; j++) {
          const sat = sys.satellites[j];
          sat.angle += sat.orbitSpeed * (1 + beatBoost * 0.4) * deltaScale;

          // Órbita elíptica inclinada
          const cosA = Math.cos(sat.angle);
          const sinA = Math.sin(sat.angle);
          const tiltCos = Math.cos(sat.tilt);
          const tiltSin = Math.sin(sat.tilt);

          const localX = cosA * sat.radiusX;
          const localY = sinA * sat.radiusY;

          const px = sys.x + (localX * tiltCos - localY * tiltSin);
          const py = sys.y + (localX * tiltSin + localY * tiltCos);

          // Almacenar posición en estela histórica
          sat.trail.push({ x: px, y: py, alpha: sat.baseAlpha });
          const maxTrailPoints = 12;
          if (sat.trail.length > maxTrailPoints) {
            sat.trail.shift();
          }

          // Dibujar estela orbital continua atenuada
          if (sat.trail.length > 2) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(sat.trail[0].x, sat.trail[0].y);
            for (let k = 1; k < sat.trail.length; k++) {
              ctx.lineTo(sat.trail[k].x, sat.trail[k].y);
            }
            const colorPrefix = currentPalette.trailGradient[sat.colorIdx];
            ctx.strokeStyle = `${colorPrefix}0.38)`;
            ctx.lineWidth = sat.coreRadius * 0.85;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();
            ctx.restore();
          }

          // Dibujar partícula flotante con degradado radial
          const dynamicGlow = (sat.glowRadius + beatBoost * 4) * (0.85 + 0.3 * Math.sin(sat.angle));
          const pGrad = ctx.createRadialGradient(px, py, 0, px, py, dynamicGlow);
          const colBase = currentPalette.trailGradient[sat.colorIdx];
          pGrad.addColorStop(0, `${colBase}${sat.baseAlpha * 1.3})`);
          pGrad.addColorStop(0.35, `${colBase}${sat.baseAlpha * 0.55})`);
          pGrad.addColorStop(1, `${colBase}0)`);

          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.arc(px, py, dynamicGlow, 0, Math.PI * 2);
          ctx.fill();

          // Núcleo estelar brillante
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(px, py, sat.coreRadius * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 3. Renderizar Corazones Flotantes con Péndulo Físico ────────────
      for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.swayAngle += h.swaySpeed * deltaScale;
        h.y -= h.speedY * (1 + beatBoost * 1.35) * deltaScale;
        h.x += Math.sin(h.swayAngle) * h.swayAmount * deltaScale;
        h.rotation += h.rotSpeed * deltaScale;
        h.size = h.baseSize * (1 + beatBoost * 0.3);

        if (h.y < -40) {
          h.y = height + 30;
          h.x = Math.random() * width;
        }

        ctx.save();
        const dynAlpha = Math.min(0.85, h.alpha * (1 + beatBoost * 0.75));
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rotation);
        ctx.translate(-h.x, -h.y);

        drawHeart(ctx, h.x, h.y, h.size);

        if (theme === 'midnight') {
          ctx.fillStyle = `rgba(216, 180, 254, ${dynAlpha * 0.65})`;
          ctx.shadowColor = '#c084fc';
        } else if (theme === 'golden' || h.isGold) {
          ctx.fillStyle = `rgba(253, 230, 138, ${dynAlpha * 0.75})`;
          ctx.shadowColor = '#fbbf24';
        } else {
          ctx.fillStyle = `rgba(244, 63, 94, ${dynAlpha * 0.65})`;
          ctx.shadowColor = '#fda4af';
        }

        ctx.shadowBlur = 6 + beatBoost * 8;
        ctx.fill();
        ctx.restore();
      }

      // ── 4. Renderizar Estrellas Prismáticas y Destellos de Oro ──────────
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed * deltaScale;
        s.y -= s.speedY * (1 + beatBoost * 0.75) * deltaScale;
        s.x += s.speedX * deltaScale;

        if (s.y < -20) {
          s.y = height + 15;
          s.x = Math.random() * width;
        }

        const twinkle = 0.5 + 0.5 * Math.sin(s.twinklePhase);
        const currentAlpha = Math.min(0.95, (s.alpha * 0.7 + twinkle * 0.3) * (1 + beatBoost * 0.6));
        const currentSize = s.size * (0.8 + twinkle * 0.4) * (1 + beatBoost * 0.3);

        ctx.save();
        if (s.isCross) {
          drawPrismStar(ctx, s.x, s.y, currentSize * 2);
          ctx.fillStyle = theme === 'golden'
            ? `rgba(254, 240, 138, ${currentAlpha})`
            : `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.shadowBlur = 8 + beatBoost * 12;
          ctx.shadowColor = '#fef08a';
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253, 230, 138, ${currentAlpha})`;
          ctx.shadowBlur = 6 + beatBoost * 10;
          ctx.shadowColor = '#d4af37';
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // ── Gestión del ciclo de vida y visibilidad de pestaña ───────────────
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        if (!isVisible) {
          isVisible = true;
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Iniciar el render inicial
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        touchAction: 'none'
      }}
    />
  );
}
