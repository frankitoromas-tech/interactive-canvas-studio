import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { confetti } from '../../utils/confettiEngine';

export default function ValentineQuestion({ recipientName = 'Luyuromo', onAccept }) {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);

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
    "💖 Esperando tu tierna respuesta...",
    "🥺 ¿Un 'No'? ¡Seguro fue un error de dedo!",
    "🧐 Mis cálculos dicen que en el fondo quieres decir SÍ...",
    "🍫 El soborno con postres sigue disponible...",
    "✨ El amor siempre triunfa, ¡intenta presionar el botón de SÍ!",
    "🚀 El botón SÍ tiene superpoderes gravitacionales..."
  ];

  const yesScale = 1 + Math.min(noCount * 0.16, 1.35);
  const currentPhrase = noPhrases[Math.min(noCount, noPhrases.length - 1)];
  const currentReaction = reactions[Math.min(Math.floor(noCount / 2), reactions.length - 1)];

  const handleNoDodge = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    try {
      sound.playDodge();
    } catch (err) {}
    
    const rangeX = Math.min(window.innerWidth * 0.35, 170);
    const rangeY = Math.min(window.innerHeight * 0.25, 110);

    const randomX = (Math.random() * 2 - 1) * rangeX;
    const randomY = (Math.random() * 2 - 1) * rangeY;

    setNoPos({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
    setIsDodging(true);

    setTimeout(() => setIsDodging(false), 200);
  };

  const handleYes = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    try {
      sound.playFanfare();
    } catch (err) {}
    try {
      confetti.cannonCelebration();
    } catch (err) {}
    if (typeof onAccept === 'function') {
      onAccept();
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="glass-card-strong max-w-2xl w-full p-6 sm:p-12 text-center relative overflow-hidden animate-pop-in mx-auto flex flex-col items-center justify-center">
        
        {/* Glow de fondo */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Emoticono central latente */}
        <div className="relative inline-block mb-4 sm:mb-6">
          <div className="text-6xl sm:text-8xl animate-heartbeat-glow select-none">
            {noCount === 0 ? "💝" : noCount < 4 ? "🥺" : "💖"}
          </div>
          <span className="absolute -top-2 -right-2 text-xl sm:text-2xl animate-bounce">✨</span>
        </div>

        {/* Título Principal */}
        <h1
          className="text-3xl sm:text-5xl font-bold text-rose-900 mb-2 font-pacifico tracking-wide"
          style={{ textShadow: '2px 2px 4px rgba(244, 63, 94, 0.2)' }}
        >
          {recipientName},
        </h1>
        <h2
          className="text-2xl sm:text-4xl font-bold text-rose-600 mb-4 sm:mb-6 font-dancing"
          style={{ textShadow: '1px 1px 2px rgba(225, 29, 72, 0.15)' }}
        >
          ¿Quieres ser mi San Valentín?
        </h2>

        {/* Subtítulo dinámico */}
        <p className="text-base sm:text-xl text-rose-700 font-quicksand font-medium mb-6 sm:mb-8 max-w-lg mx-auto transition-all duration-300">
          {currentReaction}
        </p>

        {/* Contenedor de Botones Interactivos */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 min-h-[120px] relative py-2 w-full">
          
          {/* Botón SÍ */}
          <button
            type="button"
            onClick={handleYes}
            onMouseEnter={() => {
              try { sound.playPop(); } catch (e) {}
            }}
            className="btn-primary font-bold transition-all duration-300 shadow-2xl relative group cursor-pointer"
            style={{
              transform: `scale(${yesScale})`,
              padding: `${14 + Math.min(noCount * 2.5, 14)}px ${32 + Math.min(noCount * 5, 24)}px`,
              fontSize: `${1.1 + Math.min(noCount * 0.06, 0.45)}rem`,
              zIndex: 30,
              pointerEvents: 'auto'
            }}
          >
            <span className="relative z-10 flex items-center gap-2 pointer-events-none">
              ¡SÍ, ACEPTO! 💖
            </span>
          </button>

          {/* Botón NO */}
          <button
            type="button"
            onMouseEnter={handleNoDodge}
            onClick={handleNoDodge}
            onTouchStart={handleNoDodge}
            className={`btn-secondary text-gray-600 font-semibold transition-transform duration-200 select-none shadow-md cursor-pointer ${
              isDodging ? 'scale-90 opacity-80' : ''
            }`}
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              fontSize: `${Math.max(0.8, 0.95 - noCount * 0.04)}rem`,
              padding: '8px 18px',
              maxWidth: '240px',
              zIndex: 20,
              pointerEvents: 'auto'
            }}
          >
            {currentPhrase}
          </button>
        </div>

        {/* Pista divertida */}
        {noCount >= 3 && (
          <div className="mt-6 animate-slide-up">
            <span className="inline-block bg-rose-100/90 text-rose-800 text-xs sm:text-sm font-medium py-1.5 px-4 rounded-full border border-rose-200 shadow-sm">
              💡 Pista: El botón "¡SÍ!" no para de crecer porque el destino está escrito ✨
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
