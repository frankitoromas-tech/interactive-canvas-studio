import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { confetti } from '../utils/confettiEngine';

export default function DateRoulette() {
  const dates = [
    { title: "Cena a la luz de las velas 🍝🍷", desc: "Música suave, comida deliciosa y miradas cómplices." },
    { title: "Maratón de películas & mantita 🎬🍿", desc: "Palomitas, tus pelis favoritas y muchos abrazos." },
    { title: "Paseo nocturno bajo las estrellas ✨🌌", desc: "Caminar tomados de la mano y respirar el aire fresco." },
    { title: "Cocinar juntos un postre dulce 🧁🍓", desc: "Harina, risas y probar el chocolate con el dedo." },
    { title: "Picnic romántico al aire libre 🧺🌳", desc: "Manta en el césped, fruta fresca y buena charla." },
    { title: "Tarde de masajes & mimos 💆‍♀️🕯️", desc: "Aceites aromáticos y relajación total para ti." },
    { title: "Tour de cafeterías vintage ☕🥐", desc: "Café caliente, postres ricos y fotos bonitas." },
    { title: "Noche de juegos y risas sin fin 🎲❤️", desc: "Competir con cariño y terminar abrazados." }
  ];

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const spinWheel = () => {
    if (spinning) return;

    sound.playPop();
    setSpinning(true);
    setSelectedDate(null);

    // Reproducir tics de sonido
    const tickInterval = setInterval(() => {
      sound.playRouletteTick();
    }, 180);

    const randomIndex = Math.floor(Math.random() * dates.length);
    const sliceAngle = 360 / dates.length;
    // Giro extra de 4 a 6 vueltas completas
    const extraSpins = (Math.floor(Math.random() * 3) + 4) * 360;
    const targetRotation = rotation + extraSpins + (360 - (randomIndex * sliceAngle) - sliceAngle / 2);

    setRotation(targetRotation);

    setTimeout(() => {
      clearInterval(tickInterval);
      setSpinning(false);
      setSelectedDate(dates[randomIndex]);
      sound.playChime();
      confetti.burst({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        count: 50
      });
    }, 4500);
  };

  return (
    <div className="glass-card-strong p-8 md:p-12 text-center animate-slide-up">
      <span className="text-4xl mb-2 inline-block">🎡</span>
      <h3 className="text-3xl md:text-5xl font-bold text-rose-900 font-pacifico mb-2">
        Ruleta de Nuestra Cita Ideal
      </h3>
      <p className="text-rose-700 font-quicksand text-base mb-8 max-w-lg mx-auto">
        ¿No sabemos qué hacer? ¡Gira la ruleta del amor y deja que el destino decida nuestro plan!
      </p>

      {/* Contenedor de la Ruleta y Puntero */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto mb-8">
        
        {/* Puntero Superior */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-3xl filter drop-shadow-md">
          🔻
        </div>

        {/* Círculo de la Ruleta */}
        <div
          className="w-full h-full rounded-full border-8 border-white shadow-2xl overflow-hidden relative"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 4.5s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
            background: 'conic-gradient(#f43f5e 0deg 45deg, #fb7185 45deg 90deg, #ec4899 90deg 135deg, #f472b6 135deg 180deg, #fda4af 180deg 225deg, #fbbf24 225deg 270deg, #f59e0b 270deg 315deg, #e11d48 315deg 360deg)'
          }}
        >
          {dates.map((date, idx) => {
            const angle = idx * 45 + 22.5;
            return (
              <div
                key={idx}
                className="absolute w-full h-full flex items-start justify-center pt-3 text-white text-xs font-bold font-quicksand select-none"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '50% 50%'
                }}
              >
                <span className="drop-shadow-sm truncate max-w-[90px]">{date.title.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>

        {/* Botón Central de Giro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button
            onClick={spinWheel}
            disabled={spinning}
            className="w-20 h-20 rounded-full bg-white text-rose-600 font-extrabold shadow-xl border-4 border-rose-300 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center text-sm font-outfit uppercase tracking-wider"
          >
            {spinning ? '🎲' : 'Girar'}
          </button>
        </div>

      </div>

      {/* Tarjeta de Cita Ganadora */}
      {selectedDate && (
        <div className="bg-rose-50/90 p-6 rounded-3xl border-2 border-rose-400 max-w-md mx-auto shadow-xl animate-pop-in">
          <span className="inline-block bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            ✨ Cita Ganadora ✨
          </span>
          <h4 className="text-2xl font-bold text-rose-900 font-pacifico mt-1 mb-2">
            {selectedDate.title}
          </h4>
          <p className="text-gray-700 font-quicksand text-base">
            {selectedDate.desc}
          </p>
        </div>
      )}

      {/* Botón de acción */}
      {!selectedDate && (
        <button
          onClick={spinWheel}
          disabled={spinning}
          className="btn-primary text-base shadow-lg"
        >
          {spinning ? 'Girando la suerte... 🎲' : '✨ ¡Girar la Ruleta Ahora!'}
        </button>
      )}

    </div>
  );
}
