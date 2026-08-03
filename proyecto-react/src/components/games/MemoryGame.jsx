import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/soundEffects';
import { confetti } from '../../utils/confettiEngine';

const CARD_ICONS = ['💖', '🌹', '💍', '💌', '🧸', '🍫', '🎡', '✨'];

export default function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    sound.playPop();
    const paired = [...CARD_ICONS, ...CARD_ICONS];
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }
    setCards(paired.map((icon, id) => ({ id, icon })));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(cards[index].icon)
    ) {
      return;
    }

    sound.playPop();
    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        sound.playMatchSuccess();
        setMatchedPairs(prev => {
          const updated = [...prev, cards[first].icon];
          if (updated.length === CARD_ICONS.length) {
            setIsWon(true);
            setTimeout(() => {
              sound.playFanfare();
              confetti.cannonCelebration();
            }, 300);
          }
          return updated;
        });
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Encabezado */}
      <div className="inline-flex items-center gap-2 bg-rose-100/90 px-4 py-1.5 rounded-full mb-3 border border-rose-200">
        <span>🧩</span>
        <span className="text-xs sm:text-sm font-bold text-rose-800 font-outfit uppercase tracking-wider">
          Minijuego de Amor
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 font-pacifico mb-2">
        Parejas de Nuestro Amor
      </h2>
      <p className="text-sm sm:text-base text-rose-700 font-quicksand mb-6">
        Encuentra todas las parejas de recuerdos románticos. ¡Demuestra tu destreza!
      </p>

      {/* Marcador */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
        <div className="glass-pill px-4 py-2 text-xs sm:text-sm font-bold text-rose-800">
          Movimientos: <span className="text-rose-600 font-outfit text-base">{moves}</span>
        </div>
        <div className="glass-pill px-4 py-2 text-xs sm:text-sm font-bold text-rose-800">
          Aciertos: <span className="text-rose-600 font-outfit text-base">{matchedPairs.length} / {CARD_ICONS.length}</span>
        </div>
        <button
          onClick={initGame}
          className="btn-secondary text-xs sm:text-sm py-1.5 px-3.5"
        >
          🔄 Reiniciar
        </button>
      </div>

      {/* Tablero de Cartas Responsivo */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-md mx-auto mb-6">
        {cards.map((card, idx) => {
          const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(card.icon);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`memory-card aspect-square ${isFlipped ? 'flipped' : ''}`}
            >
              <div className="memory-card-inner">
                <div className="memory-card-back">
                  <span className="text-xl sm:text-2xl select-none">💖</span>
                </div>
                <div className="memory-card-front">
                  <span className="text-2xl sm:text-3xl select-none animate-pop-in">{card.icon}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner de Victoria */}
      {isWon && (
        <div className="w-full p-5 bg-rose-50 border border-rose-300 rounded-2xl animate-pop-in mt-2 text-center">
          <span className="text-4xl mb-1 block">🏆</span>
          <h3 className="text-2xl sm:text-3xl font-bold text-rose-900 font-dancing">
            ¡Completado con éxito, mi amor!
          </h3>
          <p className="text-xs sm:text-sm text-rose-700 font-quicksand mt-1">
            Lo lograste en tan solo <strong>{moves}</strong> movimientos. ¡Nuestra conexión es inigualable! 💕
          </p>
          <button
            onClick={initGame}
            className="btn-primary text-xs sm:text-sm mt-4"
          >
            Jugar otra vez 🎉
          </button>
        </div>
      )}

    </div>
  );
}
