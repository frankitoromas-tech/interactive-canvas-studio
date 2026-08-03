import React, { useState } from 'react';
import { confetti } from '../../utils/confettiEngine';
import { sound } from '../../utils/soundEffects';
import ThreeDHeart from './ThreeDHeart';

export default function CelebrationHero({ recipientName = 'Luyuromo', onOpenCertificate, onOpenShare }) {
  const [rainingRoses, setRainingRoses] = useState(false);

  const triggerConfetti = () => {
    sound.playFanfare();
    confetti.cannonCelebration();
  };

  const toggleRoseRain = () => {
    sound.playChime();
    setRainingRoses(prev => !prev);
  };

  return (
    <div className="w-full relative pt-2 pb-6 text-center animate-slide-up flex flex-col items-center">
      
      {/* Lluvia de rosas CSS si está activa */}
      {rainingRoses && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl select-none"
              style={{
                left: `${(i * 4.3) % 100}%`,
                top: '-50px',
                animation: `roseFall ${3 + (i % 4)}s linear infinite`,
                animationDelay: `${(i * 0.25)}s`
              }}
            >
              🌹
            </div>
          ))}
          <style>{`
            @keyframes roseFall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Banner Principal Centrado */}
      <div className="glass-card-strong max-w-3xl w-full p-6 sm:p-10 mb-6 relative overflow-hidden shadow-2xl flex flex-col items-center">
        
        {/* Distintivo superior */}
        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/30 py-1 px-4 rounded-full mb-3">
          <span className="text-rose-600 animate-pulse">💖</span>
          <span className="text-rose-800 text-xs sm:text-sm font-semibold uppercase tracking-wider font-outfit">
            San Valentín Oficial & Conectado
          </span>
          <span className="text-rose-600 animate-pulse">💖</span>
        </div>

        {/* Modelo 3D de Corazón Interactivo */}
        <ThreeDHeart size={240} />

        {/* Título Romántico */}
        <h1 className="text-3xl sm:text-5xl font-bold text-rose-900 font-pacifico mb-2">
          ¡Dijo que sí, {recipientName}!
        </h1>
        
        <p className="text-lg sm:text-2xl text-rose-700 font-dancing max-w-xl mx-auto mb-6 font-bold">
          "Cada latido de mi corazón lleva grabado tu nombre."
        </p>

        {/* Acciones de Celebración Rápidas */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            onClick={triggerConfetti}
            className="btn-primary text-xs sm:text-sm shadow-md"
          >
            🎉 ¡Más Confeti!
          </button>

          <button
            onClick={toggleRoseRain}
            className="btn-secondary text-xs sm:text-sm"
          >
            {rainingRoses ? '🌹 Detener Rosas' : '🌹 Lluvia de Rosas'}
          </button>

          {onOpenShare && (
            <button
              onClick={onOpenShare}
              className="btn-secondary text-xs sm:text-sm text-emerald-800 border-emerald-300 hover:bg-emerald-50"
            >
              📲 Compartir en WhatsApp
            </button>
          )}
        </div>

        {/* Estadísticas de Amor */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-8 pt-6 border-t border-rose-200/60">
          <div className="p-3 bg-white/70 rounded-xl">
            <span className="block text-2xl font-bold text-rose-600 font-outfit">100%</span>
            <span className="text-xs text-rose-800 font-medium">Compatibilidad</span>
          </div>
          <div className="p-3 bg-white/70 rounded-xl">
            <span className="block text-2xl font-bold text-rose-600 font-outfit">∞</span>
            <span className="text-xs text-rose-800 font-medium">Sonrisas Juntos</span>
          </div>
          <div className="p-3 bg-white/70 rounded-xl">
            <span className="block text-2xl font-bold text-rose-600 font-outfit">14 Feb</span>
            <span className="text-xs text-rose-800 font-medium">Cita de Ensueño</span>
          </div>
          <div className="p-3 bg-white/70 rounded-xl">
            <span className="block text-2xl font-bold text-rose-600 font-outfit">Todo</span>
            <span className="text-xs text-rose-800 font-medium">Mi Amor Eterno</span>
          </div>
        </div>

      </div>

    </div>
  );
}
