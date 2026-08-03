import React, { useRef } from 'react';
import { sound } from '../../utils/soundEffects';

export default function LoveCertificate({ recipientName = 'Luyuromo', senderName = 'Tu Amor', date = '14 de Febrero, 2026', onClose }) {
  const certificateRef = useRef(null);

  const handlePrint = () => {
    sound.playChime();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl animate-pop-in border-4 border-amber-400 text-center flex flex-col items-center">
        
        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 text-2xl font-bold w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        {/* Marco de Certificado */}
        <div ref={certificateRef} className="w-full border-2 border-dashed border-amber-300 p-6 rounded-2xl bg-amber-50/40">
          
          <span className="text-3xl mb-1 block">🏆</span>
          <span className="text-xs uppercase font-extrabold text-amber-800 tracking-widest font-outfit">
            Certificado Oficial de Amor Incondicional
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-rose-900 font-cinzel my-3">
            DECLARACIÓN DE SAN VALENTÍN
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 font-quicksand">
            Por medio del presente documento, se certifica con validez eterna que:
          </p>

          <div className="my-4 py-2 border-b-2 border-rose-300 inline-block px-8">
            <span className="text-3xl sm:text-4xl font-bold text-rose-600 font-pacifico">
              {recipientName}
            </span>
          </div>

          <p className="text-sm sm:text-base text-gray-700 font-quicksand max-w-lg mx-auto leading-relaxed">
            Ha aceptado libre, feliz y tiernamente ser el San Valentín de <strong>{senderName}</strong>, obteniendo todos los derechos a abrazos ilimitados, chocolates, paseos bajo la luna y amor incondicional por los siglos de los siglos.
          </p>

          {/* Sellos y Firmas */}
          <div className="mt-8 flex items-center justify-around w-full pt-4 border-t border-amber-200">
            <div className="text-left">
              <span className="text-xs text-gray-500 font-semibold block">Fecha de Registro:</span>
              <span className="text-sm font-bold text-gray-800 font-outfit">{date}</span>
            </div>

            <div className="wax-seal scale-90">
              <span>💖</span>
            </div>

            <div className="text-right">
              <span className="text-xs text-gray-500 font-semibold block">Firma de Entrega:</span>
              <span className="text-xl font-bold text-rose-700 font-dancing">{senderName}</span>
            </div>
          </div>

        </div>

        {/* Acciones */}
        <div className="mt-6 flex gap-3">
          <button onClick={handlePrint} className="btn-primary text-xs sm:text-sm">
            🖨️ Descargar o Imprimir
          </button>
          <button onClick={onClose} className="btn-secondary text-xs sm:text-sm">
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
