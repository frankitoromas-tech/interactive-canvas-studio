import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sound } from '../../utils/soundEffects';
import { confetti } from '../../utils/confettiEngine';
import { haptic } from '../../utils/haptics';
import { useI18n } from '../../i18n/I18nContext';

export default function ValentineQuestion({ recipientName = 'Luyuromo', onAccept }) {
  const { t } = useI18n();
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const containerRef = useRef(null);
  const noBtnRef = useRef(null);

  const noPhrases = [
    "No",
    "¿Estás 100% segura? 🥺",
    "¡Piénsalo otra vez, mi amor! ✨",
    "¿De verdad me harás esto? 💔",
    "¡Te compro tus chocolates y postres favoritos! 🍫",
    "¡Un masajito incluido si dices que sí! 💆‍♀️",
    "Error 404: El botón 'No' ha dejado de funcionar 🤖",
    "¡Mira qué bonito está el botón de SÍ! 👉",
    "Cuidado... ¡si tocas aquí se pone triste un gatito! 🐱",
    "¡Última oportunidad antes de que el botón SÍ llene la pantalla! 💖",
    "Ya no te resistas más... ¡di que SÍ! 🥰"
  ];

  const reactions = [
    "💖 Esperando tu tierna respuesta con el corazón ilusionado...",
    "🥺 ¿Un 'No'? ¡Seguro fue un toque involuntario!",
    "🧐 Mis cálculos confirman que en el fondo deseas decir SÍ...",
    "🍫 El soborno con postres gourmet y mimos sigue en pie...",
    "✨ El amor siempre triunfa, ¡el botón de SÍ te está esperando!",
    "🚀 El botón SÍ tiene superpoderes magnéticos irresistibles..."
  ];

  const yesScale = 1 + Math.min(noCount * 0.16, 1.4);
  const currentPhrase = noPhrases[Math.min(noCount, noPhrases.length - 1)];
  const currentReaction = reactions[Math.min(Math.floor(noCount / 2), reactions.length - 1)];

  // Evasión magnética con físicas suaves y límites seguros
  const executeDodge = useCallback((fromX, fromY) => {
    try {
      haptic.error();
      sound.playDodge();
    } catch (err) {}

    const maxDistanceX = Math.min(window.innerWidth * 0.32, 160);
    const maxDistanceY = Math.min(window.innerHeight * 0.22, 100);

    // Calcular vector de repulsión alejándose del cursor o salto aleatorio
    let targetX = (Math.random() * 2 - 1) * maxDistanceX;
    let targetY = (Math.random() * 2 - 1) * maxDistanceY;

    if (fromX !== undefined && fromY !== undefined && noBtnRef.current) {
      const rect = noBtnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = centerX - fromX;
      const dy = centerY - fromY;
      const length = Math.sqrt(dx * dx + dy * dy) || 1;
      
      targetX = (dx / length) * (80 + Math.random() * 80);
      targetY = (dy / length) * (60 + Math.random() * 60);

      // Clamp a rango permitido
      targetX = Math.max(-maxDistanceX, Math.min(maxDistanceX, targetX));
      targetY = Math.max(-maxDistanceY, Math.min(maxDistanceY, targetY));
    }

    setNoPos({ x: targetX, y: targetY });
    setNoCount(prev => prev + 1);
    setIsDodging(true);

    setTimeout(() => setIsDodging(false), 240);
  }, []);

  // Sensor de proximidad táctil y ratón para evasión anticipada ultra-reactiva
  useEffect(() => {
    const handleGlobalPointerMove = (e) => {
      if (!noBtnRef.current || noCount > 15) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = noBtnRef.current.getBoundingClientRect();
      const dist = Math.hypot(
        clientX - (rect.left + rect.width / 2),
        clientY - (rect.top + rect.height / 2)
      );

      // Si el cursor se acerca a menos de 55px, activar evasión cuántica
      if (dist < 55 && !isDodging) {
        executeDodge(clientX, clientY);
      }
    };

    window.addEventListener('mousemove', handleGlobalPointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalPointerMove);
  }, [executeDodge, isDodging, noCount]);

  const handleNoClick = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    executeDodge(clientX, clientY);
  };

  const handleYes = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    try {
      haptic.success();
      sound.playGameComplete();
    } catch (err) {}
    try {
      confetti.cannonCelebration();
    } catch (err) {}
    if (typeof onAccept === 'function') {
      onAccept();
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative z-10 select-none">
      
      {/* Resplandor Cósmico de Ambiente */}
      <div className="absolute -top-28 -left-28 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -right-28 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      {/* Tarjeta Glassmorphic Aero-espacial */}
      <div 
        ref={containerRef}
        className="glass-card-strong max-w-2xl w-full p-6 sm:p-12 text-center relative animate-pop-in mx-auto flex flex-col items-center justify-center shadow-2xl"
      >
        
        {/* Distintivo Superior de Prestigio */}
        <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-900 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5">
          <span className="text-amber-500">✨</span>
          <span>{t('question.eyebrow', {}, '✦ Pregunta Especial de San Valentín ✦')}</span>
          <span className="text-amber-500">✨</span>
        </div>

        {/* Emoticono Central con Latido Cardíaco Fisiológico Biphasic */}
        <div className="relative inline-block mb-4 sm:mb-6">
          <div className="text-6xl sm:text-8xl animate-heartbeat-glow select-none filter drop-shadow-xl">
            {noCount === 0 ? "💝" : noCount < 4 ? "🥺" : noCount < 8 ? "💖" : "🥰"}
          </div>
          <span className="absolute -top-2 -right-3 text-xl sm:text-2xl animate-bounce">✨</span>
        </div>

        {/* Título Principal en Tipografía de Caligrafía Romana */}
        <h1
          className="text-3xl sm:text-5xl font-bold text-rose-950 mb-2 font-pacifico tracking-wide break-words max-w-full"
          style={{ textShadow: '0 2px 10px rgba(112, 11, 43, 0.15)', overflowWrap: 'break-word' }}
        >
          {recipientName},
        </h1>
        
        <h2
          className="text-2xl sm:text-4xl font-bold text-rose-600 mb-4 sm:mb-6 font-dancing"
          style={{ textShadow: '0 2px 8px rgba(225, 29, 72, 0.15)' }}
        >
          {t('question.questionText', {}, '¿Quieres ser mi San Valentín?')}
        </h2>

        {/* Subtítulo dinámico con transición suave */}
        <p className="text-sm sm:text-lg text-rose-800 font-quicksand font-semibold mb-6 sm:mb-8 max-w-md mx-auto transition-all duration-300 min-h-[3rem] flex items-center justify-center">
          {currentReaction}
        </p>

        {/* Contenedor de Botones con Físicas Spring */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 min-h-[130px] relative py-2 w-full">
          
          {/* Botón SÍ con Ondas de Resplandor Aureo y Crecimiento Spring */}
          <div className="relative group">
            {/* Anillo de pulso áureo */}
            <div 
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300 via-rose-500 to-amber-300 opacity-60 blur-md group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none"
              style={{ transform: `scale(${yesScale * 1.05})` }}
            />

            <button
              type="button"
              onClick={handleYes}
              onMouseEnter={() => {
                try { sound.playPop(); } catch (e) {}
              }}
              className="btn-primary font-bold shadow-2xl relative cursor-pointer"
              style={{
                transform: `scale3d(${yesScale}, ${yesScale}, 1) translate3d(0, 0, 0)`,
                maxWidth: 'min(90vw, 400px)',
                minHeight: '44px',
                padding: `${14 + Math.min(noCount * 2.5, 14)}px ${32 + Math.min(noCount * 5, 26)}px`,
                fontSize: `${1.1 + Math.min(noCount * 0.06, 0.45)}rem`,
                zIndex: 30,
                pointerEvents: 'auto',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), padding 0.3s ease, font-size 0.3s ease'
              }}
            >
              <span className="relative z-10 flex items-center gap-2 pointer-events-none">
                <span>¡SÍ, ACEPTO!</span>
                <span className="animate-wiggle">💖</span>
              </span>
            </button>
          </div>

          {/* Botón NO con Evasión Cuántica y Spring Physics */}
          <button
            ref={noBtnRef}
            type="button"
            onMouseEnter={handleNoClick}
            onClick={handleNoClick}
            onTouchStart={handleNoClick}
            className={`btn-secondary text-gray-700 font-semibold select-none shadow-md cursor-pointer ${
              isDodging ? 'opacity-85' : ''
            }`}
            style={{
              transform: `translate3d(${noPos.x}px, ${noPos.y}px, 0) scale3d(${isDodging ? 0.92 : 1}, ${isDodging ? 0.92 : 1}, 1)`,
              fontSize: `${Math.max(0.8, 0.95 - noCount * 0.035)}rem`,
              padding: '8px 18px',
              maxWidth: '250px',
              minHeight: '44px',
              zIndex: 20,
              pointerEvents: 'auto',
              transition: isDodging 
                ? 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1.15), opacity 0.2s ease'
                : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease'
            }}
          >
            {currentPhrase}
          </button>
        </div>

        {/* Pista divertida cuando se intenta pulsar No */}
        {noCount >= 3 && (
          <div className="mt-6 animate-slide-up">
            <span className="inline-flex items-center gap-1.5 bg-rose-50/90 text-rose-900 text-xs sm:text-sm font-semibold py-1.5 px-4 rounded-full border border-rose-200/80 shadow-sm backdrop-blur-sm">
              <span className="text-amber-500">💡</span>
              <span>El botón "¡SÍ!" no deja de crecer porque nuestro amor está predestinado ✨</span>
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
