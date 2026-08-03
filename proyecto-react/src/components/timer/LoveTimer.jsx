import React, { useState, useEffect } from 'react';
import { safeStorage } from '../../utils/security';
import { sound } from '../../utils/soundEffects';

export default function LoveTimer({ recipientName = 'Luyuromo' }) {
  const [startDate, setStartDate] = useState(() => {
    return safeStorage.getItem('sv_anniversary_date') || '2024-02-14T00:00:00';
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(startDate.split('T')[0]);

  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      setTimeTogether({
        days,
        hours,
        minutes,
        seconds,
        totalSeconds: Math.floor(diff / 1000)
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const handleSaveDate = (e) => {
    e.preventDefault();
    sound.playPop();
    const newDate = `${tempDate}T00:00:00`;
    setStartDate(newDate);
    safeStorage.setItem('sv_anniversary_date', newDate);
    setIsEditing(false);
  };

  return (
    <div className="w-full glass-card-strong p-6 sm:p-10 text-center animate-slide-up mx-auto max-w-3xl flex flex-col items-center">
      
      {/* Distintivo */}
      <div className="inline-flex items-center gap-2 bg-rose-100/90 border border-rose-300 py-1.5 px-4 rounded-full mb-3">
        <span>⏳</span>
        <span className="text-xs sm:text-sm font-bold text-rose-900 font-outfit uppercase tracking-wider">
          Reloj Cósmico de Amor
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 font-pacifico mb-2">
        Tiempo Construyendo Nuestra Historia
      </h2>
      
      <p className="text-sm sm:text-base text-rose-700 font-quicksand mb-8 max-w-md">
        Cada segundo a tu lado es un tesoro que guardo para siempre en mi corazón.
      </p>

      {/* Tarjetas de Conteo Responsivo */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full mb-8">
        {[
          { label: 'DÍAS', value: timeTogether.days, icon: '☀️' },
          { label: 'HORAS', value: timeTogether.hours, icon: '🕰️' },
          { label: 'MINUTOS', value: timeTogether.minutes, icon: '☕' },
          { label: 'SEGUNDOS', value: timeTogether.seconds, icon: '💓' }
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/90 border border-rose-200 p-4 sm:p-5 rounded-2xl shadow-md flex flex-col items-center justify-center transform hover:scale-105 transition-all"
          >
            <span className="text-xs sm:text-sm mb-1">{item.icon}</span>
            <span className="text-3xl sm:text-4xl font-extrabold text-rose-600 font-outfit tracking-tight">
              {item.value}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-rose-800 tracking-wider uppercase font-quicksand mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Total en Segundos Latentes */}
      <div className="glass-pill px-6 py-2.5 mb-6 text-xs sm:text-sm text-rose-800 font-semibold border border-rose-200">
        💖 Más de <strong className="text-rose-600 font-outfit font-bold">{timeTogether.totalSeconds.toLocaleString()}</strong> segundos de pura felicidad
      </div>

      {/* Editor de Fecha de Aniversario */}
      <div className="border-t border-rose-200/60 pt-4 w-full max-w-sm">
        <button
          onClick={() => {
            sound.playPop();
            setIsEditing(e => !e);
          }}
          className="text-xs text-rose-700 underline font-semibold cursor-pointer"
        >
          {isEditing ? 'Cancelar Edición' : '📅 Cambiar Nuestra Fecha de Inicio'}
        </button>

        {isEditing && (
          <form onSubmit={handleSaveDate} className="mt-3 flex items-center justify-center gap-2 animate-slide-up">
            <input
              type="date"
              value={tempDate}
              onChange={(e) => setTempDate(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-rose-300 text-xs bg-white"
            />
            <button type="submit" className="btn-primary text-xs py-1.5 px-3">
              Guardar
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
