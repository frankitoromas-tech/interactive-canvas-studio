import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../../utils/soundEffects';

export default function ThreeDHeart({ size = 260, color = '#f43f5e' }) {
  const canvasRef = useRef(null);
  const rotationRef = useRef({ x: 0.2, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Generación de puntos 3D de un corazón paramétrico
    const points = [];
    const numPoints = 650;
    for (let i = 0; i < numPoints; i++) {
      const u = Math.PI * (Math.random() * 2 - 1);
      const v = Math.PI * (Math.random() - 0.5);
      
      const x = 16 * Math.pow(Math.sin(u), 3);
      const y = -(13 * Math.cos(u) - 5 * Math.cos(2 * u) - 2 * Math.cos(3 * u) - Math.cos(4 * u));
      const z = v * 8 * Math.sin(u);

      points.push({
        x: x * 0.45,
        y: y * 0.45,
        z: z * 0.45,
        size: 1.5 + Math.random() * 1.8,
        colorHue: 340 + Math.random() * 30,
        alpha: 0.4 + Math.random() * 0.6
      });
    }

    const render = () => {
      time += 0.025;
      if (!isDraggingRef.current) {
        rotationRef.current.y += 0.015;
        rotationRef.current.x = 0.2 + Math.sin(time * 0.8) * 0.1;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 10;
      const scaleFactor = 6.8 + Math.sin(time * 2.5) * 0.5;

      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      const projected = points.map(p => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const fov = 350;
        const perspective = fov / (fov + z2 * scaleFactor);

        return {
          x: cx + x1 * scaleFactor * perspective,
          y: cy + y1 * scaleFactor * perspective,
          z: z2,
          size: p.size * perspective,
          colorHue: p.colorHue,
          alpha: p.alpha * perspective
        };
      });

      projected.sort((a, b) => a.z - b.z);

      projected.forEach(p => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.colorHue}, 90%, 65%, ${p.alpha})`;
        ctx.shadowColor = 'rgba(244, 63, 94, 0.7)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      });

      ctx.save();
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 60);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(0.5, 'rgba(244, 63, 94, 0.15)');
      grad.addColorStop(1, 'rgba(244, 63, 94, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
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
    lastMousePosRef.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - lastMousePosRef.current.x;
    const dy = clientY - lastMousePosRef.current.y;

    rotationRef.current.y += dx * 0.012;
    rotationRef.current.x += dy * 0.012;

    lastMousePosRef.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none my-2">
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
        style={{ width: `${size}px`, height: `${size}px`, maxWidth: '90vw' }}
      />
      <span className="text-xs text-rose-700/80 font-quicksand font-semibold mt-1">
        ✨ Gira el corazón 3D con tu dedo o mouse
      </span>
    </div>
  );
}
