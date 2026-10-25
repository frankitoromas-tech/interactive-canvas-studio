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
    const ctx = canvas.getContext('2d');
    let animationFrameId;
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

      // Proyección matemática 3D del corazón
      const projected = heartPoints.map(p => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const fov = 380;
        const perspective = fov / (fov + z2 * scaleFactor);

        return {
          x: cx + x1 * scaleFactor * perspective,
          y: cy + y1 * scaleFactor * perspective,
          z: z2,
          size: p.size * perspective * (1 + totalBeatBoost * 0.3),
          colorHue: p.colorHue,
          isGold: p.isGold,
          alpha: p.alpha * perspective,
          isOrbit: false
        };
      });

      // Proyección del doble anillo orbital
      orbitPoints.forEach(op => {
        op.angle += op.speed;
        const ox = Math.cos(op.angle) * op.radius;
        const oz = Math.sin(op.angle) * op.radius;
        const oy = op.yOffset + Math.sin(op.angle * 2) * 1.6;

        let x1 = ox * cosY - oz * sinY;
        let z1 = oz * cosY + ox * sinY;
        let y1 = oy * cosX - z1 * sinX;
        let z2 = z1 * cosX + oy * sinX;

        const fov = 380;
        const perspective = fov / (fov + z2 * scaleFactor);

        projected.push({
          x: cx + x1 * scaleFactor * perspective,
          y: cy + y1 * scaleFactor * perspective,
          z: z2,
          size: op.size * perspective,
          colorHue: op.colorHue,
          isGold: op.type === 'gold',
          alpha: 0.88 * perspective,
          isOrbit: true
        });
      });

      // Ordenar por profundidad Z (Algoritmo del Pintor)
      projected.sort((a, b) => a.z - b.z);

      projected.forEach(p => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.7, p.size), 0, Math.PI * 2);
        
        if (p.isOrbit) {
          if (p.isGold) {
            ctx.fillStyle = `hsla(${p.colorHue}, 100%, 75%, ${p.alpha})`;
            ctx.shadowColor = 'rgba(251, 191, 36, 0.9)';
            ctx.shadowBlur = 10;
          } else {
            ctx.fillStyle = `hsla(${p.colorHue}, 90%, 80%, ${p.alpha})`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
            ctx.shadowBlur = 8;
          }
        } else if (p.isGold) {
          ctx.fillStyle = `hsla(${p.colorHue}, 95%, 70%, ${p.alpha})`;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
          ctx.shadowBlur = 9;
        } else {
          ctx.fillStyle = `hsla(${p.colorHue}, 92%, 62%, ${p.alpha})`;
          ctx.shadowColor = 'rgba(225, 29, 72, 0.75)';
          ctx.shadowBlur = 8;
        }
        
        ctx.fill();
        ctx.restore();
      });

      // Halo Luminoso Central de Oro y Rosa Cuarzo
      ctx.save();
      const glowGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, 80);
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      glowGrad.addColorStop(0.3, 'rgba(253, 230, 138, 0.2)');
      glowGrad.addColorStop(0.7, 'rgba(225, 29, 72, 0.12)');
      glowGrad.addColorStop(1, 'rgba(225, 29, 72, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastPosRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - lastPosRef.current.x;
    const dy = clientY - lastPosRef.current.y;

    rotationRef.current.y += dx * 0.012;
    rotationRef.current.x += dy * 0.012;
    velocityRef.current = { x: dy * 0.003, y: dx * 0.003 };

    lastPosRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none my-1">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        className="cursor-grab active:cursor-grabbing transition-transform duration-300 transform hover:scale-105"
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
