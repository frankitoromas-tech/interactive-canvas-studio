import React, { useEffect, useRef } from 'react';
import { sound } from '../../utils/soundEffects';

export default function ThreeDHeart({ size = 280 }) {
  const canvasRef = useRef(null);
  const rotationRef = useRef({ x: 0.2, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.012 });
  const isDraggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId = null;
    let time = 0;

    // Generar nube de partículas 3D del corazón paramétrico con paleta Haute Couture
    const heartPoints = [];
    const numHeartPoints = 850;
    for (let i = 0; i < numHeartPoints; i++) {
      const u = Math.PI * (Math.random() * 2 - 1);
      const v = Math.PI * (Math.random() - 0.5);
      
      const x = 16 * Math.pow(Math.sin(u), 3);
      const y = -(13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u));
      const z = v * 8.5 * Math.sin(u);

      const isGoldParticle = Math.random() < 0.18;

      heartPoints.push({
        x: x * 0.46,
        y: y * 0.46,
        z: z * 0.46,
        size: 1.4 + Math.random() * 1.8,
        colorHue: isGoldParticle ? 45 + Math.random() * 15 : 335 + Math.random() * 30,
        isGold: isGoldParticle,
        alpha: 0.5 + Math.random() * 0.5
      });
    }

    // Anillo orbital 1: Corona de Oro Champán
    const orbitPoints = [];
    const numOrbitPoints = 90;
    for (let i = 0; i < numOrbitPoints; i++) {
      const angle = (i / numOrbitPoints) * Math.PI * 2;
      const radius = 12.5 + Math.random() * 2;
      orbitPoints.push({
        angle,
        radius,
        speed: 0.016 + Math.random() * 0.008,
        yOffset: (Math.random() - 0.5) * 3,
        size: 1.2 + Math.random() * 1.8,
        colorHue: 44 + Math.random() * 10,
        type: 'gold'
      });
    }

    // Anillo orbital 2: Polvo de Diamante Blanco & Rose Quartz
    const numRing2Points = 60;
    for (let i = 0; i < numRing2Points; i++) {
      const angle = (i / numRing2Points) * Math.PI * 2;
      const radius = 10.5 + Math.random() * 1.5;
      orbitPoints.push({
        angle,
        radius,
        speed: -(0.014 + Math.random() * 0.006),
        yOffset: (Math.random() - 0.5) * 2.5,
        size: 1.0 + Math.random() * 1.5,
        colorHue: 320 + Math.random() * 25,
        type: 'quartz'
      });
    }

    const totalPoints = numHeartPoints + numOrbitPoints + numRing2Points;
    // Pool pre-alocado para evitar Garbage Collection churn (60 fps sin micro-pausas)
    const projectedPool = new Array(totalPoints);
    for (let i = 0; i < totalPoints; i++) {
      projectedPool[i] = { x: 0, y: 0, z: 0, size: 0, colorHue: 0, isGold: false, alpha: 0, isOrbit: false, type: '' };
    }

    const render = () => {
      time += 0.024;

      // Inercia y amortiguación física suave
      if (!isDraggingRef.current) {
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += velocityRef.current.x;
        velocityRef.current.x *= 0.94; // Fricción spring
        velocityRef.current.y = 0.012 + (velocityRef.current.y - 0.012) * 0.94;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 8;
      
      // Pulso cardiovascular sincronizado con el analizador de audio
      const audioEnergy = typeof sound.getAudioEnergy === 'function' ? sound.getAudioEnergy() : 0;
      const beat = Math.sin(time * 3.2);
      const naturalBeat = beat > 0.55 ? (beat - 0.55) * 0.28 : 0;
      const totalBeatBoost = naturalBeat + audioEnergy * 0.45;
      const scaleFactor = (7.2 + Math.sin(time * 1.5) * 0.25) * (1 + totalBeatBoost);

      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const fov = 380;

      let idx = 0;
      // Proyección matemática 3D del corazón en pool reutilizado
      for (let i = 0; i < numHeartPoints; i++) {
        const p = heartPoints[i];
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;
        const perspective = fov / (fov + z2 * scaleFactor);

        const target = projectedPool[idx++];
        target.x = cx + x1 * scaleFactor * perspective;
        target.y = cy + y1 * scaleFactor * perspective;
        target.z = z2;
        target.size = Math.max(0.7, p.size * perspective * (1 + totalBeatBoost * 0.3));
        target.colorHue = p.colorHue;
        target.isGold = p.isGold;
        target.alpha = p.alpha * perspective;
        target.isOrbit = false;
        target.type = '';
      }

      // Proyección del doble anillo orbital
      for (let i = 0; i < orbitPoints.length; i++) {
        const op = orbitPoints[i];
        op.angle += op.speed;
        const ox = Math.cos(op.angle) * op.radius;
        const oz = Math.sin(op.angle) * op.radius;
        const oy = op.yOffset + Math.sin(op.angle * 2) * 1.6;

        const x1 = ox * cosY - oz * sinY;
        const z1 = oz * cosY + ox * sinY;
        const y1 = oy * cosX - z1 * sinX;
        const z2 = z1 * cosX + oy * sinX;
        const perspective = fov / (fov + z2 * scaleFactor);

        const target = projectedPool[idx++];
        target.x = cx + x1 * scaleFactor * perspective;
        target.y = cy + y1 * scaleFactor * perspective;
        target.z = z2;
        target.size = Math.max(0.7, op.size * perspective);
        target.colorHue = op.colorHue;
        target.isGold = op.type === 'gold';
        target.alpha = 0.88 * perspective;
        target.isOrbit = true;
        target.type = op.type;
      }

      // Ordenar por profundidad Z (Algoritmo del Pintor)
      projectedPool.sort((a, b) => a.z - b.z);

      // Renderizado de partículas optimizado en lotes
      // Separación en 4 lotes para aplicar shadowBlur y fillStyle por lote,
      // reduciendo miles de cambios de contexto a solo 4 llamadas atómicas.
      ctx.save();
      
      // Lote 1: Corazón Rosa / Rubí
      ctx.shadowColor = 'rgba(225, 29, 72, 0.75)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = 'rgba(244, 63, 94, 0.78)';
      ctx.beginPath();
      for (let i = 0; i < totalPoints; i++) {
        const p = projectedPool[i];
        if (!p.isOrbit && !p.isGold) {
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Lote 2: Corazón Oro Champán
      ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
      ctx.shadowBlur = 9;
      ctx.fillStyle = 'rgba(253, 230, 138, 0.85)';
      ctx.beginPath();
      for (let i = 0; i < totalPoints; i++) {
        const p = projectedPool[i];
        if (!p.isOrbit && p.isGold) {
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Lote 3: Órbita Corona Oro
      ctx.shadowColor = 'rgba(251, 191, 36, 0.9)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
      ctx.beginPath();
      for (let i = 0; i < totalPoints; i++) {
        const p = projectedPool[i];
        if (p.isOrbit && p.type === 'gold') {
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // Lote 4: Órbita Diamante Cuarzo
      ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      for (let i = 0; i < totalPoints; i++) {
        const p = projectedPool[i];
        if (p.isOrbit && p.type === 'quartz') {
          ctx.moveTo(p.x + p.size, p.y);
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      ctx.restore();

      // Halo Luminoso Central de Oro y Rosa Cuarzo
      ctx.save();
      const glowGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 80);
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      glowGrad.addColorStop(0.3, 'rgba(253, 230, 138, 0.18)');
      glowGrad.addColorStop(0.7, 'rgba(225, 29, 72, 0.10)');
      glowGrad.addColorStop(1, 'rgba(225, 29, 72, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Detección de pestaña activa/inactiva para ahorro 100% de CPU/GPU en segundo plano
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else {
        if (!animationFrameId) {
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch (_) {}
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;

    rotationRef.current.y += dx * 0.012;
    rotationRef.current.x += dy * 0.012;
    velocityRef.current = { x: dy * 0.003, y: dx * 0.003 };

    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch (_) {}
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none my-1">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="cursor-grab active:cursor-grabbing transition-transform duration-300 transform hover:scale-105 touch-none"
        style={{ width: `${size}px`, height: `${size}px`, maxWidth: '85vw' }}
      />
      <span className="inline-flex items-center gap-1.5 text-xs text-rose-800/80 font-quicksand font-bold tracking-wide mt-1">
        <span className="text-amber-500">✨</span>
        <span>Gira el corazón cósmico en 3D</span>
        <span className="text-amber-500">✨</span>
      </span>
    </div>
  );
}
