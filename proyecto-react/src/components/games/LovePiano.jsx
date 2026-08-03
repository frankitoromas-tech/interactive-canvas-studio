import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';

const NOTES = [
  { note: 'C4', key: '1', label: 'Do', freq: 261.63, color: '#f43f5e' },
  { note: 'D4', key: '2', label: 'Re', freq: 293.66, color: '#fb7185' },
  { note: 'E4', key: '3', label: 'Mi', freq: 329.63, color: '#f59e0b' },
  { note: 'F4', key: '4', label: 'Fa', freq: 349.23, color: '#10b981' },
  { note: 'G4', key: '5', label: 'Sol', freq: 392.00, color: '#3b82f6' },
  { note: 'A4', key: '6', label: 'La', freq: 440.00, color: '#8b5cf6' },
  { note: 'B4', key: '7', label: 'Si', freq: 493.88, color: '#ec4899' },
  { note: 'C5', key: '8', label: 'Do⁺', freq: 523.25, color: '#f43f5e' }
];

export default function LovePiano() {
  const [activeNote, setActiveNote] = useState(null);
  const [playedNotes, setPlayedNotes] = useState([]);

  const playNote = (n) => {
    sound.init();
    if (!sound.ctx) return;

    try {
      const osc = sound.ctx.createOscillator();
      const gain = sound.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.freq, sound.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.3, sound.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, sound.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(sound.masterGain);
      osc.start();
      osc.stop(sound.ctx.currentTime + 1.25);

      setActiveNote(n.note);
      setPlayedNotes(prev => [...prev.slice(-12), n.label]);
      sound.vibrate(25);

      setTimeout(() => setActiveNote(null), 300);
    } catch (e) {}
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Distintivo Minimalista */}
      <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-400/20 py-1 px-3.5 rounded-full mb-3">
        <span className="text-xs font-semibold text-rose-800 uppercase tracking-widest font-outfit">
          🎹 Caja Musical Interactiva
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-rose-950 font-pacifico mb-1">
        Toca una Serenata de Amor
      </h2>
      <p className="text-xs sm:text-sm text-rose-700/90 font-quicksand mb-6 max-w-md">
        Presiona las teclas o usa tu teclado para tocar una dulce melodía para tu persona favorita.
      </p>

      {/* Visual de Notas Flotantes */}
      <div className="h-8 flex items-center justify-center gap-2 mb-4 text-xs font-mono text-rose-600">
        {playedNotes.length > 0 ? (
          playedNotes.map((lbl, idx) => (
            <span key={idx} className="animate-pop-in bg-rose-100/80 px-2 py-0.5 rounded-full font-bold">
              🎵 {lbl}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-xs italic">Toca cualquier tecla para comenzar...</span>
        )}
      </div>

      {/* Teclado de Piano Minimalista & Responsivo */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 p-3 bg-slate-900/90 backdrop-blur rounded-2xl shadow-xl border border-slate-800 max-w-full overflow-x-auto">
        {NOTES.map((n) => {
          const isPressed = activeNote === n.note;
          return (
            <button
              key={n.note}
              onClick={() => playNote(n)}
              className={`flex flex-col items-center justify-end pb-3 rounded-xl transition-all duration-150 select-none cursor-pointer focus:outline-none ${
                isPressed
                  ? 'bg-rose-400 text-white transform translate-y-1 shadow-inner'
                  : 'bg-white text-gray-800 hover:bg-rose-50 shadow-md'
              }`}
              style={{
                width: '42px',
                height: '140px',
                borderBottom: `4px solid ${n.color}`
              }}
            >
              <span className="text-[10px] text-gray-400 font-mono mb-1">{n.key}</span>
              <span className="text-xs font-bold font-outfit">{n.label}</span>
            </button>
          );
        })}
      </div>

      {/* Partitura Sugerida */}
      <div className="mt-6 p-3 bg-rose-50/70 border border-rose-200/60 rounded-xl text-center max-w-md w-full">
        <span className="text-[11px] font-bold text-rose-800 block uppercase tracking-wider mb-1">
          💡 Melodía Sugerida: "Estrellita de Amor"
        </span>
        <span className="text-xs font-mono text-rose-700 font-semibold">
          Do - Do - Sol - Sol - La - La - Sol ✨
        </span>
      </div>

    </div>
  );
}
