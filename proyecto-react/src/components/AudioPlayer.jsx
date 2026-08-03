import React, { useState, useEffect } from 'react';
import { sound } from '../utils/soundEffects';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const toggleMusic = () => {
    sound.playPop();
    const playing = sound.toggleBGM();
    setIsPlaying(playing);
  };

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 select-none">
      
      {/* Control desplegable de volumen */}
      {showVolume && (
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-rose-200 animate-fade-in flex items-center gap-2">
          <span className="text-xs">🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-rose-500 cursor-pointer h-1.5 bg-rose-200 rounded-lg"
          />
          <span className="text-xs">🔊</span>
        </div>
      )}

      {/* Botón Principal de Música con Ecualizador */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-2xl border border-rose-300 flex items-center gap-3">
        
        {/* Ecualizador animado */}
        <div
          onClick={toggleMusic}
          className="flex items-end gap-0.5 h-4 cursor-pointer"
          title={isPlaying ? "Pausar música romántica" : "Reproducir música romántica"}
        >
          <span
            className={`w-1 bg-rose-500 rounded-full transition-all ${
              isPlaying ? 'h-4 animate-pulse' : 'h-1.5'
            }`}
          />
          <span
            className={`w-1 bg-pink-500 rounded-full transition-all ${
              isPlaying ? 'h-3 animate-bounce' : 'h-1.5'
            }`}
          />
          <span
            className={`w-1 bg-rose-400 rounded-full transition-all ${
              isPlaying ? 'h-4.5 animate-pulse' : 'h-1.5'
            }`}
          />
        </div>

        {/* Texto y Estado */}
        <button
          onClick={toggleMusic}
          className="text-xs font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1.5 bg-transparent border-none cursor-pointer font-quicksand"
        >
          <span>{isPlaying ? '🎵 Serenata Activa' : '▶️ Música Romántica'}</span>
        </button>

        {/* Botón Mute / Sonido */}
        <button
          onClick={toggleMute}
          className="text-sm p-1 rounded-full hover:bg-rose-100 transition-colors"
          title={isMuted ? "Desactivar silencio" : "Silenciar efectos"}
        >
          {isMuted ? '🔇' : '🔔'}
        </button>

        {/* Botón para desplegar barra de volumen */}
        <button
          onClick={() => setShowVolume(prev => !prev)}
          className="text-xs p-1 rounded-full hover:bg-rose-100 text-gray-600 transition-colors"
          title="Ajustar volumen"
        >
          ⚙️
        </button>

      </div>

    </div>
  );
}
