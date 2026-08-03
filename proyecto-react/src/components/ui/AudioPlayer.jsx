import React, { useState, useEffect } from 'react';
import { sound } from '../../utils/soundEffects';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [track, setTrack] = useState('music-box');
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlay = () => {
    sound.playPop();
    const playing = sound.toggleBGM();
    setIsPlaying(playing);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  const handleTrackChange = (newTrack) => {
    sound.playPop();
    setTrack(newTrack);
    sound.setTrack(newTrack);
    if (!isPlaying) {
      sound.startBGM();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2 select-none">
      
      {/* Panel Expandido de Opciones de Música */}
      {isExpanded && (
        <div className="glass-card-strong p-4 rounded-2xl shadow-2xl mb-1 w-64 animate-pop-in border border-rose-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-rose-900 uppercase tracking-wider font-outfit">
              🎵 Melodías Románticas
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-xs text-gray-400 hover:text-rose-600 font-bold"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1.5 mb-3">
            {[
              { id: 'music-box', name: '🎹 Caja de Música', desc: 'Melodía dulce y tierna' },
              { id: 'lofi-piano', name: '☕ Lofi Piano Romance', desc: 'Cálido y relajante' },
              { id: 'waltz', name: '💃 Vals de Enamorados', desc: 'Ritmo suave 3/4' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => handleTrackChange(t.id)}
                className={`text-left p-2 rounded-xl text-xs font-medium transition-all ${
                  track === t.id
                    ? 'bg-rose-500 text-white font-bold shadow-md'
                    : 'bg-white/80 text-rose-800 hover:bg-rose-100/70'
                }`}
              >
                <div>{t.name}</div>
                <div className={`text-[10px] ${track === t.id ? 'text-rose-100' : 'text-gray-500'}`}>
                  {t.desc}
                </div>
              </button>
            ))}
          </div>

          {/* Control de Volumen */}
          <div className="flex items-center gap-2 pt-2 border-t border-rose-200">
            <span className="text-xs">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-rose-500 h-1.5 bg-rose-200 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Botón Flotante Principal con Ecualizador */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="glass-pill px-4 py-2.5 shadow-xl flex items-center gap-2 text-rose-800 font-bold text-xs hover:bg-white transition-all border border-rose-300"
          title={isPlaying ? "Pausar música" : "Reproducir serenata"}
        >
          <span>{isPlaying ? '⏸️' : '🎵'}</span>
          <span className="hidden sm:inline">
            {isPlaying ? 'Música Romántica' : 'Tocar Música'}
          </span>
          
          {/* Ecualizador animado */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-1 bg-rose-500 rounded-full animate-bounce h-full" style={{ animationDuration: '0.6s' }} />
              <span className="w-1 bg-rose-600 rounded-full animate-bounce h-2" style={{ animationDuration: '0.4s' }} />
              <span className="w-1 bg-rose-500 rounded-full animate-bounce h-3" style={{ animationDuration: '0.7s' }} />
            </div>
          )}
        </button>

        {/* Botón de Ajustes de Música */}
        <button
          onClick={() => {
            sound.playPop();
            setIsExpanded(e => !e);
          }}
          className="glass-pill p-2.5 shadow-xl text-rose-800 font-bold text-xs hover:bg-white transition-all border border-rose-300 flex items-center justify-center"
          title="Cambiar melodía o volumen"
        >
          <span>🎼</span>
        </button>
      </div>

    </div>
  );
}
