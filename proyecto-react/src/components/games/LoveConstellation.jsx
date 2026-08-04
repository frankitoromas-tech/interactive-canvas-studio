import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/soundEffects';
import { confetti } from '../../utils/confettiEngine';

const CONSTELLATIONS = [
  {
    id: 'heart',
    name: 'Constelación del Corazón Eterno',
    icon: '💖',
    desc: 'El lazo indestructible que une nuestras almas en el firmamento.',
    stars: [
      { x: 50, y: 35 },
      { x: 30, y: 18 },
      { x: 15, y: 30 },
      { x: 18, y: 55 },
      { x: 35, y: 75 },
      { x: 50, y: 90 },
      { x: 65, y: 75 },
      { x: 82, y: 55 },
      { x: 85, y: 30 },
      { x: 70, y: 18 }
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
      [5, 6], [6, 7], [7, 8], [8, 9], [9, 0]
    ]
  },
  {
    id: 'infinity',
    name: 'Infinito Amor',
    icon: '♾️',
    desc: 'Sin principio ni fin, un lazo que perdura más allá del tiempo.',
    stars: [
      { x: 25, y: 50 },
      { x: 35, y: 30 },
      { x: 50, y: 50 },
      { x: 65, y: 70 },
      { x: 75, y: 50 },
      { x: 65, y: 30 },
      { x: 35, y: 70 }
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 2], [2, 6], [6, 0]
    ]
  },
  {
    id: 'swan',
    name: 'Cisnes Enamorados',
    icon: '🦢',
    desc: 'Fidelidad, gracia y devoción grabadas en las estrellas.',
    stars: [
      { x: 20, y: 60 },
      { x: 30, y: 40 },
      { x: 45, y: 30 },
      { x: 55, y: 30 },
      { x: 70, y: 40 },
      { x: 80, y: 60 },
      { x: 50, y: 65 }
    ],
    connections: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]
    ]
  }
];

export default function LoveConstellation() {
  const [selectedConstellation, setSelectedConstellation] = useState(0);
  const [connectedStars, setConnectedStars] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const current = CONSTELLATIONS[selectedConstellation];

  useEffect(() => {
    setConnectedStars([]);
    setIsUnlocked(false);
  }, [selectedConstellation]);

  const handleStarClick = (index) => {
    if (isUnlocked) return;
    sound.playChime();

    if (!connectedStars.includes(index)) {
      const next = [...connectedStars, index];
      setConnectedStars(next);

      if (next.length === current.stars.length) {
        setIsUnlocked(true);
        setTimeout(() => {
          sound.playFanfare();
          confetti.cannonCelebration();
        }, 300);
      }
    }
  };

  const handleReset = () => {
    sound.playPop();
    setConnectedStars([]);
    setIsUnlocked(false);
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Distintivo minimalista */}
      <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/20 py-1 px-3.5 rounded-full mb-3">
        <span className="text-xs font-semibold text-rose-800 uppercase tracking-widest font-outfit">
          ✨ Mapa Celestial de Amor
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-rose-950 font-pacifico mb-1">
        Constelaciones en el Firmamento
      </h2>
      <p className="text-xs sm:text-sm text-rose-700/90 font-quicksand mb-6 max-w-md">
        Toca las estrellas para unirlas y revelar la figura cósmica de nuestro destino.
      </p>

      {/* Selector de Constelaciones Minimalista */}
      <div className="flex gap-2 mb-6">
        {CONSTELLATIONS.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => {
              sound.playPop();
              setSelectedConstellation(idx);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedConstellation === idx
                ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                : 'bg-white/70 text-rose-900 border-rose-200 hover:bg-rose-50'
            }`}
          >
            {c.icon} {c.name.split(' ')[2] || c.name}
          </button>
        ))}
      </div>

      {/* Lienzo del Firmamento */}
      <div className="relative w-full max-w-md aspect-square bg-[#0f172a] rounded-3xl p-4 shadow-2xl border border-indigo-900/60 overflow-hidden select-none">
        
        {/* Fondo de polvo cósmico */}
        <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 via-slate-900/60 to-slate-950 pointer-events-none" />

        {/* Líneas de Constelación SVG */}
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          {current.connections.map(([from, to], idx) => {
            const isLineActive = isUnlocked || (connectedStars.includes(from) && connectedStars.includes(to));
            if (!isLineActive) return null;

            const p1 = current.stars[from];
            const p2 = current.stars[to];
            return (
              <line
                key={idx}
                x1={`${p1.x}%`}
                y1={`${p1.y}%`}
                x2={`${p2.x}%`}
                y2={`${p2.y}%`}
                stroke="rgba(244, 63, 94, 0.85)"
                strokeWidth="2"
                strokeDasharray={isUnlocked ? 'none' : '4 2'}
                className="animate-fade-in"
              />
            );
          })}
        </svg>

        {/* Estrellas Interactivas */}
        {current.stars.map((star, idx) => {
          const isClicked = connectedStars.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleStarClick(idx)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group p-2 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  isClicked
                    ? 'bg-rose-400 shadow-[0_0_15px_#f43f5e] scale-125 ring-2 ring-white'
                    : 'bg-indigo-200/80 shadow-[0_0_8px_#ffffff] scale-100 group-hover:bg-amber-300'
                }`}
              />
            </button>
          );
        })}

        {/* Mensaje de desbloqueo dentro del lienzo */}
        {isUnlocked && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur border border-rose-500/40 p-3 rounded-2xl animate-pop-in text-center">
            <span className="text-rose-300 font-pacifico text-sm block">
              ✨ ¡{current.name} Revelada! ✨
            </span>
            <span className="text-[11px] text-gray-300 font-quicksand">
              {current.desc}
            </span>
          </div>
        )}

      </div>

      {/* Acciones */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleReset}
          className="text-xs text-rose-600 hover:text-rose-800 font-medium py-1 px-3 rounded-full hover:bg-rose-50 cursor-pointer"
        >
          🔄 Reiniciar Estrellas
        </button>
      </div>

    </div>
  );
}
