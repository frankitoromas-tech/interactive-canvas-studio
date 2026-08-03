import React, { useState } from 'react';
import { confetti } from '../utils/confettiEngine';
import { sound } from '../utils/soundEffects';

export default function CelebrationHero({ recipientName = 'Luyuromo', onOpenCertificate }) {
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
    <div className="relative pt-6 pb-10 text-center animate-slide-up">
      
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

      {/* Banner Principal */}
      <div className="glass-card-strong max-w-4xl mx-auto p-8 md:p-12 mb-8 relative overflow-hidden shadow-2xl">
        
        {/* Adorno superior */}
        <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/30 py-1 px-5 rounded-full mb-6">
          <span className="text-rose-600 animate-pulse">💖</span>
          <span className="text-rose-800 text-sm font-semibold uppercase tracking-wider font-outfit">
            San Valentín Oficial & Conectado
          </span>
          <span className="text-rose-600 animate-pulse">💖</span>
        </div>

        {/* Emoticonos y Títulos */}
        <div className="text-6xl md:text-8xl mb-4 animate-heartbeat-glow select-none">
          🥰
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-rose-900 font-pacifico mb-3">
          ¡Sabía que dirías que sí, {recipientName}!
        </h1>
        
        <p className="text-xl md:text-2xl text-rose-700 font-dancing max-w-2xl mx-auto mb-8 font-bold">
          "Cada segundo a tu lado convierte los días ordinarios en recuerdos extraordinarios."
        </p>

        {/* Acciones Rápidas */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={triggerConfetti}
            className="btn-primary text-base md:text-lg shadow-lg"
          >
            🎉 ¡Más Confeti & Magia!
          </button>

          <button
            onClick={toggleRoseRain}
            className="btn-secondary text-base md:text-lg"
          >
            {rainingRoses ? '🌹 Detener Rosas' : '🌹 Lluvia de Rosas'}
          </button>

          {onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="btn-secondary text-base md:text-lg text-amber-800 border-amber-300 hover:bg-amber-50"
            >
              📜 Ver Certificado Oficial
            </button>
          )}
        </div>

        {/* Estadísticas de Amor Lindas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-rose-200/60">
          <div className="p-3 bg-white/60 rounded-2xl">
            <span className="block text-2xl md:text-3xl font-bold text-rose-600 font-outfit">100%</span>
            <span className="text-xs md:text-sm text-rose-800 font-medium">Compatibilidad de Amor</span>
          </div>
          <div className="p-3 bg-white/60 rounded-2xl">
            <span className="block text-2xl md:text-3xl font-bold text-rose-600 font-outfit">∞</span>
            <span className="text-xs md:text-sm text-rose-800 font-medium">Sonrisas Compartidas</span>
          </div>
          <div className="p-3 bg-white/60 rounded-2xl">
            <span className="block text-2xl md:text-3xl font-bold text-rose-600 font-outfit">14 Feb</span>
            <span className="text-xs md:text-sm text-rose-800 font-medium">Nuestra Cita Especial</span>
          </div>
          <div className="p-3 bg-white/60 rounded-2xl">
            <span className="block text-2xl md:text-3xl font-bold text-rose-600 font-outfit">Todo</span>
            <span className="text-xs md:text-sm text-rose-800 font-medium">Mi Cariño Para Ti</span>
          </div>
        </div>

      </div>

    </div>
  );
}
