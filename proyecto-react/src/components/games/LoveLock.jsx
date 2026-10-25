import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { confetti } from '../../utils/confettiEngine';
import { haptic } from '../../utils/haptics';
import { safeStorage, sanitizeInput } from '../../utils/security';

export default function LoveLock({ recipientName = 'Luyuromo', senderName = 'Tu Amor' }) {
  const [isLocked, setIsLocked] = useState(() => {
    return safeStorage.getItem('sv_love_locked') === 'true';
  });

  const [initials, setInitials] = useState(() => {
    const saved = safeStorage.getItem('sv_lock_initials');
    return saved ? sanitizeInput(saved, 10, 'L + F') : 'L + F';
  });

  const [date, setDate] = useState(() => {
    const saved = safeStorage.getItem('sv_lock_date');
    return saved ? sanitizeInput(saved, 20, 'Por Siempre') : 'Por Siempre';
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleLock = () => {
    if (!isLocked) {
      haptic.medium();
      sound.playLockClick();
      confetti.cannonCelebration();
      setIsLocked(true);
      safeStorage.setItem('sv_love_locked', 'true');
      safeStorage.setItem('sv_lock_initials', initials);
      safeStorage.setItem('sv_lock_date', date);
    } else {
      haptic.light();
      sound.playPop();
      setIsLocked(false);
      safeStorage.setItem('sv_love_locked', 'false');
    }
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Encabezado */}
      <div className="inline-flex items-center gap-2 bg-amber-100/90 px-4 py-1.5 rounded-full mb-3 border border-amber-300">
        <span>🔐</span>
        <span className="text-xs sm:text-sm font-bold text-amber-900 font-outfit uppercase tracking-wider">
          Puente de los Enamorados
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-amber-950 font-pacifico mb-2">
        Candado de Amor Eterno
      </h2>
      <p className="text-sm sm:text-base text-amber-900/80 font-quicksand mb-8 max-w-md">
        Como en el emblemático puente de París, graba nuestro amor y sella este candado digital para toda la eternidad.
      </p>

      {/* Visual del Candado 3D */}
      <div className="relative my-4 flex flex-col items-center select-none cursor-pointer" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggleLock(); } }} onClick={handleToggleLock}>
        
        {/* Grillete */}
        <div className={`love-lock-shackle ${isLocked ? 'locked' : 'unlocked'}`} />

        {/* Cuerpo del candado dorado */}
        <div className="love-lock-body">
          <span className="text-2xl sm:text-3xl font-bold text-amber-950 font-cinzel tracking-widest drop-shadow-sm">
            {initials}
          </span>
          <span className="text-xs sm:text-sm font-semibold text-amber-900/90 font-outfit mt-1">
            {date}
          </span>
          <div className="w-4 h-6 bg-amber-950 rounded-full mt-3 flex items-center justify-center shadow-inner">
            <div className="w-1.5 h-3 bg-amber-900 rounded-full" />
          </div>
        </div>

        <span className="absolute -top-4 -right-4 text-3xl animate-bounce">✨</span>
      </div>

      {/* Botón de Acción */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          onClick={handleToggleLock}
          className={`btn-primary ${
            isLocked
              ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/40 text-amber-50'
              : 'shadow-2xl'
          }`}
        >
          {isLocked ? '🔓 Abrir Candado' : '🗝️ Girar Llave & Sellar Amor'}
        </button>

        {isLocked ? (
          <p className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100/90 py-1.5 px-4 rounded-full border border-emerald-300 animate-pop-in">
            ✨ ¡Nuestro amor ha quedado sellado bajo siete llaves! ✨
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Toca el candado o el botón para sellarlo.
          </p>
        )}
      </div>

      {/* Personalización de Grabado */}
      <div className="mt-8 pt-6 border-t border-amber-200/60 w-full max-w-sm">
        <button
          onClick={() => setIsEditing(e => !e)}
          className="text-xs text-amber-800 underline font-semibold cursor-pointer min-h-[44px] py-2 px-3 inline-flex items-center justify-center"
        >
          {isEditing ? 'Ocultar Personalización' : '⚙️ Personalizar Grabado del Candado'}
        </button>

        {isEditing && (
          <div className="mt-4 flex flex-col gap-3 text-left animate-slide-up">
            <div>
              <label className="text-xs font-bold text-amber-900 block mb-1">Iniciales o Nombres:</label>
              <input
                type="text"
                value={initials}
                maxLength={12}
                onChange={(e) => setInitials(sanitizeInput(e.target.value, 12, 'L + F'))}
                className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-sm bg-white/90"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-amber-900 block mb-1">Fecha o Mensaje Corto:</label>
              <input
                type="text"
                value={date}
                maxLength={20}
                onChange={(e) => setDate(sanitizeInput(e.target.value, 20, 'Por Siempre'))}
                className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-sm bg-white/90"
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
