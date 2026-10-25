import React, { useState, useRef } from 'react';
import { sound } from '../../utils/soundEffects';
import { haptic } from '../../utils/haptics';
import { useI18n } from '../../i18n/I18nContext';

export default function EnvelopeModal({ recipientName = 'Luyuromo', onOpen }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const envelopeRef = useRef(null);

  const handlePointerMove = (e) => {
    if (isOpen) return;
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - (rect.left + rect.width / 2);
    const y = clientY - (rect.top + rect.height / 2);
    const rx = -(y / (rect.height / 2)) * 10;
    const ry = (x / (rect.width / 2)) * 12;
    setTilt({ rx, ry });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const handleOpen = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (isOpen) return;
    try {
      haptic.medium();
      sound.playEnvelopeOpen();
    } catch (err) {}
    setIsOpen(true);
    setTilt({ rx: 0, ry: 0 });
    setTimeout(() => {
      if (typeof onOpen === 'function') onOpen();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fade-in select-none">
      
      {/* Luces y Estrellas de Fondo Cósmico */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
      </div>

      <div className="text-center max-w-lg w-full flex flex-col items-center justify-center relative z-10">
        
        {/* Distintivo de Invitación de Alta Gama */}
        <div className="mb-6 sm:mb-8 animate-pop-in">
          <div className="inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-rose-950/70 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 shadow-lg backdrop-blur-md">
            <span className="text-amber-400 animate-pulse">✨</span>
            <span>{t('envelope.badge', {}, 'Mensaje Secreto de San Valentín')}</span>
            <span className="text-amber-400 animate-pulse">✨</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-pacifico drop-shadow-lg tracking-wide break-words max-w-full">
            {t('envelope.title', {}, 'Para ti')}, {recipientName}
          </h2>
          
          <p className="text-rose-200/90 text-sm sm:text-base mt-2 font-quicksand font-medium max-w-sm mx-auto">
            {t('envelope.subtitle', {}, 'Toca el sello real de lacre carmesí para descubrir lo que mi corazón guarda para ti')}
          </p>
        </div>

        {/* Contenedor del Sobre 3D con Inclinación Interactiva */}
        <div
          ref={envelopeRef}
          onClick={handleOpen}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          onMouseEnter={() => {
            setIsHovered(true);
            try { sound.playPop(); } catch (e) {}
          }}
          onMouseLeave={handlePointerLeave}
          className="relative mx-auto cursor-pointer select-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97]"
          style={{
            width: 'min(330px, 92vw)',
            height: '230px',
            maxWidth: '92vw',
            perspective: '1000px',
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${isHovered && !isOpen ? 1.04 : 1}, ${isHovered && !isOpen ? 1.04 : 1}, 1)`
          }}
        >
          {/* Resplandor Aureo Trasero */}
          <div 
            className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-rose-500/25 via-amber-300/30 to-pink-500/25 blur-xl transition-opacity duration-500 pointer-events-none"
            style={{ opacity: isHovered || isOpen ? 1 : 0.4 }}
          />

          {/* Cuerpo Principal del Sobre (Velvet Wine Luxury) */}
          <div
            className="w-full h-full rounded-2xl relative overflow-hidden flex flex-col justify-end p-6 border border-amber-300/40 shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #700b2b 0%, #4a0418 55%, #26020c 100%)',
              boxShadow: '0 30px 60px -10px rgba(74, 4, 24, 0.75), inset 0 1px 2px rgba(253, 230, 138, 0.4)'
            }}
          >
            {/* Filigranas doradas en las esquinas */}
            <div className="absolute top-2 left-2 text-amber-300/40 text-xs font-serif select-none pointer-events-none">⚜</div>
            <div className="absolute top-2 right-2 text-amber-300/40 text-xs font-serif select-none pointer-events-none">⚜</div>

            {/* Solapa Superior Triangular (Hinged Flap) */}
            <div
              className={`absolute top-0 left-0 right-0 h-32 origin-top transition-all duration-700 ease-in-out ${
                isOpen ? 'opacity-0 scale-y-0' : 'opacity-100 scale-y-100'
              }`}
              style={{
                background: 'linear-gradient(180deg, #9f1239 0%, #700b2b 60%, #4a0418 100%)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.4))',
                borderTop: '1px solid rgba(253, 230, 138, 0.4)'
              }}
            />

            {/* Carta Deslizándose hacia arriba con textura de pergamino italiano */}
            <div
              className={`absolute left-4 right-4 bg-[#fdfbf7] rounded-xl p-4 shadow-2xl transition-all duration-700 ease-out ${
                isOpen ? '-top-20 opacity-100 scale-100' : 'top-8 opacity-70 scale-95'
              }`}
              style={{
                height: '150px',
                border: '1.5px solid #e7dec8',
                boxShadow: '0 20px 35px rgba(0,0,0,0.25), inset 0 0 25px rgba(217, 119, 6, 0.05)'
              }}
            >
              <div className="border border-amber-300/60 h-full rounded-lg p-3 flex flex-col items-center justify-center text-center bg-white/70">
                <span className="text-2xl mb-1 filter drop-shadow">💌</span>
                <p className="text-rose-950 font-pacifico text-base sm:text-lg">
                  ¿Aceptas ser mi San Valentín?
                </p>
                <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-1.5" />
                <p className="text-[11px] text-rose-700 font-quicksand font-bold tracking-wide">
                  Con todo mi amor infinito...
                </p>
              </div>
            </div>

            {/* Parte Frontal del Sobre (Bolsillo Triangular Inferior) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: 'linear-gradient(0deg, #4a0418 0%, #700b2b 70%, #881337 100%)',
                clipPath: 'polygon(0 100%, 100% 100%, 50% 20%)',
                opacity: 0.98,
                filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.2))'
              }}
            />

            {/* Sello de Lacre Carmesí & Oro */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div
                className={`wax-seal ${
                  isHovered ? 'scale-110 rotate-6' : ''
                } ${isOpen ? 'scale-150 opacity-0' : 'scale-100'}`}
              >
                <span className="filter drop-shadow-md">💖</span>
              </div>
            </div>

            {/* Destellos dorados prismáticos en esquinas */}
            <div className="absolute top-3 left-4 text-amber-200/60 text-lg animate-pulse">✨</div>
            <div className="absolute bottom-3 right-4 text-amber-200/60 text-lg animate-pulse" style={{ animationDelay: '0.8s' }}>✨</div>
          </div>
        </div>

        {/* Botón de Apertura Directa con Estilo Haute Couture */}
        <div className="mt-8 animate-slide-up">
          <button
            type="button"
            onClick={handleOpen}
            className="btn-primary text-base sm:text-lg px-9 py-3.5 shadow-2xl cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          >
            <span className="text-amber-200">✨</span>
            <span>Abrir Carta de Amor</span>
            <span className="text-amber-200">💌</span>
          </button>
        </div>

      </div>
    </div>
  );
}
