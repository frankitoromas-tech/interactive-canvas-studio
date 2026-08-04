import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';

export default function EnvelopeModal({ recipientName = 'Luyuromo', onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (isOpen) return;
    try {
      sound.playChime();
      sound.playPop();
    } catch (err) {}
    setIsOpen(true);
    setTimeout(() => {
      if (typeof onOpen === 'function') onOpen();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="text-center max-w-lg w-full flex flex-col items-center justify-center">
        
        {/* Título de invitación */}
        <div className="mb-8">
          <span className="inline-block py-1.5 px-4 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/40 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 animate-pulse">
            ✨ Mensaje Especial Entregado ✨
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-pacifico drop-shadow-md">
            Para ti, {recipientName}
          </h2>
          <p className="text-rose-200 text-sm sm:text-lg mt-2 font-quicksand">
            Toca el sello de cera para abrir tu sobre secreto
          </p>
        </div>

        {/* Sobre 3D */}
        <div
          onClick={handleOpen}
          onMouseEnter={() => {
            setIsHovered(true);
            sound.playPop();
          }}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mx-auto cursor-pointer select-none transition-all duration-500 transform hover:scale-105 active:scale-95"
          style={{
            width: '320px',
            height: '220px',
            maxWidth: '90vw'
          }}
        >
          {/* Cuerpo del Sobre */}
          <div
            className="w-full h-full rounded-2xl relative shadow-2xl overflow-hidden flex flex-col justify-end p-6 border border-rose-300/40"
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #be123c 60%, #881337 100%)',
              boxShadow: '0 25px 50px -12px rgba(225, 29, 72, 0.5)'
            }}
          >
            {/* Solapa superior triangular */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 origin-top transition-transform duration-700 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                background: 'linear-gradient(180deg, #fb7185 0%, #e11d48 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
              }}
            />

            {/* Carta deslizándose hacia arriba al abrir */}
            <div
              className={`absolute left-4 right-4 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl transition-all duration-700 ${
                isOpen ? '-top-16 opacity-100' : 'top-10 opacity-70'
              }`}
              style={{ height: '140px' }}
            >
              <div className="border border-rose-200 h-full rounded-lg p-3 flex flex-col items-center justify-center text-center">
                <span className="text-2xl mb-1">💌</span>
                <p className="text-rose-900 font-pacifico text-lg">¿Aceptas ser mi San Valentín?</p>
                <p className="text-xs text-rose-500 font-quicksand font-semibold mt-1">Con todo mi corazón...</p>
              </div>
            </div>

            {/* Parte frontal del sobre (triángulo inferior) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
              style={{
                background: 'linear-gradient(0deg, #be123c 0%, #9f1239 100%)',
                clipPath: 'polygon(0 100%, 100% 100%, 50% 20%)',
                opacity: 0.95
              }}
            />

            {/* Sello de Lacre de Cera */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div
                className={`wax-seal shadow-2xl transition-all duration-300 ${
                  isHovered ? 'scale-110 rotate-12' : ''
                } ${isOpen ? 'scale-150 opacity-0' : 'scale-100'}`}
              >
                <span>💝</span>
              </div>
            </div>

            {/* Destellos decorativos */}
            <div className="absolute top-3 left-4 text-rose-200/50 text-xl animate-pulse">✨</div>
            <div className="absolute bottom-3 right-4 text-rose-200/50 text-xl animate-pulse">✨</div>
          </div>
        </div>

        {/* Botón directo de Abrir */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleOpen}
            className="btn-primary text-base sm:text-lg px-8 py-3.5 shadow-xl animate-bounce cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            Abrir Carta de Amor 💌
          </button>
        </div>

      </div>
    </div>
  );
}
