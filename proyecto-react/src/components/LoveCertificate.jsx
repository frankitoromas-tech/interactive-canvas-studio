import React, { useRef } from 'react';
import { sound } from '../utils/soundEffects';

export default function LoveCertificate({ recipientName = 'Luyuromo', senderName = 'Tu Enamorado/a', onClose }) {
  const certRef = useRef(null);

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="max-w-2xl w-full my-8">
        
        {/* Contenedor del Certificado Imprimible */}
        <div
          ref={certRef}
          className="bg-[#fffdf9] p-8 md:p-12 rounded-3xl border-8 border-double border-amber-300 shadow-2xl relative text-center text-gray-800"
          style={{
            backgroundImage: 'radial-gradient(#fed7aa 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        >
          {/* Adornos en esquinas */}
          <div className="absolute top-4 left-4 text-3xl text-amber-500 font-cinzel">❦</div>
          <div className="absolute top-4 right-4 text-3xl text-amber-500 font-cinzel">❦</div>
          <div className="absolute bottom-4 left-4 text-3xl text-amber-500 font-cinzel">❦</div>
          <div className="absolute bottom-4 right-4 text-3xl text-amber-500 font-cinzel">❦</div>

          {/* Encabezado */}
          <div className="mb-6">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-amber-700 font-cinzel">
              Reino del Amor Eterno • Edición 2024
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-rose-900 font-cinzel mt-2 tracking-wide">
              Certificado de San Valentín
            </h2>
            <div className="w-32 h-1 bg-amber-400 mx-auto mt-3 rounded-full" />
          </div>

          <p className="text-sm md:text-base text-gray-600 font-quicksand uppercase tracking-wider mb-4">
            Por medio del presente documento oficial e irrevocable, se certifica que:
          </p>

          {/* Nombre del Destinatario */}
          <div className="my-6">
            <h3 className="text-4xl md:text-6xl font-bold text-rose-600 font-great-vibes">
              {recipientName}
            </h3>
            <div className="w-48 h-0.5 bg-rose-300 mx-auto mt-2" />
          </div>

          {/* Declaración */}
          <p className="text-base md:text-lg text-gray-700 font-playfair italic leading-relaxed max-w-lg mx-auto mb-8">
            Ha sido proclamada como la persona más maravillosa, especial e indispensable en mi vida, con plenos derechos a recibir abrazos infinitos, risas cómplices y amor incondicional por siempre.
          </p>

          {/* Firmas y Sello Dorado */}
          <div className="flex items-center justify-around pt-6 border-t border-amber-200">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-dancing font-bold text-rose-900">{senderName}</p>
              <div className="w-28 h-0.5 bg-gray-400 mx-auto mt-1" />
              <span className="text-xs uppercase text-gray-500 font-cinzel">Firma de Amor</span>
            </div>

            {/* Sello de Oro Central */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-amber-600 flex items-center justify-center shadow-lg transform rotate-6">
              <span className="text-2xl">👑</span>
            </div>

            <div className="text-center">
              <p className="text-base md:text-lg font-bold text-gray-700 font-cinzel">14 / 02</p>
              <div className="w-28 h-0.5 bg-gray-400 mx-auto mt-1" />
              <span className="text-xs uppercase text-gray-500 font-cinzel">Fecha Oficial</span>
            </div>
          </div>

        </div>

        {/* Botones de Acción */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePrint}
            className="btn-primary text-sm shadow-xl"
          >
            🖨️ Imprimir / Guardar en PDF
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="btn-secondary text-sm bg-white/90"
            >
              Cerrar ❌
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
