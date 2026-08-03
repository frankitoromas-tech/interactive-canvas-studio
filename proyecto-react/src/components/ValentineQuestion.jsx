import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { confetti } from '../utils/confettiEngine';

export default function ValentineQuestion({ recipientName = 'Luyuromo', onAccept }) {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);

  const noPhrases = [
    "No",
    "¿Estás 100% segura? 🥺",
    "¡Piénsalo otra vez, mi amor! ✨",
    "¿De verdad me harás esto? 💔",
    "¡Te compro tus chocolates favoritos! 🍫",
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
    "✨ El amor siempre triunfa, ¡intenta presionar el botón verde/rosa!",
    "🚀 El botón SÍ tiene superpoderes gravitacionales..."
  ];

  // Cálculo del tamaño del botón SÍ
  const yesScale = 1 + Math.min(noCount * 0.18, 1.4);
  const currentPhrase = noPhrases[Math.min(noCount, noPhrases.length - 1)];
  const currentReaction = reactions[Math.min(Math.floor(noCount / 2), reactions.length - 1)];

  const handleNoDodge = (e) => {
    e.preventDefault();
    sound.playDodge();
    
    // Bounds calculados para mantenerse visible dentro del viewport
    const rangeX = Math.min(window.innerWidth * 0.35, 180);
    const rangeY = Math.min(window.innerHeight * 0.25, 120);

    const randomX = (Math.random() * 2 - 1) * rangeX;
    const randomY = (Math.random() * 2 - 1) * rangeY;

    setNoPos({ x: randomX, y: randomY });
    setNoCount(prev => prev + 1);
    setIsDodging(true);

    setTimeout(() => setIsDodging(false), 200);
  };

  const handleYes = (e) => {
    sound.playFanfare();
    confetti.cannonCelebration();
    if (onAccept) onAccept();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="glass-card-strong max-w-2xl w-full p-8 md:p-12 text-center relative overflow-hidden animate-pop-in">
        
        {/* Glow de fondo */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Emoticono central latente */}
        <div className="relative inline-block mb-6">
          <div className="text-7xl md:text-8xl animate-heartbeat-glow select-none">
            {noCount === 0 ? "💝" : noCount < 4 ? "🥺" : "💖"}
          </div>
          <span className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</span>
        </div>

        {/* Título Principal */}
        <h1
          className="text-4xl md:text-6xl font-bold text-rose-900 mb-2 font-pacifico tracking-wide"
          style={{ textShadow: '2px 2px 4px rgba(244, 63, 94, 0.2)' }}
        >
          {recipientName},
        </h1>
        <h2
          className="text-3xl md:text-5xl font-bold text-rose-600 mb-6 font-dancing"
          style={{ textShadow: '1px 1px 2px rgba(225, 29, 72, 0.15)' }}
        >
          ¿Quieres ser mi San Valentín?
        </h2>

        {/* Subtítulo dinámico */}
        <p className="text-lg md:text-xl text-rose-700 font-quicksand font-medium mb-8 max-w-lg mx-auto transition-all duration-300">
          {currentReaction}
        </p>

        {/* Contenedor de Botones Interactivos */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 min-h-[140px] relative py-4">
          
          {/* Botón SÍ con ritmo cardíaco y escalado dinámico */}
          <button
            onClick={handleYes}
            onMouseEnter={() => sound.playPop()}
            className="btn-primary font-bold transition-all duration-300 shadow-2xl relative group cursor-pointer"
            style={{
              transform: `scale(${yesScale})`,
              padding: `${16 + Math.min(noCount * 3, 16)}px ${36 + Math.min(noCount * 6, 28)}px`,
              fontSize: `${1.2 + Math.min(noCount * 0.08, 0.5)}rem`,
              zIndex: 30
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              ¡SÍ, ACEPTO! 💖
            </span>
            <div className="absolute inset-0 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
          </button>

          {/* Botón NO Espejo y Evasivo */}
          <button
            onMouseEnter={handleNoDodge}
            onClick={handleNoDodge}
            onTouchStart={handleNoDodge}
            className={`btn-secondary text-gray-600 font-semibold transition-transform duration-200 select-none shadow-md ${
              isDodging ? 'scale-90 opacity-80' : ''
            }`}
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              fontSize: `${Math.max(0.8, 1 - noCount * 0.05)}rem`,
              padding: '10px 22px',
              maxWidth: '260px',
              zIndex: 20
            }}
          >
            {currentPhrase}
          </button>
        </div>

        {/* Pista divertida si hay varios intentos de No */}
        {noCount >= 3 && (
          <div className="mt-6 animate-slide-up">
            <span className="inline-block bg-rose-100/90 text-rose-800 text-sm font-medium py-1.5 px-4 rounded-full border border-rose-200 shadow-sm">
              💡 Pista: El botón "¡SÍ!" no para de crecer porque el destino está escrito ✨
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
