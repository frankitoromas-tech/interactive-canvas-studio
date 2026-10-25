import React, { useRef } from 'react';
import { sound } from '../../utils/soundEffects';

export default function LoveCertificate({ recipientName = 'Luyuromo', senderName = 'Tu Amor', date = '14 de Febrero, 2026', onClose }) {
  const certificateRef = useRef(null);

  const handlePrint = () => {
    sound.playChime();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fade-in select-none">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl animate-pop-in border-2 border-amber-300 text-center flex flex-col items-center">
        
        {/* Botón de Cierre con Spring Hover */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 text-xl font-bold w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-rose-50 hover:bg-rose-100 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
        >
          ✕
        </button>

        {/* Marco Imperial de Certificado */}
        <div ref={certificateRef} className="w-full border-2 border-amber-300/80 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#fffdf7] via-[#fffbf2] to-[#fff8eb] shadow-inner relative overflow-hidden">
          
          {/* Filigranas en las esquinas */}
          <div className="absolute top-2 left-2 text-amber-500/40 text-lg font-serif">⚜</div>
          <div className="absolute top-2 right-2 text-amber-500/40 text-lg font-serif">⚜</div>
          <div className="absolute bottom-2 left-2 text-amber-500/40 text-lg font-serif">⚜</div>
          <div className="absolute bottom-2 right-2 text-amber-500/40 text-lg font-serif">⚜</div>

          <span className="text-4xl mb-1 block filter drop-shadow">🏆</span>
          <span className="text-xs uppercase font-black text-amber-800 tracking-widest font-outfit block mb-1">
            Certificado Oficial de Amor Incondicional
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-rose-950 font-cinzel my-2 tracking-wide">
            DECLARACIÓN DE SAN VALENTÍN
          </h2>

          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-3" />

          <p className="text-xs sm:text-sm text-gray-600 font-quicksand font-medium">
            Por medio del presente documento real, se certifica con validez eterna que:
          </p>

          <div className="my-3 py-1.5 border-b-2 border-rose-300 inline-block px-8">
            <span className="text-3xl sm:text-4xl font-bold text-rose-600 font-pacifico filter drop-shadow-sm break-words max-w-full inline-block">
              {recipientName}
            </span>
          </div>

          <p className="text-xs sm:text-base text-gray-700 font-quicksand max-w-lg mx-auto leading-relaxed font-medium">
            Ha aceptado libre, feliz y tiernamente ser el San Valentín oficial de <strong className="text-rose-900 font-bold">{senderName}</strong>, obteniendo todos los derechos a abrazos ilimitados, chocolates, paseos bajo la luna y amor incondicional por los siglos de los siglos.
          </p>

          {/* Sellos Reales y Firmas */}
          <div className="mt-6 flex flex-wrap items-center justify-around gap-2 w-full pt-4 border-t border-amber-200/80">
            <div className="text-left">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Fecha de Registro:</span>
              <span className="text-xs sm:text-sm font-bold text-gray-800 font-outfit">{date}</span>
            </div>

            <div className="wax-seal scale-90 sm:scale-95">
              <span>💖</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Firma de Entrega:</span>
              <span className="text-xl sm:text-2xl font-bold text-rose-700 font-dancing">{senderName}</span>
            </div>
          </div>

        </div>

        {/* Acciones */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={handlePrint} className="btn-primary text-xs sm:text-sm min-h-[44px]">
            <span>🖨️ Descargar o Imprimir</span>
          </button>
          <button onClick={onClose} className="btn-secondary text-xs sm:text-sm min-h-[44px]">
            <span>Cerrar</span>
          </button>
        </div>

      </div>
    </div>
  );
}
