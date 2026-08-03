import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { confetti } from '../../utils/confettiEngine';

const DATE_IDEAS = [
  { id: 1, title: '🍕 Noche de Pizza & Películas', desc: 'Preparamos pizza casera juntos y vemos tus películas favoritas abrazados.', icon: '🍕' },
  { id: 2, title: '🕯️ Cena a la Luz de las Velas', desc: 'Una cena romántica y deliciosa con música suave de fondo.', icon: '🍷' },
  { id: 3, title: '🧺 Picnic en el Parque', desc: 'Frutas, postres, mantel de cuadros y charla interminable bajo los árboles.', icon: '🍓' },
  { id: 4, title: '🍦 Tour de Postres & Helados', desc: 'Vamos a probar los mejores helados y pasteles de la ciudad.', icon: '🧁' },
  { id: 5, title: '🌌 Noche de Mirar las Estrellas', desc: 'Manta acogedora, chocolate caliente y contemplar el firmamento.', icon: '✨' },
  { id: 6, title: '🎮 Tarde de Juegos & Risas', desc: 'Competencia sana en videojuegos o juegos de mesa con premios tiernos.', icon: '🕹️' }
];

export default function DateRoulette() {
  const [spinning, setSpinning] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);

  const spinRoulette = () => {
    if (spinning) return;
    sound.playPop();
    setSpinning(true);
    setSelectedDate(null);

    const randomIndex = Math.floor(Math.random() * DATE_IDEAS.length);
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const segmentAngle = 360 / DATE_IDEAS.length;
    const targetAngle = rotationAngle + extraRounds * 360 + randomIndex * segmentAngle;

    setRotationAngle(targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setSelectedDate(DATE_IDEAS[randomIndex]);
      sound.playFanfare();
      confetti.cannonCelebration();
    }, 3200);
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Distintivo */}
      <div className="inline-flex items-center gap-2 bg-rose-100/90 border border-rose-300 py-1.5 px-4 rounded-full mb-3">
        <span>🎡</span>
        <span className="text-xs sm:text-sm font-bold text-rose-900 font-outfit uppercase tracking-wider">
          Generador de Citas Mágicas
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 font-pacifico mb-2">
        Ruleta de Planes Románticos
      </h2>
      <p className="text-sm sm:text-base text-rose-700 font-quicksand mb-6 max-w-md">
        ¿Indecisos sobre qué hacer hoy? ¡Gira la ruleta y deja que el destino decida nuestra próxima cita!
      </p>

      {/* Visual de la Ruleta SVG Responsivo */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Marcador / Flecha Superior */}
        <div className="absolute -top-4 z-20 text-3xl filter drop-shadow-md select-none animate-bounce">
          🔻
        </div>

        {/* Círculo Giratorio SVG */}
        <div
          className="rounded-full shadow-2xl border-4 border-rose-400 overflow-hidden relative"
          style={{
            width: '280px',
            height: '280px',
            maxWidth: '85vw',
            maxHeight: '85vw',
            transform: `rotate(${rotationAngle}deg)`,
            transition: spinning ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {DATE_IDEAS.map((item, idx) => {
              const startAngle = idx * 60;
              const endAngle = (idx + 1) * 60;
              const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);
              const color = idx % 2 === 0 ? '#fb7185' : '#fda4af';

              return (
                <g key={item.id}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                    fill={color}
                  />
                  {/* Icono centrado en el gajo */}
                  <text
                    x={50 + 30 * Math.cos((Math.PI * (startAngle + 30)) / 180)}
                    y={50 + 30 * Math.sin((Math.PI * (startAngle + 30)) / 180)}
                    fontSize="7"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {item.icon}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Centro de la Ruleta */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-2 border-rose-400 flex items-center justify-center shadow-lg">
            <span className="text-lg">💖</span>
          </div>
        </div>
      </div>

      {/* Botón de Giro */}
      <div className="mt-6">
        <button
          onClick={spinRoulette}
          disabled={spinning}
          className={`btn-primary text-base px-8 py-3 shadow-xl ${
            spinning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {spinning ? 'Girando el Destino... 🎡' : '¡Girar Ruleta de Citas! ✨'}
        </button>
      </div>

      {/* Resultado Ganador */}
      {selectedDate && (
        <div className="mt-6 p-6 bg-rose-50 border-2 border-rose-300 rounded-2xl animate-pop-in max-w-md w-full text-center">
          <span className="text-4xl block mb-2">{selectedDate.icon}</span>
          <h3 className="text-2xl font-bold text-rose-900 font-pacifico mb-1">
            {selectedDate.title}
          </h3>
          <p className="text-sm text-rose-700 font-quicksand leading-relaxed">
            {selectedDate.desc}
          </p>
          <span className="inline-block mt-3 text-xs font-bold text-rose-600 bg-rose-100 py-1 px-3 rounded-full">
            ¡Cita desbloqueada! ¿Preparada? 💕
          </span>
        </div>
      )}

    </div>
  );
}
