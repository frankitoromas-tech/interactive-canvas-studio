import React, { useState } from 'react';
import { confetti } from '../../utils/confettiEngine';
import { sound } from '../../utils/soundEffects';
import ThreeDHeart from './ThreeDHeart';
import { useI18n } from '../../i18n/I18nContext';

export default function CelebrationHero({ recipientName = 'Luyuromo', onOpenCertificate, onOpenShare }) {
  const { t, greekTrinity } = useI18n();
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
    <div className="w-full relative pt-2 pb-8 text-center animate-slide-up flex flex-col items-center">
      
      {/* Lluvia de Pétalos de Rosas 3D con Físicas Realistas de Caída y Viento */}
      {rainingRoses && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" style={{ pointerEvents: 'none' }}>
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="absolute select-none pointer-events-none"
              style={{
                left: `${(i * 3.6 + Math.sin(i) * 5) % 100}%`,
                top: '-60px',
                fontSize: `${1.4 + (i % 3) * 0.5}rem`,
                animation: `roseFlutter ${4 + (i % 4)}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
                animationDelay: `${(i * 0.18)}s`,
                filter: 'drop-shadow(0 4px 6px rgba(112, 11, 43, 0.25))'
              }}
            >
              {i % 4 === 0 ? '🌹' : i % 4 === 1 ? '🌸' : i % 4 === 2 ? '✨' : '💖'}
            </div>
          ))}
          <style>{`
            @keyframes roseFlutter {
              0% { 
                transform: translate3d(0, 0, 0) rotate(0deg) rotateY(0deg); 
                opacity: 0; 
              }
              15% { opacity: 1; }
              50% { 
                transform: translate3d(${15 + Math.random() * 25}px, 50vh, 0) rotate(180deg) rotateY(180deg); 
              }
              85% { opacity: 0.9; }
              100% { 
                transform: translate3d(${-20 + Math.random() * 30}px, 108vh, 0) rotate(360deg) rotateY(360deg); 
                opacity: 0; 
              }
            }
          `}</style>
        </div>
      )}

      {/* Tarjeta de Celebración Aero-espacial */}
      <div className="glass-card-strong max-w-3xl w-full p-6 sm:p-12 mb-6 relative overflow-hidden shadow-2xl flex flex-col items-center border border-white/90">
        
        {/* Distintivo de Prestigio Real */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/10 via-amber-300/15 to-rose-500/10 border border-amber-300/40 py-1.5 px-5 rounded-full mb-4 shadow-sm">
          <span className="text-amber-500 text-xs sm:text-sm animate-pulse">👑</span>
          <span className="text-rose-950 text-xs sm:text-sm font-extrabold uppercase tracking-widest font-outfit">
            {t('hero.badgeTitle', {}, 'San Valentín Oficial & Conectado')}
          </span>
          <span className="text-amber-500 text-xs sm:text-sm animate-pulse">👑</span>
        </div>

        {/* Modelo 3D de Corazón Interactivo */}
        <ThreeDHeart size={260} />

        {/* Título de Celebración en Caligrafía Exquisita */}
        <h1 
          className="text-3xl sm:text-5xl font-bold text-rose-950 font-pacifico mb-2 tracking-wide"
          style={{ textShadow: '0 2px 10px rgba(112, 11, 43, 0.14)' }}
        >
          {t('hero.title', { name: recipientName }, `¡Dijo que sí, ${recipientName}!`)}
        </h1>
        
        <p className="text-xl sm:text-3xl text-rose-700 font-dancing max-w-xl mx-auto mb-6 font-bold leading-relaxed">
          {t('hero.quote', {}, '"Cada latido de mi corazón lleva grabado tu nombre para siempre."')}
        </p>

        {/* Tríada de Frankosyni Integrada Armónicamente */}
        <div className="flex items-center justify-center gap-2 mb-6 px-3 py-1 rounded-full bg-rose-50/80 border border-rose-200 text-rose-800 text-xs font-serif shadow-sm">
          <span className="font-bold text-rose-600">{greekTrinity.agape.term}</span>
          <span className="opacity-40">·</span>
          <span className="font-bold text-amber-600">{greekTrinity.philia.term}</span>
          <span className="opacity-40">·</span>
          <span className="font-bold text-purple-600">{greekTrinity.techne.term}</span>
        </div>

        {/* Acciones de Celebración con Físicas Spring */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 w-full">
          <button
            onClick={triggerConfetti}
            className="btn-primary text-xs sm:text-sm shadow-lg"
          >
            <span className="text-amber-300">🎉</span>
            <span>{t('hero.btnConfetti', {}, '¡Más Confeti!')}</span>
          </button>

          <button
            onClick={toggleRoseRain}
            className="btn-secondary text-xs sm:text-sm min-h-[44px]"
          >
            <span>{rainingRoses ? `🌹 ${t('hero.btnRosesStop', {}, 'Detener Rosas')}` : `🌹 ${t('hero.btnRosesRain', {}, 'Lluvia de Rosas')}`}</span>
          </button>

          {onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="btn-secondary text-xs sm:text-sm text-amber-900 border-amber-300/70 hover:bg-amber-50/80"
            >
              <span>🏆 {t('hero.btnCertificate', {}, 'Ver Certificado Oficial')}</span>
            </button>
          )}

          {onOpenShare && (
            <button
              onClick={onOpenShare}
              className="btn-secondary text-xs sm:text-sm text-emerald-800 border-emerald-300/70 hover:bg-emerald-50/80"
            >
              <span>📲 {t('hero.btnShare', {}, 'Compartir en WhatsApp')}</span>
            </button>
          )}
        </div>

        {/* Estadísticas de Amor en Tarjetas Frosted Glass */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full mt-8 pt-6 border-t border-rose-200/60">
          <div className="p-3.5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/90 shadow-sm transition-transform duration-300 hover:scale-105">
            <span className="block text-2xl font-black text-rose-700 font-outfit">100%</span>
            <span className="text-xs text-rose-900 font-semibold tracking-wide">
              {t('hero.stats.compatibility', {}, 'Compatibilidad')}
            </span>
          </div>
          <div className="p-3.5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/90 shadow-sm transition-transform duration-300 hover:scale-105">
            <span className="block text-2xl font-black text-rose-700 font-outfit">∞</span>
            <span className="text-xs text-rose-900 font-semibold tracking-wide">
              {t('hero.stats.smiles', {}, 'Sonrisas Juntos')}
            </span>
          </div>
          <div className="p-3.5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/90 shadow-sm transition-transform duration-300 hover:scale-105">
            <span className="block text-2xl font-black text-rose-700 font-outfit">14 Feb</span>
            <span className="text-xs text-rose-900 font-semibold tracking-wide">
              {t('hero.stats.date', {}, 'Cita Soñada')}
            </span>
          </div>
          <div className="p-3.5 bg-white/75 backdrop-blur-md rounded-2xl border border-white/90 shadow-sm transition-transform duration-300 hover:scale-105">
            <span className="block text-2xl font-black text-rose-700 font-outfit">Todo</span>
            <span className="text-xs text-rose-900 font-semibold tracking-wide">
              {t('hero.stats.love', {}, 'Mi Amor Eterno')}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
