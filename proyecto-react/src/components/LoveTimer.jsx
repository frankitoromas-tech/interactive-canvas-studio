import React, { useState, useEffect } from 'react';
import { sound } from '../utils/soundEffects';

export default function LoveTimer({ startDate = '2024-02-14' }) {
  const [currentStart, setCurrentStart] = useState(startDate);
  const [mode, setMode] = useState('together'); // 'together' o 'countdown'
  const [timeUnits, setTimeUnits] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      if (mode === 'together') {
        const start = new Date(currentStart);
        const diff = Math.max(0, now - start);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeUnits({ days, hours, minutes, seconds });
      } else {
        // Cuenta regresiva a próximo 14 de Febrero
        let targetYear = now.getFullYear();
        let targetDate = new Date(`${targetYear}-02-14T00:00:00`);
        if (now > targetDate) {
          targetDate = new Date(`${targetYear + 1}-02-14T00:00:00`);
        }
        const diff = Math.max(0, targetDate - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeUnits({ days, hours, minutes, seconds });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [currentStart, mode]);

  return (
    <div className="glass-card-strong p-8 md:p-10 text-center animate-slide-up">
      
      {/* Selector de modo */}
      <div className="inline-flex p-1.5 bg-rose-200/50 rounded-full mb-6 border border-rose-300">
        <button
          onClick={() => {
            sound.playPop();
            setMode('together');
          }}
          className={`py-2 px-5 rounded-full text-sm font-bold transition-all ${
            mode === 'together'
              ? 'bg-white text-rose-600 shadow-md scale-105'
              : 'text-rose-800 hover:text-rose-950'
          }`}
        >
          ⏳ Tiempo Desde Que Empezó Nuestra Historia
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setMode('countdown');
          }}
          className={`py-2 px-5 rounded-full text-sm font-bold transition-all ${
            mode === 'countdown'
              ? 'bg-white text-rose-600 shadow-md scale-105'
              : 'text-rose-800 hover:text-rose-950'
          }`}
        >
          🎁 Cuenta Regresiva San Valentín
        </button>
      </div>

      <h3 className="text-3xl md:text-5xl font-bold text-rose-900 font-pacifico mb-2">
        {mode === 'together' ? 'Cada segundo a tu lado cuenta' : 'Esperando nuestro gran día'}
      </h3>
      <p className="text-rose-700 font-quicksand text-base mb-8">
        {mode === 'together'
          ? 'El tiempo vuela cuando se está con la persona indicada...'
          : 'Preparando sorpresas, besos y momentos inolvidables...'}
      </p>

      {/* Rejilla de Reloj Digital Romántico */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
        
        <div className="bg-white/85 p-5 rounded-3xl border border-rose-300 shadow-lg transform hover:-translate-y-1 transition-transform">
          <span className="block text-4xl md:text-5xl font-extrabold text-rose-600 font-outfit">
            {timeUnits.days}
          </span>
          <span className="text-xs uppercase font-bold text-rose-900 tracking-wider">Días</span>
        </div>

        <div className="bg-white/85 p-5 rounded-3xl border border-rose-300 shadow-lg transform hover:-translate-y-1 transition-transform">
          <span className="block text-4xl md:text-5xl font-extrabold text-rose-600 font-outfit">
            {timeUnits.hours}
          </span>
          <span className="text-xs uppercase font-bold text-rose-900 tracking-wider">Horas</span>
        </div>

        <div className="bg-white/85 p-5 rounded-3xl border border-rose-300 shadow-lg transform hover:-translate-y-1 transition-transform">
          <span className="block text-4xl md:text-5xl font-extrabold text-rose-600 font-outfit">
            {timeUnits.minutes}
          </span>
          <span className="text-xs uppercase font-bold text-rose-900 tracking-wider">Minutos</span>
        </div>

        <div className="bg-white/85 p-5 rounded-3xl border border-rose-300 shadow-lg transform hover:-translate-y-1 transition-transform">
          <span className="block text-4xl md:text-5xl font-extrabold text-rose-600 font-outfit animate-pulse">
            {timeUnits.seconds}
          </span>
          <span className="text-xs uppercase font-bold text-rose-900 tracking-wider">Segundos</span>
        </div>

      </div>

      {/* Editor de Fecha de Aniversario */}
      {mode === 'together' && (
        <div className="inline-flex items-center gap-3 bg-white/60 py-2 px-4 rounded-full border border-rose-200 text-xs md:text-sm">
          <span className="text-rose-800 font-semibold">📅 Fecha de inicio:</span>
          <input
            type="date"
            value={currentStart}
            onChange={(e) => setCurrentStart(e.target.value)}
            className="bg-white text-rose-900 font-medium px-2 py-1 rounded-lg border border-rose-300 outline-none text-xs"
          />
        </div>
      )}

    </div>
  );
}
